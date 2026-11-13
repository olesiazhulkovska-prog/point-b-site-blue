// @ts-nocheck
(function () {
  var L = null,
    t = false;
  function u() {
    t = false;
    if (!L || !L.isConnected) L = document.querySelector(".hero-L");
    if (!L) return;
    var cp = L.style.clipPath || getComputedStyle(L).clipPath;
    var m = /inset\(([\d.]+)px ([\d.]+)px/.exec(cp);
    var p = 1;
    if (m) {
      var w = innerWidth;
      p = 1 - parseFloat(m[2]) / w;
    } else if (/inset\(0(px)?\)/.test(cp)) {
      p = 1;
    }
    L.style.setProperty(
      "--pbx-o",
      Math.max(0, Math.min(1, (p - 0.45) / 0.4)).toFixed(3),
    );
  }
  function r() {
    if (!t) {
      t = true;
      requestAnimationFrame(u);
    }
  }
  addEventListener("scroll", r, { passive: true });
  addEventListener("resize", r);
  setTimeout(u, 300);
  setTimeout(u, 1200);
  if (window.__pbxTick) window.__pbxTick(u);
})();
