# GitHub’a ilk push

## Canlı site (GitHub Pages)

Repo **public** iken GitHub Pages ile herkese açık demo:

- Adres: `https://<kullanıcı>.github.io/<repo-adı>/` — örnek: https://texas1881.github.io/f22-raptor/
- Açmak için: repo **Settings → Pages → Build and deployment → Branch: `main`**, klasör **`/` (root)**.
- CLI: `gh api -X POST repos/OWNER/REPO/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"`

Bu makinede **Git** ve [GitHub CLI](https://cli.github.com/) (`gh`) kurulu olmalı.

## 1) Kurulum (yoksa)

- Git: https://git-scm.com/download/win  
- GitHub CLI: `winget install GitHub.cli` veya https://cli.github.com/

Yeni bir terminal açıp `git --version` ve `gh --version` ile doğrula.

## 2) Tek seferde repo oluştur + push

PowerShell’de (klasör adında boşluk var, tırnak kullan):

```powershell
cd "c:\Users\zephy\OneDrive\Belgeler\f22 raptor"

git init
git branch -M main
git add -A
git status
git commit -m "Initial commit: F-22 Raptor concept landing"

gh auth login
gh repo create f22-raptor --public --source=. --remote=origin --push
```

- Repo adını değiştirmek için `f22-raptor` yerine istediğin ismi yaz (GitHub’da boşluk kullanılmaz; tire kullan).
- **Özel repo** için: `--private` kullan.

## 3) `gh` yoksa (sadece Git)

1. GitHub’da yeni boş repo oluştur (README ekleme).
2. Sonra:

```powershell
cd "c:\Users\zephy\OneDrive\Belgeler\f22 raptor"
git init
git branch -M main
git add -A
git commit -m "Initial commit: F-22 Raptor concept landing"
git remote add origin https://github.com/KULLANICI_ADIN/f22-raptor.git
git push -u origin main
```

`KULLANICI_ADIN` ve repo URL’sini kendi hesabına göre değiştir.

## Not

Büyük dosyalar (`*.glb`, uzun videolar) repoyu şişirir; `.gitignore` içinde isteğe bağlı yorum satırları var — ihtiyaca göre aç/kapat.
