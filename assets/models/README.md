3D vitrin için model dosyası:

- `f22.glb` (veya `.gltf` kullanıyorsanız `index.html` içindeki `<model-viewer src="...">` yolunu güncelleyin)
- Dosyayı bu klasöre koyun: `assets/models/f22.glb`
- Sayfayı **HTTP üzerinden** açın (ör. `npx --yes serve` veya VS Code Live Server). `file://` ile açınca model veya `model-viewer` modülü yüklenmeyebilir.
- **GitHub Pages / yavaş ağ:** `f22.glb` çok büyükse indirme süresi yine uzun olur. Sayfa `<link rel="preload" as="fetch">` ile aynı dosyayı **erken** kuyruğa alır ve 3D bölümü için `IntersectionObserver` marjını geniş tutar; yine de en büyük kazanç **daha küçük model** (Draco / mesh optimizasyonu) ve mümkünse ayrı bir düşük çözünürlüklü hero videosudur.
