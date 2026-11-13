// @ts-nocheck
(function () {
  try {
    if (!matchMedia("(pointer:coarse)").matches) return;
    var d = document.documentElement,
      w = innerWidth;
    function m() {
      var p = document.createElement("div");
      p.style.cssText =
        "position:absolute;visibility:hidden;pointer-events:none;height:100svh;width:1px";
      d.appendChild(p);
      var h = p.offsetHeight;
      d.removeChild(p);
      return Math.round(Math.min(innerHeight, h || innerHeight));
    }
    function s() {
      d.style.setProperty("--pb-hh", m() + "px");
    }
    s();
    addEventListener("resize", function () {
      if (innerWidth !== w) {
        w = innerWidth;
        s();
      }
    });
    addEventListener("orientationchange", function () {
      setTimeout(function () {
        w = innerWidth;
        s();
      }, 350);
    });
  } catch (e) {}
})();
