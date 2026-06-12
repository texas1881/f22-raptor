3D vitrin için model dosyası:

- `f22.glb` (veya `.gltf` kullanıyorsanız `index.html` içindeki `<model-viewer src="...">` yolunu güncelleyin)
- Dosyayı bu klasöre koyun: `assets/models/f22.glb`
- Sayfayı **HTTP üzerinden** açın (ör. `npx --yes serve` veya VS Code Live Server). `file://` ile açınca model veya `model-viewer` modülü yüklenmeyebilir.
- Sayfa `<link rel="preload" as="fetch">` ile GLB’yi erken kuyruğa alır; `model-viewer` tanımlandığında **`data-src` hemen `src` olur** (viewport beklenmez). İlk yükleme süresi büyük ölçüde dosya boyutu ve cihaz hızına bağlıdır; en büyük kazanç **daha küçük model** (Draco / mesh optimizasyonu) ve mümkünse ayrı bir düşük çözünürlüklü hero videosudur.
