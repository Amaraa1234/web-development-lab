// Даалгавар 4: хуудас. Хамаарал: validators.js, form.js (classic script) -> attachValidation, showStatus
import { FeaturedAlbum } from './album.js';
import { searchTitle, byPlace, popular, sortByLikes, sortByDate, uniquePlaces, totalLikes } from './photoTools.js';

const KEY = 'lab10-album';
const seed = [
  { id: 1, title: 'Hackathon 2026', place: 'IT Төв', date: '2026-10-15', likes: 2, tags: ['code'] },
  { id: 2, title: 'Акустик Намар', place: 'Оюутны заал', date: '2026-10-20', likes: 4, tags: ['music'] },
  { id: 3, title: 'IELTS Seminar', place: 'Эрдмийн өрөө', date: '2026-10-25', likes: 1, tags: ['study'] },
  { id: 4, title: 'Спортын өдөр', place: 'Оюутны заал', date: '2026-09-30', likes: 0, tags: [] },
];
const load = () => {
  try { const s = localStorage.getItem(KEY); return s ? FeaturedAlbum.from(s) : new FeaturedAlbum(seed); }
  catch { return new FeaturedAlbum(seed); }
};
let album = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(album)); } catch { /* private mode */ } };

const $ = id => document.getElementById(id);
const listEl = $('photoList'), qEl = $('searchInput'), placeEl = $('placeFilter'),
      sortEl = $('sortSelect'), featEl = $('onlyFeatured');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---- Бэлэн makeCard, renderCards ---- */
const makeCard = p => `
  <article class="card photo-card ${album.isFeatured(p.id) ? 'featured' : ''}">
    <h4>${album.isFeatured(p.id) ? '⭐ ' : ''}${esc(p.title)}</h4>
    <p class="event-location">📍 ${esc(p.place)} · ${esc(p.date)}</p>
    <div class="photo-actions">
      <button type="button" class="btn btn-primary btn-like" data-id="${p.id}" aria-label="Like: ${esc(p.title)}">❤ ${p.likes}</button>
      <button type="button" class="btn btn-secondary btn-remove" data-id="${p.id}" aria-label="Устгах: ${esc(p.title)}">🗑</button>
    </div>
  </article>`;
const renderCards = list => {
  listEl.innerHTML = list.length ? list.map(makeCard).join('') : '<p class="widget-desc">Зураг олдсонгүй.</p>';
  renderStats();
};

/* ---- currentList(): хайлт + газар + онцлох + эрэмбэ ---- */
const currentList = () => {
  let list = searchTitle(album.photos, qEl.value);
  if (placeEl.value !== 'all') list = byPlace(list, placeEl.value);
  if (featEl.checked) list = list.filter(p => album.isFeatured(p.id));
  if (sortEl.value === 'likes') list = sortByLikes(list);
  else if (sortEl.value === 'date') list = sortByDate(list);
  return list;
};

function renderStats() {
  const all = album.photos;
  $('statPhotos').textContent = album.size;
  $('statLikes').textContent = totalLikes(all);
  $('statFeatured').textContent = popular(all, 3).length;
}
function refreshPlaces() {
  const cur = placeEl.value;
  placeEl.innerHTML = '<option value="all">Бүх газар</option>' +
    uniquePlaces(album.photos).map(p => `<option value="${esc(p)}">${esc(p)}</option>`).join('');
  placeEl.value = [...placeEl.options].some(o => o.value === cur) ? cur : 'all';
}
const refresh = () => { refreshPlaces(); renderCards(currentList()); };

/* ---- Like / Устгах товчны listener (event delegation) ---- */
listEl.addEventListener('click', e => {
  const like = e.target.closest('.btn-like'), del = e.target.closest('.btn-remove');
  if (like) album.like(Number(like.dataset.id));
  else if (del) album.remove(Number(del.dataset.id));
  else return;
  save();
  del ? refresh() : renderCards(currentList());
});

/* ---- Шүүлтүүрийн listener ---- */
qEl.addEventListener('input', () => renderCards(currentList()));
[placeEl, sortEl, featEl].forEach(el => el.addEventListener('change', () => renderCards(currentList())));

/* ---- Нэмэх form: Лаб 9-ийн attachValidation + validator-ууд ---- */
attachValidation(
  $('photoForm'),
  { pTitle: validatePhotoTitle, pPlace: validatePlace, pDate: validateDate },
  values => {
    album.add({ title: values.pTitle, place: values.pPlace, date: values.pDate });
    save();
    showStatus($('photoStatus'), `«${values.pTitle}» нэмэгдлээ.`, 'success');
    $('photoForm').reset();
    refresh();
  }
);

$('resetAlbum').addEventListener('click', () => {
  album = new FeaturedAlbum(seed);
  save(); refresh();
});

refresh();
