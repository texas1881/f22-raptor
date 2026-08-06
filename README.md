# F-22 Raptor — Konsept Lansman Deneyimi

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla_Tokens-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Modular_ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Canlı Demo (GitHub Pages):** [https://texas1881.github.io/f22-raptor/](https://texas1881.github.io/f22-raptor/)  
**GitHub Deposu:** [https://github.com/texas1881/f22-raptor](https://github.com/texas1881/f22-raptor)

Bu proje, F-22 Raptor 5. nesil hava üstünlüğü savaş uçağı için hazırlanmış **Apple & Lockheed Martin estetiğinde** interaktif, 3D destekli ve tam duyarlı (responsive) bir web konsept lansman deneyimidir.

---

## 💎 Temel Özellikler

- **Sinematik Hero Arka Planı:** Paralel `HEAD` istekleriyle otomatik video algılama ve sessiz döngüsel oynatma.
- **İnteraktif 3D Studio:** `<model-viewer>` altyapısı ile 360° döndürülebilir, vektör SVG ikonlu ve Apple Liquid Glassmorphism kontrollü 3D jet modeli.
- **Akıllı Yakınlaştırma (Zoom UX):** Mantıksal FOV sınırları (`15°` - `45°`) ile 1 tıkla yakınlaşma, uzaklaşma ve görünüm sıfırlama.
- **Akıcı Navigasyon & HUD Göstergesi:** Ekran kaydırıldıkça dinamik renk değiştiren Apple tarzı mikro-animasyonlu navigasyon çubuğu ve sol alt bölüm göstergesi.
- **Sıfır Ağır Bağımlılık:** Sadece Vanilla JS ve Vanilla CSS kullanılarak inşa edilmiştir (Vite üretim derlemesi ~9.4 KB JS).

---

## 📂 Proje Dizin Yapısı

```
f22-raptor/
├── index.html           # Semantik HTML5 ana giriş belgesi
├── package.json         # Bağımlılıklar ve npm komutları
├── vite.config.js       # Vite geliştirme ve Pages base konfigürasyonu
├── src/
│   ├── main.js          # Modüler kontrolcü mantığı (Nav, Hero, 3D, Scroll)
│   └── style.css        # CSS Değişkenleri (Tokens), mikro-animasyonlar ve stiller
├── public/
│   └── assets/          # 3D GLB modelleri, sinematik videolar ve görseller
├── ARCHITECTURE.md      # Teknik mimari ve modül dokümantasyonu
├── CONTRIBUTING.md      # Geliştirme ve katkı rehberi
└── GITHUB_PUSH.md      # GitHub Pages ve CI/CD dağıtım rehberi
```

---

## 🚀 Geliştirme Ortamı

### Kurulum
```bash
git clone https://github.com/texas1881/f22-raptor.git
cd f22-raptor
npm install
```

### Yerel Sunucuyu Başlatma
```bash
npm run dev
```
Geliştirme sunucusu **`http://localhost:5173/`** adresinde çalışmaya başlayacaktır.

---

## 🛠️ Derleme ve Kalite Kontrolü

### HTML Standart Kontrolü (Linting)
```bash
npm run lint:html
```

### Üretim Derlemesi (GitHub Pages Uyumlu)
```bash
# PowerShell
$env:GITHUB_ACTIONS = "true"
npm run build
Remove-Item Env:GITHUB_ACTIONS
```
Üretim dosyaları **`dist/`** dizinine derlenecektir.
