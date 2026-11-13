// @ts-nocheck
(function () {
  function f() {
    document
      .querySelectorAll(
        '[aria-hidden="true"] a[href],[aria-hidden="true"] button,[aria-hidden="true"] input,[aria-hidden="true"] select,[aria-hidden="true"] textarea,[aria-hidden="true"] [tabindex]:not([tabindex="-1"])',
      )
      .forEach(function (e) {
        e.setAttribute("tabindex", "-1");
      });
  }
  if (window.__pbxTick) window.__pbxTick(f);
  f();
  var Q = '[aria-hidden="true"] a,[aria-hidden="true"] button';
  document.addEventListener(
    "mousedown",
    function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(Q)) e.preventDefault();
    },
    true,
  );
  document.addEventListener(
    "focusin",
    function (e) {
      var t = e.target;
      if (t && t.closest && t.closest(Q) && t.blur) t.blur();
    },
    true,
  );
})();
