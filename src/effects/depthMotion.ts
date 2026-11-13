// @ts-nocheck
(function () {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var root = document.documentElement,
    sda = false;
  try {
    sda = !!(
      window.CSS &&
      CSS.supports &&
      CSS.supports("animation-timeline: view()")
    );
  } catch (e) {}
  if (sda) root.classList.add("pbx-sda");
  function clamp(v, a, b) {
    return v < a ? a : v > b ? b : v;
  }

  /* ---- cards: mark for native view() entrance, or IO fallback ---- */
  var CARDS =
    '[id^="home-case-card"],#reviews-section figure,#stats-section .grid>div';
  var cio = null;
  if (!sda && "IntersectionObserver" in window)
    cio = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("pbx-sd-in");
            cio.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  function inHScroll(el) {
    for (
      var p = el.parentElement;
      p && p !== document.body;
      p = p.parentElement
    ) {
      var o = getComputedStyle(p).overflowX;
      if ((o === "auto" || o === "scroll") && p.scrollWidth > p.clientWidth + 1)
        return true;
    }
    return false;
  }
  function sync() {
    var els = [].slice.call(document.querySelectorAll(CARDS));
    /* read phase first (scrollWidth/getComputedStyle), then writes: avoids a forced layout per card */
    els.forEach(function (el) {
      var kw = innerWidth + ":" + el.parentElement.children.length;
      if (el.__pbxHk !== kw) {
        el.__pbxHk = kw;
        el.__pbxHv = inHScroll(el);
      }
    });
    els.forEach(function (el) {
      var want = !el.__pbxHv;
      if (want && !el.__pbxSd) {
        el.__pbxSd = 1;
        var i = [].indexOf.call(el.parentElement.children, el);
        el.style.setProperty("--c", String(i % 3));
        el.classList.add("pbx-sd");
        if (cio) cio.observe(el);
      } else if (!want && el.__pbxSd) {
        el.__pbxSd = 0;
        el.classList.remove("pbx-sd", "pbx-sd-in");
        el.style.removeProperty("--c");
        if (cio) cio.unobserve(el);
      }
    });
  }
  __pbxTick(sync);
  var rt = 0;
  addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(sync, 200);
  });

  /* ---- hero: parallax from mouse + scroll, orange glow and trail lines ---- */
  var hero,
    fan,
    bg,
    fx,
    glow,
    trs = [],
    heroVis = false,
    raf = 0,
    last = 0;
  var T = { x: 0, y: 0, s: 0 },
    C = { x: 0, y: 0, s: 0 },
    P = { x: 0, y: 0, on: false, t: 0 },
    G = { x: 0, y: 0, o: 0 },
    hist = [];
  function fine() {
    return (
      matchMedia("(hover:hover) and (pointer:fine)").matches && innerWidth > 760
    );
  }
  function kick() {
    if (!raf && heroVis) raf = requestAnimationFrame(frame);
  }
  function frame(now) {
    raf = 0;
    var dt = Math.min(64, now - (last || now));
    last = now;
    var k = 1 - Math.pow(0.002, dt / 800); /* ease-out settle in ~0.8s */
    C.x += (T.x - C.x) * k;
    C.y += (T.y - C.y) * k;
    C.s += (T.s - C.s) * k;
    fan.style.setProperty("--hx", C.x.toFixed(4));
    fan.style.setProperty("--hy", C.y.toFixed(4));
    fan.style.setProperty("--hs", C.s.toFixed(4));
    if (bg) {
      bg.style.setProperty("--bx", (C.x * 36).toFixed(1));
      bg.style.setProperty("--by", (C.y * 26 - C.s * 70).toFixed(1));
    }
    var active =
      Math.abs(T.x - C.x) > 0.002 ||
      Math.abs(T.y - C.y) > 0.002 ||
      Math.abs(T.s - C.s) > 0.002;
    if (fx && fine()) {
      var live = P.on && now - P.t < 1400;
      if (P.on) {
        hist.push({ x: P.x, y: P.y });
        if (hist.length > 30) hist.shift();
      }
      var gk = 1 - Math.pow(0.004, dt / 800);
      G.x += (P.x - G.x) * gk;
      G.y += (P.y - G.y) * gk;
      G.o += ((P.on ? 1 : 0) - G.o) * k;
      glow.style.opacity = G.o.toFixed(3);
      glow.style.transform =
        "translate3d(" + G.x.toFixed(1) + "px," + G.y.toFixed(1) + "px,0)";
      var n = hist.length,
        sp = 0;
      if (n > 3) {
        var a = hist[n - 1],
          b = hist[n - 4];
        sp = Math.hypot(a.x - b.x, a.y - b.y) / 3;
      }
      var sn = clamp(sp / 16, 0, 1),
        vis = 0;
      for (var j = 0; j < trs.length; j++) {
        var i1 = n - 1 - j * 3,
          i0 = i1 - 2,
          el = trs[j];
        if (i0 < 0 || !live) {
          el.style.opacity = "0";
          continue;
        }
        var p1 = hist[i1],
          p0 = hist[i0],
          ang = Math.atan2(p1.y - p0.y, p1.x - p0.x),
          ln = clamp(Math.hypot(p1.x - p0.x, p1.y - p0.y) / 10, 0.25, 1.6),
          o = sn * (1 - j / trs.length) * 0.9;
        el.style.opacity = o.toFixed(3);
        vis += o;
        el.style.transform =
          "translate3d(" +
          p1.x.toFixed(1) +
          "px," +
          p1.y.toFixed(1) +
          "px,0) rotate(" +
          ang.toFixed(3) +
          "rad) scaleX(" +
          ln.toFixed(2) +
          ")";
      }
      if (live || G.o > 0.01 || vis > 0.01) active = true;
    }
    if (active && heroVis) raf = requestAnimationFrame(frame);
    else last = 0;
  }
  function onMove(e) {
    if (!heroVis || !fan) return;
    if (!fine()) {
      T.x = 0;
      T.y = 0;
      return;
    }
    T.x = clamp((e.clientX / innerWidth - 0.5) * 2, -1, 1);
    T.y = clamp((e.clientY / innerHeight - 0.5) * 2, -1, 1);
    var r = hero.getBoundingClientRect();
    P.x = e.clientX - r.left;
    P.y = e.clientY - r.top;
    P.on = P.y >= 0 && P.y <= r.height;
    P.t = performance.now();
    if (!P.on) {
      return;
    }
    kick();
  }
  function onScroll() {
    if (!fan) return;
    T.s = clamp(scrollY / Math.max(1, innerHeight), 0, 1.2);
    kick();
  }
  function onLeave() {
    T.x = 0;
    T.y = 0;
    P.on = false;
    kick();
  }
  function init() {
    hero = document.getElementById("hero-dark");
    if (!hero) return;
    fan = hero.querySelector(".hero-fan");
    if (!fan || hero.__pbxFx) return;
    hero.__pbxFx = 1;
    bg = document.querySelector(".scene-bg");
    fx = document.createElement("div");
    fx.className = "pbx-fx";
    fx.setAttribute("aria-hidden", "true");
    glow = document.createElement("div");
    glow.className = "pbx-cg";
    fx.appendChild(glow);
    /* v83: old trail lines replaced by the pixel-trail cursor below */
    hero.insertBefore(fx, hero.children[2] || null);
    if ("IntersectionObserver" in window)
      new IntersectionObserver(function (es) {
        heroVis = es[es.length - 1].isIntersecting;
        if (heroVis) {
          onScroll();
          kick();
        }
      }).observe(hero);
    else heroVis = true;
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    addEventListener("blur", onLeave);
    onScroll();
  }
  __pbxTick(init);
})();
