// @ts-nocheck
(function () {
  /* pb-fit: hero scheme + progress line always fit the visible viewport (laptop windows) */
  var last = "",
    lastW = null,
    settleUntil = 0;
  function fit() {
    var W = document.querySelector(".hero-graph-in > div");
    if (!W) return;
    if (W !== lastW) {
      lastW = W;
      last = "";
      /* new hero DOM (SPA navigation home): reveal animations still run, rects are distorted -> keep re-measuring until settled */
      settleUntil = Date.now() + 4000;
      [900, 2000, 3200, 4300].forEach(function (d) {
        setTimeout(function () {
          last = "";
          fit();
        }, d);
      });
    }
    if (Date.now() < settleUntil) last = "";
    var g = document.querySelector(".hero-graph");
    if (innerWidth < 1025) {
      var bx0 = W.querySelector("div.md\\:block");
      if (bx0 && bx0.dataset.pbAr !== undefined) {
        bx0.style.setProperty("aspect-ratio", bx0.dataset.pbAr);
        if (bx0.dataset.pbMw) bx0.style.setProperty("max-width", bx0.dataset.pbMw);
        else bx0.style.removeProperty("max-width");
      }
      W.style.removeProperty("scale");
      W.style.removeProperty("translate");
      W.style.removeProperty("transform-origin");
      return;
    }
    var key = innerWidth + "x" + innerHeight + "|" + W.scrollHeight;
    if (key === last) return;
    var P = W.parentElement,
      box = W.querySelector("div.md\\:block");
    if (!box) return;
    if (box.dataset.pbAr === undefined) {
      box.dataset.pbAr = box.style.aspectRatio || "760 / 450";
      box.dataset.pbMw = box.style.maxWidth || "";
    }
    function unwiden() {
      box.style.setProperty("aspect-ratio", box.dataset.pbAr);
      if (box.dataset.pbMw) box.style.setProperty("max-width", box.dataset.pbMw);
      else box.style.removeProperty("max-width");
    }
    function measure() {
      W.style.setProperty("scale", "1");
      W.style.setProperty("translate", "0 0");
      var gt = g ? g.getBoundingClientRect().top : 0,
        tops = [].map.call(box.querySelectorAll("button"), function (b) {
          return b.getBoundingClientRect().top;
        }),
        cardTop =
          Math.min.apply(null, tops.concat([box.getBoundingClientRect().top])) -
          gt,
        kids = W.children,
        lb = 0;
      for (var i = 0; i < kids.length; i++) {
        lb = Math.max(lb, kids[i].getBoundingClientRect().bottom - gt);
      }
      var ds = document.querySelector(".hero-graph > .pb-hero-desc"),
        dB =
          ds && ds.offsetParent ? ds.getBoundingClientRect().bottom - gt + 14 : 0,
        topLim = Math.max(100, dB),
        botLim = innerHeight - 22,
        need = lb - cardTop,
        avail = botLim - topLim;
      return {
        gt: gt,
        cardTop: cardTop,
        lb: lb,
        topLim: topLim,
        botLim: botLim,
        need: need,
        avail: avail,
        k: Math.max(0.55, Math.min(1, avail / need)),
      };
    }
    unwiden();
    var m = measure(),
      wr = W.getBoundingClientRect(),
      k = m.k,
      dy = 0;
    /* use the free width: the box was capped by an svh formula and left empty margins on short/wide windows.
       Widen it (up to the container) and keep the same height (or a bit lower), so columns get more air. */
    var br = box.getBoundingClientRect(),
      h0 = br.height,
      pw = P.clientWidth,
      w1 = Math.max(br.width, Math.min(1240, pw));
    if (h0 > 0 && (m.k < 1 || w1 > br.width + 8)) {
      var hT = Math.max(h0 * Math.min(1, m.k), w1 * (450 / 760) * 0.62);
      box.style.setProperty("max-width", w1 + "px", "important");
      box.style.setProperty("aspect-ratio", w1 + " / " + hT, "important");
      m = measure();
      k = m.k;
      wr = W.getBoundingClientRect();
    }
    if (k < 1) {
      dy = m.topLim - m.cardTop;
    } else if (m.cardTop < m.topLim) {
      dy = m.topLim - m.cardTop;
      if (m.lb + dy > m.botLim) {
        k = Math.max(0.55, Math.min(1, m.avail / m.need));
        dy = m.topLim - m.cardTop;
      }
    }
    var cardTop = m.cardTop,
      gt = m.gt;
    if (k < 0.999 || dy > 0.5) {
      W.style.setProperty(
        "transform-origin",
        "50% " + (cardTop + gt - wr.top) + "px",
      );
      W.style.setProperty("translate", "0 " + Math.round(dy) + "px");
      W.style.setProperty("scale", String(+k.toFixed(4)));
    } else {
      W.style.removeProperty("scale");
      W.style.removeProperty("translate");
      W.style.removeProperty("transform-origin");
    }
    last = innerWidth + "x" + innerHeight + "|" + W.scrollHeight;
  }
  __pbxTick(fit);
  addEventListener("resize", function () {
    last = "";
    setTimeout(fit, 60);
    setTimeout(function () {
      last = "";
      fit();
    }, 350);
    setTimeout(function () {
      last = "";
      fit();
    }, 1000);
  });
})();
