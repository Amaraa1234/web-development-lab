// Даалгавар 2: for/while-гүй, оролтыг өөрчлөхгүй, шинэ массив буцаана
export const titles = photos => photos.map(p => p.title);
export const byPlace = (photos, place) => photos.filter(p => p.place === place);
export const popular = (photos, min = 3) => photos.filter(p => p.likes >= min);
export const sortByLikes = photos => [...photos].sort((a, b) => b.likes - a.likes);
export const sortByDate = photos => [...photos].sort((a, b) => String(b.date).localeCompare(String(a.date)));
export const searchTitle = (photos, q = '') => {
  const s = q.trim().toLowerCase();
  return s === '' ? [...photos] : photos.filter(p => p.title.toLowerCase().includes(s));
};
export const uniqueTags = photos => [...new Set(photos.flatMap(p => p.tags ?? []))];
export const addLike = (photos, id) => photos.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
// Нэмэлт
export const totalLikes = photos => photos.reduce((s, p) => s + p.likes, 0);
export const uniquePlaces = photos => [...new Set(photos.map(p => p.place))];
// Object.groupBy (дэмжлэггүй хөтөчид reduce fallback)
export const groupByPlace = photos =>
  typeof Object.groupBy === 'function'
    ? Object.groupBy(photos, p => p.place)
    : photos.reduce((acc, p) => ({ ...acc, [p.place]: [...(acc[p.place] ?? []), p] }), {});
