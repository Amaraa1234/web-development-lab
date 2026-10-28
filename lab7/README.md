# CampusEvents — Лаб 7: Sass/SCSS refactoring

Лаб 6-ын `style.css`-ийг харагдац өөрчлөхгүйгээр SCSS болгон дахин зохион байгуулсан.

## Ажиллуулах
```bash
npm install
npm run dev              # watch + source map (expanded)
npm run build:expanded   # уншигдахуйц CSS
npm run build            # compressed → css/style.css  (index.html үүнийг ашиглана)
```

## Бүтэц
```
src/scss/
├── main.scss                 # цорын ганц оролт (@use)
├── abstracts/
│   ├── _tokens.scss          # өнгө (light/dark), радиус, breakpoint, зай, фонтын хэмжээ — map
│   ├── _functions.scss       # rem(), contrast(), on() (+ luminance, contrast-ratio)
│   ├── _mixins.scss          # respond(), flex-center(), auto-fit-grid(), card-surface()
│   └── _index.scss           # @forward
├── base/        _root  _reset  _animations
├── layout/      _page  _header  _sidebar  _footer
├── components/  _nav  _button  _card  _section  _flip-card  _form  _media
└── utilities/   _utilities   # @each-ээр үүссэн u-* классууд
```

## Даалгавар → хэрэгжилт
1. **npm + Sass, scripts, folder** — `package.json`, `src/scss/*`
2. **Map + :root** — `_tokens.scss` → `base/_root.scss` (`--primary-color`, `--radius-md`, `--bp-md`, `--space-md` …; хар горим `:root[data-theme='dark']`)
3. **Mixin** — `respond(md)` (≤900px), `flex-center()` (header, section__header, footer, flip-card ар тал), `auto-fit-grid()` (card-grid, gallery__grid), `card-surface()` (.card, flip-card__face)
4. **Функц** — `rem()` бүх хэмжээнд, `contrast()`/`on()` hero, header, primary товч, flip-card ар талын текстийн өнгөнд
5. **Partial + BEM + @each + compressed** — `.u-mt-*`, `.u-mb-*`, `.u-text-*`, `.u-stagger`; `npm run build`

## Шалгалт
Лаб 6-ын `index.html + style.css` ба шинэ `index.html + css/style.css`-ийг Chromium-д
1280 / 800 / 390 өргөн, цагаан + хар горимд пикселээр харьцуулсан (reduced-motion, ижил зураг/текст).
Үр дүн: 1280/хар горимд булангийн anti-aliasing-ийн 22 пиксел (1/255), бусад бүх тохиолдолд ЯГ ИЖИЛ.
