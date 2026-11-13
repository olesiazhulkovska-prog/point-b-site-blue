// @ts-nocheck
(function () {
  function fit() {
    var land = innerWidth >= 1100 && innerHeight <= 900;
    document.querySelectorAll(".sv3-card").forEach(function (c) {
      var viz = c.querySelector(".sv3-viz"),
        dg = c.querySelector(".sv3-dg"),
        dgi = c.querySelector(".sv3-dgi");
      if (!viz || !dg || !dgi) return;
      dgi.style.removeProperty("--pb-k");
      dg.style.removeProperty("--pb-h");
      if (!land) return;
      var cs = getComputedStyle(c),
        vs = getComputedStyle(viz);
      var avail =
        c.clientHeight -
        parseFloat(cs.paddingTop) -
        parseFloat(cs.paddingBottom) -
        parseFloat(vs.paddingTop) -
        parseFloat(vs.paddingBottom) -
        4;
      var nat = dgi.offsetHeight;
      if (!nat || avail <= 0) return;
      var k = Math.max(0.5, Math.min(1, avail / nat));
      dgi.style.setProperty("--pb-k", k.toFixed(3));
      dg.style.setProperty("--pb-h", Math.round(dgi.offsetHeight * k) + "px");
    });
  }
  var n = 0,
    iv = setInterval(function () {
      fit();
      if (++n > 12) clearInterval(iv);
    }, 500);
  addEventListener("resize", function () {
    setTimeout(fit, 150);
    setTimeout(fit, 700);
    setTimeout(fit, 1800);
  });
  addEventListener("orientationchange", function () {
    setTimeout(fit, 300);
  });
  document.fonts && document.fonts.ready && document.fonts.ready.then(fit);
})();
