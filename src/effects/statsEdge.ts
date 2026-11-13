// @ts-nocheck
(function () {
  function m() {
    var e = document.querySelector('#stats-section [class*="max-w-[1680px]"]');
    if (!e) return;
    var r = e.getBoundingClientRect(),
      c = getComputedStyle(e),
      w = document.documentElement.clientWidth;
    var l = Math.round(r.left + parseFloat(c.paddingLeft)),
      rr = Math.round(w - (r.right - parseFloat(c.paddingRight)));
    var d = document.documentElement.style;
    if (d.getPropertyValue("--pb-edge-l") !== l + "px")
      d.setProperty("--pb-edge-l", l + "px");
    if (d.getPropertyValue("--pb-edge-r") !== rr + "px")
      d.setProperty("--pb-edge-r", rr + "px");
    document.querySelectorAll(".hero-graph-in").forEach(function (g) {
      var z = parseFloat(getComputedStyle(g).zoom) || 1,
        v = ((w - l - rr) / z).toFixed(2) + "px";
      if (g.style.getPropertyValue("width") !== v)
        g.style.setProperty("width", v, "important");
    });
  }
  addEventListener("resize", m);
  addEventListener("load", m);
  [200, 800, 2000, 4000].forEach(function (t) {
    setTimeout(m, t);
  });
  setInterval(m, 1500);
  try {
    document.fonts && document.fonts.ready.then(m);
  } catch (e) {}
  var ro = window.ResizeObserver && new ResizeObserver(m),
    w = setInterval(function () {
      var e = document.querySelector(
        '#stats-section [class*="max-w-[1680px]"]',
      );
      if (e && ro) {
        ro.observe(e);
        clearInterval(w);
      }
    }, 300);
  new MutationObserver(function () {
    clearTimeout(m.t);
    m.t = setTimeout(m, 80);
  }).observe(document.body, { childList: true });
  m();
})();
