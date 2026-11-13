// @ts-nocheck
(function () {
  function f() {
    document
      .querySelectorAll('.hero-graph-in svg[viewBox="0 0 760 450"]')
      .forEach(function (v) {
        if (v.getAttribute("preserveAspectRatio") !== "none")
          v.setAttribute("preserveAspectRatio", "none");
      });
  }
  if (window.__pbxTick) window.__pbxTick(f);
  else setInterval(f, 800);
})();
