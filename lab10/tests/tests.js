import * as U from '../js/utils.js';
import * as P from '../js/photoTools.js';
import * as O from '../js/objectTools.js';
import { Album, FeaturedAlbum } from '../js/album.js';
import * as B from '../js/bugs.js';

const out = document.getElementById('out'); let pass = 0, fail = 0;
const eq = (a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${JSON.stringify(a)} != ${JSON.stringify(b)}`); };
const test = (name, fn) => { try { fn(); pass++; out.innerHTML += `<li class="ok">✔ ${name}</li>`; } catch (e) { fail++; out.innerHTML += `<li class="bad">✘ ${name}: ${e.message}</li>`; } };
const data = () => [
  { id: 1, title: 'A', place: 'X', date: '2026-01-01', likes: 5, tags: ['a'] },
  { id: 2, title: 'B', place: 'Y', date: '2026-02-01', likes: 1, tags: [] }];

test('clamp', () => eq([U.clamp(5, 0, 3), U.clamp(-1, 0, 3), U.clamp(2, 0, 3)], [3, 0, 2]));
test('average', () => { eq(U.average(1, 2, 3), 2); eq(U.average(), 0); });
test('greet', () => { eq(U.greet(), 'Сайн уу, Зочин!'); eq(U.greet('Бат'), 'Сайн уу, Бат!'); });
test('makeCounter', () => { const c = U.makeCounter(5); c(); eq(c(), 7); });
test('applyN', () => eq(U.applyN(x => x * 2, 3, 1), 8));
test('compose', () => eq(U.compose(x => x + 1, x => x * 2)(3), 7));
test('sortByLikes үл өөрчилнө', () => { const d = data(); const r = P.sortByLikes(d); eq(d[0].id, 1); eq(r.map(p => p.id), [1, 2]); });
test('popular / byPlace', () => { eq(P.popular(data(), 3).length, 1); eq(P.byPlace(data(), 'Y').length, 1); });
test('addLike шинэ массив', () => { const d = data(); eq(P.addLike(d, 2)[1].likes, 2); eq(d[1].likes, 1); });
test('groupByPlace', () => eq(Object.keys(P.groupByPlace(data())), ['X', 'Y']));
test('pick/omit', () => { eq(O.pick({ a: 1, b: 2 }, 'a'), { a: 1 }); eq(O.omit({ a: 1, b: 2 }, 'a'), { b: 2 }); });
test('addTag давхардахгүй', () => { const p = data()[0]; eq(O.addTag(p, 'a').tags, ['a']); eq(p.tags, ['a']); eq(O.addTag(p, 'b').tags, ['a', 'b']); });
test('Album.add id = max+1', () => { const a = new Album(data()); eq(a.add({ title: 'C' }).id, 3); eq(a.size, 3); });
test('Album.photos гүн хуулбар', () => { const a = new Album(data()); a.photos[0].likes = 99; eq(a.find(1).likes, 5); });
test('Album.like/remove', () => { const a = new Album(data()); eq(a.like(2), 2); eq(a.remove(1), true); eq(a.remove(1), false); });
test('Album toJSON/from', () => { const a = new Album(data()); eq(Album.from(JSON.stringify(a)).photos, a.photos); });
test('FeaturedAlbum like 3', () => { const f = new FeaturedAlbum(data()); eq(f.featured.length, 1); f.like(2); eq(f.featured.length, 1); f.like(2); eq(f.featured.length, 2); });
test('bugs', () => { eq(B.averageLikes([]), 0); eq(B.mostLiked(data()).id, 1); const d = data(); B.removeById(d, 1); eq(d.length, 2); });
// Өөрийн 5 шинэ тест
test('[нэмэлт] хоосон массив', () => { eq(P.sortByLikes([]), []); eq(P.titles([]), []); eq(P.uniqueTags([]), []); });
test('[нэмэлт] давхардсан like', () => { const a = new Album(data()); a.like(1); a.like(1); eq(a.find(1).likes, 7); });
test('[нэмэлт] зөвхөн зай бүхий хайлт', () => eq(P.searchTitle(data(), '   ').length, 2));
test('[нэмэлт] хоосон Album add → id 1', () => eq(new Album().add({ title: 'Z' }).id, 1));
test('[нэмэлт] Лаб 9 validator', () => {
  eq(validatePhotoTitle('Hackathon 2026').valid, true);
  eq(validatePlace(' ').valid, false);
  eq(validateDate('2026-02-30x').valid, false);
});
out.insertAdjacentHTML('beforebegin', `<h2>${pass} / ${pass + fail} тест давлаа</h2>`);
