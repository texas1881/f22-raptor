# Geliştirici ve Ekip Yönergeleri

Bu belge, **F-22 Raptor** projesinde kod yazarken uyulması gereken temel prensipleri ve çalışma kurallarını içerir.

---

## 📌 Temel Kurallar

1. **Ana Dosyalar:**
   - Değişiklikler temel olarak `index.html`, `src/main.js`, `src/style.css` ve `vite.config.js` dosyalarında gerçekleştirilir.

2. **Büyük Dosya Yönetimi:**
   - Repoya büyük `.glb` modelleri veya yüksek boyutlu `.mp4` videoları eklemeden önce `.gitignore` tercihlerini kontrol edin.

3. **HTML ve Stil Bütünlüğü:**
   - Stiller doğrudan `src/style.css` içinde tutulur. `index.html` içerisindeki `<head>` font ve CSS bağlantı sıralamasına müdahale etmeyin.

4. **Test ve Derleme:**
   - Commit atmadan önce `npm run lint:html` ve `$env:GITHUB_ACTIONS="true"; npm run build` komutlarının yeşil bittiğinden emin olun.
