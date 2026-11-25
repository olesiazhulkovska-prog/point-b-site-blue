// @ts-nocheck
(function () {
  var d = 0;
  function go() {
    if (d) return;
    d = 1;
    var s = document.createElement("script");
    s.src = "vortex.js?v=4";
    s.onload = function () {
      try {
        dispatchEvent(new Event("scroll"));
      } catch (e) {}
    };
    document.head.appendChild(s);
  }
  function chk() {
    if (d) return;
    var c = document.getElementById("cta-section");
    if (c && c.getBoundingClientRect().top < innerHeight * 2.5) go();
  }
  /* lazy route chunks mount after the load event: poll for a while */
  var pn = 0,
    pt = setInterval(function () {
      chk();
      if (d || ++pn > 40) clearInterval(pt);
    }, 700);
  addEventListener("scroll", chk, { passive: true });
  addEventListener("resize", chk, { passive: true });
  addEventListener("load", chk);
  addEventListener("hashchange", function () {
    setTimeout(chk, 300);
  });
})();
