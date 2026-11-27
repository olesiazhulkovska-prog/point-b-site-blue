// iOS Safari: if the page ever gets panned sideways, snap back (content shifted left while the fixed header stayed)
(function () {
  var busy = false;
  function fix() {
    busy = false;
    var x = window.scrollX || document.documentElement.scrollLeft || 0;
    if (x > 0) window.scrollTo(0, window.scrollY);
  }
  addEventListener(
    "scroll",
    function () {
      if (!busy && (window.scrollX || document.documentElement.scrollLeft)) {
        busy = true;
        requestAnimationFrame(fix);
      }
    },
    { passive: true },
  );
})();
