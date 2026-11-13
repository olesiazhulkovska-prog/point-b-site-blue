// @ts-nocheck
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          reveal(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );
  function reveal(h) {
    h.setAttribute("data-rv", "in");
    var n = h.querySelectorAll(".pbx-w").length || 1;
    var eb = h.previousElementSibling;
    if (eb && eb.hasAttribute("data-rv-f")) {
      eb.style.setProperty("--d", "0s");
      eb.setAttribute("data-rv-f", "in");
    }
    var p = h.nextElementSibling;
    if (p && p.hasAttribute("data-rv-f")) {
      p.style.setProperty("--d", (0.2 + n * 0.055).toFixed(2) + "s");
      p.setAttribute("data-rv-f", "in");
    }
  }
  function split(el) {
    var i = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var parts = c.nodeValue.split(/(\s+)/),
            f = document.createDocumentFragment();
          parts.forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) {
              f.appendChild(document.createTextNode(t));
              return;
            }
            var w = document.createElement("span");
            w.className = "pbx-w";
            w.setAttribute("aria-hidden", "true");
            var s = document.createElement("i");
            s.style.setProperty("--i", i++);
            s.textContent = t;
            w.appendChild(s);
            f.appendChild(w);
          });
          node.replaceChild(f, c);
        } else if (c.nodeType === 1 && !c.classList.contains("pbx-w")) walk(c);
      });
    })(el);
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  }
  window.__pbxSplit = split;
  function scan() {
    document
      .querySelectorAll("section h2, #site-footer h2")
      .forEach(function (h) {
        if (
          h.hasAttribute("data-rv") ||
          h.closest("#hero-stage,#hero-dark,.sv3-card")
        )
          return;
        h.setAttribute("data-rv", "0");
        split(h);
        var eb = h.previousElementSibling;
        if (eb && eb.textContent.trim().length < 60)
          eb.setAttribute("data-rv-f", "0");
        var p = h.nextElementSibling;
        if (p && p.tagName === "P") p.setAttribute("data-rv-f", "0");
        io.observe(h);
      });
  }
  function go() {
    __pbxTick(scan);
    setTimeout(function () {
      document.querySelectorAll('[data-rv="0"]').forEach(function (h) {
        var r = h.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) reveal(h);
      });
    }, 5000);
  }
  document.readyState !== "loading"
    ? go()
    : document.addEventListener("DOMContentLoaded", go);
})();
