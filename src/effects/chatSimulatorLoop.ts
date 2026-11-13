// @ts-nocheck
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var idx = 0,
    last = Date.now(),
    viz = null,
    box = null,
    vis = false,
    io = null,
    obs = null;
  function setup() {
    var v = document.querySelectorAll(".sv3-viz")[1];
    if (!v || !v.querySelector(".overflow-y-auto")) return;
    var b = v.querySelector(".overflow-y-auto");
    if (b === box) return;
    viz = v;
    box = b;
    last = Date.now();
    if (io) io.disconnect();
    io = new IntersectionObserver(
      function (es) {
        vis = es[0].isIntersecting;
      },
      { threshold: 0.55 },
    );
    io.observe(v);
    if (obs) obs.disconnect();
    obs = new MutationObserver(function () {
      last = Date.now();
      var k = [].filter.call(box.children, function (c) {
        return !c.classList.contains("pbx-typing");
      });
      k.forEach(function (c, i) {
        if (i < k.length - 6) c.setAttribute("data-old", "1");
      });
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    });
    obs.observe(box, { childList: true });
  }
  setInterval(function () {
    setup();
    if (!viz || !vis) return;
    if (Date.now() - last < 4800) return;
    if (viz.matches(":hover")) return;
    var btns = viz.querySelectorAll("button");
    if (!btns.length) return;
    var bt = btns[idx % Math.min(3, btns.length)];
    idx++;
    last = Date.now() + 1500;
    bt.click();
    var t = document.createElement("div");
    t.className = "pbx-typing";
    t.innerHTML = "<i></i><i></i><i></i>";
    setTimeout(function () {
      box.appendChild(t);
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
      setTimeout(function () {
        t.remove();
      }, 1300);
    }, 550);
  }, 1000);
})();
