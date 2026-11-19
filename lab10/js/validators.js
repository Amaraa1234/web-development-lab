/* ==========================================================
   Даалгавар 3. Validation функцүүд
   Бүгд нэг хэлбэртэй объект буцаана:
     { valid: boolean, value: string (цэвэрлэсэн), message: string }
   ========================================================== */
'use strict';

const LETTER_RE = /[A-Za-zА-Яа-яЁёӨөҮү]/;  // латин + кирилл
const DIGIT_RE = /\d/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // нэр@домэйн.өргөтгөл

function _result(valid, value, message) {
  return { valid: valid, value: value, message: valid ? '' : message };
}

/* Нэр: trim, хоосон биш, 2–50 тэмдэгт, тоо агуулахгүй */
function validateName(value) {
  const v = String(value == null ? '' : value).trim();
  if (v === '') return _result(false, v, 'Нэрээ оруулна уу.');
  if (v.length < 2) return _result(false, v, 'Нэр дор хаяж 2 тэмдэгттэй байх ёстой.');
  if (v.length > 50) return _result(false, v, 'Нэр 50 тэмдэгтээс ихгүй байх ёстой.');
  if (DIGIT_RE.test(v)) return _result(false, v, 'Нэр тоо агуулж болохгүй.');
  return _result(true, v, '');
}

/* И-мэйл: хоосон биш, зай агуулахгүй, нэр@домэйн.өргөтгөл */
function validateEmail(value) {
  const v = String(value == null ? '' : value);
  if (v.trim() === '') return _result(false, v, 'И-мэйл хаягаа оруулна уу.');
  if (/\s/.test(v)) return _result(false, v, 'И-мэйл хаяг зай агуулж болохгүй.');
  if (!EMAIL_RE.test(v)) return _result(false, v, 'Зөв хэлбэрээр оруулна уу (жишээ: name@mail.com).');
  return _result(true, v, '');
}

/* Нууц үг: >= 8 тэмдэгт, зайгүй, үсэг (кирилл/латин) + тоо */
function validatePassword(value) {
  const v = String(value == null ? '' : value);   // нууц үгийг trim хийхгүй
  if (v === '') return _result(false, v, 'Нууц үгээ оруулна уу.');
  if (/\s/.test(v)) return _result(false, v, 'Нууц үг хоосон зай агуулж болохгүй.');
  if (v.length < 8) return _result(false, v, 'Нууц үг дор хаяж 8 тэмдэгттэй байх ёстой.');
  if (!LETTER_RE.test(v)) return _result(false, v, 'Нууц үг дор хаяж нэг үсэг агуулах ёстой.');
  if (!DIGIT_RE.test(v)) return _result(false, v, 'Нууц үг дор хаяж нэг тоо агуулах ёстой.');
  return _result(true, v, '');
}

/* Санал хүсэлт: trim, 10–500 тэмдэгт */
function validateMessage(value) {
  const v = String(value == null ? '' : value).trim();
  if (v === '') return _result(false, v, 'Санал хүсэлтээ бичнэ үү.');
  if (v.length < 10) return _result(false, v, 'Дор хаяж 10 тэмдэгт бичнэ үү (одоо ' + v.length + ').');
  if (v.length > 500) return _result(false, v, '500 тэмдэгтээс ихгүй байх ёстой (одоо ' + v.length + ').');
  return _result(true, v, '');
}

/* ---------- Өөрийгөө шалгах тест ---------- */
(function selfTest() {
  const t = (name, fn, input, expected) => ({
    функц: name,
    оролт: JSON.stringify(input),
    хүлээгдсэн: expected,
    үр_дүн: fn(input).valid,
    төлөв: fn(input).valid === expected ? '✅ OK' : '❌ FAIL'
  });
  console.log('%cValidator-ийн тест', 'font-weight:bold;color:#059669');
  console.table([
    t('validateName', validateName, '  Болд  ', true),
    t('validateName', validateName, 'A', false),
    t('validateName', validateName, 'Болд123', false),
    t('validateEmail', validateEmail, 'bold@must.edu.mn', true),
    t('validateEmail', validateEmail, 'bold@must', false),
    t('validateEmail', validateEmail, 'bo ld@mail.com', false),
    t('validatePassword', validatePassword, 'Abcd1234', true),
    t('validatePassword', validatePassword, 'Нууц1234', true),
    t('validatePassword', validatePassword, 'abcdefgh', false),
    t('validatePassword', validatePassword, 'abc 12345', false),
    t('validateMessage', validateMessage, 'Маш сайн портал байна', true),
    t('validateMessage', validateMessage, 'Сайн', false)
  ]);
})();

/* ==========================================================
   ЛАБ 10: Зураг нэмэх form-ын validator-ууд (_result-ийг дахин ашиглана)
   ========================================================== */
function _text(value, label, min, max) {
  const v = String(value == null ? '' : value).trim();
  if (v === '') return _result(false, v, label + ' оруулна уу.');
  if (v.length < min) return _result(false, v, label + ' дор хаяж ' + min + ' тэмдэгттэй байх ёстой.');
  if (v.length > max) return _result(false, v, label + ' ' + max + ' тэмдэгтээс ихгүй байх ёстой.');
  return _result(true, v, '');
}
function validatePhotoTitle(value) { return _text(value, 'Зургийн нэр', 2, 60); }
function validatePlace(value) { return _text(value, 'Газар', 2, 60); }
function validateDate(value) {
  const v = String(value == null ? '' : value).trim();
  if (v === '') return _result(false, v, 'Огноо сонгоно уу.');
  const d = new Date(v + 'T00:00:00');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || isNaN(d.getTime())) return _result(false, v, 'Огноо буруу байна.');
  return _result(true, v, '');
}
