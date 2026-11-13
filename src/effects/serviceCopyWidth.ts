// @ts-nocheck
(function () {
  /* width of the heading TEXT (its longest line) drives the width of the description and bullets under it */
  var raf = 0;
  function run() {
    raf = 0;
    document.querySelectorAll(".sv3-copy").forEach(function (c) {
      var h = c.querySelector(".sv3-h3");
      if (!h) return;
      var cw = c.getBoundingClientRect().width;
      if (!cw) return;
      var r = document.createRange();
      r.selectNodeContents(h);
      var tw = Math.ceil(r.getBoundingClientRect().width);
      if (!tw) return;
      var w = Math.min(cw, Math.max(tw, Math.min(cw, 320)));
      if (c.__pbtw !== w) {
        c.__pbtw = w;
        c.style.setProperty("--pb-tw", w + "px");
      }
    });
  }
  function q() {
    if (!raf) raf = requestAnimationFrame(run);
  }
  addEventListener("resize", q);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(q);
  /* #69: реагуємо лише на зміни всередині карток послуг, а не на кожну анімацію на сторінці */
  new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) {
      var t = ms[i].target;
      if (t && t.closest && (t.closest(".sv3-card") || t.id === "root")) {
        q();
        return;
      }
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "data-active", "data-closed", "style"],
  });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(q);
    var wire = function () {
      document.querySelectorAll(".sv3-h3,.sv3-copy").forEach(function (e) {
        if (!e.__pbro) {
          e.__pbro = 1;
          ro.observe(e);
        }
      });
    };
    new MutationObserver(wire).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    wire();
  }
  q();
})();
