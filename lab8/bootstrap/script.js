// Dark mode: data-bs-theme
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.setAttribute('data-bs-theme', saved || (prefersDark ? 'dark' : 'light'));

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-bs-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Form validation
document.querySelectorAll('.needs-validation').forEach(form => {
  form.addEventListener('submit', e => {
    if (!form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
    else { e.preventDefault(); alert('Амжилттай илгээгдлээ!'); form.reset(); form.classList.remove('was-validated'); return; }
    form.classList.add('was-validated');
  });
});
