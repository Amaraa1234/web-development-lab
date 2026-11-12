# Лаб 8. Bootstrap ба Tailwind CSS: нэг хуудас, хоёр арга

## Ажиллуулах
- **Bootstrap:** `bootstrap/index.html`-ийг хөтчөөр нээнэ (CDN шаардлагатай, интернэттэй байх).
- **Tailwind:** `cd tailwind && npm install && npm run build` → `tailwind/index.html`.
  Build тушаал: `npx @tailwindcss/cli -i src/input.css -o dist/output.css --minify` (v4.3.3).

## Шаардлагын биелэлт
| # | Шаардлага | Bootstrap | Tailwind |
|---|-----------|-----------|----------|
| 1 | Navbar, 3 баганатай card grid, form validation | `navbar`, `row-cols-lg-3`, `.needs-validation` + `was-validated` | `flex`, `lg:grid-cols-3`, `user-invalid:` / `peer-user-invalid:` |
| 2 | Build | CDN (build хэрэггүй) | `@tailwindcss/cli` → `dist/output.css` |
| 3 | Dark mode | `<html data-bs-theme>` | `@custom-variant dark (&:where(.dark, .dark *))` + `<html class="dark">` |
| 4 | Брэнд өнгө | `.btn-brand` + `--brand` CSS variable | `@theme { --color-brand }` → `bg-brand` |

## Хэмжилт
| Үзүүлэлт | Bootstrap | Tailwind |
|---|---|---|
| index.html (raw / gzip) | 5,306 B / 1,705 B | 6,779 B / 2,007 B |
| Өөрийн CSS (raw / gzip) | 561 B / 264 B (`style.css`) | 11,843 B / 3,214 B (`dist/output.css`, minified) |
| Өөрийн JS (raw / gzip) | 965 B / 523 B | 999 B / 548 B |
| Framework CSS (CDN) | ≈ 230 KB / ≈ 31 KB* | — (build-д багтсан) |
| Framework JS (CDN) | ≈ 80 KB / ≈ 27 KB* (bundle) | — (JS байхгүй) |
| **Нийт CSS+JS (gzip)** | **≈ 59 KB*** | **≈ 3.8 KB** |
| Нэг card-ын class тоо (`<article>` дотор) | 13 (wrapper `div.col`-тай 14) | 33 |
| Lighthouse (Perf / A11y / BP / SEO) | _хэмжих_ | _хэмжих_ |

\* CDN файлын хэмжээ sandbox-оос татаж баталгаажуулаагүй (сүлжээ хаалттай), Bootstrap 5.3.3-ийн
хэвлэгдсэн хэмжээнээс тоймлосон. Өөрийн машин дээр `./measure.sh` ажиллуулж баталгаажуулна уу.
Lighthouse-ыг sandbox-д Chrome байхгүй тул ажиллуулж чадаагүй; доорх тушаалаар хэмжинэ.

### Lighthouse хэмжих
```
npx serve .            # эсвэл: python3 -m http.server 8000
npx lighthouse http://localhost:8000/bootstrap/index.html --only-categories=performance,accessibility,best-practices,seo --view
npx lighthouse http://localhost:8000/tailwind/index.html  --only-categories=performance,accessibility,best-practices,seo --view
```
Хүснэгтийн сүүлийн мөрийг гарсан оноогоор бөглөнө. Хэмжихдээ хоёуланг нь адил горимд (mobile, incognito) 3 удаа ажиллуулж медианыг авна.

## Дүгнэлт
_(Lighthouse оноог бөглөсний дараа эцэслэнэ. Одоогийн хэмжилтэд үндэслэсэн төсөл:)_
Bootstrap нь бэлэн component (navbar, card, validation стиль, collapse JS)-тай тул HTML-д class цөөн (card дээр 13 vs 33)
бөгөөд хурдан эхэлнэ, гэхдээ CDN-ээс ≈ 60 KB (gzip) framework татдаг, өөрчлөхдөө `--bs-btn-*` хувьсагчаар
дарж бичих хэрэгтэй болдог. Tailwind нь ашигласан utility-г л build хийдэг тул нийт CSS ≈ 3 KB (gzip) хүрэхгүй,
дизайныг бүрэн хянах боломжтой, `@theme`-ээр өнгө нэмэхэд `bg-brand` гэх мэт class автоматаар үүснэ;
харин card бүрт class их, navbar-ын нугалдаг цэс, validation мессеж зэргийг өөрөө (JS/variant-аар) бичих шаардлагатай,
build алхам нэмэгдэнэ. Богино хугацаатай, стандарт UI-д Bootstrap; өвөрмөц дизайн, хөнгөн ачаалалтай төсөлд Tailwind илүү тохирно.
