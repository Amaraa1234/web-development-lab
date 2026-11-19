/* ==========================================================
   Даалгавар 4. Validation функцийг form-той холбох
   Хамаарал: validators.js (өмнө нь ачаалагдсан байх ёстой)
   ========================================================== */
'use strict';

/* ---------- Нийтлэг туслах функцүүд ---------- */

function setFieldState(input, result) {
  const errorEl = document.getElementById(input.id + '-error');
  input.classList.toggle('is-invalid', !result.valid);
  input.classList.toggle('is-valid', result.valid);
  input.setAttribute('aria-invalid', String(!result.valid));
  if (errorEl) errorEl.textContent = result.message;
}

function clearFieldState(input) {
  const errorEl = document.getElementById(input.id + '-error');
  input.classList.remove('is-invalid', 'is-valid');
  input.removeAttribute('aria-invalid');
  if (errorEl) errorEl.textContent = '';
}

/**
 * Form-д validation холбох ерөнхий функц.
 * @param {HTMLFormElement} form
 * @param {Object} rules  { inputId: validatorFunction }
 * @param {Function} onValid  бүх талбар зөв үед дуудагдана
 */
function attachValidation(form, rules, onValid) {
  const ids = Object.keys(rules);

  // Бодит цагт шалгах: blur дээр эхэлж, дараа нь input бүрт
  ids.forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    let touched = false;
    input.addEventListener('blur', () => {
      touched = true;
      setFieldState(input, rules[id](input.value));
    });
    input.addEventListener('input', () => {
      if (touched) setFieldState(input, rules[id](input.value));
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;
    const values = {};

    ids.forEach((id) => {
      const input = document.getElementById(id);
      const result = rules[id](input.value);
      setFieldState(input, result);
      values[id] = result.value;
      if (!result.valid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    onValid(values);
  });

  form.addEventListener('reset', () => {
    ids.forEach((id) => {
      const input = document.getElementById(id);
      if (input) clearFieldState(input);
    });
  });
}

function showStatus(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'form-status ' + (type || 'success');
  el.hidden = false;
}

/* ---------- 1. Санал хүсэлтийн form ---------- */
(function initFeedbackForm() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const status = document.getElementById('feedbackStatus');
  const message = document.getElementById('fb-message');
  const counter = document.getElementById('fb-counter');

  attachValidation(
    form,
    {
      'fb-name': validateName,
      'fb-email': validateEmail,
      'fb-password': validatePassword,
      'fb-message': validateMessage
    },
    (values) => {
      // Бодит төсөлд энд fetch() ашиглан серверт илгээнэ.
      console.log('Илгээсэн санал хүсэлт:', {
        name: values['fb-name'],
        email: values['fb-email'],
        message: values['fb-message']   // нууц үгийг лог-д бичихгүй
      });
      showStatus(status, 'Баярлалаа, ' + values['fb-name'] + '! Санал хүсэлт амжилттай илгээгдлээ.', 'success');
      form.reset();
      updateCounter();
    }
  );

  // Тэмдэгтийн тоолуур
  function updateCounter() {
    const len = message.value.trim().length;
    counter.textContent = len + ' / 500';
    counter.classList.toggle('over', len > 500);
  }
  message.addEventListener('input', updateCounter);
  updateCounter();

  // Нууц үг харуулах/нуух
  const toggle = document.getElementById('togglePassword');
  const pass = document.getElementById('fb-password');
  if (toggle && pass) {
    toggle.addEventListener('click', () => {
      const show = pass.type === 'password';
      pass.type = show ? 'text' : 'password';
      toggle.textContent = show ? '🙈' : '👁️';
      toggle.setAttribute('aria-label', show ? 'Нууц үг нуух' : 'Нууц үг харуулах');
      toggle.setAttribute('aria-pressed', String(show));
    });
  }

  // Form-ыг өөрчилмөгц амжилтын мэдэгдлийг нууна
  form.addEventListener('input', () => { if (status) status.hidden = true; });
})();

/* ---------- 2. Бүртгэлийн form + динамик QR ---------- */
(function initRegistrationForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  // Оюутны код: 1 латин үсэг + 9 тоо (жишээ: B220910001)
  function validateStudentId(value) {
    const v = String(value || '').trim().toUpperCase();
    if (v === '') return { valid: false, value: v, message: 'Оюутны кодоо оруулна уу.' };
    if (!/^[A-Z]\d{9}$/.test(v)) {
      return { valid: false, value: v, message: 'Формат: 1 үсэг + 9 тоо (жишээ: B220910001).' };
    }
    return { valid: true, value: v, message: '' };
  }

  const qrImg = document.getElementById('qrImage');
  const qrStatus = document.getElementById('qrStatus');
  const qrInfo = document.getElementById('qrInfo');
  const eventSelect = document.getElementById('event');

  attachValidation(
    form,
    { fullname: validateName, studentid: validateStudentId },
    (values) => {
      const payload = [values.fullname, values.studentid, eventSelect.value].join(' | ');
      qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=' + encodeURIComponent(payload);
      qrImg.alt = 'QR тасалбар: ' + payload;
      qrStatus.textContent = 'Идэвхтэй';
      qrInfo.textContent = values.fullname + ' — ' + eventSelect.value;
    }
  );
})();
