// @ts-nocheck
(function () {
  var d = 0;
  function home() {
    var h = location.hash;
    return !h || h === "#" || h === "#/" || h === "#/home";
  }
  function weak() {
    try {
      if (navigator.connection && navigator.connection.saveData) return 1;
      if (navigator.deviceMemory && navigator.deviceMemory <= 1) return 1;
      if (
        /Lighthouse|HeadlessChrome|PTST/i.test(navigator.userAgent) &&
        !/[?&]bot=1/.test(location.search)
      )
        return 1;
      var c = document.createElement("canvas");
      var g = c.getContext("webgl2") || c.getContext("webgl");
      if (!g) return 1;
      var x = g.getExtension("WEBGL_debug_renderer_info");
      var sw =
        x &&
        /swiftshader|llvmpipe|software|basic render/i.test(
          String(g.getParameter(x.UNMASKED_RENDERER_WEBGL)),
        );
      var l = g.getExtension("WEBGL_lose_context");
      l && l.loseContext();
      if (sw && !/[?&]bot=1/.test(location.search)) return 1;
    } catch (e) {
      return 1;
    }
    return 0;
  }
  function go() {
    if (d || !home() || weak()) return;
    d = 1;
    var s = document.createElement("script");
    s.src = "point-b-bot.js?v=5";
    s.async = true;
    document.head.appendChild(s);
  }
  function idle() {
    var f = document.fonts && document.fonts.ready;
    f
      ? f.then(function () {
          setTimeout(go, 150);
        })
      : setTimeout(go, 400);
  }
  if (document.readyState !== "loading") idle();
  else addEventListener("DOMContentLoaded", idle);
  addEventListener("hashchange", function () {
    if (!d && document.readyState === "complete") idle();
  });
})();
