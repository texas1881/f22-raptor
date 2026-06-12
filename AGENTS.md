# Agent / ekip notları

- **Dokunulacak kök:** `index.html`, `src/main.js`, `src/style.css`, `public/assets/`, `vite.config.js`.
- **Büyük binary:** `*.glb`, uzun videolar — commit öncesi boyut ve `.gitignore` tercihini kontrol et.
- **`<head>`:** `</style>` kapanışı yok; stil `src/style.css` içinde. `index.html`’de `</head>` öncesi link sırasını bozma (font → app CSS).
- **Harici script:** `model-viewer` URL veya `integrity` değişince tüm tarayıcılarda smoke test.
- **PR:** Mümkünse küçük diff; `npm run lint:html` ve `GITHUB_ACTIONS=true npm run build` yeşil olsun.
