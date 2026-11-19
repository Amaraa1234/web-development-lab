'use strict';

/* 1. Dark / Light горим (хадгалсан сонголт, эсвэл системийн тохиргоо) */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.setAttribute('data-theme', savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');

  const toggleCard = () => {
    const flipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', String(flipped));
  };

  // Hover байхгүй төхөөрөмж (утас) дээр л click-ээр эргүүлнэ
  card.addEventListener('click', () => {
    if (!window.matchMedia('(hover: hover)').matches) toggleCard();
  });

  // Гар: Enter / Space
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard();
    }
  });
});

/* "Бүгдийг эргүүлэх": бүгд нэг чиглэлд эргэнэ */
const flipAllBtn = document.getElementById('flipAllBtn');
if (flipAllBtn) {
  flipAllBtn.addEventListener('click', () => {
    const anyFront = Array.from(flipCards).some((c) => !c.classList.contains('flipped'));
    flipCards.forEach((c) => {
      c.classList.toggle('flipped', anyFront);
      c.setAttribute('aria-pressed', String(anyFront));
    });
  });
}

/* 3. Навигацийн идэвхтэй холбоос (scroll-д тохируулан) */
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => observer.observe(s));
}
