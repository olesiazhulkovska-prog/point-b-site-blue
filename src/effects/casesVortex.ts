// @ts-nocheck
/* cases hero: the same WebGL funnel (vortex) as in the footer CTA, behind the first screen */
(function () {
  function mount() {
    if (!window.PBXVortex) return;
    var hosts = document.querySelectorAll(".pb-vortex-hero, .pb-cases-frame");
    for (var k = 0; k < hosts.length; k++) one(hosts[k]);
  }
  function one(s) {
    var st = s.__pbxV || (s.__pbxV = {});
    if (st.w && s.contains(st.w)) return;
    var w = document.createElement("div");
    w.className = "pbx-vortex";
    w.setAttribute("aria-hidden", "true");
    var cv = document.createElement("canvas");
    w.appendChild(cv);
    s.insertBefore(w, s.firstChild);
    st.w = w;
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
    } catch (e) {
      console.error(e);
    }
  }
  if (window.__pbxTick) window.__pbxTick(mount);
  addEventListener("hashchange", function () {
    setTimeout(mount, 400);
  });
  addEventListener("load", function () {
    setTimeout(mount, 300);
  });
  // vortex.js loads asynchronously: poll briefly until it is ready
  var n = 0,
    t = setInterval(function () {
      mount();
      if (++n > 40) clearInterval(t);
    }, 500);
})();
