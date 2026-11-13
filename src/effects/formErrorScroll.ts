// @ts-nocheck
(function () {
  var last = null;
  new MutationObserver(function () {
    var e = document.getElementById("lead-form-error");
    if (e && e !== last) {
      last = e;
      try {
        e.scrollIntoView({ block: "center", behavior: "smooth" });
      } catch (x) {}
    } else if (!e) last = null;
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
