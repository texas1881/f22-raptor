# F-22 Raptor — concept landing

**Canlı demo (GitHub Pages):** https://texas1881.github.io/f22-raptor/  
**Kaynak:** https://github.com/texas1881/f22-raptor

Statik tek sayfa: kök `index.html` + `src/main.js` + `src/style.css`. Üretimde Vite `dist/` üretir; GitHub Actions ile Pages’e yüklenir (ayar için bkz. `GITHUB_PUSH.md`).

## Klasör yapısı

```
f22-raptor/
├── index.html           # Vite HTML girişi
├── package.json
├── vite.config.js
├── src/
│   ├── main.js          # Davranış (hero, 3D, reveal, …)
│   └── style.css        # Tüm stiller
├── public/
│   └── assets/          # Video, GLB, görseller (URL: /assets/…)
├── dist/                # npm run build çıktısı (.gitignore)
├── ARCHITECTURE.md
├── AGENTS.md
├── CONTRIBUTING.md
└── .github/workflows/   # CI + Pages deploy
```

## Yerel çalıştırma

```bash
cd "C:\...\f22-raptor"
npm install
npm run dev
```

Tarayıcı: `http://localhost:5173/` (`file://` kullanmayın; model ve video için HTTP gerekir.)

## Lint ve Pages ile aynı derleme

```bash
npm run lint:html
# PowerShell — taban /f22-raptor/ ile derleme
$env:GITHUB_ACTIONS = "true"
npm run build
Remove-Item Env:GITHUB_ACTIONS
```

## GitHub Pages (Actions)

İlk kurulum: repo **Settings → Pages → Build and deployment** kaynağı **GitHub Actions** olmalı. Eski “Deploy from a branch / (root)” açıksa kapatın; aksi halde iki kaynak çakışabilir. Ayrıntı: **`GITHUB_PUSH.md`**.

## Hızlı kontrol listesi

- [ ] `public/assets/video/` altında hero video (`f22-hero.mp4` / `.webm` veya `f22.mp4`)
- [ ] `public/assets/models/f22.glb`
- [ ] İsteğe bağlı: `public/assets/images/sections/f22-vitrine.png`

Detaylar: `public/assets/README.md`.

## Git’e ilk push / güncelleme

`GITHUB_PUSH.md` dosyasına bakın.
