// @ts-nocheck
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  function ready(f) {
    document.readyState !== "loading"
      ? f()
      : document.addEventListener("DOMContentLoaded", f);
  }
  ready(function () {
    var m = document.querySelector("main");
    if (m) {
      m.id = "pbx-main";
      m.setAttribute("tabindex", "-1");
    }
    if (reduce) return;
    if (!fine) return;
  });
})();
