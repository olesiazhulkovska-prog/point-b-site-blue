// @ts-nocheck
(function () {
  function init() {
    var g = document.querySelector(".hero-graph");
    if (
      !g ||
      g.__pbxIO ||
      !("IntersectionObserver" in window) ||
      (function () {
        try {
          return window.top !== window;
        } catch (e) {
          return true;
        }
      })()
    )
      return !!g;
    g.__pbxIO = 1;
    var io = new IntersectionObserver(
      function (es) {
        var e = es[es.length - 1];
        if (e.isIntersecting) {
          g.style.removeProperty("content-visibility");
          g.style.removeProperty("contain-intrinsic-size");
        } else {
          var r = g.getBoundingClientRect(),
            cs = getComputedStyle(g),
            ph =
              (parseFloat(cs.paddingTop) || 0) +
              (parseFloat(cs.paddingBottom) || 0) +
              (parseFloat(cs.borderTopWidth) || 0) +
              (parseFloat(cs.borderBottomWidth) || 0),
            pw =
              (parseFloat(cs.paddingLeft) || 0) +
              (parseFloat(cs.paddingRight) || 0) +
              (parseFloat(cs.borderLeftWidth) || 0) +
              (parseFloat(cs.borderRightWidth) || 0);
          g.style.setProperty(
            "contain-intrinsic-size",
            Math.max(0, Math.round(r.width - pw)) +
              "px " +
              Math.max(0, Math.round(r.height - ph)) +
              "px",
          );
          g.style.setProperty("content-visibility", "hidden");
        }
      },
      { rootMargin: "300px 0px 300px 0px" },
    );
    io.observe(g);
    return true;
  }
  /* disabled: toggling content-visibility while scrolling made Safari flicker */
})();
