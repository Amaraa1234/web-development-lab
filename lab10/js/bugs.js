// Даалгавар 5: алдаатай 3 функцийн ЗАСВАРЛАСАН хувилбар
// 1) Алдаа: хоосон массивт 0/0 = NaN
export const averageLikes = photos =>
  photos.length === 0 ? 0 : photos.reduce((s, p) => s + p.likes, 0) / photos.length;
// 2) Алдаа: `<` ашиглан хамгийн БАГА like-тайг буцаадаг байсан
export const mostLiked = photos =>
  photos.length === 0 ? undefined : photos.reduce((best, p) => (p.likes > best.likes ? p : best));
// 3) Алдаа: splice-аар оролтын массивыг өөрчилдөг байсан
export const removeById = (photos, id) => photos.filter(p => p.id !== id);
