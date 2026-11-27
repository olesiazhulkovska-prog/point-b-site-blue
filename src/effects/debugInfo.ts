// Діагностика для мобільних браузерів: відкрити сайт з ?debug=1
(function () {
  if (!/[?&]debug=1/.test(location.search)) return;
  var log: string[] = [];
  function push(t: string) { log.unshift(t.slice(0, 110)); if (log.length > 6) log.pop(); }
  addEventListener("error", function (e) { push("ERR " + e.message + " @" + (e.filename || "").split("/").pop() + ":" + e.lineno); });
  addEventListener("unhandledrejection", function (e) { push("REJ " + String((e as any).reason && ((e as any).reason.message || (e as any).reason))); });
  function d(e: Element | null) { return e ? e.tagName + "." + String(e.className).slice(0, 40) + (e.id ? "#" + e.id : "") : "null"; }
  ["pointerdown", "click"].forEach(function (n) {
    addEventListener(n, function (e: any) {
      var t = document.elementFromPoint(e.clientX, e.clientY);
      push(n + " tgt=" + d(e.target) + " top=" + d(t) + " dp=" + e.defaultPrevented);
    }, true);
  });
  function render() {
    var el = document.querySelector("#stats-section .tabular-nums") as HTMLElement | null;
    var h = document.documentElement;
    var cs = (e: Element | null, p: string) =>
      e ? getComputedStyle(e).getPropertyValue(p) : "—";
    var sfs = [].slice.call(document.querySelectorAll("#stats-section .tabular-nums")).map(function (n) { return cs(n, "font-size"); }).join("/");
    var lines = [
      "css v: " + cs(h, "--pb-v") + " | stats fs: " + sfs + " | sv3 pos: " + cs(document.querySelector(".sv3-card"), "position") + " h:" + cs(document.querySelector(".sv3-card"), "height"),
      "UA: " + navigator.userAgent.replace(/Mozilla\/5.0 /, ""),
      "inner: " + innerWidth + "x" + innerHeight + " dpr " + devicePixelRatio,
      "client: " + h.clientWidth + " vv: " + (window.visualViewport ? Math.round(window.visualViewport.width) + " s" + window.visualViewport.scale : "—"),
      "root fs: " + cs(h, "font-size") + " tsa: " + cs(h, "-webkit-text-size-adjust"),
      "body tsa: " + cs(document.body, "-webkit-text-size-adjust") + " inline: " + (document.body.getAttribute("style") || "") + " | " + (h.getAttribute("style") || "").slice(0, 80),
      "--text-6xl: [" + cs(h, "--text-6xl") + "] --spacing: [" + cs(h, "--spacing") + "]",
      "stat fs: " + cs(el, "font-size"),
      "sm(640): " + matchMedia("(min-width:640px)").matches + " md(768): " + matchMedia("(min-width:768px)").matches,
      "range-mq: " + matchMedia("(width >= 40rem)").matches + " @layer: " + CSS.supports("selector(:has(a))") + "/" + (typeof CSSLayerBlockRule !== "undefined"),
      "fonts: " + Array.from(document.fonts).filter((f) => f.status === "loaded").map((f) => f.family).slice(0, 6).join(","),
    ];
    var box = document.getElementById("pb-debug") || document.createElement("pre");
    box.id = "pb-debug";
    box.setAttribute(
      "style",
      "position:fixed;left:0;right:0;bottom:0;z-index:2147483647;margin:0;padding:8px;background:rgba(0,0,0,.85);color:#0f0;font:11px/1.3 monospace;white-space:pre-wrap;word-break:break-all;pointer-events:none",
    );
    lines.push("modal: " + (document.querySelector(".fixed.inset-0.z-50") ? "OPEN" : "no") + " sda: " + document.documentElement.classList.contains("pbx-sda"));
    box.textContent = lines.concat(log).join("\n");
    if (!box.parentNode) document.body.appendChild(box);
  }
  addEventListener("load", function () {
    render();
    setInterval(render, 1000);
  });
})();
