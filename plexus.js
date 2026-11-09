/* Home hero: "Plexus Network" canvas (Originkit, ported to vanilla JS).
   Points start scattered and gather into a connected network (chaos -> system).
   Behind the content, above the Horizon glow; fades out as the first screen scrolls away. */
(function () {
  var ADV = { seed: 7, coreShare: 16, coreSpread: 4, coreBreath: 120, strandCount: 16, strandStep: 11, strandTurn: 45, siblingShare: 55, siblingSpread: 4, loneShare: 12, cloudRadius: 88, slab: 50, maxLinks: 6, cycle: 1760, wobble: 3, linkPulse: 70, tilt: 4, centerX: 50, centerY: 50, lineWidth: 10, lineAlpha: 70, longAlpha: 30, backFade: 40, nodeSize: 2, nodeAlpha: 38, whiteShare: 8, specks: 40, speckAlpha: 55, pointerTilt: 20, glowRadius: 22, glowBoost: 120, hover: 24 };
  var COL = { line: '#3F52E8', node: '#CDD2EB', accent: '#F98513' };
  var ASSEMBLE = 3.4; // seconds for the whole gathering

  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function c01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function buildCloud(count, linkPct) {
    var A = ADV, rnd = mulberry32(Math.round(A.seed) * 9973 + 1);
    var g = function () { var u = 0; while (u === 0) u = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.283185307 * rnd()); };
    var n = Math.max(8, Math.round(count)), xs = [], ys = [], zs = [], kinds = [];
    var push = function (x, y, z, k) { if (xs.length >= n) return; xs.push(x); ys.push(y); zs.push(z); kinds.push(k); };
    var radius = Math.max(0.2, A.cloudRadius / 100), cs = Math.max(0.005, A.coreSpread / 100);
    var nCore = Math.round(n * c01(A.coreShare / 100)), nLone = Math.round(n * c01(A.loneShare / 100));
    for (var i = 0; i < nCore; i++) push(g() * cs, g() * cs * 0.85, g() * cs, 0);
    var strands = Math.max(1, Math.round(A.strandCount)), perStrand = Math.max(1, Math.ceil((n - nCore - nLone) / strands));
    var step0 = Math.max(0.02, A.strandStep / 100), turn = A.strandTurn / 100, sib = c01(A.siblingShare / 100), sibS = Math.max(0.005, A.siblingSpread / 100);
    for (var s = 0; s < strands; s++) {
      var px, py, pz;
      if (s % 4 === 0) { px = g() * 0.1; py = g() * 0.1; pz = g() * 0.1; }
      else { do { px = rnd() * 2 - 1; py = rnd() * 2 - 1; pz = rnd() * 2 - 1; } while (px * px + py * py + pz * pz > 1); px *= radius * 0.8; py *= radius * 0.8; pz *= radius * 0.8; }
      var dx = g(), dy = g(), dz = g(), dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
      var placed = 0;
      while (placed < perStrand && xs.length < n - nLone) {
        push(px, py, pz, 1); placed++;
        if (rnd() < sib && placed < perStrand) { push(px + g() * sibS, py + g() * sibS, pz + g() * sibS, 1); placed++; }
        dx += g() * turn; dy += g() * turn; dz += g() * turn;
        var r = Math.hypot(px, py, pz);
        if (r > radius * 0.85) { dx -= (px / r) * 1.5; dy -= (py / r) * 1.5; dz -= (pz / r) * 1.5; }
        dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
        var st = step0 * (0.6 + 0.8 * rnd()); px += dx * st; py += dy * st; pz += dz * st;
      }
    }
    while (xs.length < n) { var qx, qy, qz; do { qx = rnd() * 2 - 1; qy = rnd() * 2 - 1; qz = rnd() * 2 - 1; } while (qx * qx + qy * qy + qz * qz > 1); push(qx * radius, qy * radius, qz * radius, 2); }
    var slab = Math.max(0.05, A.slab / 100), N = xs.length;
    var x = new Float32Array(N), y = new Float32Array(N), z = new Float32Array(N), kind = new Uint8Array(N), white = new Uint8Array(N);
    var wa = new Float32Array(N * 3), wb = new Float32Array(N * 3), wp = new Float32Array(N);
    var gx = new Float32Array(N), gy = new Float32Array(N), gz = new Float32Array(N), gd = new Float32Array(N);
    var wr = mulberry32(Math.round(A.seed) * 31 + 5), ws = c01(A.whiteShare / 100), sr = mulberry32(4242);
    for (i = 0; i < N; i++) {
      x[i] = xs[i]; y[i] = ys[i]; z[i] = zs[i] * slab; kind[i] = kinds[i]; white[i] = wr() < ws ? 1 : 0;
      for (var k = 0; k < 3; k++) { wa[i * 3 + k] = g() * 0.6; wb[i * 3 + k] = g() * 0.6; }
      wp[i] = rnd() * Math.PI * 2;
      // scattered start: a wide loose cloud, each point with its own delay
      var ux, uy, uz; do { ux = sr() * 2 - 1; uy = sr() * 2 - 1; uz = sr() * 2 - 1; } while (ux * ux + uy * uy + uz * uz > 1);
      gx[i] = ux * 2.6; gy[i] = uy * 1.5; gz[i] = uz * 1.2; gd[i] = sr();
    }
    var linkD = Math.max(0.02, linkPct / 100), reach = linkD * 1.08, pairs = [];
    for (i = 0; i < N; i++) { if (kind[i] === 2) continue; for (var j = 0; j < N; j++) { if (j <= i || kind[j] === 2) continue; var d = Math.hypot(x[i] - x[j], y[i] - y[j], z[i] - z[j]); if (d < reach) pairs.push({ i: i, j: j, d: d }); } }
    pairs.sort(function (a, b) { return a.d - b.d; });
    var cap = Math.max(1, Math.round(A.maxLinks)) + 1, deg = new Uint8Array(N), la = [], lb = [], lp = [];
    pairs.forEach(function (p) {
      if (deg[p.i] >= cap || deg[p.j] >= cap) return;
      deg[p.i]++; deg[p.j]++; la.push(p.i); lb.push(p.j);
      if (kind[p.i] === 0 || kind[p.j] === 0) lp.push((rnd() - 0.5) * 0.6);
      else { var mx = (x[p.i] + x[p.j]) * 0.5, my = (y[p.i] + y[p.j]) * 0.5, mz = (z[p.i] + z[p.j]) * 0.5; lp.push(2.6 * mx + 1.8 * my - 2.2 * mz + (rnd() - 0.5) * 1.2); }
    });
    return { n: N, x: x, y: y, z: z, kind: kind, white: white, wa: wa, wb: wb, wp: wp, gx: gx, gy: gy, gz: gz, gd: gd, la: Uint16Array.from(la), lb: Uint16Array.from(lb), lp: Float32Array.from(lp), links: la.length, linkD: linkD };
  }

  function buildSpecks(count, xMax, yMax) {
    var rnd = mulberry32(Math.round(ADV.seed) * 7919 + 3), n = count, x = new Float32Array(n), y = new Float32Array(n), z = new Float32Array(n);
    for (var i = 0; i < n; i++) { var phi = rnd() * Math.PI * 2, rho = xMax * Math.sqrt(0.08 + 0.92 * rnd()); x[i] = rho * Math.cos(phi); z[i] = rho * Math.sin(phi); y[i] = (rnd() * 2 - 1) * yMax; }
    return { n: n, x: x, y: y, z: z };
  }

  var cv = null, raf = 0, stop = null;

  function isHome() { return /^#?\/?$/.test(location.hash) || location.hash === '#/index'; }

  function start() {
    if (cv) return;
    var small = Math.min(innerWidth, innerHeight) < 700 || matchMedia('(pointer:coarse)').matches;
    var canvas = document.createElement('canvas');
    canvas.id = 'pb-plexus'; canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:-1;opacity:0';
    document.body.appendChild(canvas); cv = canvas;
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var W = 0, H = 0, dpr = 1;
    var resize = function () { W = innerWidth; H = innerHeight; dpr = Math.min(small ? 1.25 : 1.75, devicePixelRatio || 1); canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr); };
    resize(); window.addEventListener('resize', resize);
    var mq = matchMedia('(prefers-reduced-motion: reduce)');
    var ptr = { tx: .5, ty: .5, x: .5, y: .5, inside: 0, over: 0 };
    var onMove = function (e) { if (e.pointerType && e.pointerType !== 'mouse') return; ptr.tx = e.clientX / (W || 1); ptr.ty = e.clientY / (H || 1); ptr.inside = 1; };
    var onOut = function () { ptr.inside = 0; };
    window.addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerleave', onOut);

    var cloud = buildCloud(small ? 420 : 1100, 22), n = cloud.n;
    var wx = new Float32Array(n), wy = new Float32Array(n), wz = new Float32Array(n), sx = new Float32Array(n), sy = new Float32Array(n), sf = new Float32Array(n), ss = new Float32Array(n);
    var specks = null, speckKey = '', clock = 0, last = -1, born = -1;

    var tick = function (now) {
      raf = requestAnimationFrame(tick);
      var t0 = performance.now();
      var dt = last < 0 ? 0 : Math.min(1 / 20, (now - last) / 1000); last = now;
      if (born < 0) born = now;
      var scrollY = window.pageYOffset || 0, vis = c01(1 - scrollY / (H * 0.85));
      canvas.style.opacity = String(vis * c01((now - born) / 500));
      if (vis <= 0 || document.hidden) return;
      var A = ADV, R = Math.min(H * 0.46, W * 0.75), xMax = (W * 0.55) / R, yMax = (H * 0.48) / R;
      var sk = xMax.toFixed(2) + '|' + yMax.toFixed(2);
      if (!specks || sk !== speckKey) { specks = buildSpecks(A.specks, xMax, yMax); speckKey = sk; }
      var hoverK = A.hover / 50, ease = 1 - Math.exp(-dt * 6);
      ptr.x += (ptr.tx - ptr.x) * ease; ptr.y += (ptr.ty - ptr.y) * ease; ptr.over += (ptr.inside - ptr.over) * (1 - Math.exp(-dt * 4));
      var reduce = mq.matches; if (!reduce) clock += dt * 0.88;
      var T = window.__pbPlexusT != null ? window.__pbPlexusT : (reduce ? 99 : (now - born) / 1000 - 0.25);
      var period = A.cycle / 1000, th = ((clock % period) / period) * Math.PI * 2;
      var tiltR = (A.pointerTilt * Math.PI) / 180, yaw = ptr.over * (ptr.x - 0.5) * 2 * tiltR * hoverK, pitch = (A.tilt * Math.PI) / 180 + (ptr.y - 0.5) * 2 * tiltR * 0.6 * ptr.over * hoverK;
      var cy0 = Math.cos(yaw), sy0 = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), f = 1.5;
      var cx = W * 0.5, cyc = H * 0.5, backFade = c01(A.backFade / 100);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; ctx.clearRect(0, 0, W, H);
      var c = cloud, wob = A.wobble / 100, breath = 1 + (A.coreBreath / 100) * (0.5 - 0.5 * Math.cos(th));
      for (var i = 0; i < n; i++) {
        var x = c.x[i], y = c.y[i], z = c.z[i];
        if (c.kind[i] === 0) { x *= breath; y *= breath; z *= breath; }
        var s1 = Math.sin(th + c.wp[i]), c1 = Math.cos(th + c.wp[i] * 1.7), j = i * 3;
        x += wob * (c.wa[j] * s1 + c.wb[j] * c1); y += wob * (c.wa[j + 1] * s1 + c.wb[j + 1] * c1); z += wob * (c.wa[j + 2] * s1 + c.wb[j + 2] * c1);
        // gathering: each point flies from its scattered spot into place, spiralling in
        var lt = c01((T - c.gd[i] * (ASSEMBLE * 0.45)) / (ASSEMBLE * 0.55)), e = 1 - Math.pow(1 - lt, 3), k = 1 - e;
        if (k > 0) {
          var ox = c.gx[i] - x, oy = c.gy[i] - y, oz = c.gz[i] - z, a = k * 1.3, ca = Math.cos(a), sa = Math.sin(a);
          x += ox * k * ca + oz * k * sa; z += oz * k * ca - ox * k * sa; y += oy * k;
        }
        wx[i] = x; wy[i] = y; wz[i] = z;
        var x1 = x * cy0 + z * sy0, z1 = -x * sy0 + z * cy0, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, den = f + z2, s = den > 0.3 ? f / den : 0;
        ss[i] = s; sx[i] = cx + x1 * s * R; sy[i] = cyc + y1 * s * R; sf[i] = backFade + (1 - backFade) * c01(0.5 - z2 * 0.7);
      }
      ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = COL.line; ctx.lineWidth = Math.max(0.1, A.lineWidth / 10); ctx.lineCap = 'round';
      var lineA = A.lineAlpha / 100, longA = c01(A.longAlpha / 100), pulseK = c01(A.linkPulse / 100), glowR = Math.max(1, (H * A.glowRadius) / 100), glowK = (A.glowBoost / 100) * ptr.over * hoverK;
      var pxp = ptr.x * W, pyp = ptr.y * H, linkD = c.linkD, baseW = ctx.lineWidth;
      for (var q = 0; q < c.links; q++) {
        var a2 = c.la[q], b2 = c.lb[q]; if (ss[a2] === 0 || ss[b2] === 0) continue;
        var d = Math.hypot(wx[a2] - wx[b2], wy[a2] - wy[b2], wz[a2] - wz[b2]); if (d >= linkD) continue;
        var t = 1 - d / linkD, edge = t < 0.15 ? t / 0.15 : 1, wave = 0.5 + 0.5 * Math.cos(th - c.lp[q]), pulse = 1 - pulseK + pulseK * wave * wave;
        var alpha = lineA * (longA + (1 - longA) * t * t) * edge * pulse * Math.min(sf[a2], sf[b2]), lh = 0;
        if (glowK > 0.001) { var mx = (sx[a2] + sx[b2]) * 0.5 - pxp, my = (sy[a2] + sy[b2]) * 0.5 - pyp, qq = Math.max(0, 1 - Math.hypot(mx, my) / glowR); lh = glowK * qq * qq; alpha *= 1 + lh * 1.5; }
        if (alpha <= 0.004) continue;
        ctx.globalAlpha = Math.min(1, alpha); ctx.beginPath(); ctx.moveTo(sx[a2], sy[a2]); ctx.lineTo(sx[b2], sy[b2]); ctx.stroke();
        if (lh > 0.02) { ctx.lineWidth = baseW * (2 + 2 * Math.min(1, lh)); ctx.globalAlpha = Math.min(0.6, alpha * 0.35 * Math.min(1, lh)); ctx.stroke(); ctx.lineWidth = baseW; }
      }
      var unit = (H / 500) * 0.6 * Math.max(0.5, A.nodeSize), nodeA = c01(A.nodeAlpha / 100), speckA = c01(A.speckAlpha / 100);
      ctx.globalCompositeOperation = 'source-over';
      var draw = function (i, r0, a0) { ctx.globalAlpha = Math.min(1, a0); ctx.fillRect(sx[i] - r0 / 2, sy[i] - r0 / 2, r0, r0); };
      ctx.fillStyle = COL.node;
      for (i = 0; i < n; i++) { if (ss[i] === 0 || c.white[i]) continue; draw(i, unit * ss[i] * 0.8, (c.kind[i] === 2 ? speckA : nodeA) * sf[i]); }
      ctx.fillStyle = COL.accent;
      for (i = 0; i < n; i++) { if (ss[i] === 0 || !c.white[i]) continue; draw(i, unit * ss[i] * 1.2, (c.kind[i] === 2 ? speckA : 0.95) * sf[i]); }
      ctx.fillStyle = COL.node;
      for (i = 0; i < specks.n; i++) {
        var x0 = specks.x[i], y0 = specks.y[i], z0 = specks.z[i], xa = x0 * cy0 + z0 * sy0, za = -x0 * sy0 + z0 * cy0, ya = y0 * cp - za * sp, zb = (y0 * sp + za * cp) * 0.3, dn = f + zb; if (dn <= 0.3) continue;
        var sc = f / dn, px = cx + xa * sc * R, py = cyc + ya * sc * R; if (px < -4 || px > W + 4 || py < -4 || py > H + 4) continue;
        var fade = backFade + (1 - backFade) * c01(0.5 - zb * 0.7), rr = unit * 0.7 * sc; ctx.globalAlpha = speckA * fade; ctx.fillRect(px - rr / 2, py - rr / 2, rr, rr);
      }
      ctx.globalAlpha = 1;
      window.__pbPlexusMs = (window.__pbPlexusMs || 0) * 0.9 + (performance.now() - t0) * 0.1;
    };
    raf = requestAnimationFrame(tick);
    stop = function () { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onOut); canvas.remove(); cv = null; };
  }

  function sync() { if (isHome()) start(); else if (stop) { stop(); stop = null; } }
  window.addEventListener('hashchange', sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync); else sync();
  window.__pbPlexusStop = function () { if (stop) { stop(); stop = null; } };
})();
