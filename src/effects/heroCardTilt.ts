// @ts-nocheck
(function () {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  var cards = [],
    cur = null,
    raf = 0,
    px = 0,
    py = 0;
  function pick() {
    var q = [].slice.call(
      document.querySelectorAll(
        ".hero-graph .hidden.md\\:block > .absolute.inset-0 > div.absolute > div," +
          ".hero-graph .hidden.md\\:block > .absolute.inset-0 > button.absolute > .pb-hero-float > div > div," +
          ".hero-L .\\32xl\\:block .rounded-2xl.p-4",
      ),
    );
    var fresh = q.filter(function (el) {
      return !el.__pbxHc;
    });
    fresh.forEach(function (el) {
      el.__pbxHc = 1;
      cards.push(el);
      el.classList.add("pbx-hc");
    });
    var stat = fresh.map(function (el) {
      return getComputedStyle(el).position === "static";
    });
    fresh.forEach(function (el, i) {
      if (stat[i]) el.style.position = "relative";
      var g = document.createElement("i");
      g.className = "pbx-hg";
      g.setAttribute("aria-hidden", "true");
      el.insertBefore(g, el.firstChild);
    });
    cards = cards.filter(function (e) {
      return document.contains(e);
    });
  }
  function off(el) {
    el.classList.remove("pbx-on");
    el.style.transform = "";
  }
  function frame() {
    raf = 0;
    var hit = null,
      hr = null;
    for (var i = 0; i < cards.length; i++) {
      var el = cards[i],
        r = el.getBoundingClientRect();
      if (
        r.width &&
        px >= r.left &&
        px <= r.right &&
        py >= r.top &&
        py <= r.bottom
      ) {
        hit = el;
        hr = r;
        break;
      }
    }
    if (cur && cur !== hit) off(cur);
    cur = hit;
    if (!hit) return;
    var nx = (px - hr.left) / hr.width - 0.5,
      ny = (py - hr.top) / hr.height - 0.5;
    hit.classList.add("pbx-on");
    hit.style.setProperty("--mx", (px - hr.left).toFixed(0) + "px");
    hit.style.setProperty("--my", (py - hr.top).toFixed(0) + "px");
    hit.style.transform =
      "perspective(900px) rotateX(" +
      (-ny * 5).toFixed(2) +
      "deg) rotateY(" +
      (nx * 6).toFixed(2) +
      "deg) translateY(-4px) scale(1.018)";
  }
  addEventListener(
    "pointermove",
    function (e) {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", function () {
    px = -1e4;
    py = -1e4;
    if (cur) {
      off(cur);
      cur = null;
    }
  });
  addEventListener(
    "scroll",
    function () {
      if (cur && !raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
  (
    window.__pbxTick ||
    function (f) {
      setTimeout(f, 600);
    }
  )(pick);
  setInterval(pick, 1500);
})();
