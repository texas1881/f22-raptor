# F-22 Raptor — Mimari Dokümantasyon

Bu belge, **F-22 Raptor** konsept lansman uygulamasının yazılım mimarisini, teknik bileşenlerini ve veri akışını detaylandırmaktadır.

---

## 🏛️ Mimari Mimarisi & Bileşenler

Uygulama, yüksek performans ve sürdürülebilirlik amacıyla **Modüler İnce İstemci (Modular Thin Client)** mimarisiyle tasarlanmıştır.

### Modül Mimarisi (`src/main.js`)

1. **`PreloadManager`**
   - Kullanıcının ağ tasarrufu modu (`navigator.connection.saveData`) aktif değilse 3D GLB dosyasını arka planda önceden yükler (`<link rel="preload">`).

2. **`NavigationController`**
   - Ekran kaydırmasını (`scroll`) `requestAnimationFrame` ile optimize ederek takip eder.
   - Sayfadaki görünür bölümü tespit ederek sol alttaki bölüm adını (`#sectionIndicator`) ve sağdaki Apple tarzı navigasyon noktalarını (`#chapterRail`) günceller.
   - Açık renkli bölümlerde (`Overview`) otomatik koyu temaya geçiş sağlar (`on-light`).

3. **`HeroMediaController`**
   - Paralel `HEAD` HTTP istekleri ile aday video kaynaklarını taranıp tarayıcıya en uygun `.mp4` / `.webm` formatını dynamic `<source>` olarak bağlar.
   - Oynatma başarısızlığında statik görsel arka plana (`hero--static`) yumuşak geçiş sağlar.

4. **`ScrollObserver`**
   - `IntersectionObserver` API kullanarak `.reveal` sınıfına sahip öğeleri ekrana girdikçe `cubic-bezier(0.16, 1, 0.3, 1)` eğrisiyle görünür kılar.
   - `[data-counter]` niteliğine sahip veri değerlerini ivmeli matematiksel sayaç animasyonu ile başlatır.

5. **`ModelViewerController`**
   - WebGL tabanlı `<model-viewer>` elementinin yaşam döngüsünü yönetir.
   - 3D model yüklenme yüzdesini canlı progres çubuğunda gösterir.
   - Taktiksel kontrol çubuğu üzerinden **Perspektif**, **Ön**, **Üst**, **Yan** açıları ile **Yakınlaştırma (+/-)** ve **Sıfırlama** komutlarını işler.
   - WebGL desteklenmeyen veya CORS engeli olan durumlarda 2D interaktif paralaks simülasyonunu (`fallback3d`) devreye sokar.

---

## 🎨 Tasarım Sistemi & Stil Mimarisi (`src/style.css`)

Stil katmanı CSS değişkenleri (Tokens) üzerine inşa edilmiştir:

```css
:root {
  --bg-void: #ffffff;
  --text-primary: #0c0e12;
  --raptor-gold: #c5a059;
  --raptor-gold-deep: #8a703f;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- **Liquid Glassmorphism:** Çok katmanlı buğulu cam efekti (`backdrop-filter: blur(20px) saturate(1.8)`) ve speküler üst yansıma çizgileriyle oluşturulmuştur.
- **Duyarlılık (Responsiveness):** `clamp()`, `min()`, `max()` ve `env(safe-area-inset-*)` kullanılarak tüm mobil ve masaüstü ekran boyutlarında mükemmel ölçeklenme sağlanmıştır.

---

## 🔄 CI/CD ve Yayınlama Süreci

- **Derleme:** Vite, `GITHUB_ACTIONS="true"` değişkeniyle GitHub Pages için base path olarak `/f22-raptor/` kullanır.
- **Dağıtım:** `.github/workflows/pages.yml` dosyası, `main` dalına yapılan her push işleminde projeyi otomatik olarak derleyip GitHub Pages üzerine canlıya alır.
