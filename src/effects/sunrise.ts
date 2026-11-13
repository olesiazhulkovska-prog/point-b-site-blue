// @ts-nocheck
(function () {
  try {
    var d = document.documentElement,
      hh = location.hash;
    if (
      (hh === "" || hh === "#" || hh === "#/") &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      d.classList.add("pb-sunrise-go");
    }
  } catch (e) {}
})();
