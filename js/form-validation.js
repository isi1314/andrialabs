/**
 * ANDRIA LABS FORM VALIDATION
 *
 * Comprehensive form validation with real-time feedback
 * WCAG 2.1 compliant error messaging
 *
 * Features:
 * - Real-time validation on blur
 * - Inline error messages
 * - ARIA live regions for screen readers
 * - Email format validation
 * - Required field validation
 * - Character limits
 */

(function() {
  'use strict';

  // Validation rules
  const validationRules = {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    required: {
      message: 'This field is required'
    },
    minLength: {
      default: 2,
      message: 'Must be at least {min} characters'
    }
  };

  // Initialize validation on page load
  document.addEventListener('DOMContentLoaded', function() {
    initFormValidation();
  });

  function initFormValidation() {
    // Find all forms that need validation
    const forms = document.querySelectorAll('.contact-form, .newsletter-form');

    forms.forEach(form => {
      // Add novalidate to prevent browser default validation
      form.setAttribute('novalidate', 'true');

      // Create ARIA live region for announcements
      createLiveRegion(form);

      // Add real-time validation to inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        addInputValidation(input);
      });

      // Add form submit validation
      form.addEventListener('submit', handleFormSubmit);
    });
  }

  function createLiveRegion(form) {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'form-status-' + Math.random().toString(36).substr(2, 9);
    form.appendChild(liveRegion);
  }

  function addInputValidation(input) {
    // Skip if already initialized
    if (input.dataset.validationInitialized) return;
    input.dataset.validationInitialized = 'true';

    // Validate on blur (when user leaves the field)
    input.addEventListener('blur', function() {
      validateField(input);
    });

    // Clear errors on input (when user starts typing)
    input.addEventListener('input', function() {
      if (input.classList.contains('error')) {
        clearFieldError(input);
      }
    });
  }

  function validateField(input) {
    const value = input.value.trim();
    const isRequired = input.hasAttribute('required');
    const type = input.type;

    // Check required
    if (isRequired && !value) {
      showFieldError(input, validationRules.required.message);
      return false;
    }

    // If not required and empty, it's valid
    if (!isRequired && !value) {
      clearFieldError(input);
      return true;
    }

    // Check email format
    if (type === 'email') {
      if (!validationRules.email.pattern.test(value)) {
        showFieldError(input, validationRules.email.message);
        return false;
      }
    }

    // Check min length for text inputs
    if ((type === 'text' || input.tagName === 'TEXTAREA') && value.length > 0) {
      const minLength = input.dataset.minLength || validationRules.minLength.default;
      if (value.length < minLength) {
        const message = validationRules.minLength.message.replace('{min}', minLength);
        showFieldError(input, message);
        return false;
      }
    }

    // All validations passed
    clearFieldError(input);
    return true;
  }

  function showFieldError(input, message) {
    // Add error class to input
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');

    // Find or create error message element
    let errorElement = input.parentElement.querySelector('.error-message');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      errorElement.style.cssText = 'color: var(--color-error, #C41E1E); font-size: 14px; margin-top: 4px;';

      // Insert after input
      input.parentElement.appendChild(errorElement);
    }

    errorElement.textContent = message;

    // Announce to screen readers
    const liveRegion = input.closest('form').querySelector('[role="status"]');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');

    // Remove error message
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea, select');
    const submitButton = form.querySelector('[type="submit"]');
    let isValid = true;
    let firstInvalidInput = null;

    // Validate all fields
    inputs.forEach(input => {
      if (!validateField(input) && isValid) {
        isValid = false;
        firstInvalidInput = input;
      }
    });

    if (!isValid) {
      // Focus first invalid field
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }

      // Announce to screen readers
      const liveRegion = form.querySelector('[role="status"]');
      if (liveRegion) {
        liveRegion.textContent = 'Form has errors. Please correct them and try again.';
      }

      return;
    }

    // Form is valid - show loading state
    showFormLoading(form, submitButton);

    // Announce to screen readers
    const liveRegion = form.querySelector('[role="status"]');
    if (liveRegion) {
      liveRegion.textContent = 'Submitting form, please wait...';
    }

    // Determine endpoint based on form type
    const isNewsletterForm = form.classList.contains('newsletter-form');
    const endpoint = isNewsletterForm ? '/api/newsletter' : '/api/contact';

    // Collect form data
    const formData = {};
    inputs.forEach(input => {
      if (input.name && input.value) {
        formData[input.name] = input.value;
      }
    });

    // Submit via fetch API
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showFormSuccess(form);
      } else {
        showFormError(form, data.error || 'Something went wrong');
      }
    })
    .catch(error => {
      console.error('Form submission error:', error);
      showFormError(form, 'Unable to submit form. Please try again.');
    });
  }

  function showFormLoading(form, submitButton) {
    // Disable all inputs
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = true;
      input.classList.add('loading');
    });

    // Update submit button
    if (submitButton) {
      const originalText = submitButton.value || submitButton.textContent;
      submitButton.dataset.originalText = originalText;

      // Add loading spinner
      if (submitButton.tagName === 'INPUT') {
        submitButton.value = 'Submitting...';
      } else {
        submitButton.innerHTML = '<span class="loading-spinner"></span> Submitting...';
      }

      submitButton.classList.add('loading');
    }

    // Add loading class to form
    form.classList.add('form-loading');
  }

  function showFormSuccess(form) {
    // Hide form and error message
    form.style.display = 'none';
    const errorBlock = form.closest('.w-form').querySelector('.w-form-fail');
    if (errorBlock) {
      errorBlock.style.display = 'none';
    }

    // Show success message
    const successBlock = form.closest('.w-form').querySelector('.w-form-done');
    if (successBlock) {
      successBlock.style.display = 'block';
    }

    // Announce to screen readers
    const liveRegion = form.querySelector('[role="status"]');
    if (liveRegion) {
      liveRegion.textContent = 'Form submitted successfully! Thank you for your submission.';
    }

    // Reset form after showing success
    setTimeout(() => {
      form.reset();
      const inputs = form.querySelectorAll('input, textarea, select, button');
      inputs.forEach(input => {
        input.disabled = false;
        input.classList.remove('loading');
      });
      form.classList.remove('form-loading');
    }, 3000);
  }

  function showFormError(form, errorMessage) {
    // Re-enable form
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = false;
      input.classList.remove('loading');
    });
    form.classList.remove('form-loading');

    // Restore submit button
    const submitButton = form.querySelector('[type="submit"]');
    if (submitButton && submitButton.dataset.originalText) {
      if (submitButton.tagName === 'INPUT') {
        submitButton.value = submitButton.dataset.originalText;
      } else {
        submitButton.textContent = submitButton.dataset.originalText;
      }
      submitButton.classList.remove('loading');
    }

    // Hide success message
    const successBlock = form.closest('.w-form').querySelector('.w-form-done');
    if (successBlock) {
      successBlock.style.display = 'none';
    }

    // Show error message
    const errorBlock = form.closest('.w-form').querySelector('.w-form-fail');
    if (errorBlock) {
      errorBlock.style.display = 'block';
      const errorText = errorBlock.querySelector('div');
      if (errorText) {
        errorText.textContent = errorMessage;
      }
    }

    // Announce to screen readers
    const liveRegion = form.querySelector('[role="status"]');
    if (liveRegion) {
      liveRegion.textContent = 'Error: ' + errorMessage;
    }
  }

  // Add CSS for error states (injected dynamically)
  const style = document.createElement('style');
  style.textContent = `
    /* Screen reader only class */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* Error state for inputs */
    input.error,
    textarea.error,
    select.error {
      border-color: var(--color-error, #C41E1E) !important;
      box-shadow: 0 0 0 1px var(--color-error, #C41E1E) !important;
    }

    /* Error message styling */
    .error-message {
      color: var(--color-error, #C41E1E);
      font-size: 14px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .error-message::before {
      content: '⚠';
      font-size: 16px;
    }

    /* Success state (optional) */
    input.success,
    textarea.success {
      border-color: var(--color-success, #4caf50) !important;
    }

    /* Focus state enhancement for errors */
    input.error:focus,
    textarea.error:focus,
    select.error:focus {
      outline: 2px solid var(--color-error, #C41E1E) !important;
      outline-offset: 2px;
    }

    /* Loading states */
    input.loading,
    textarea.loading,
    select.loading,
    button.loading {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .form-loading {
      position: relative;
    }

    .form-loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      pointer-events: none;
    }

    /* Loading spinner */
    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Submit button loading state */
    [type="submit"].loading,
    .submit-button.loading {
      opacity: 0.7;
      cursor: wait;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `;
  document.head.appendChild(style);

})();
