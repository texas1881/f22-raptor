# GitHub Dağıtım ve Yayınlama Rehberi

Bu doküman, projenin GitHub deposuna aktarılması ve **GitHub Pages** üzerinde canlıya alınması süreçlerini adım adım açıklamaktadır.

---

## 🚀 GitHub Pages Otomatik Otomasyonu (GitHub Actions)

Proje **Vite** derleme altyapısını kullanır. `.github/workflows/pages.yml` iş akışı, `main` dalına yapılan her push işleminde projeyi otomatik olarak derler ve canlı ortama aktarır.

### Ayar Adımları:
1. GitHub deposunda **Settings → Pages** sekmesine gidin.
2. **Build and deployment** başlığı altındaki **Source** seçeneğini **GitHub Actions** olarak ayarlayın.
3. Push işlemi sonrasında **Actions** sekmesinden otomatik dağıtım sürecini takip edin.

**Canlı Adres Formatı:** `https://<kullanıcı-adı>.github.io/f22-raptor/`

---

## 🛠️ Manuel Git Push Komutları

```powershell
# 1. Değişiklikleri inceleyin
git status

# 2. Değişiklikleri sahneye ekleyin
git add .

# 3. Profesyonel commit mesajı ile kaydedin
git commit -m "feat(3d): optimize 3D model controls and zoom capabilities"

# 4. GitHub ana dalına aktarın
git push origin main
```

---

## ⚠️ Dikkat Edilmesi Gereken Hususlar

- **Büyük Medya Dosyaları:** 96 MB üzerindeki medya dosyalarının repoya eklenmesi önerilmez. Gerekirse `.gitignore` içerisinden medya yollarını yönetin.
- **Base Path Uyumluluğu:** Vite yerel çalışırken base path `/`, derleme sırasında `GITHUB_ACTIONS="true"` değişkeniyle `/f22-raptor/` olarak ayarlanır.
