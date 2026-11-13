// @ts-nocheck
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var EASE = "cubic-bezier(.22,1,.36,1)";
  function rise(el, delay, dist) {
    try {
      el.animate(
        [
          { opacity: 0, transform: "translate3d(0," + (dist || 28) + "px,0)" },
          { opacity: 1, transform: "translate3d(0,0,0)" },
        ],
        { duration: 800, delay: delay, easing: EASE, fill: "backwards" },
      );
    } catch (e) {}
  }
  function hero() {
    var h = document.querySelector("#hero-dark h1");
    if (!h || h.__pbx) return false;
    h.__pbx = 1;
    [].forEach.call(h.children, function (s, i) {
      rise(s, 250 + i * 150, 34);
    });
    var ctas = h.parentElement.querySelectorAll(":scope > div button");
    [].forEach.call(ctas, function (b, i) {
      rise(b, 850 + i * 120, 20);
    });
    [].forEach.call(
      document.querySelectorAll("#hero-dark .hero-fan-card"),
      function (c, i) {
        rise(c, 450 + i * 130, 24);
      },
    );
    return true;
  }
  var t = setInterval(function () {
    if (hero()) clearInterval(t);
  }, 200);
  setTimeout(function () {
    clearInterval(t);
  }, 6000);
  /* services cards: title words + description + bullets */
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          playCard(e.target);
        }
      });
    },
    { threshold: 0.35 },
  );
  function playCard(card) {
    var h = card.querySelector(".sv3-h3");
    var n = h ? h.querySelectorAll(".pbx-w").length : 0;
    if (h) {
      h.setAttribute("data-rv", "in");
    }
    var base = 0.12 + n * 0.055;
    card.querySelectorAll(".sv3-desc,.sv3-list li").forEach(function (e, i) {
      e.style.setProperty("--d", (base + i * 0.09).toFixed(2) + "s");
      e.setAttribute("data-rv-f", "in");
    });
  }
  function prep() {
    document.querySelectorAll(".sv3-card").forEach(function (c) {
      if (c.__pbx) return;
      c.__pbx = 1;
      var h = c.querySelector(".sv3-h3");
      if (h && !h.hasAttribute("data-rv")) {
        h.setAttribute("data-rv", "0");
        window.__pbxSplit && window.__pbxSplit(h);
      }
      c.querySelectorAll(".sv3-desc,.sv3-list li").forEach(function (e) {
        e.setAttribute("data-rv-f", "0");
      });
      io.observe(c);
    });
  }
  __pbxTick(prep);
})();
