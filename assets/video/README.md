Hero tam ekran video (sessiz, döngü):

1. **Önerilen:** `f22-hero.mp4` veya `f22-hero.webm` bu klasöre.
2. **Alternatif ad:** `f22.mp4` (aynı klasörde).

`index.html` HTTP sunucusuyla açıldığında aday dosyalar için **paralel `HEAD`** atılır; **var olan ilk** (sıra: `f22-hero.mp4` → `f22-hero.webm` → `f22.mp4`) `<source>` olarak bağlanır; hepsi yoksa hero **statik gradient** kalır. İlk boyamadan hemen sonra (`requestAnimationFrame`) tarama başlar; uygun kaynak bulununca video `preload="auto"` ile tamponlamaya geçer.

Tarayıcılar otomatik oynatma için **ses kapalı** (`muted`) ister; sayfa bunu kodla da sabitler. Başlangıçta `<video preload="metadata">` vardır; geçerli kaynak seçildikten sonra `preload` `auto` yapılır.
