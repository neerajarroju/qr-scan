/* ==========================================================================
   Acharya's International Alternative Therapy Centre — Script (script.js)
   Vanilla JavaScript for clinic location filter, interactive map zoom
   controls, live session status indicator, and clipboard copy helpers.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Clinic Locations Filter Tabs (All / Morning Vanasthalipuram / Evening Madhapur)
  var filterButtons = document.querySelectorAll('.filter-tab');
  var locationCards = document.querySelectorAll('.location-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetFilter = btn.getAttribute('data-filter') || 'all';

      filterButtons.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      locationCards.forEach(function (card) {
        var branch = card.getAttribute('data-branch');
        if (targetFilter === 'all' || branch === targetFilter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 2. Interactive Map Zoom Controls (+ / -) for Each Clinic Map Preview
  var zoomButtons = document.querySelectorAll('.gmap-zoom-btn');
  var zoomState = { vanasthalipuram: 1, madhapur: 1 };

  zoomButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var targetMap = btn.getAttribute('data-map');
      var dir = btn.getAttribute('data-zoom');
      if (!targetMap) return;

      var current = zoomState[targetMap] || 1;
      if (dir === 'in') {
        current = Math.min(1.36, +(current + 0.12).toFixed(2));
      } else {
        current = Math.max(1, +(current - 0.12).toFixed(2));
      }
      zoomState[targetMap] = current;

      var svgEl = document.getElementById('map-svg-' + targetMap);
      if (svgEl) {
        svgEl.style.transform = 'scale(' + current + ')';
      }
    });
  });

  // 3. Toast Notification Helper (Sandbox-safe, no alert())
  var toastEl = document.getElementById('toast-notification');
  var toastTextEl = document.getElementById('toast-text');
  var toastTimer = null;

  function showToast(message) {
    if (!toastEl || !toastTextEl) return;
    toastTextEl.textContent = message;
    toastEl.classList.add('is-visible');
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 3200);
  }

  // 4. Copy to Clipboard Helper
  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg);
      }).catch(function () {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    try {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(successMsg);
    } catch (err) {
      showToast('Phone: 9949875037');
    }
  }

  var copyAddressButtons = document.querySelectorAll('.copy-address-btn');
  copyAddressButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var address = button.getAttribute('data-address') || '';
      var clinicName = button.getAttribute('data-clinic') || 'Clinic';
      if (address) {
        copyTextToClipboard(address, clinicName + ' address copied to clipboard');
      }
    });
  });

  var copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', function () {
      copyTextToClipboard('9949875037', 'Appointment contact 9949875037 copied');
    });
  }

  // 5. Live Clinic Consultation Session Indicator (Hyderabad IST Time)
  var statusTextEl = document.getElementById('clinic-status-text');
  function updateClinicSessionStatus() {
    if (!statusTextEl) return;
    try {
      var now = new Date();
      var utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
      var istDate = new Date(utcMs + (5.5 * 3600000));
      var hours = istDate.getHours();
      var minutes = istDate.getMinutes();
      var timeDecimal = hours + (minutes / 60);

      if (timeDecimal >= 7 && timeDecimal < 12) {
        statusTextEl.textContent = 'Morning Session Hours: Vanasthalipuram (7 AM – 12 PM)';
      } else if (timeDecimal >= 16 && timeDecimal < 20) {
        statusTextEl.textContent = 'Evening Session Hours: Madhapur (4 PM – 8 PM)';
      } else if (timeDecimal < 7) {
        statusTextEl.textContent = 'Next Session: Vanasthalipuram Morning (7 AM – 12 PM)';
      } else if (timeDecimal >= 12 && timeDecimal < 16) {
        statusTextEl.textContent = 'Next Session: Madhapur Evening (4 PM – 8 PM)';
      } else {
        statusTextEl.textContent = 'Morning (7 AM–12 PM) & Evening (4 PM–8 PM) • Book 1 Day Prior';
      }
    } catch (e) {
      statusTextEl.textContent = 'Vanasthalipuram (7 AM–12 PM) • Madhapur (4 PM–8 PM)';
    }
  }

  updateClinicSessionStatus();
});
