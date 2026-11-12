const root = document.documentElement;

// Dark mode: <html class="dark">
document.getElementById('themeToggle').addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden') === false;
  menu.classList.toggle('flex', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});

// Form: user-invalid CSS ажиллана; илгээхэд бүх талбарыг шалгана
const form = document.getElementById('uploadForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.querySelectorAll(':invalid')[0].focus();
    form.reportValidity();
    return;
  }
  alert('Амжилттай илгээгдлээ!');
  form.reset();
});
