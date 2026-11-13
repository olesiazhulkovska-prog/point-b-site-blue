// @ts-nocheck
(function () {
  var ids = ["stats-section", "cases-section", "reviews-section"],
    els = [],
    raf = 0;
  function upd() {
    raf = 0;
    var vh = innerHeight;
    ids.forEach(function (id) {
      var e = document.getElementById(id);
      if (!e) return;
      var b = e.getBoundingClientRect().bottom;
      var p = (vh * 1.0 - b) / (vh * 0.62);
      p = Math.max(0, Math.min(1, p));
      e.style.setProperty("--arc-k", (1 - p).toFixed(3));
    });
  }
  function req() {
    if (!raf) raf = requestAnimationFrame(upd);
  }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  __pbxTick(upd);
})();
