# Branding

| Dosya | Açıklama |
|--------|-----------|
| `f22-brand-icon.svg` | Koyu roundel + chevron (`viewBox="0 0 64 64"`). **İsteğe bağlı** yedek ikon; favicon artık LM dosyasına bağlı. |
| `f22-brand-mark.svg` | **Yatay export kilidi:** roundel + kelime (koyu arka plan için). Tarayıcıda `<text>` ile Inter kullanır; Illustrator/Figma’da kesin eşleşme için metni path’e çevirilmiş bir varyant da eklenebilir. |
| `logo-f22-roundel.svg` | Önceki roundel vektörü; referans veya alternatif marka olarak saklanır. |
| `usaf-7fs-patch.png` | **İsteğe bağlı:** USAF 7th Fighter Squadron F-22 arması. [Commons](https://commons.wikimedia.org/wiki/File:7th_Fighter_Squadron_-_F-22_Patch.png) — `index.html` önce bunu dener. |
| `lockheed-martin-logo.svg` | LM kilidi (beyaz `fill`). **`rel="icon"` / `apple-touch-icon`**, **nav**, **footer** ve harici referans için; hero’da ayrıca aynı geometri **inline SVG** ile gömülü. Açık çubukta görünürlük için `filter: brightness(0)` uygulanır. |

## Tasarım notları

- **Favicon:** Geniş LM SVG’si sekmede küçülür; sadece yıldızı isteyenler için ayrı kare bir favicon eklenebilir.
- **Nav:** Hero üzerinde beyaz LM; scroll sonrası açık barda `brightness(0)` ile siyah silüet.
