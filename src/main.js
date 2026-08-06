/**
 * F-22 Raptor — Ana Uygulama Mantığı
 * 
 * Modüller:
 * 1. PreloadManager: Ağ tasarrufu modundayken GLB ön yüklemeyi engeller.
 * 2. NavigationController: Scroll takibi, aktif bölüm tespiti, nav ve gösterge güncellemeleri.
 * 3. HeroMediaController: Hero arka plan videosunun tespiti ve otomatik oynatılması.
 * 4. ScrollObserver: Reveal kaydırma animasyonları ve sayı sayaçları.
 * 5. ModelViewerController: 3D model yükleme, progres çubuğu ve 2D fallback etkileşimi.
 */

// === 1. PRELOAD MANAGER ===
(function initGlbPreload() {
  try {
    if (typeof navigator !== "undefined" && navigator.connection && navigator.connection.saveData) return;
    var base = typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
    if (base.slice(-1) !== "/") base += "/";
    var l = document.createElement("link");
    l.rel = "preload";
    l.href = base + "assets/models/f22.glb";
    l.as = "fetch";
    l.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(l);
  } catch (e) {
    // Graceful fallback
  }
})();

(function initApp() {
  var isFileProtocol = location.protocol === "file:";
  if (isFileProtocol) {
    document.documentElement.classList.add("is-file-protocol");
  }

  // File protocol banner kapatma butonu
  var fpClose = document.getElementById("fileProtocolClose");
  if (fpClose) {
    fpClose.addEventListener("click", function () {
      document.documentElement.classList.remove("is-file-protocol");
    });
  }

  // === 2. NAVIGATION CONTROLLER ===
  function initNavigationController() {
    var nav = document.getElementById("nav");
    var heroEl = document.getElementById("hero");
    var parallaxBg = document.getElementById("parallaxBg");
    var chapterRail = document.getElementById("chapterRail");
    var sectionIndicator = document.getElementById("sectionIndicator");
    var sectionIndicatorLabel = document.getElementById("sectionIndicatorLabel");

    // Bölüm haritası: id -> başlık, light (açık/koyu tema kontrolü)
    var sectionMap = [
      { id: "hero",         label: "Hero",           light: false },
      { id: "overview",     label: "Overview",       light: true  },
      { id: "model-3d",     label: "3D Model",       light: false },
      { id: "finale",       label: "Finale",         light: false },
      { id: "vitrine-spec", label: "Specifications", light: false }
    ];

    var sectionEls = sectionMap.map(function (s) {
      return { el: document.getElementById(s.id), meta: s };
    });
    var railItems = chapterRail ? chapterRail.querySelectorAll(".chapter-rail__item") : [];

    function getActiveSection() {
      var active = sectionEls[0];
      for (var i = 0; i < sectionEls.length; i++) {
        var item = sectionEls[i];
        if (!item.el) continue;
        if (item.el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          active = item;
        }
      }
      return active;
    }

    var _lastActiveId = null;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;

      // Nav arkaplan değişimi
      var pastHero = heroEl ? y > Math.max(0, heroEl.offsetHeight - 72) : y > 120;
      if (nav) {
        nav.classList.toggle("nav--past-hero", pastHero);
        nav.classList.toggle("nav--at-hero", !pastHero);
      }

      // Parallax arkaplan efekti
      if (parallaxBg) {
        parallaxBg.style.transform = "translate3d(0, " + (y * 0.04) + "px, 0)";
      }

      // Aktif bölüm tespiti
      var activeSection = getActiveSection();
      var activeId = activeSection ? activeSection.meta.id : null;

      if (activeId !== _lastActiveId) {
        _lastActiveId = activeId;

        // Navigasyon dot'larını güncelle
        if (railItems.length) {
          for (var k = 0; k < railItems.length; k++) {
            var href = railItems[k].getAttribute("href");
            var isActive = href === "#" + activeId;
            railItems[k].classList.toggle("is-active", isActive);
          }
        }

        // Açık/Koyu tema sınıflarını uygula
        var isLight = activeSection && !!activeSection.meta.light;
        if (chapterRail) chapterRail.classList.toggle("on-light", isLight);

        // Sol alt bölüm göstergesini güncelle
        if (sectionIndicator && sectionIndicatorLabel && activeSection) {
          sectionIndicatorLabel.textContent = activeSection.meta.label;
          sectionIndicator.classList.toggle("on-light", isLight);
          sectionIndicator.classList.add("is-visible");
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return { onScroll: onScroll };
  }

  // === 3. HERO MEDIA CONTROLLER ===
  function initHeroMediaController() {
    var heroVideo = document.getElementById("heroVideo");
    var heroEl = document.getElementById("hero");
    if (!heroVideo || !heroEl) return;

    var heroSources = [
      { url: "assets/video/f22-hero.mp4", type: "video/mp4" },
      { url: "assets/video/f22-hero.webm", type: "video/webm" },
      { url: "assets/video/f22.mp4", type: "video/mp4" }
    ];

    function bindHeroVideoControls() {
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.setAttribute("muted", "");
      heroVideo.volume = 0;

      heroVideo.addEventListener("volumechange", function () {
        if (!heroVideo.muted) {
          heroVideo.muted = true;
          heroVideo.volume = 0;
        }
      });

      heroVideo.addEventListener("error", function () {
        heroEl.classList.add("hero--static");
      });

      var p = heroVideo.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {
          heroEl.classList.add("hero--static");
        });
      }
    }

    function startHero() {
      Promise.all(
        heroSources.map(function (s) {
          return fetch(s.url, { method: "HEAD", cache: "force-cache" })
            .then(function (resp) {
              var ct = (resp.headers.get("content-type") || "").toLowerCase();
              // SPA HTML fallback yanıtlarını ele
              return resp.ok && ct.indexOf("text/html") === -1;
            })
            .catch(function () {
              return false;
            });
        })
      ).then(function (oks) {
        var picked = -1;
        for (var j = 0; j < oks.length; j++) {
          if (oks[j]) {
            picked = j;
            break;
          }
        }
        if (picked < 0) picked = 0;

        var hs = heroSources[picked];
        var src = document.createElement("source");
        src.src = hs.url;
        src.type = hs.type;
        heroVideo.preload = "auto";
        heroVideo.appendChild(src);
        heroVideo.load();
        bindHeroVideoControls();
      });
    }

    if (isFileProtocol) {
      heroEl.classList.add("hero--static");
      bindHeroVideoControls();
    } else {
      requestAnimationFrame(function () {
        startHero();
      });
    }
  }

  // === 4. SCROLL & ANIMATION OBSERVER ===
  function initScrollObserver() {
    // Reveal kaydırma animasyonu
    var revealEls = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });

    // Sayı sayaçları animasyonu
    function animateCounter(el, target, prefix, suffix, duration) {
      var start = performance.now();
      function frame(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = Math.round(target * eased);
        el.textContent = (prefix || "") + val + (suffix || "");
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || entry.target.dataset.done) return;
          entry.target.dataset.done = "1";
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-target"));
          var suffix = el.getAttribute("data-suffix") || "";
          var prefix = el.getAttribute("data-prefix") || "";
          if (!isNaN(target)) animateCounter(el, target, prefix, suffix, 1400);
        });
      },
      { threshold: 0.35 }
    );

    document.querySelectorAll("[data-counter]").forEach(function (c) {
      counterObserver.observe(c);
    });

    // Pürüzsüz bağlantı kaydırması (Smooth Anchor Scroll)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var id = anchor.getAttribute("href");
        if (!id || id.length < 2) return;
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // === 5. MODEL VIEWER & 3D SHOWCASE CONTROLLER ===
  function initModelViewerController(navController) {
    var mvLoading = document.getElementById("mvLoading");
    var raptorMv = document.getElementById("raptorMv");
    var fallback3d = document.getElementById("fallback3d");
    var showcaseFrame = document.querySelector(".vitrine-studio .showcase3d__frame");
    var fake3dHull = document.getElementById("fake3dHull");

    var turntableAzimuth = 0;
    var fakeTurntableY = -12;
    var mvOrbitPhi = 70;
    var mvOrbitRadius = "54%";

    // === HIZLI KAMERA AÇI BUTONLARI & DÖNÜŞ KONTROLÜ ===
    var mvControls = document.getElementById("mvControls");
    if (mvControls && raptorMv) {
      var presetBtns = mvControls.querySelectorAll("[data-mv-orbit]");
      presetBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var orbitStr = btn.getAttribute("data-mv-orbit");
          if (!orbitStr) return;
          try {
            raptorMv.cameraOrbit = orbitStr;
          } catch (err) {}
          presetBtns.forEach(function (b) { b.classList.remove("is-active"); });
          btn.classList.add("is-active");
        });
      });

      // Zoom In (+), Zoom Out (-), Reset View
      var zoomInBtn = document.getElementById("mvZoomIn");
      if (zoomInBtn) {
        zoomInBtn.addEventListener("click", function () {
          try {
            var currentFov = parseFloat(raptorMv.getFieldOfView()) || 28;
            var newFov = Math.max(15, currentFov - 5);
            raptorMv.fieldOfView = newFov + "deg";
          } catch (err) {}
        });
      }

      var zoomOutBtn = document.getElementById("mvZoomOut");
      if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", function () {
          try {
            var currentFov = parseFloat(raptorMv.getFieldOfView()) || 28;
            var newFov = Math.min(45, currentFov + 5);
            raptorMv.fieldOfView = newFov + "deg";
          } catch (err) {}
        });
      }

      var resetBtn = document.getElementById("mvResetView");
      if (resetBtn) {
        resetBtn.addEventListener("click", function () {
          try {
            raptorMv.cameraOrbit = "45deg 70deg 54%";
            raptorMv.fieldOfView = "28deg";
          } catch (err) {}
          presetBtns.forEach(function (b) { b.classList.remove("is-active"); });
          if (presetBtns[0]) presetBtns[0].classList.add("is-active");
        });
      }

      var rotateToggle = document.getElementById("mvRotateToggle");
      if (rotateToggle) {
        if (raptorMv.hasAttribute("auto-rotate")) {
          rotateToggle.classList.add("is-active");
        }
        rotateToggle.addEventListener("click", function () {
          var isRotating = raptorMv.hasAttribute("auto-rotate");
          if (isRotating) {
            raptorMv.removeAttribute("auto-rotate");
            rotateToggle.classList.remove("is-active");
          } else {
            raptorMv.setAttribute("auto-rotate", "");
            rotateToggle.classList.add("is-active");
          }
        });
      }
    }

    function applyMvTurntable() {
      if (!raptorMv || raptorMv.style.display === "none") return;
      var a = ((turntableAzimuth % 360) + 360) % 360;
      try {
        raptorMv.cameraOrbit = a + "deg " + mvOrbitPhi + "deg " + mvOrbitRadius;
      } catch (e) {}
    }

    function applyResponsiveMvLayout() {
      if (!raptorMv || raptorMv.style.display === "none") return;
      var narrow = window.matchMedia("(max-width: 768px)").matches;
      try {
        if (narrow) {
          raptorMv.removeAttribute("disable-zoom");
          raptorMv.setAttribute("orbit-sensitivity", "1.05");
          raptorMv.setAttribute("field-of-view", "34deg");
          raptorMv.setAttribute("min-field-of-view", "28deg");
          raptorMv.setAttribute("max-field-of-view", "40deg");
          mvOrbitPhi = 68;
          mvOrbitRadius = "72%";
        } else {
          raptorMv.setAttribute("disable-zoom", "");
          raptorMv.setAttribute("orbit-sensitivity", "0.38");
          raptorMv.setAttribute("field-of-view", "29deg");
          raptorMv.setAttribute("min-field-of-view", "29deg");
          raptorMv.setAttribute("max-field-of-view", "29deg");
          mvOrbitPhi = 70;
          mvOrbitRadius = "54%";
        }
      } catch (e) {}
    }

    var mvLayoutResizeTimer;
    window.addEventListener(
      "resize",
      function () {
        if (navController) navController.onScroll();
        window.clearTimeout(mvLayoutResizeTimer);
        mvLayoutResizeTimer = window.setTimeout(function () {
          applyResponsiveMvLayout();
          applyMvTurntable();
        }, 120);
      },
      { passive: true }
    );

    function wireCameraSync() {
      if (!raptorMv || raptorMv.dataset.camSync) return;
      raptorMv.dataset.camSync = "1";
      raptorMv.addEventListener("camera-change", function () {
        try {
          if (typeof raptorMv.getCameraOrbit !== "function") return;
          var o = raptorMv.getCameraOrbit();
          if (o && typeof o.theta === "number") turntableAzimuth = o.theta;
        } catch (e) {}
      });
    }

    function endMvLoading() {
      if (!mvLoading) return;
      mvLoading.classList.add("is-done");
      mvLoading.setAttribute("aria-busy", "false");
    }

    function wireFallbackParallax() {
      if (!showcaseFrame || !fake3dHull || showcaseFrame.dataset.parallaxWired) return;
      showcaseFrame.dataset.parallaxWired = "1";

      function applyTilt(xn, yn) {
        var rx = 8 - yn * 16;
        var ry = fakeTurntableY + xn * 12;
        fake3dHull.style.transform = "rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      }

      function resetTilt() {
        fake3dHull.style.transform = "rotateX(8deg) rotateY(" + fakeTurntableY + "deg)";
      }

      showcaseFrame.addEventListener("mousemove", function (e) {
        if (!fallback3d || fallback3d.hidden) return;
        var r = showcaseFrame.getBoundingClientRect();
        applyTilt((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      });

      showcaseFrame.addEventListener("mouseleave", function () {
        if (fallback3d && !fallback3d.hidden) resetTilt();
      });

      showcaseFrame.addEventListener(
        "touchmove",
        function (e) {
          if (!fallback3d || fallback3d.hidden || !e.touches || e.touches.length !== 1) return;
          var r = showcaseFrame.getBoundingClientRect();
          var t = e.touches[0];
          applyTilt((t.clientX - r.left) / r.width - 0.5, (t.clientY - r.top) / r.height - 0.5);
        },
        { passive: true }
      );

      showcaseFrame.addEventListener("touchend", function () {
        if (fallback3d && !fallback3d.hidden) resetTilt();
      });
    }

    function activateFallback() {
      endMvLoading();
      if (raptorMv) raptorMv.style.display = "none";
      if (showcaseFrame) showcaseFrame.classList.add("showcase3d--fallback");
      if (fallback3d) fallback3d.hidden = false;
      wireFallbackParallax();
    }

    function initShowcase3d() {
      if (!raptorMv || !mvLoading) return;
      if (raptorMv.dataset.mv3dInit === "1") return;
      raptorMv.dataset.mv3dInit = "1";

      var pctEl = document.getElementById("mvLoadPct");
      var barEl = document.getElementById("mvLoadBar");

      raptorMv.addEventListener("progress", function (e) {
        if (!pctEl && !barEl) return;
        var p = null;
        try {
          var d = e.detail;
          if (d && typeof d.totalProgress === "number") {
            p = d.totalProgress;
          } else if (d && typeof d.loaded === "number" && typeof d.total === "number" && d.total > 0) {
            p = d.loaded / d.total;
          }
        } catch (err) {}
        if (p == null || isNaN(p)) return;
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        var pc = Math.round(p * 100);
        if (pctEl) pctEl.textContent = pc + "%";
        if (barEl) barEl.style.width = pc + "%";
      });

      var hung = window.setTimeout(function () {
        if (mvLoading && !mvLoading.classList.contains("is-done")) {
          activateFallback();
        }
      }, 180000);

      function clearHung() {
        window.clearTimeout(hung);
      }

      raptorMv.addEventListener(
        "load",
        function () {
          clearHung();
          endMvLoading();
          var pctDone = document.getElementById("mvLoadPct");
          var barDone = document.getElementById("mvLoadBar");
          if (pctDone) pctDone.textContent = "100%";
          if (barDone) barDone.style.width = "100%";
          applyResponsiveMvLayout();
          try {
            if (typeof raptorMv.getCameraOrbit === "function") {
              var o = raptorMv.getCameraOrbit();
              if (o && typeof o.theta === "number") turntableAzimuth = o.theta;
            }
          } catch (e) {}
          applyMvTurntable();
          var orbitHint = document.getElementById("mvOrbitHint");
          if (orbitHint) orbitHint.hidden = false;
        },
        { once: true }
      );

      raptorMv.addEventListener(
        "error",
        function () {
          clearHung();
          activateFallback();
        },
        { once: true }
      );
    }

    function queueDeferredModelLoad() {
      if (!raptorMv || !mvLoading) return;
      var modelUrl = raptorMv.getAttribute("data-src");
      if (!modelUrl) {
        initShowcase3d();
        return;
      }
      if (raptorMv.dataset.deferredModelStarted === "1") return;
      raptorMv.dataset.deferredModelStarted = "1";
      mvLoading.classList.remove("is-done");
      mvLoading.setAttribute("aria-busy", "true");

      var pctBoot = document.getElementById("mvLoadPct");
      var barBoot = document.getElementById("mvLoadBar");
      if (pctBoot) pctBoot.textContent = "0%";
      if (barBoot) barBoot.style.width = "0%";

      raptorMv.setAttribute("src", modelUrl);
      initShowcase3d();
    }

    if (isFileProtocol) {
      if (raptorMv) {
        raptorMv.removeAttribute("src");
        raptorMv.removeAttribute("data-src");
      }
      activateFallback();
      var st = document.querySelector(".viz-slate__stamp");
      if (st) st.textContent = "ORIGIN · NULL";
      var fm = document.getElementById("fake3dMsg");
      if (fm) {
        fm.textContent =
          "Opening via file:// blocks loading the .glb (CORS). From the project folder run «npx --yes serve», then open http://localhost… · expected path: assets/models/f22.glb";
      }
    } else if (window.customElements && typeof customElements.whenDefined === "function") {
      Promise.race([
        customElements.whenDefined("model-viewer"),
        new Promise(function (_, rej) {
          setTimeout(function () {
            rej(new Error("model-viewer-timeout"));
          }, 30000);
        }),
      ])
        .then(queueDeferredModelLoad)
        .catch(function () {
          activateFallback();
        });
    } else {
      activateFallback();
    }

    wireCameraSync();
    applyResponsiveMvLayout();
  }

  // Modülleri Başlat
  var navController = initNavigationController();
  initHeroMediaController();
  initScrollObserver();
  initModelViewerController(navController);
})();
