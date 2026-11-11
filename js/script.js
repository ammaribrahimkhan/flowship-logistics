/* =========================================================
   FLOWSHIP LOGISTICS — SITE SCRIPT
   Mobile nav, FAQ accordion, animated counters,
   scroll reveal, document upload, and demo form handling.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counted = false;
    var runCounters = function () {
      if (counted) return;
      counted = true;
      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
      });
    };
    var statsBar = document.querySelector('.stats-bar');
    if (statsBar && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) runCounters();
        });
      }, { threshold: 0.4 }).observe(statsBar);
    } else {
      runCounters();
    }
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) header.style.boxShadow = '0 8px 24px -16px rgba(10,19,48,.25)';
      else header.style.boxShadow = 'none';
    });
  }

  /* ---------- Required Documents: drag & drop upload ----------
     Works on any ".upload-box" label wired to a ".upload-input" file
     input (see onboarding.html). Click-to-browse needs no JS at all,
     since the box IS a <label for="..."> pointing at the real input;
     this block only adds the drag-and-drop behavior and the pretty
     selected-file list (with a working remove button) on top of it. */
  function formatFileSize(bytes) {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    if (bytes >= 1024) return Math.round(bytes / 1024) + ' KB';
    return bytes + ' B';
  }

  document.querySelectorAll('.upload-input').forEach(function (input) {
    var box = input.previousElementSibling;
    if (!box || !box.classList.contains('upload-box')) return;
    var list = input.parentElement.querySelector('.upload-file-list');

    function renderFiles() {
      if (!list) return;
      list.innerHTML = '';
      Array.prototype.forEach.call(input.files, function (file, index) {
        var item = document.createElement('div');
        item.className = 'upload-file-item';
        item.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
          '<span class="file-name"></span>' +
          '<span class="file-size"></span>' +
          '<button type="button" class="file-remove" aria-label="Remove file">&times;</button>';
        item.querySelector('.file-name').textContent = file.name;
        item.querySelector('.file-size').textContent = formatFileSize(file.size);
        item.querySelector('.file-remove').addEventListener('click', function () {
          removeFile(index);
        });
        list.appendChild(item);
      });
    }

    function removeFile(index) {
      var dt = new DataTransfer();
      Array.prototype.forEach.call(input.files, function (file, i) {
        if (i !== index) dt.items.add(file);
      });
      input.files = dt.files;
      renderFiles();
    }

    input.addEventListener('change', renderFiles);

    ['dragenter', 'dragover'].forEach(function (evt) {
      box.addEventListener(evt, function (e) {
        e.preventDefault();
        box.classList.add('dragover');
      });
    });
    box.addEventListener('dragleave', function (e) {
      if (!box.contains(e.relatedTarget)) box.classList.remove('dragover');
    });
    box.addEventListener('drop', function (e) {
      e.preventDefault();
      box.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        renderFiles();
      }
    });
  });

  /* ---------- Form handling: email (via FormSubmit) + WhatsApp ----------
     Two ways a form can reach you, both work with zero backend code:

     1) FormSubmit (https://formsubmit.co) — a free service that emails
        a form submission straight to an inbox, no account/API keys
        needed. It also auto-replies to whoever filled the form with a
        confirmation message, using whatever email they typed in.
        Any file picked in a ".upload-input" rides along automatically,
        since it's a real, named file input inside the <form> and
        FormData(form) picks it up along with the text fields; FormSubmit
        attaches it to the email it sends you.

        ONE-TIME STEP: the very first time a form on this site is
        submitted for real, FormSubmit sends a confirmation email to
        ammarwaqar439@gmail.com asking you to click "Activate Form".
        Do that once and every submission after that (to you AND the
        auto-reply to the visitor) works automatically. Until it's
        activated, submissions won't silently fail, they just won't be
        delivered yet, so always test once first.

     2) WhatsApp: the "Send on WhatsApp" button opens a WhatsApp chat
        pre-filled with the form details, addressed to your number.
        The person still has to tap Send inside WhatsApp themselves;
        no website can auto-send a WhatsApp message, or attach a real
        file, on someone's behalf without a paid, business-verified
        WhatsApp Cloud API with a server behind it. That's the standard,
        expected way WhatsApp's own "click to chat" links behave
        everywhere, so the WhatsApp text lists any chosen file names
        instead of the file itself, the actual document travels through
        the email/FormSubmit path above. */
  var CONTACT_WHATSAPP = '923141308372'; // international format, no +, no spaces

  function buildMessageFromForm(form, heading) {
    var lines = [heading, ''];
    form.querySelectorAll('[name]').forEach(function (field) {
      if (field.type === 'file') {
        if (field.files && field.files.length) {
          var names = Array.prototype.map.call(field.files, function (f) { return f.name; }).join(', ');
          lines.push('Documents (please attach in WhatsApp too): ' + names);
        }
        return;
      }
      var label = field.closest('.field') ? field.closest('.field').querySelector('label') : null;
      var name = label ? label.textContent.trim() : field.name;
      var value = field.value.trim();
      if (value) lines.push(name + ': ' + value);
    });
    return lines.join('\n');
  }

  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    var heading = form.getAttribute('data-demo-form') || 'New website submission';
    var targetEmail = form.getAttribute('data-formsubmit-email');
    var autoresponse = form.getAttribute('data-autoresponse') || 'Thanks, we received your message and will be in touch shortly.';

    var successBox = form.parentElement.querySelector('.form-success');
    var errorBox = form.parentElement.querySelector('.form-error');

    function showBox(box) {
      [successBox, errorBox].forEach(function (b) { if (b) b.style.display = 'none'; });
      if (box) {
        box.style.display = 'block';
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!targetEmail) return; // form isn't wired up, do nothing rather than error

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.originalText = submitBtn.textContent; submitBtn.textContent = 'Sending...'; }

      var data = new FormData(form);
      data.append('_subject', heading + ' - FlowShip Logistics website');
      data.append('_autoresponse', autoresponse);
      data.append('_template', 'table');
      data.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/' + encodeURIComponent(targetEmail), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          showBox(successBox);
          form.reset();
          var list = form.querySelector('.upload-file-list');
          if (list) list.innerHTML = '';
        })
        .catch(function (err) {
          console.error('FormSubmit send failed:', err);
          showBox(errorBox);
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Submit'; }
        });
    });

    var waBtn = form.parentElement.querySelector('[data-whatsapp-send]');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        var message = buildMessageFromForm(form, heading);
        var waUrl = 'https://wa.me/' + CONTACT_WHATSAPP + '?text=' + encodeURIComponent(message);
        window.open(waUrl, '_blank');
      });
    }
  });

});