/**
 * Cookie Consent Banner
 * GDPR/Privacy-compliant cookie consent system
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'andria_cookie_consent';
  const CONSENT_TIMESTAMP_KEY = 'andria_cookie_consent_timestamp';
  const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000; // 365 days in milliseconds

  const CookieConsent = {
    /**
     * Initialize the cookie consent banner
     */
    init: function() {
      // Check if consent has already been given
      if (this.hasConsent()) {
        return;
      }

      // Create and show the banner
      this.createBanner();
      this.attachEventListeners();
    },

    /**
     * Check if user has already given consent
     */
    hasConsent: function() {
      const consent = localStorage.getItem(CONSENT_KEY);
      const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

      if (!consent || !timestamp) {
        return false;
      }

      // Check if consent has expired
      const consentAge = Date.now() - parseInt(timestamp, 10);
      if (consentAge > CONSENT_DURATION) {
        this.clearConsent();
        return false;
      }

      return true;
    },

    /**
     * Create the cookie consent banner HTML
     */
    createBanner: function() {
      const banner = document.createElement('div');
      banner.id = 'cookie-consent-banner';
      banner.className = 'cookie-consent';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-live', 'polite');
      banner.setAttribute('aria-label', 'Cookie consent banner');

      banner.innerHTML = `
        <div class="cookie-consent__container">
          <div class="cookie-consent__content">
            <div class="cookie-consent__text">
              <h2 class="cookie-consent__title">Your Privacy Matters</h2>
              <p class="cookie-consent__description">
                We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.
                By clicking "Accept All," you agree to our use of cookies.
                <a href="#" class="cookie-consent__link" id="cookie-learn-more">Learn more</a>
              </p>
            </div>
            <div class="cookie-consent__actions">
              <button type="button" class="cookie-consent__btn cookie-consent__btn--secondary" id="cookie-decline">
                Decline Optional
              </button>
              <button type="button" class="cookie-consent__btn cookie-consent__btn--primary" id="cookie-accept">
                Accept All
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      // Trigger reflow for animation
      setTimeout(() => {
        banner.classList.add('cookie-consent--visible');
      }, 100);
    },

    /**
     * Attach event listeners to banner buttons
     */
    attachEventListeners: function() {
      const acceptBtn = document.getElementById('cookie-accept');
      const declineBtn = document.getElementById('cookie-decline');
      const learnMoreLink = document.getElementById('cookie-learn-more');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => this.acceptCookies());
      }

      if (declineBtn) {
        declineBtn.addEventListener('click', () => this.declineCookies());
      }

      if (learnMoreLink) {
        learnMoreLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showDetailsModal();
        });
      }
    },

    /**
     * Accept all cookies
     */
    acceptCookies: function() {
      localStorage.setItem(CONSENT_KEY, 'all');
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
      this.removeBanner();
      this.enableOptionalCookies();
    },

    /**
     * Decline optional cookies (keep only essential)
     */
    declineCookies: function() {
      localStorage.setItem(CONSENT_KEY, 'essential');
      localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());
      this.removeBanner();
    },

    /**
     * Remove the banner from the DOM
     */
    removeBanner: function() {
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.classList.remove('cookie-consent--visible');
        setTimeout(() => {
          banner.remove();
        }, 300);
      }
    },

    /**
     * Clear consent data (for testing or expired consent)
     */
    clearConsent: function() {
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
    },

    /**
     * Enable optional cookies (analytics, tracking, etc.)
     */
    enableOptionalCookies: function() {
      // Initialize analytics or other optional services here
      // Example: Google Analytics, Facebook Pixel, etc.
      console.log('Optional cookies enabled');

      // Dispatch custom event for other scripts to listen to
      const event = new CustomEvent('cookieConsentGranted', {
        detail: { consent: 'all' }
      });
      window.dispatchEvent(event);
    },

    /**
     * Show detailed cookie information modal
     */
    showDetailsModal: function() {
      const modal = document.createElement('div');
      modal.id = 'cookie-details-modal';
      modal.className = 'cookie-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'cookie-modal-title');

      modal.innerHTML = `
        <div class="cookie-modal__overlay"></div>
        <div class="cookie-modal__content">
          <div class="cookie-modal__header">
            <h2 id="cookie-modal-title" class="cookie-modal__title">Cookie Policy</h2>
            <button type="button" class="cookie-modal__close" id="cookie-modal-close" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="cookie-modal__body">
            <div class="cookie-category">
              <h3 class="cookie-category__title">Essential Cookies</h3>
              <p class="cookie-category__description">
                These cookies are necessary for the website to function and cannot be switched off.
                They are usually only set in response to actions made by you, such as setting your privacy preferences.
              </p>
              <div class="cookie-category__toggle">
                <span class="cookie-category__status cookie-category__status--required">Always Active</span>
              </div>
            </div>
            <div class="cookie-category">
              <h3 class="cookie-category__title">Analytics Cookies</h3>
              <p class="cookie-category__description">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                They help us know which pages are the most and least popular and see how visitors move around the site.
              </p>
            </div>
            <div class="cookie-category">
              <h3 class="cookie-category__title">Marketing Cookies</h3>
              <p class="cookie-category__description">
                These cookies may be set through our site by our advertising partners.
                They may be used to build a profile of your interests and show you relevant ads on other sites.
              </p>
            </div>
          </div>
          <div class="cookie-modal__footer">
            <button type="button" class="cookie-consent__btn cookie-consent__btn--secondary" id="modal-decline">
              Decline Optional
            </button>
            <button type="button" class="cookie-consent__btn cookie-consent__btn--primary" id="modal-accept">
              Accept All
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Trigger animation
      setTimeout(() => {
        modal.classList.add('cookie-modal--visible');
      }, 100);

      // Attach event listeners
      const closeBtn = document.getElementById('cookie-modal-close');
      const overlay = modal.querySelector('.cookie-modal__overlay');
      const acceptBtn = document.getElementById('modal-accept');
      const declineBtn = document.getElementById('modal-decline');

      const closeModal = () => {
        modal.classList.remove('cookie-modal--visible');
        setTimeout(() => {
          modal.remove();
        }, 300);
      };

      if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
      }

      if (overlay) {
        overlay.addEventListener('click', closeModal);
      }

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          closeModal();
          this.acceptCookies();
        });
      }

      if (declineBtn) {
        declineBtn.addEventListener('click', () => {
          closeModal();
          this.declineCookies();
        });
      }

      // Escape key to close
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);

      // Focus trap
      const focusableElements = modal.querySelectorAll('button, a');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    },

    /**
     * Check current consent status
     */
    getConsentStatus: function() {
      return localStorage.getItem(CONSENT_KEY);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
  } else {
    CookieConsent.init();
  }

  // Expose API for manual control
  window.CookieConsent = CookieConsent;

})();
