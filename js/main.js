/**
 * TOOTH FAIRY DENTAL CLINIC
 * Perambur, Chennai — Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initBeforeAfterSlider();
  initScrollAnimations();
  initEnquiryForm();
  initInputFocusMobileHandling();
});

/* ==========================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   ========================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================
   2. MOBILE DRAWER NAVIGATION
   ========================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* ==========================================
   3. INTERACTIVE BEFORE & AFTER SLIDER
   ========================================== */
function initBeforeAfterSlider() {
  const containers = document.querySelectorAll('.comparison-box');
  if (!containers.length) return;

  containers.forEach((container) => {
    const overlay = container.querySelector('.comparison-overlay');
    const divider = container.querySelector('.comparison-slider-bar');
    const rangeInput = container.querySelector('.comparison-range-input');

    if (!overlay || !divider) return;

    let currentPercentage = 50;

    const setPosition = (percentage) => {
      currentPercentage = Math.max(0, Math.min(100, percentage));
      overlay.style.clipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
      overlay.style.webkitClipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
      divider.style.left = `${currentPercentage}%`;
      container.setAttribute('aria-valuenow', Math.round(currentPercentage));
      container.setAttribute('aria-valuetext', `${Math.round(currentPercentage)}% before image revealed`);
      if (rangeInput && Math.abs(parseFloat(rangeInput.value) - currentPercentage) > 0.5) {
        rangeInput.value = currentPercentage;
      }
    };

    const getPercentageFromClientX = (clientX) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width) return 50;
      const offsetX = clientX - rect.left;
      return (offsetX / rect.width) * 100;
    };

    // Range input sync (if accessible range input is used)
    if (rangeInput) {
      rangeInput.addEventListener('input', (e) => {
        setPosition(parseFloat(e.target.value));
      });
    }

    // Direct pointer drag handling with setPointerCapture for smooth dragging
    let isDragging = false;

    const onPointerDown = (e) => {
      isDragging = true;
      if (container.setPointerCapture && e.pointerId !== undefined) {
        try {
          container.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      setPosition(getPercentageFromClientX(clientX));
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      setPosition(getPercentageFromClientX(clientX));
    };

    const onPointerUp = (e) => {
      isDragging = false;
      if (container.releasePointerCapture && e.pointerId !== undefined) {
        try {
          container.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    if (window.PointerEvent) {
      container.addEventListener('pointerdown', onPointerDown);
      container.addEventListener('pointermove', onPointerMove);
      container.addEventListener('pointerup', onPointerUp);
      container.addEventListener('pointercancel', onPointerUp);
    } else {
      container.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);

      container.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          isDragging = true;
          setPosition(getPercentageFromClientX(e.touches[0].clientX));
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length === 0) return;
        setPosition(getPercentageFromClientX(e.touches[0].clientX));
      }, { passive: true });

      window.addEventListener('touchend', onPointerUp);
    }

    // Keyboard accessibility directly on the container
    container.setAttribute('tabindex', '0');
    container.setAttribute('role', 'slider');
    container.setAttribute('aria-label', 'Compare before and after orthodontic tooth alignment');
    container.setAttribute('aria-valuemin', '0');
    container.setAttribute('aria-valuemax', '100');
    container.setAttribute('aria-valuenow', '50');

    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setPosition(currentPercentage - 5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setPosition(currentPercentage + 5);
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPosition(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPosition(100);
      }
    });

    // Initial default position 50%
    setPosition(50);
  });
}

/* ==========================================
   4. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================== */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================
   5. STATIC DEMONSTRATION ENQUIRY FORM
   ========================================== */
function initEnquiryForm() {
  const form = document.getElementById('appointmentEnquiryForm');
  if (!form) return;

  const successBanner = document.getElementById('formSuccessBanner');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="patient_name"]');
    const phoneInput = form.querySelector('[name="patient_phone"]');
    const treatmentInput = form.querySelector('[name="treatment_type"]');
    const consentInput = form.querySelector('[name="consent"]');

    let isValid = true;

    // Reset previous errors
    form.querySelectorAll('.input-error-msg').forEach((msg) => msg.remove());
    form.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));

    const showError = (input, message) => {
      isValid = false;
      input.classList.add('has-error');
      const err = document.createElement('span');
      err.className = 'input-error-msg';
      err.style.color = '#C91F2C';
      err.style.fontSize = '0.78rem';
      err.style.display = 'block';
      err.style.marginTop = '4px';
      err.textContent = message;
      input.parentNode.appendChild(err);
    };

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please provide your full name.');
    }

    const cleanPhone = phoneInput.value.replace(/[\s\-+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      showError(phoneInput, 'Please provide a valid 10-digit mobile number.');
    }

    if (!treatmentInput.value) {
      showError(treatmentInput, 'Please select a treatment or enquiry type.');
    }

    if (!consentInput.checked) {
      showError(consentInput, 'Please check the box to confirm your enquiry.');
    }

    if (isValid && successBanner) {
      // Clear form inputs
      const submittedName = nameInput.value.trim();
      const submittedTreatment = treatmentInput.options[treatmentInput.selectedIndex].text;
      form.reset();

      // Show honest, transparent static demonstration feedback
      successBanner.innerHTML = `
        <h4 style="margin-bottom: 0.5rem; font-family: var(--font-sans); font-size: 1.05rem; font-weight: 700;">
          Thank You, ${escapeHtml(submittedName)}!
        </h4>
        <p style="margin-bottom: 0.75rem;">
          Your enquiry regarding <strong>${escapeHtml(submittedTreatment)}</strong> has been prepared.
        </p>
        <p style="font-size: 0.85rem; color: #2E7D32; margin-bottom: 1rem;">
          <em>Note: This is a static demonstration. To directly schedule or confirm your consultation with Dr. Tamanna, please telephone the clinic.</em>
        </p>
        <a href="tel:+919600021777" class="btn btn-primary" style="display: inline-flex;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Call Dr. Tamanna (+91 96000 21777)
        </a>
      `;
      successBanner.classList.add('is-visible');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================
   6. HIDE MOBILE ACTION BAR WHEN KEYBOARD ACTIVE
   ========================================== */
function initInputFocusMobileHandling() {
  const bar = document.querySelector('.mobile-action-bar');
  if (!bar) return;

  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      bar.style.display = 'none';
    });
    input.addEventListener('blur', () => {
      bar.style.display = '';
    });
  });
}
