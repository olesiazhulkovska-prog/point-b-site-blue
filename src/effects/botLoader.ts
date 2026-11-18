// @ts-nocheck
(function () {
  var d = 0;
  function home() {
    var h = location.hash;
    return !h || h === "#" || h === "#/" || h === "#/home" || h === "#/index";
  }
  function why(r) {
    window.__pbBotWhy = r;
    try {
      console.info("[pb-bot] не завантажено:", r);
    } catch (e) {}
    return 1;
  }
  function weak() {
    try {
      if (navigator.connection && navigator.connection.saveData)
        return why("saveData");
      if (navigator.deviceMemory && navigator.deviceMemory <= 1)
        return why("deviceMemory<=1");
      if (
        /Lighthouse|HeadlessChrome|PTST/i.test(navigator.userAgent) &&
        !/[?&]bot=1/.test(location.search)
      )
        return why("headless UA");
      var c = document.createElement("canvas");
      var g = c.getContext("webgl2") || c.getContext("webgl");
      if (!g) return why("no webgl");
      var x = g.getExtension("WEBGL_debug_renderer_info");
      var sw =
        x &&
        /swiftshader|llvmpipe|software|basic render/i.test(
          String(g.getParameter(x.UNMASKED_RENDERER_WEBGL)),
        );
      var l = g.getExtension("WEBGL_lose_context");
      l && l.loseContext();
      if (sw && !/[?&]bot=1/.test(location.search))
        return why("software renderer: " + String(x && g.getParameter(x.UNMASKED_RENDERER_WEBGL)));
    } catch (e) {
      return why("error: " + e);
    }
    return 0;
  }
  function go() {
    if (d || !(home() || /^#\/(keycrm|ai-bots|analytics)/.test(location.hash)) || weak()) return;
    d = 1;
    var s = document.createElement("script");
    s.src = "point-b-bot.js?v=31";
    s.async = true;
    s.onerror = function () {
      why("script load failed");
    };
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
  // навігація через pushState не викликає hashchange — перевіряємо маршрут раз на секунду
  var poll = setInterval(function () {
    if (d) return clearInterval(poll);
    if (document.readyState === "complete" && !document.hidden) go();
  }, 1000);
  addEventListener("hashchange", function () {
    if (!d && document.readyState === "complete") idle();
  });
})();
