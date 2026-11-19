// Даалгавар 1: 6 arrow функц
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
export const average = (...nums) => nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
export const greet = (name = 'Зочин') => `Сайн уу, ${name}!`;
export const makeCounter = (start = 0) => { let c = start; return () => ++c; };
export const applyN = (fn, n, x) => n <= 0 ? x : applyN(fn, n - 1, fn(x));
export const compose = (f, g) => x => f(g(x));
