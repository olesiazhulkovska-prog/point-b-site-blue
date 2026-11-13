// @ts-nocheck
/* inner pages: below the first (hero) block the page is solid navy, so no translucent strips show between sections */
(function () {
  function f() {
    try {
      var w = document.querySelector("main > div.min-h-screen");
      if (!w) return;
      var c = w.firstElementChild;
      if (!c) return;
      var h = Math.round(
        c.getBoundingClientRect().bottom - w.getBoundingClientRect().top,
      );
      if (w.__hh !== h) {
        w.__hh = h;
        w.style.setProperty("--hh", h + "px");
      }
    } catch (e) {}
  }
  if (window.__pbxTick) window.__pbxTick(f);
  addEventListener("resize", f);
  addEventListener("hashchange", function () {
    setTimeout(f, 300);
  });
})();
