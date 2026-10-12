// 1. Dark Mode Toggle шилжүүлэгч
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// 2. 3D Flip Card Interactive Toggle (Бүх картуудыг эргэдэг болгох)
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

const flipAllBtn = document.getElementById('flipAllBtn');
if (flipAllBtn) {
  flipAllBtn.addEventListener('click', () => {
    flipCards.forEach(card => card.classList.toggle('flipped'));
  });
}