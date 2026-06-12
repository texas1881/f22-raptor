# F-22 Raptor — site varlıkları

```
assets/
├── images/
│   ├── branding/          # Logo, armalar, ikonlar
│   └── sections/          # Bölüm görselleri (ör. Design / Gallery)
├── video/                 # Hero tam ekran video
└── models/                # 3D vitrin (.glb / .gltf)
```

## Video (hero)

Dosya adları (önerilen):

- `video/f22-hero.webm`
- `video/f22-hero.mp4`

## 3D model

- `models/f22.glb` (veya `.gltf` — `index.html` içindeki `src` yolunu güncelle)

## Design vitrin (PNG, siyah bant)

- `images/sections/f22-vitrine.png` — Sayfanın **en altındaki** siyah özet vitrininde kullanılır. Ayrıntı: `images/sections/README.md`.

## Logo / amblem

1. **Favicon / sekme ikonu:** `images/branding/lockheed-martin-logo.svg` — LM kilidi (`index.html` `rel="icon"` / `apple-touch-icon`).
2. **Roundel (yedek ikon):** `images/branding/f22-brand-icon.svg` — koyu roundel + chevron; isteğe bağlı.
3. **Önceki roundel (referans):** `images/branding/logo-f22-roundel.svg` — alternatif veya yedek vektör.
4. **İsteğe bağlı gerçek USAF F-22 birlik arması (7th Fighter Squadron):** Wikimedia Commons üzerinden insan tarayıcısıyla indirip şu ada kaydedin:
   - `images/branding/usaf-7fs-patch.png`
   - Kaynak: [7th Fighter Squadron - F-22 Patch](https://commons.wikimedia.org/wiki/File:7th_Fighter_Squadron_-_F-22_Patch.png) (USAF, kamu malı etiketi; kullanım ülkeye göre ek kısıtlara tabi olabilir).

5. **Lockheed Martin:** `images/branding/lockheed-martin-logo.svg` — Wikimedia Commons’taki [2011–2022 logo](https://commons.wikimedia.org/wiki/File:Lockheed_Martin_logo_(2011%E2%80%932022).svg) SVG’si projeye eklenmiştir; ticari marka olduğu için kullanım bağlamınızı göz önünde bulundurun.

`index.html` önce `usaf-7fs-patch.png` dener; dosya yoksa otomatik olarak `logo-f22-roundel.svg` yüklenir (bazı bölümlerde; favicon için bkz. madde 1).
