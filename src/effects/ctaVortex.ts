// @ts-nocheck
(function () {
  var st = {};
  function size() {
    var c = document.querySelector("#cta-section"),
      f = document.querySelector("footer");
    if (!c || !f || !st.w) return;
    var h = f.getBoundingClientRect().bottom - c.getBoundingClientRect().top;
    if (innerWidth < 760)
      h = Math.min(h, c.getBoundingClientRect().height + 160);
    st.w.style.height = Math.max(0, Math.round(h)) + "px";
  }
  function mount() {
    var c = document.querySelector("#cta-section"),
      f = document.querySelector("footer");
    if (!c || !f || !window.PBXVortex) return;
    if (st.w && c.contains(st.w)) {
      size();
      return;
    }
    /* #69: WebGL-фон CTA/футера створюємо лише коли до нього лишилось ≤ 1.5 екрана прокрутки */
    if (c.getBoundingClientRect().top > innerHeight * 1.5) return;
    var w = document.createElement("div");
    w.className = "pbx-vortex";
    w.setAttribute("aria-hidden", "true");
    var cv = document.createElement("canvas");
    w.appendChild(cv);
    c.insertBefore(w, c.firstChild);
    st.w = w;
    size();
    try {
      var rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
      var api = window.PBXVortex(w, cv, {
        small: innerWidth < 760,
        reduced: rm,
        noRepel: true,
      });
      api.setRunning(false);
      new IntersectionObserver(
        function (e) {
          api.setRunning(e[0].isIntersecting && !rm);
        },
        { threshold: 0 },
      ).observe(w);
      /* cursor interaction: wrapper is pointer-events:none, so forward window pointer moves to the vortex */
      if (!rm && matchMedia("(hover:hover) and (pointer:fine)").matches) {
        var inside = false;
        addEventListener(
          "pointermove",
          function (ev) {
            var r = w.getBoundingClientRect();
            var inn =
              ev.clientY >= r.top &&
              ev.clientY <= r.bottom &&
              ev.clientX >= r.left &&
              ev.clientX <= r.right;
            if (inn) {
              w.dispatchEvent(
                new PointerEvent("pointermove", {
                  clientX: ev.clientX,
                  clientY: ev.clientY,
                }),
              );
              inside = true;
            } else if (inside) {
              w.dispatchEvent(new PointerEvent("pointerleave"));
              inside = false;
            }
          },
          { passive: true },
        );
        document.addEventListener("mouseleave", function () {
          if (inside) {
            w.dispatchEvent(new PointerEvent("pointerleave"));
            inside = false;
          }
        });
      }
      if (window.ResizeObserver) {
        var ro = new ResizeObserver(size);
        ro.observe(c);
        ro.observe(f);
      }
      addEventListener("resize", size);
    } catch (e) {
      console.error(e);
    }
  }
  __pbxTick(mount);
  addEventListener(
    "scroll",
    function () {
      if (!st.w) mount();
    },
    { passive: true },
  );
})();
