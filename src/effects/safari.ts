// @ts-nocheck
(function () {
  var u = navigator.userAgent;
  if (
    /safari/i.test(u) &&
    !/chrome|chromium|crios|fxios|edg|android/i.test(u)
  ) {
    document.documentElement.classList.add("is-safari");
    window.__pbSafari = 1;
  }
})();
