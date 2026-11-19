/* ==========================================================
   Даалгавар 1. Хувьсагч, төрөл, хөрвүүлэлтийн жижиг туршилт
   Үр дүнг хөтчийн DevTools -> Console табаас харна (F12).
   ========================================================== */
'use strict';

(function runExperiments() {
  // 1) Хувьсагчийн төрлүүд (typeof)
  const samples = {
    string: 'CampusEvents',
    number: 42,
    float: 3.14,
    boolean: true,
    undefined: undefined,
    null: null,          // typeof null === 'object' (JS-ийн түүхэн онцлог)
    array: [1, 2, 3],    // typeof массив === 'object'
    object: { club: 'IELTS' },
    function: function () {},
    NaN: NaN             // typeof NaN === 'number'
  };

  const typeRows = Object.keys(samples).map((name) => ({
    нэр: name,
    утга: String(samples[name]),
    typeof: typeof samples[name],
    isArray: Array.isArray(samples[name])
  }));
  console.log('%c1. typeof туршилт', 'font-weight:bold;color:#4f46e5');
  console.table(typeRows);

  // 2) Төрөл хөрвүүлэлт (implicit / explicit)
  const conversions = [
    { илэрхийлэл: '"5" + 3', үр_дүн: '5' + 3, төрөл: typeof ('5' + 3) },
    { илэрхийлэл: '"5" - 3', үр_дүн: '5' - 3, төрөл: typeof ('5' - 3) },
    { илэрхийлэл: '"5" * "2"', үр_дүн: '5' * '2', төрөл: typeof ('5' * '2') },
    { илэрхийлэл: 'Number("42px")', үр_дүн: Number('42px'), төрөл: typeof Number('42px') },
    { илэрхийлэл: 'parseInt("42px")', үр_дүн: parseInt('42px', 10), төрөл: typeof parseInt('42px', 10) },
    { илэрхийлэл: 'Number("")', үр_дүн: Number(''), төрөл: typeof Number('') },
    { илэрхийлэл: 'Number(true)', үр_дүн: Number(true), төрөл: typeof Number(true) },
    { илэрхийлэл: 'String(123)', үр_дүн: String(123), төрөл: typeof String(123) },
    { илэрхийлэл: 'Boolean("")', үр_дүн: Boolean(''), төрөл: typeof Boolean('') },
    { илэрхийлэл: 'Boolean("0")', үр_дүн: Boolean('0'), төрөл: typeof Boolean('0') },
    { илэрхийлэл: '[] + {}', үр_дүн: [] + {}, төрөл: typeof ([] + {}) }
  ];
  console.log('%c2. Төрөл хөрвүүлэлт', 'font-weight:bold;color:#4f46e5');
  console.table(conversions);

  // 3) == ба === ялгаа
  const equality = [
    { илэрхийлэл: '5 == "5"', үр_дүн: 5 == '5' },   // eslint-disable-line eqeqeq
    { илэрхийлэл: '5 === "5"', үр_дүн: 5 === '5' },
    { илэрхийлэл: 'null == undefined', үр_дүн: null == undefined }, // eslint-disable-line eqeqeq
    { илэрхийлэл: 'null === undefined', үр_дүн: null === undefined },
    { илэрхийлэл: 'NaN === NaN', үр_дүн: NaN === NaN }
  ];
  console.log('%c3. == ба ===', 'font-weight:bold;color:#4f46e5');
  console.table(equality);

  // 4) Бутархай тооны нарийвчлал: 0.1 + 0.2
  const sum = 0.1 + 0.2;
  console.log('%c4. 0.1 + 0.2', 'font-weight:bold;color:#4f46e5');
  console.log('0.1 + 0.2 =', sum);                       // 0.30000000000000004
  console.log('0.1 + 0.2 === 0.3 ?', sum === 0.3);       // false
  console.log('toFixed(2):', sum.toFixed(2));            // "0.30"
  console.log('Number.EPSILON-аар жиших:',
    Math.abs(sum - 0.3) < Number.EPSILON);               // true
  console.log('Бүхэл тоогоор: (1 + 2) / 10 =', (1 + 2) / 10);
})();
