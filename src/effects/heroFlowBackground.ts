// @ts-nocheck
(function () {
  "use strict";
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var vh = window.innerHeight;
  var P = 0,
    textOp = 1;
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function ease(t) {
    return t * t * (3 - 2 * t);
  }
  function map(v, a, b, c, d) {
    return ((v - a) / (b - a)) * (d - c) + c;
  }

  var cv = document.getElementById("flow");
  if (!cv) return;
  var ctx = cv.getContext("2d");
  var W = 0,
    H = 0,
    fc = 0,
    raf = 0,
    running = false;
  var mouse = { y: -1, ty: 0 };
  var mask = { cx: 0, cy: 0, rx: 0, ry: 0, str: 0 };
  var TWO_PI = Math.PI * 2;
  var ICE = [170, 188, 255],
    PEACH = [255, 150, 40];
  var WORDS = [
    "CRM",
    "аналітика",
    "AI-бот",
    "фінанси",
    "продажі",
    "кероване зростання",
  ];
  var FACE = "'Manrope', 'Inter Variable', system-ui, sans-serif";

  function heroParts() {
    var h = document.getElementById("hero-dark");
    if (!h) return null;
    var box = h.querySelector(":scope > div.relative");
    if (!box) return null;
    return {
      h: h,
      box: box,
      h1: h.querySelector("h1"),
      nav: h.querySelector("nav"),
      cta: h.querySelector("#hero-services-btn"),
    };
  }

  function measureMask() {
    var hp = heroParts();
    if (!hp || !hp.h1) {
      mask.str = 0;
      return;
    }
    var els = [hp.h1, hp.nav, hp.cta && hp.cta.parentNode].filter(Boolean);
    var l = 1e9,
      r = -1e9,
      t = 1e9,
      b = -1e9;
    els.forEach(function (e) {
      var q = e.getBoundingClientRect();
      if (q.width === 0 && q.height === 0) return;
      l = Math.min(l, q.left);
      r = Math.max(r, q.right);
      t = Math.min(t, q.top);
      b = Math.max(b, q.bottom);
    });
    if (l > r) {
      mask.str = 0;
      return;
    }
    mask.cx = (l + r) / 2;
    mask.cy = (t + b) / 2;
    if (W < 768) {
      mask.rx = ((r - l) / 2) * 0.78 + 10;
      mask.ry = ((b - t) / 2) * 1.05 + 24;
    } else {
      mask.rx = ((r - l) / 2) * 1.14 + 48;
      mask.ry = ((b - t) / 2) * 1.3 + 48;
    }
    mask.str = textOp;
  }

  function sizeCanvas() {
    vh = window.innerHeight;
    var r = cv.getBoundingClientRect();
    var dpr =
      innerWidth < 768
        ? Math.min(window.devicePixelRatio || 1, 2)
        : Math.min(window.devicePixelRatio || 1, 1.5);
    LWD =
      dpr < 1
        ? 1.3
        : 1.9 / dpr; /* hairline: ~1 device px, like the footer vortex */
    W = r.width;
    H = r.height;
    cv.width = Math.max(1, Math.round(W * dpr));
    cv.height = Math.max(1, Math.round(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (mouse.y < 0) {
      mouse.y = H / 2;
      mouse.ty = H / 2;
    }
    if (reduce) draw();
  }

  var TW = {};
  var LWD = 1;
  function draw() {
    measureMask();
    ctx.clearRect(0, 0, W, H);
    var S = W < 768 ? 1 : 1,
      W0 = W,
      H0 = H,
      SX = W < 768 ? 0.45 : 1,
      SY = W < 768 ? 0.98 : 1;
    if (SX !== 1) {
      W = W0 / SX;
      H = H0 / SY;
      mask.cx /= SX;
      mask.cy /= SY;
      mask.rx /= SX;
      mask.ry /= SY;
      ctx.save();
      ctx.scale(SX, SY);
    }
    mouse.y += (mouse.ty - mouse.y) * 0.1;
    var isMobile = W < 768;
    var count = isMobile ? 20 : 76;
    var u = 55000 / 10;
    ctx.save();
    ctx.lineWidth = W0 < 768 ? 1.3 : LWD;
    ctx.font = "300 " + (W0 < 768 ? 20 : 12) + "px " + FACE;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var labels = [];
    var gap = isMobile ? 150 : 200;
    ctx.translate(W / 2, H + (isMobile ? 60 : 40));
    var f = map(mouse.y, 0, H, 1.2, -1.2) + P * 1.15;
    var m = Math.max(320, Math.min(1440, W));
    var rate = map(m, 320, 1440, 0.002, 0.0005) * (6 / 5);
    var p = fc * rate;
    var h = W / 2;
    for (var k = 0; k < count; k++) {
      var ang = map(k, 0, count, 0, Math.PI) + p;
      ang %= Math.PI;
      var l = (Math.tan(ang) - f) * H;
      var a = Math.abs(l) / 2;
      var yc = -H / 2 + l / 2;
      var bright =
        Math.max(0, Math.min(255, map(Math.abs(l), 0, u, -20, 255))) / 255;
      if (bright <= 0) continue;
      var q = Math.min(1, Math.max(0, (k / count - 0.55) / 0.45));
      q = q * q * (3 - 2 * q);
      var cr = Math.round(ICE[0] + (PEACH[0] - ICE[0]) * q);
      var cg = Math.round(ICE[1] + (PEACH[1] - ICE[1]) * q);
      var cb = Math.round(ICE[2] + (PEACH[2] - ICE[2]) * q);
      ctx.strokeStyle =
        "rgba(" +
        cr +
        "," +
        cg +
        "," +
        cb +
        "," +
        (bright * 0.95).toFixed(3) +
        ")";
      var wStyle =
        "rgba(" +
        cr +
        "," +
        cg +
        "," +
        cb +
        "," +
        Math.min(1, bright * 1.05).toFixed(3) +
        ")";
      if (a > 499999.5) {
        ctx.beginPath();
        ctx.moveTo(-h, -H / 2);
        ctx.lineTo(h, -H / 2);
        ctx.stroke();
        continue;
      }
      var c2 = Math.acos(Math.min(1, (h + 50) / a));
      var segTotal = Math.max(Math.ceil(a / 200), 110);
      var spans = [
        [c2, Math.PI - c2],
        [Math.PI + c2, TWO_PI - c2],
      ];
      for (var si = 0; si < 2; si++) {
        var start = spans[si][0],
          span = spans[si][1] - start;
        var n3 = Math.max(Math.ceil((span / TWO_PI) * segTotal), 60);
        var step = span / n3;
        ctx.beginPath();
        for (var s = 0; s <= n3; s++) {
          var aa = start + step * s;
          var xx = Math.cos(aa) * a;
          var yy = yc + Math.sin(aa) * a;
          if (s === 0) ctx.moveTo(xx, yy);
          else ctx.lineTo(xx, yy);
        }
        ctx.stroke();
        if (bright > 0.22 && W0 >= 768) {
          var dAng = gap / a;
          for (var j = 0; ; j++) {
            var ga = start + dAng * (j + 0.5);
            if (ga >= start + span) break;
            var gx = Math.cos(ga) * a;
            var gy = yc + Math.sin(ga) * a;
            if (gx < -h + 40 || gx > h - 40 || gy < -H - 30 || gy > -4)
              continue;
            var ta = ga + Math.PI / 2;
            if (Math.cos(ta) < 0) ta += Math.PI;
            labels.push({
              x: gx,
              y: gy,
              a: ta,
              t: WORDS[(k * 5 + j * 3 + si * 2) % WORDS.length],
              s: wStyle,
            });
          }
        }
      }
    }
    /* words on top of all lines, cutting a clean gap in the lines beneath (batched: one composite switch per pass) */
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000";
    for (var li = 0; li < labels.length; li++) {
      var L = labels[li];
      var tw = TW[L.t] || (TW[L.t] = ctx.measureText(L.t).width);
      L.w = tw;
      ctx.save();
      ctx.translate(L.x, L.y);
      ctx.rotate(L.a);
      ctx.fillRect(-tw / 2 - 9, -11, tw + 18, 22);
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-over";
    for (var lj = 0; lj < labels.length; lj++) {
      var M = labels[lj];
      ctx.save();
      ctx.translate(M.x, M.y);
      ctx.rotate(M.a);
      ctx.fillStyle = M.s;
      ctx.fillText(M.t, 0, 1);
      ctx.restore();
    }
    ctx.restore();

    /* soft elliptical clearing behind the hero headline and buttons */
    if (mask.str > 0.02) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(mask.cx, mask.cy);
      ctx.scale(mask.rx, mask.ry);
      var mg = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      mg.addColorStop(0, "rgba(17,17,68," + (0.82 * mask.str).toFixed(3) + ")");
      mg.addColorStop(
        0.6,
        "rgba(17,17,68," + (0.72 * mask.str).toFixed(3) + ")",
      );
      mg.addColorStop(1, "rgba(17,17,68,0)");
      ctx.fillStyle = mg;
      ctx.fillRect(-1, -1, 2, 2);
      ctx.restore();
    }
    if (SX !== 1) {
      ctx.restore();
      W = W0;
      H = H0;
    }
  }

  var lastT = 0;
  var scrAt = 0;
  if (window.__pbSafari)
    addEventListener(
      "scroll",
      function () {
        scrAt = performance.now();
      },
      { passive: true },
    );
  var dispChk = 0;
  function loop(t) {
    if (!dispChk && cv.isConnected && document.readyState === "complete") {
      dispChk = 1;
      if (getComputedStyle(cv).display === "none") {
        raf = 0;
        running = false;
        return;
      }
    }
    if (window.__pbSafari && performance.now() - scrAt < 160) {
      raf = requestAnimationFrame(loop);
      return;
    }
    if (!t || t - lastT >= 30) {
      lastT = t || 0;
      fc += 1;
      sync();
      draw();
    }
    raf = requestAnimationFrame(loop);
  }
  var bgSeen = true;
  function startLoop() {
    if (reduce || running || document.hidden || !bgSeen) return;
    if (cv && getComputedStyle(cv).display === "none") return;
    /* #69: canvas прихований назавжди — не малюємо вхолосту */ running = true;
    raf = requestAnimationFrame(loop);
  }
  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    running = false;
  }

  /* ================= scroll scene ================= */
  var lastP = -1,
    lastHero = null;
  function sync() {
    var hp = heroParts();
    var sy = window.scrollY || 0;
    /* pages without the hero screen start in the "scrolled" state so text stays readable */
    P = hp ? clamp(sy / (vh * 0.9), 0, 1) : 1;
    root.classList.toggle("pb-inner", !hp);
    textOp = hp ? clamp(1 - (P - 0.04) / 0.5, 0, 1) : 0;
    if (P !== lastP) {
      lastP = P;
      (window.__pbTint ||
        (window.__pbTint = document.querySelector(".scene-tint"))) &&
        window.__pbTint.style.setProperty("--p", P.toFixed(3));
      cv.style.opacity = (1 - 0.5 * P).toFixed(3);
    }
  }

  /* blocks that appear as you scroll: opacity, translateY 56px, scale .965 -> 1, stepped delays */
  var SELECTORS = [
    ["#stats-section .grid > div", 0],
    ["#services-section > div.grid", 60],
    ["#why-us-section div.overflow-x-auto", 0],
    ["#cases-section div.md\\:grid > div", 0],
    ['#reviews-section div[class*="snap-start"]', 0],
    ["#cta-section .cta-card", 0],
  ];
  var items = [];
  var seen = typeof WeakSet !== "undefined" ? new WeakSet() : null;
  function scan() {
    SELECTORS.forEach(function (pair) {
      var list = document.querySelectorAll(pair[0]);
      Array.prototype.forEach.call(list, function (e, i) {
        if (seen.has(e)) return;
        seen.add(e);
        items.push({ e: e, d: pair[1] + i * 90, top: 0, y: 0 });
      });
    });
  }
  function measureItems() {
    vh = window.innerHeight;
    var sy = window.scrollY || 0;
    items.forEach(function (it) {
      if (!it.e.isConnected) return;
      it.top = it.e.getBoundingClientRect().top + sy + it.y;
    });
    updateItems();
  }
  function updateItems() {
    var sy = window.scrollY || 0;
    items.forEach(function (it) {
      if (!it.e.isConnected) return;
      var vpTop = it.top - sy + it.d;
      var pr = ease(clamp((vh * 0.96 - vpTop) / (vh * 0.34), 0, 1));
      it.y = (1 - pr) * 56;
      it.e.style.opacity = pr >= 0.999 ? "" : pr.toFixed(3);
      it.e.style.translate = pr >= 0.999 ? "" : "0 " + it.y.toFixed(1) + "px";
      it.e.style.scale = pr >= 0.999 ? "" : (0.965 + 0.035 * pr).toFixed(4);
    });
  }
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        sync();
        updateItems();
        if (reduce) draw();
      });
    }
  }

  var scanTimer = 0;
  function rescan() {
    clearTimeout(scanTimer);
    scanTimer = setTimeout(function () {
      scan();
      measureItems();
      sync();
      if (reduce) draw();
    }, 120);
  }

  function relayout() {
    sizeCanvas();
    if (!reduce) {
      measureItems();
    }
    sync();
    if (reduce) draw();
  }
  fc = reduce ? 240 : 0;
  sizeCanvas();
  sync();
  if (!reduce) {
    startLoop();
    scan();
    measureItems();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", relayout);
  window.addEventListener("load", relayout);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(relayout);
  var appRoot = document.getElementById("root");
  if (window.MutationObserver && appRoot)
    new MutationObserver(rescan).observe(appRoot, {
      childList: true,
      subtree: true,
    });
  if (window.ResizeObserver && appRoot)
    new ResizeObserver(function () {
      if (!reduce) measureItems();
    }).observe(appRoot);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopLoop();
    else startLoop();
  });
  /* draw the background only while a section that shows it is on screen (hero, why-us) */
  (function () {
    if (!window.IntersectionObserver) return;
    var vis = {};
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          vis[e.target.id] = e.isIntersecting;
        });
        var on = !!vis["hero-dark"];
        cv.classList.toggle("pbx-off", !on);
        if (on && !bgSeen) {
          bgSeen = true;
          startLoop();
        } else if (!on && bgSeen) {
          bgSeen = false;
          stopLoop();
        }
      },
      { threshold: 0 },
    );
    var seen = {};
    __pbxTick(function () {
      ["hero-dark"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && !seen[id]) {
          seen[id] = 1;
          io.observe(el);
        }
      });
    });
  })();
  document.addEventListener(
    "pointermove",
    function (ev) {
      mouse.ty = ev.clientY;
    },
    { passive: true },
  );
})();
