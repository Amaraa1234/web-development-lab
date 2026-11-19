/* ==========================================================
   Даалгавар 2. 8 функц. Бэлэн функц (Math.*, reverse, split,
   reduce, includes, toLowerCase г.м.) ХЭРЭГЛЭХГҮЙ — зөвхөн
   давталт, нөхцөл, арифметик ашигласан.
   ========================================================== */
'use strict';

/* ---------- Туслах (private) функцүүд ---------- */

// Бүхэл тоо эсэх (Number.isInteger хэрэглэхгүй)
function _isInt(n) {
  return typeof n === 'number' && n === n && n - (n % 1) === n &&
         n !== Infinity && n !== -Infinity;
}

// Тэмдэгт үсэг эсвэл тоо эсэх (латин + кирилл + Ө, Ү, Ё)
function _isLetterOrDigit(ch) {
  const c = ch.charCodeAt(0);
  return (c >= 48 && c <= 57) ||      // 0-9
         (c >= 65 && c <= 90) ||      // A-Z
         (c >= 97 && c <= 122) ||     // a-z
         (c >= 1040 && c <= 1103) ||  // А-я
         c === 1025 || c === 1105 ||  // Ё ё
         c === 1256 || c === 1257 ||  // Ө ө
         c === 1198 || c === 1199;    // Ү ү
}

// Нэг тэмдэгтийг жижиг үсэг болгох (toLowerCase-гүйгээр)
function _lower(ch) {
  const c = ch.charCodeAt(0);
  if (c >= 65 && c <= 90) return String.fromCharCode(c + 32);      // A-Z
  if (c >= 1040 && c <= 1071) return String.fromCharCode(c + 32);  // А-Я
  if (c === 1025) return String.fromCharCode(1105);                // Ё
  if (c === 1256) return String.fromCharCode(1257);                // Ө
  if (c === 1198) return String.fromCharCode(1199);                // Ү
  return ch;
}

/* ---------- 1. sumTo(n): 1 + 2 + ... + n ---------- */
function sumTo(n) {
  if (!_isInt(n) || n < 0) return NaN;
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}

/* ---------- 2. factorial(n): n! ---------- */
function factorial(n) {
  if (!_isInt(n) || n < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

/* ---------- 3. isPrime(n): анхны тоо эсэх ---------- */
function isPrime(n) {
  if (!_isInt(n) || n < 2) return false;
  if (n < 4) return true;               // 2, 3
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {  // √n хүртэл шалгана
    if (n % i === 0) return false;
  }
  return true;
}

/* ---------- 4. fizzBuzz(n): 1..n массив буцаана ---------- */
function fizzBuzz(n) {
  const out = [];
  if (!_isInt(n) || n < 1) return out;
  for (let i = 1; i <= n; i++) {
    let item;
    if (i % 15 === 0) item = 'FizzBuzz';
    else if (i % 3 === 0) item = 'Fizz';
    else if (i % 5 === 0) item = 'Buzz';
    else item = i;
    out[out.length] = item;
  }
  return out;
}

/* ---------- 5. countVowels(str): эгшиг тоолох ---------- */
function countVowels(str) {
  if (typeof str !== 'string') return 0;
  const vowels = 'aeiouаэиоуөүеёяюы'; // латин + монгол/орос эгшиг
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = _lower(str[i]);
    for (let j = 0; j < vowels.length; j++) {
      if (ch === vowels[j]) { count++; break; }
    }
  }
  return count;
}

/* ---------- 6. isPalindrome(str): тэг/хоосон зай, том жижгийг үл хамаарна ---------- */
function isPalindrome(str) {
  if (typeof str !== 'string') return false;
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (!_isLetterOrDigit(str[left])) { left++; continue; }
    if (!_isLetterOrDigit(str[right])) { right--; continue; }
    if (_lower(str[left]) !== _lower(str[right])) return false;
    left++;
    right--;
  }
  return true;
}

/* ---------- 7. maxOf(arr): массивын хамгийн их утга ---------- */
function maxOf(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

/* ---------- 8. digitSum(n): цифрүүдийн нийлбэр ---------- */
function digitSum(n) {
  if (!_isInt(n)) return NaN;
  if (n < 0) n = -n;
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit;
    n = (n - digit) / 10;   // Math.floor хэрэглэхгүйгээр
  }
  return sum;
}

/* ---------- Өөрийгөө шалгах тест (Console-д харагдана) ---------- */
(function selfTest() {
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const cases = [
    ['sumTo(10)', sumTo(10), 55],
    ['sumTo(0)', sumTo(0), 0],
    ['factorial(5)', factorial(5), 120],
    ['factorial(0)', factorial(0), 1],
    ['isPrime(97)', isPrime(97), true],
    ['isPrime(1)', isPrime(1), false],
    ['isPrime(91)', isPrime(91), false],
    ['fizzBuzz(15)', fizzBuzz(15),
      [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']],
    ['countVowels("Hello World")', countVowels('Hello World'), 3],
    ['countVowels("Монгол")', countVowels('Монгол'), 2],
    ['isPalindrome("А роза упала на лапу Азора")', isPalindrome('А роза упала на лапу Азора'), true],
    ['isPalindrome("Racecar")', isPalindrome('Racecar'), true],
    ['isPalindrome("hello")', isPalindrome('hello'), false],
    ['maxOf([3, 9, -2, 7])', maxOf([3, 9, -2, 7]), 9],
    ['maxOf([])', maxOf([]), undefined],
    ['digitSum(12345)', digitSum(12345), 15],
    ['digitSum(-907)', digitSum(-907), 16]
  ];
  const rows = cases.map(([name, got, expected]) => ({
    тест: name,
    үр_дүн: Array.isArray(got) ? got.join(',') : String(got),
    хүлээгдсэн: Array.isArray(expected) ? expected.join(',') : String(expected),
    төлөв: same(got, expected) ? '✅ OK' : '❌ FAIL'
  }));
  console.log('%cАлгоритмын тест', 'font-weight:bold;color:#059669');
  console.table(rows);
})();
