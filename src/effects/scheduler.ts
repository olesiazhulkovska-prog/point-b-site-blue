// @ts-nocheck
(function () {
  var fns = [],
    t = 0,
    idle =
      window.requestIdleCallback ||
      function (c) {
        return setTimeout(c, 1);
      };
  var busy = 0,
    again = 0;
  function run() {
    if (busy) {
      again = 1;
      return;
    }
    busy = 1;
    t = 0;
    var i = 0;
    (function step() {
      var t0 = performance.now();
      while (i < fns.length) {
        try {
          fns[i++]();
        } catch (e) {}
        if (performance.now() - t0 > 20) break;
      }
      if (i < fns.length) setTimeout(step, 0);
      else {
        busy = 0;
        if (again) {
          again = 0;
          sched();
        }
      }
    })();
  }
  var ls = 0;
  addEventListener(
    "scroll",
    function () {
      ls = Date.now();
    },
    { passive: true },
  );
  function go() {
    if (Date.now() - ls < 350) {
      t = setTimeout(go, 350);
      return;
    }
    idle(run, { timeout: 600 });
  }
  function sched() {
    if (t) return;
    t = setTimeout(go, 180);
  }
  try {
    new MutationObserver(sched).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  } catch (e) {}
  addEventListener("resize", sched);
  addEventListener("load", sched);
  window.__pbxTick = function (f) {
    fns.push(f);
    sched();
    setTimeout(f, 0);
  };
})();
