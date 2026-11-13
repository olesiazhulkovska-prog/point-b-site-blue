// @ts-nocheck
(function () {
  /* pb-fit: hero scheme + progress line always fit the visible viewport (laptop windows) */
  var last = "",
    lastW = null;
  function fit() {
    var W = document.querySelector(".hero-graph-in > div");
    if (!W) return;
    if (W !== lastW) {
      lastW = W;
      last = "";
    }
    var g = document.querySelector(".hero-graph");
    if (innerWidth < 1025) {
      W.style.removeProperty("scale");
      W.style.removeProperty("translate");
      W.style.removeProperty("transform-origin");
      return;
    }
    var key = innerWidth + "x" + innerHeight + "|" + W.scrollHeight;
    if (key === last) return;
    W.style.setProperty("scale", "1");
    W.style.setProperty("translate", "0 0");
    var box = W.querySelector("div.md\\:block");
    if (!box) return;
    var gt = g ? g.getBoundingClientRect().top : 0,
      wr = W.getBoundingClientRect();
    var tops = [].map.call(box.querySelectorAll("button"), function (b) {
      return b.getBoundingClientRect().top;
    });
    var cardTop =
      Math.min.apply(null, tops.concat([box.getBoundingClientRect().top])) - gt;
    var kids = W.children,
      lb = 0;
    for (var i = 0; i < kids.length; i++) {
      lb = Math.max(lb, kids[i].getBoundingClientRect().bottom - gt);
    }
    var ds = document.querySelector(".hero-graph > .pb-hero-desc"),
      dB =
        ds && ds.offsetParent ? ds.getBoundingClientRect().bottom - gt + 14 : 0;
    var topLim = Math.max(100, dB),
      botLim = innerHeight - 22,
      need = lb - cardTop,
      avail = botLim - topLim;
    var k = Math.max(0.55, Math.min(1, avail / need)),
      dy = 0;
    if (k < 1) {
      dy = topLim - cardTop;
    } else if (cardTop < topLim) {
      dy = topLim - cardTop;
      if (lb + dy > botLim) {
        k = Math.max(0.55, Math.min(1, avail / need));
        dy = topLim - cardTop;
      }
    }
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
    last = key;
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
