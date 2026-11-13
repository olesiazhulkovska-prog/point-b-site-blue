// @ts-nocheck
(function () {
  var last = window.pageYOffset || 0,
    min = false,
    t = false,
    root = document.documentElement;
  function u() {
    t = false;
    var y = window.pageYOffset || 0,
      d = y - last;
    if (y <= 24) {
      min = false;
    } else if (d > 4 && y > 80) {
      min = true;
    } else if (d < -6) {
      min = false;
    }
    if (Math.abs(d) > 4 || y <= 24) last = y;
    root.classList.toggle("pb-logo-min", min);
  }
  addEventListener(
    "scroll",
    function () {
      if (!t) {
        t = true;
        requestAnimationFrame(u);
      }
    },
    { passive: true },
  );
  u();
})();
