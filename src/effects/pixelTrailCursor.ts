// @ts-nocheck
(function () {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  var COUNT = 30,
    SIZE = 16,
    SPACING = 2,
    COLOR = "#F98513",
    FOLLOW = 10,
    STIFF = 10,
    DAMP = 10,
    IDLE = 1.5;
  var host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:9999;contain:strict";
  var pool = [],
    cur = { x: -1000, y: -1000 },
    seen = false,
    inside = false,
    lastMove = 0,
    activity = 0,
    raf = 0,
    last = 0;
  for (var i = 0; i < COUNT; i++) {
    var n = document.createElement("div");
    n.style.cssText =
      "position:absolute;left:0;top:0;width:" +
      SIZE +
      "px;height:" +
      SIZE +
      "px;border-radius:50%;background:" +
      COLOR +
      ";will-change:transform,opacity;display:none";
    host.appendChild(n);
    pool.push({ n: n, x: -1000, y: -1000, vx: 0, vy: 0, hid: true });
  }
  function mount() {
    if (!host.parentNode) document.body.appendChild(host);
  }
  /* cubic-bezier(.4,0,.2,1) */
  function bez(a, b, t) {
    var u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  }
  function ease(t) {
    var x = Math.max(0, Math.min(1, t)),
      s = x,
      x1 = 0.4,
      y1 = 0,
      x2 = 0.2,
      y2 = 1;
    for (var i = 0; i < 8; i++) {
      var cx = bez(x1, x2, s) - x,
        u = 1 - s,
        dx = 3 * u * u * x1 + 6 * u * s * (x2 - x1) + 3 * s * s * (1 - x2);
      if (Math.abs(dx) < 1e-6) break;
      s -= cx / dx;
      s = Math.max(0, Math.min(1, s));
    }
    return bez(y1, y2, s);
  }
  function frame(now) {
    var dt = last ? Math.min(0.05, Math.max(0, (now - last) / 1000)) : 1 / 60;
    last = now;
    var moving = now - lastMove < 100;
    activity = moving
      ? Math.min(1, activity + dt / 0.2)
      : Math.max(0, activity - dt / IDLE);
    var fade = 1 - ease(1 - activity);
    var k = STIFF * 72 * (FOLLOW / 10),
      retain = Math.max(0.05, 1 - DAMP / 20),
      decay = Math.pow(retain, dt * 60),
      pull = 1 - Math.exp(-dt / 0.028);
    for (var i = 0; i < pool.length; i++) {
      var p = pool[i],
        ax = i === 0 ? cur.x : pool[i - 1].x,
        ay = i === 0 ? cur.y : pool[i - 1].y,
        dx = ax - p.x,
        dy = ay - p.y;
      p.vx = (p.vx + dx * k * dt) * decay;
      p.vy = (p.vy + dy * k * dt) * decay;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (i > 0) {
        var d = Math.hypot(dx, dy);
        if (d > SPACING) {
          var r = ((d - SPACING) / d) * pull;
          p.x += dx * r;
          p.y += dy * r;
        }
      }
      var prog = i / pool.length,
        op = (1 - prog) * fade,
        sc = (1 - prog * 0.5) * fade,
        hide = op < 0.01 || sc <= 0;
      if (hide !== p.hid) {
        p.n.style.display = hide ? "none" : "block";
        p.hid = hide;
      }
      if (hide) continue;
      p.n.style.transform =
        "translate3d(" +
        p.x.toFixed(1) +
        "px," +
        p.y.toFixed(1) +
        "px,0) translate(-50%,-50%) scale(" +
        sc.toFixed(3) +
        ")";
      p.n.style.opacity = op.toFixed(3);
    }
    if (activity > 0 || moving) raf = requestAnimationFrame(frame);
    else raf = 0;
  }
  addEventListener(
    "pointermove",
    function (e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      /* admin panel: no orange trail — it covers the fields while typing */
      if (document.getElementById("admin-logout-btn")) {
        host.style.display = "none";
        return;
      }
      host.style.display = "";
      mount();
      var x = e.clientX,
        y = e.clientY;
      if (Math.hypot(x - cur.x, y - cur.y) > 0.5) lastMove = performance.now();
      cur.x = x;
      cur.y = y;
      if (!seen || !inside) {
        seen = true;
        for (var i = 0; i < pool.length; i++) {
          var p = pool[i];
          p.x = x;
          p.y = y;
          p.vx = 0;
          p.vy = 0;
        }
      }
      inside = true;
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", function () {
    inside = false;
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) inside = false;
  });
})();
