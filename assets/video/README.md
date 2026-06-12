Hero tam ekran video (sessiz, döngü):

1. **Önerilen:** `f22-hero.mp4` veya `f22-hero.webm` bu klasöre.
2. **Alternatif ad:** `f22.mp4` (aynı klasörde).

`index.html` HTTP sunucusuyla açıldığında yalnızca **var olan** ilk dosyayı yükler (`HEAD` ile kontrol); dosya yoksa konsolda 404 yağmuru olmaz, hero **statik gradient** kalır. Video isteği tarayıcı boştayken **requestIdleCallback** ile birkaç saniye geciktirilir; böylece ilk boyama ve fontlar öne çıkar.

Tarayıcılar otomatik oynatma için **ses kapalı** (`muted`) ister; sayfa bunu kodla da sabitler. Hero `<video>` için `preload="metadata"` kullanılır (tam dosyayı baştan çekmez).
