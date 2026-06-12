3D vitrin için model dosyası:

- `f22.glb` (veya `.gltf` kullanıyorsanız `index.html` içindeki `<model-viewer src="...">` yolunu güncelleyin)
- Dosyayı bu klasöre koyun: `assets/models/f22.glb`
- Sayfayı **HTTP üzerinden** açın (ör. `npx --yes serve` veya VS Code Live Server). `file://` ile açınca model veya `model-viewer` modülü yüklenmeyebilir.
- **GitHub Pages / yavaş ağ:** Depodaki `f22.glb` onlarca MB olabilir; sayfa artık bu dosyayı **3D bölümü ekrana yaklaşana kadar** indirmez (`data-src` + `IntersectionObserver`). İlk yükleme yine uzun sürebilir; mümkünse daha küçük bir `.glb` veya Draco sıkıştırma kullanın.
