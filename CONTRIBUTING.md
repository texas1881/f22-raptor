# F-22 Raptor — Katkı Sağlama Rehberi

Bu belge, **F-22 Raptor** konsept lansman projesine katkıda bulunmak isteyen geliştiriciler için yönergeleri içerir.

---

## 📋 Geliştirme Kuralları

1. **Kod Standardı ve Düzen:**
   - Proje Vanilla HTML5, CSS3 ve modern ES6 JavaScript standartlarını takip eder.
   - İşlevsel bileşenler için modüler yapıyı bozmayın (`src/main.js`).

2. **Tasarım ve Tipografi:**
   - Projenin havacılık ve taktiksel tasarım dilini (`--raptor-gold` tonları, Apple Liquid Glassmorphism) koruyun.
   - Emojiler yerine her zaman semantik **SVG ikonlar** tercih edilmelidir.

3. **Performans ve Medya:**
   - Repoya eklenecek yeni görseller ve 3D modeller optimize edilmiş olmalıdır.
   - 3D modeller için Draco sıkıştırması kullanılması tavsiye edilir.

---

## 🛠️ Yerel Geliştirme Süreci

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. HTML standart kontrolünü çalıştırın
npm run lint:html

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. GitHub Pages uyumlu test derlemesi yapın
$env:GITHUB_ACTIONS = "true"
npm run build
```

---

## 🔀 Pull Request (PR) Süreci

- Yapılan değişiklikleri net ve anlaşılır bir Conventional Commit formatında özetleyin (Örn: `feat(ui): add glassmorphism style`).
- PR göndermeden önce `npm run lint:html` ve `npm run build` komutlarının sorunsuz geçtiğinden emin olun.
