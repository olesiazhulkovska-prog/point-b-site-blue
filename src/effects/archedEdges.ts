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
    /* service pages: the hero's arch flattens while the page scrolls up */
    var bands = document.querySelectorAll(".pb-band--arch");
    for (var i = 0; i < bands.length; i++) {
      var bb = bands[i].getBoundingClientRect().bottom;
      var k = Math.max(0, Math.min(1, (bb - vh * 0.3) / (vh * 0.55)));
      bands[i].style.setProperty("--arc-k", k.toFixed(3));
    }
  }
  function req() {
    if (!raf) raf = requestAnimationFrame(upd);
  }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  __pbxTick(upd);
})();
