/* keyCRM page: "Що ми робимо" cards -> magnetic carousel (photo bars that magnify near the cursor, click to open). */
(function () {
  var PHOTOS = [1, 2, 3, 4, 5, 6].map(function (n) { return 'assets/keycrm-steps/step-' + n + '.jpg'; });
  var FALL = [
    'radial-gradient(120% 90% at 20% 10%,#2431A4 0,transparent 60%),linear-gradient(160deg,#1a2170,#111144)',
    'radial-gradient(120% 90% at 80% 15%,#F98513 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)',
    'radial-gradient(110% 90% at 30% 90%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)',
    'radial-gradient(120% 90% at 70% 20%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#1a2170,#111144)',
    'radial-gradient(120% 90% at 20% 80%,#F98513 0,transparent 55%),linear-gradient(160deg,#2431A4,#111144)',
    'radial-gradient(120% 90% at 80% 80%,#C9D3FF 0,transparent 55%),linear-gradient(160deg,#1a2170,#111144)'
  ];
  var CSS = '' +
    '.pbm{position:relative;width:100%;overflow:visible;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none}' +
    '.pbm-row{display:flex;align-items:center;justify-content:center;width:100%;position:relative}' +
    '.pbm.v .pbm-row{flex-direction:column;align-items:stretch}' +
    '.pbm-bar{flex:none;position:relative;overflow:hidden;border-radius:20px;cursor:pointer;color:#fff;background:#111144;outline:none;will-change:width,height;z-index:2}' +
    '.pbm-bar:focus-visible{box-shadow:0 0 0 3px #F98513}' +
    '.pbm.t .pbm-bar{transition:width .3s ease-in-out,height .3s ease-in-out,filter .3s ease-in-out,opacity .3s ease-in-out}' +
    '.pbm-bar.on{z-index:3}' +
    '.pbm-bar.dim{filter:blur(2px);opacity:.6}' +
    '.pbm-bg{position:absolute;inset:-26px;background-size:cover;background-position:center;filter:blur(6px);transition:filter .3s ease-in-out}' +
    '.pbm-bar.on .pbm-bg{filter:blur(3px)}' +
    '.pbm-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,17,68,.42) 0,rgba(17,17,68,.18) 38%,rgba(17,17,68,.82) 100%)}' +
    '.pbm-num{position:absolute;left:16px;top:14px;font:800 26px/1 Manrope,"Inter Variable",system-ui,sans-serif;color:#F98513;letter-spacing:-.01em}' +
    '.pbm-foot{position:absolute;left:16px;right:16px;bottom:16px}' +
    '.pbm-cap{font:800 15px/1.25 Manrope,"Inter Variable",system-ui,sans-serif;color:#fff;margin:0;text-wrap:balance}' +
    '.pbm-desc{font:500 15px/1.5 Manrope,"Inter Variable",system-ui,sans-serif;color:#E9ECF8;margin:0;max-height:0;opacity:0;overflow:hidden;transition:max-height .3s ease-in-out,opacity .3s ease-in-out,margin .3s ease-in-out}' +
    '.pbm-bar.on .pbm-desc{max-height:170px;opacity:1;margin-top:10px}' +
    '.pbm-bar.on .pbm-cap{font-size:20px}' +
    '.pbm.v .pbm-num{font-size:22px;left:16px;top:12px}' +
    '.pbm.v .pbm-foot{bottom:12px}' +
    '.pbm.v .pbm-cap{font-size:16px}' +
    '.pbm.v .pbm-bar.on .pbm-cap{font-size:19px}' +
    '@media (prefers-reduced-motion:reduce){.pbm.t .pbm-bar,.pbm-desc,.pbm-bg{transition:none}}' +
    '[data-pb-steps]{display:none !important}';

  function ease(f) { return f * f * (3 - 2 * f); }

  function build(sec, grid) {
    var cards = Array.prototype.slice.call(grid.children);
    var items = cards.map(function (c, i) {
      var s = c.querySelector('span'), t = c.querySelector('h3'), p = c.querySelector('p');
      var m = s && s.textContent.match(/\d+/);
      return { n: m ? m[0] : ('0' + (i + 1)), t: t ? t.textContent : '', d: p ? p.textContent : '' };
    });
    var root = document.createElement('div');
    root.className = 'pbm';
    root.setAttribute('role', 'list');
    var row = document.createElement('div');
    row.className = 'pbm-row';
    root.appendChild(row);
    var bars = items.map(function (it, i) {
      var b = document.createElement('div');
      b.className = 'pbm-bar';
      b.tabIndex = 0;
      b.setAttribute('role', 'button');
      b.setAttribute('aria-expanded', 'false');
      b.setAttribute('aria-label', 'Крок ' + it.n + ': ' + it.t);
      b.innerHTML = '<div class="pbm-bg"></div><div class="pbm-shade"></div><div class="pbm-num"></div><div class="pbm-foot"><p class="pbm-cap"></p><p class="pbm-desc"></p></div>';
      b.querySelector('.pbm-bg').style.backgroundImage = 'url(' + PHOTOS[i % PHOTOS.length] + '),' + FALL[i % FALL.length];
      b.querySelector('.pbm-num').textContent = it.n;
      b.querySelector('.pbm-cap').textContent = it.t;
      b.querySelector('.pbm-desc').textContent = it.d;
      row.appendChild(b);
      return b;
    });

    var L = null, open = -1, cur = items.map(function () { return 0; }), tgt = cur.slice(), raf = 0, closeT = 0;

    function layout() {
      var W = root.clientWidth || 800, gap = W >= 1100 ? 16 : 12;
      var os = Math.min(500, Math.round(W * 0.46));
      var cw = Math.min(110, Math.floor((W - os - (items.length - 1) * gap) / (items.length - 1)));
      if (W < 860 || cw < 84) {
        L = { v: true, gap: 10, ch: 88, oh: Math.max(300, Math.min(420, Math.round(W * 1.05))) };
      } else {
        L = { v: false, cw: cw, hw: Math.round(cw * 1.8), ch: Math.round(os * 0.68), hh: Math.round(os * 0.8), os: os, gap: gap };
      }
      root.classList.toggle('v', L.v);
      row.style.gap = L.gap + 'px';
      row.style.height = L.v ? 'auto' : (L.os + 20) + 'px';
      apply();
    }

    function apply() {
      bars.forEach(function (b, i) {
        var w, h;
        if (L.v) {
          w = '100%'; h = (open === i ? L.oh : L.ch) + 'px';
        } else if (open >= 0) {
          w = (i === open ? L.os : L.cw) + 'px'; h = (i === open ? L.os : L.ch) + 'px';
        } else {
          var f = cur[i] || 0;
          w = (L.cw + (L.hw - L.cw) * f).toFixed(2) + 'px'; h = (L.ch + (L.hh - L.ch) * f).toFixed(2) + 'px';
        }
        b.style.width = w; b.style.height = h;
        b.classList.toggle('on', open === i);
        b.classList.toggle('dim', open >= 0 && open !== i);
        b.setAttribute('aria-expanded', open === i ? 'true' : 'false');
      });
    }

    function loop() {
      if (raf) return;
      var step = function () {
        var moving = false;
        for (var i = 0; i < cur.length; i++) {
          var d = tgt[i] - cur[i];
          if (Math.abs(d) > 0.001) { cur[i] += d * 0.2; moving = true; } else cur[i] = tgt[i];
        }
        apply();
        raf = moving ? requestAnimationFrame(step) : 0;
      };
      raf = requestAnimationFrame(step);
    }

    function fromCursor(x) {
      if (L.v || open >= 0) return;
      var r = row.getBoundingClientRect(), cx = x - r.left, n = items.length;
      var total = n * L.cw + (n - 1) * L.gap, start = (r.width - total) / 2;
      for (var i = 0; i < n; i++) {
        var c = start + i * (L.cw + L.gap) + L.cw / 2;
        tgt[i] = ease(Math.max(0, 1 - Math.abs(cx - c) / 200));
      }
      loop();
    }
    function flat() { for (var i = 0; i < tgt.length; i++) tgt[i] = 0; loop(); }

    function setOpen(i) {
      if (i < 0) {
        for (var k = 0; k < cur.length; k++) cur[k] = tgt[k] = 0;
        root.classList.add('t');
        clearTimeout(closeT);
        closeT = setTimeout(function () { if (open < 0) root.classList.remove('t'); }, 340);
      } else {
        clearTimeout(closeT);
        root.classList.add('t');
      }
      open = i;
      apply();
    }

    root.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') fromCursor(e.clientX); });
    root.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && open < 0) flat(); });
    bars.forEach(function (b, i) {
      b.addEventListener('click', function (e) { e.stopPropagation(); setOpen(open === i ? -1 : i); });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open === i ? -1 : i); }
        if (e.key === 'Escape') setOpen(-1);
      });
    });
    root.addEventListener('click', function () { if (open >= 0) setOpen(-1); });
    if (window.ResizeObserver) new ResizeObserver(layout).observe(root); else window.addEventListener('resize', layout);

    grid.setAttribute('data-pb-steps', '1');
    grid.parentNode.insertBefore(root, grid.nextSibling);
    layout();
    window.__pbStepsOpen = setOpen;
  }

  // the page component is reused between service routes: never leave the carousel (or the hidden grid) behind
  function cleanup() {
    Array.prototype.slice.call(document.querySelectorAll('.pbm')).forEach(function (r) { r.parentNode && r.parentNode.removeChild(r); });
    Array.prototype.slice.call(document.querySelectorAll('[data-pb-steps]')).forEach(function (g) { g.removeAttribute('data-pb-steps'); });
  }

  function mount() {
    if (location.hash.indexOf('#/keycrm') !== 0) { if (document.querySelector('.pbm,[data-pb-steps]')) cleanup(); return; }
    var stale = document.querySelector('.pbm');
    if (stale) {
      var hh = stale.closest('section') && stale.closest('section').querySelector('h2');
      if (!hh || !/Що ми робимо/.test(hh.textContent)) cleanup();
    }
    var h = Array.prototype.slice.call(document.querySelectorAll('h2')).filter(function (e) { return /Що ми робимо/.test(e.textContent); })[0];
    if (!h) return;
    var sec = h.closest('section');
    if (!sec || sec.querySelector('.pbm')) return;
    var grid = Array.prototype.slice.call(sec.querySelectorAll('div.grid')).filter(function (d) { return d.children.length === 6; })[0];
    if (!grid) return;
    if (!document.getElementById('pbm-css')) {
      var st = document.createElement('style'); st.id = 'pbm-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    build(sec, grid);
  }

  var pending = 0;
  function sched() { if (pending) return; pending = requestAnimationFrame(function () { pending = 0; mount(); }); }
  new MutationObserver(sched).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('hashchange', sched);
  sched();
})();
