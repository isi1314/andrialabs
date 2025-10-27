/**
 * ANDRIA LABS ERROR TRACKING
 *
 * Lightweight client-side error tracking system
 * Captures JavaScript errors, logs them, and optionally sends to server
 *
 * Features:
 * - Global error handler
 * - Unhandled promise rejection tracking
 * - Network error detection
 * - Local storage for offline errors
 * - Configurable error reporting
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    // Set to true to log errors to console (development)
    logToConsole: true,

    // Set to true to store errors in localStorage
    storeLocally: true,

    // Maximum number of errors to store
    maxStoredErrors: 50,

    // Endpoint to send errors to (set this to your error reporting endpoint)
    reportingEndpoint: null, // e.g., '/api/errors' or 'https://your-domain.com/api/errors'

    // Enable/disable error tracking
    enabled: true,

    // Additional context to include with errors
    context: {
      appName: 'Andria Labs',
      appVersion: '1.0.0',
      environment: window.location.hostname === 'localhost' ? 'development' : 'production'
    }
  };

  // Initialize error tracking
  function initErrorTracking() {
    if (!config.enabled) return;

    // Global error handler
    window.addEventListener('error', handleError);

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    // Log initialization
    if (config.logToConsole) {
      console.log('[Error Tracking] Initialized');
    }
  }

  // Handle JavaScript errors
  function handleError(event) {
    const errorData = {
      type: 'error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error ? event.error.stack : null,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: config.context
    };

    processError(errorData);

    // Prevent default error handling if we're handling it
    // return true;
  }

  // Handle unhandled promise rejections
  function handlePromiseRejection(event) {
    const errorData = {
      type: 'unhandledrejection',
      message: event.reason ? event.reason.message || event.reason : 'Unknown promise rejection',
      error: event.reason ? event.reason.stack : null,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: config.context
    };

    processError(errorData);
  }

  // Process error (log, store, report)
  function processError(errorData) {
    // Log to console
    if (config.logToConsole) {
      console.error('[Error Tracking]', errorData);
    }

    // Store locally
    if (config.storeLocally) {
      storeError(errorData);
    }

    // Report to server
    if (config.reportingEndpoint) {
      reportError(errorData);
    }
  }

  // Store error in localStorage
  function storeError(errorData) {
    try {
      const storedErrors = getStoredErrors();
      storedErrors.push(errorData);

      // Keep only the most recent errors
      if (storedErrors.length > config.maxStoredErrors) {
        storedErrors.shift();
      }

      localStorage.setItem('andrialabs_errors', JSON.stringify(storedErrors));
    } catch (e) {
      // localStorage might be full or unavailable
      console.warn('[Error Tracking] Could not store error:', e);
    }
  }

  // Get stored errors from localStorage
  function getStoredErrors() {
    try {
      const stored = localStorage.getItem('andrialabs_errors');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  // Report error to server
  function reportError(errorData) {
    if (!config.reportingEndpoint) return;

    // Use sendBeacon if available (won't block page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(errorData)], { type: 'application/json' });
      navigator.sendBeacon(config.reportingEndpoint, blob);
    } else {
      // Fallback to fetch
      fetch(config.reportingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData),
        keepalive: true
      }).catch(function(err) {
        console.warn('[Error Tracking] Failed to report error:', err);
      });
    }
  }

  // Public API
  window.ErrorTracking = {
    // Manually track an error
    trackError: function(error, context) {
      const errorData = {
        type: 'manual',
        message: error.message || String(error),
        error: error.stack || null,
        customContext: context || {},
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        context: config.context
      };
      processError(errorData);
    },

    // Get all stored errors
    getErrors: function() {
      return getStoredErrors();
    },

    // Clear stored errors
    clearErrors: function() {
      try {
        localStorage.removeItem('andrialabs_errors');
        if (config.logToConsole) {
          console.log('[Error Tracking] Cleared stored errors');
        }
      } catch (e) {
        console.warn('[Error Tracking] Could not clear errors:', e);
      }
    },

    // Update configuration
    configure: function(newConfig) {
      Object.assign(config, newConfig);
      if (config.logToConsole) {
        console.log('[Error Tracking] Configuration updated:', config);
      }
    },

    // Get current configuration
    getConfig: function() {
      return Object.assign({}, config);
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initErrorTracking);
  } else {
    initErrorTracking();
  }

})();

/**
 * USAGE EXAMPLES:
 *
 * 1. Manual error tracking:
 *    try {
 *      // your code
 *    } catch (error) {
 *      ErrorTracking.trackError(error, { customData: 'value' });
 *    }
 *
 * 2. Get stored errors (for debugging):
 *    console.log(ErrorTracking.getErrors());
 *
 * 3. Clear stored errors:
 *    ErrorTracking.clearErrors();
 *
 * 4. Configure error reporting endpoint:
 *    ErrorTracking.configure({
 *      reportingEndpoint: 'https://your-domain.com/api/errors'
 *    });
 *
 * 5. Disable console logging in production:
 *    ErrorTracking.configure({ logToConsole: false });
 */
