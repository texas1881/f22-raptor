# Mimari — F-22 Raptor (statik landing)

## Genel

- **Vite** üretim derlemesi: `src/style.css`, `src/main.js`, kök `index.html`.
- **Statik varlıklar:** `public/assets/` → derlemede `dist/assets/` (URL’de yine `assets/...`).
- **GitHub Pages:** Proje sitesi tabanı `/f22-raptor/`. `vite.config.js` içinde `GITHUB_ACTIONS === "true"` iken bu taban kullanılır; yerel `npm run dev` tabanı `/` kullanır.

## Önemli dosyalar

| Dosya | Rol |
|--------|-----|
| `index.html` | Sayfa iskeleti, harici `model-viewer`, Vite girişleri |
| `src/main.js` | Tüm etkileşim (hero video, reveal, 3D, nav) |
| `src/style.css` | Tüm stiller |
| `vite.config.js` | `base`, `publicDir`, `outDir` |
| `public/assets/` | Video, GLB, görseller, alt README’ler |

## Bölüm ID’leri (anchor)

- `#hero` — hero
- `#overview` — overview
- `#model-3d` — 3D vitrin
- `#finale` — final CTA
- `#vitrine-spec` — siyah spec / datasheet

## Harici bağımlılıklar

- **Google Fonts** — `fonts.googleapis.com` / `fonts.gstatic.com`
- **model-viewer 3.5.0** — `ajax.googleapis.com/.../model-viewer.min.js` + **SRI** (`index.html`)

SRI hash, CDN’deki dosya ile birebir eşleşmeli; CDN güncellenirse `index.html` içindeki `integrity` güncellenmeli.

## GLB preload

`src/main.js` başında: `navigator.connection.saveData` ise tam GLB `<link rel="preload">` eklenmez.

## Yerel geliştirme

```bash
npm install
npm run dev
```

`http://localhost:5173/` — taban `/` olduğu için kökten açılır.

## Üretim derlemesi (Pages ile aynı taban)

```bash
# PowerShell
$env:GITHUB_ACTIONS = "true"
npm run build
Remove-Item Env:GITHUB_ACTIONS
```

Çıktı: `dist/`. CI’da `GITHUB_ACTIONS` otomatik `true` olduğu için aynı komut workflow’da çalışır.

## GitHub Pages ayarı

Repo **Settings → Pages → Build and deployment**: kaynak olarak **GitHub Actions** seçilmeli (bu workflow `deploy-pages` kullanır). Eski “Deploy from branch /” kökü ile çakışıyorsa Actions’a geçin.
