// @ts-nocheck
(function () {
  document.addEventListener(
    "pointerdown",
    function (e) {
      if (matchMedia("(hover:hover)").matches) return;
      var b = document.getElementById("nav-services-dropdown-btn");
      if (!b) return;
      var w = b.parentElement;
      if (w.contains(e.target)) return;
      var o = w.querySelector("button:not(#nav-services-dropdown-btn)");
      if (o && o.offsetParent) b.click();
    },
    true,
  );
})();
