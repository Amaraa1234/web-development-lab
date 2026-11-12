#!/bin/sh
# Файлын хэмжээ (raw / gzip)
for f in bootstrap/index.html bootstrap/style.css bootstrap/script.js tailwind/index.html tailwind/dist/output.css tailwind/script.js; do
  printf "%-28s %6s B  gzip %6s B\n" "$f" "$(wc -c < $f)" "$(gzip -9c $f | wc -c)"
done
for u in css/bootstrap.min.css js/bootstrap.bundle.min.js; do
  curl -sL https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/$u -o /tmp/bs.tmp
  printf "CDN %-30s %6s B  gzip %6s B\n" "$u" "$(wc -c < /tmp/bs.tmp)" "$(gzip -9c /tmp/bs.tmp | wc -c)"
done
