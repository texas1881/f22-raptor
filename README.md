# F-22 Raptor — concept landing

**Canlı demo (GitHub Pages):** https://texas1881.github.io/f22-raptor/  
*(İlk açılışta yayın 1–5 dakika gecikebilir; repo **Settings → Pages** altında “Visit site” ile doğrula.)*

**Kaynak:** https://github.com/texas1881/f22-raptor

Tek sayfa: `index.html` (HTML + CSS + JS).

## Klasör yapısı

```
f22 raptor/
├── index.html
├── README.md
└── assets/
    ├── README.md              # Varlık özeti ve logo notları
    ├── images/branding/       # Logo / amblemler
    ├── video/                 # Hero arka plan videoları
    └── models/                # 3D vitrin .glb
```

Yerel önizleme için basit bir HTTP sunucusu kullanın (`file://` ile model-viewer .glb yükleyemez; video yolları da sunucu ile daha tutarlıdır):

```bash
cd "C:\...\f22 raptor"   # klasör adında boşluk varsa tırnak kullanın
npx --yes serve .
```

Ardından tarayıcıda `http://localhost:3000` (veya terminalde yazan port) ile açın; `index.html` dosyasına çift tıklamayın.

## Hızlı kontrol listesi

- [ ] `assets/video/f22-hero.mp4` ve/veya `f22-hero.webm`
- [ ] `assets/models/f22.glb` (siyah 3D vitrin)
- [ ] *(İsteğe bağlı)* `assets/images/sections/f22-vitrine.png` — alttaki siyah Tesla vitrininde PNG kesit
- [ ] *(İsteğe bağlı)* `assets/images/branding/usaf-7fs-patch.png` — Wikimedia’dan USAF 7th FS F-22 arması

Detaylar: `assets/README.md`.

## GitHub’a yükleme

Bu ortamda `git` yoksa push buradan yapılamaz. Adım adım komutlar: **`GITHUB_PUSH.md`**.
