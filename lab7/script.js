// 1. Dark Mode Toggle шилжүүлэгч
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

if ((localStorage.getItem('theme') || 'light') === 'dark') {
  root.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// 2. 3D Flip Card
// Mouse хүрэхэд эргэх / авахад буцах нь CSS-ээр (.flip-card:hover) шийдэгдэнэ.
// JS нь зөвхөн "Бүгдийг эргүүлэх" товчийг удирдана (.is-flipped класс).
const flipCards = document.querySelectorAll('.flip-card');
const flipAllBtn = document.getElementById('flipAllBtn');

if (flipAllBtn) {
  flipAllBtn.addEventListener('click', () => {
    // Хэрэв бүгд эргэсэн бол буцаана, үгүй бол бүгдийг эргүүлнэ
    const allFlipped = [...flipCards].every(card => card.classList.contains('is-flipped'));
    flipCards.forEach(card => card.classList.toggle('is-flipped', !allFlipped));
  });
}

// 3. QR тасалбар үүсгэх
const qrForm = document.getElementById('qrForm');
const qrImg = document.getElementById('qrImg');

if (qrForm && qrImg) {
  qrForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullname').value.trim();
    const studentId = document.getElementById('studentid').value.trim();
    const eventName = document.getElementById('event').value;

    const text = `Name: ${name}\nID: ${studentId}\nEvent: ${eventName}`;

    qrImg.src =
      'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=' +
      encodeURIComponent(text);
  });
}