/* Point B: сторітелінг на скролі після хіро.
   1) текст «Зводимо в систему…» закріплюється, слова проявляються по черзі, останні слова — «плашка»;
   2) далі закріплюється блок з графіком, і його картки з'являються одна за одною. */
(function () {
  var de = document.documentElement;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var S = null; // поточний стан (перестворюється, коли React перемальовує блок)
  var raf = 0;
  var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };

  function build() {
    var p = document.querySelector('.hero-graph .hero-note-p');
    var gin = document.querySelector('.hero-graph-in');
    if (!p || !gin) return false;
    var sec = p.closest('section');
    var graph = p.closest('.hero-graph');
    var note = p.closest('.hero-note');
    if (!sec || !graph || !note) return false;
    if (p.getAttribute('data-pbs')) return true;

    var spans = p.querySelectorAll(':scope > span');
    var head = spans[0], body = spans[1];
    if (!body) return false;
    p.setAttribute('data-pbs', '1');

    // слова: оригінальний span лишається для скрінрідерів, поруч — анімований дубль
    var text = body.textContent.trim().split(/\s+/);
    var words = document.createElement('span');
    words.className = 'pb-words';
    words.setAttribute('aria-hidden', 'true');
    var nodes = [];
    var pillFrom = Math.max(0, text.length - 2);
    var pill = document.createElement('span');
    pill.className = 'pb-pill';
    text.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'pb-w';
      s.textContent = w;
      nodes.push(s);
      var host = i >= pillFrom ? pill : words;
      if (i === pillFrom) words.appendChild(pill);
      host.appendChild(s);
      if (i < text.length - 1) host.appendChild(document.createTextNode(' '));
    });
    body.classList.add('pb-sr');
    body.parentNode.insertBefore(words, body.nextSibling);

    // спейсер під закріплений графік
    var spacer = document.createElement('div');
    spacer.className = 'pb-gspacer';
    spacer.setAttribute('aria-hidden', 'true');
    graph.appendChild(spacer);

    S = { p: p, sec: sec, graph: graph, note: note, head: head, nodes: nodes, pill: pill, gin: gin, spacer: spacer, items: [], pinG: false };
    de.classList.add('pb-story');
    layout();
    return true;
  }

  function collect() {
    var items = [];
    var gin = S.gin;
    var wrap = gin.firstElementChild;
    if (!wrap) return items;
    var desk = wrap.querySelector(':scope > .md\\:block');
    var deskOn = desk && getComputedStyle(desk).display !== 'none';
    if (deskOn) {
      var inner = desk.firstElementChild;
      var kids = inner ? Array.prototype.slice.call(inner.children) : [];
      var svg = kids.filter(function (k) { return k.tagName === 'svg' || k.tagName === 'SVG'; })[0];
      var lefts = kids.filter(function (k) { return k.tagName === 'DIV'; });
      var btns = kids.filter(function (k) { return k.tagName === 'BUTTON'; });
      if (svg) items.push({ el: svg, kind: 'lines' });
      lefts.forEach(function (el) { items.push({ el: el, kind: 'card', dx: -48, dy: 16 }); });
      btns.forEach(function (el, i) { items.push({ el: el, kind: 'card', dx: i === 0 ? 0 : 56, dy: i === 0 ? 48 : (i === 1 ? -24 : 32) }); });
      var bar = wrap.querySelector(':scope > div:not(.md\\:block):not(.md\\:hidden)');
      if (bar) items.push({ el: bar, kind: 'bar' });
      return { deskOn: true, items: items };
    }
    var mob = wrap.querySelector(':scope > .md\\:hidden');
    if (mob) {
      Array.prototype.forEach.call(mob.children, function (c) {
        if (c.tagName === 'DIV' && c.classList.contains('grid')) {
          Array.prototype.forEach.call(c.children, function (cc) { items.push({ el: cc, kind: 'card', dx: 0, dy: 36 }); });
        } else {
          items.push({ el: c, kind: 'card', dx: 0, dy: 36 });
        }
      });
    }
    return { deskOn: false, items: items };
  }

  function clearItems() {
    S.items.forEach(function (it) { it.el.style.opacity = ''; it.el.style.translate = ''; it.el.style.scale = ''; it.el.style.pointerEvents = ''; });
  }

  function layout() {
    if (!S) return;
    var vh = innerHeight, vw = innerWidth;
    clearItems();
    S.gin.style.scale = '';
    var c = collect();
    S.items = c.items;
    S.deskOn = c.deskOn;
    // текстова секція: закріплений блок + запас скролу
    S.tsecH = Math.round(vh * (vw >= 1024 ? 2.2 : 2));
    S.sec.style.setProperty('height', S.tsecH + 'px', 'important');
    S.sec.style.setProperty('margin-bottom', '0', 'important');
    S.note.style.cssText = 'position:sticky;top:' + Math.round(vh * 0.15) + 'px;height:' + Math.round(vh * 0.7) + 'px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 !important;';
    // графік
    var H = S.gin.offsetHeight;
    var topPad = 76;
    var sc = Math.min(1, (vh - topPad - 12) / H);
    S.pinG = S.deskOn && sc >= 0.66;
    if (S.pinG) {
      S.gscale = sc;
      var vis = H * sc;
      var top = Math.max(topPad, Math.round((vh - vis) / 2));
      S.gtop = top;
      S.gH = H;
      S.gin.style.cssText = 'position:sticky;top:' + top + 'px;margin-top:' + (-Math.round(vh * 0.5)) + 'px;transform-origin:50% 0;' + (sc < 1 ? 'scale:' + sc + ';' : '');
      var sp = Math.round(vh * 1.5);
      S.spacer.style.height = sp + 'px';
      S.spH = sp;
      S.graph.style.setProperty('display', 'block', 'important');
      S.graph.style.setProperty('padding-top', '0', 'important');
      S.graph.style.setProperty('min-height', '0', 'important');
      // sticky-блок із scale займає повну висоту H; компенсуємо зайве місце
      if (sc < 1) S.gin.style.marginBottom = (-(H - vis)) + 'px';
    } else {
      S.gin.style.cssText = '';
      S.spacer.style.height = '0px';
      S.graph.style.removeProperty('display');
      S.graph.style.setProperty('padding-top', '0', 'important');
      S.graph.style.setProperty('min-height', '0', 'important');
      S.graph.style.setProperty('display', 'block', 'important');
    }
    update();
  }

  function setItem(it, q, kind) {
    var el = it.el;
    if (q >= 0.999) { el.style.opacity = ''; el.style.translate = ''; el.style.scale = ''; el.style.pointerEvents = ''; return; }
    var e = ease(q);
    el.style.opacity = String(q);
    if (kind === 'card') {
      el.style.translate = ((it.dx || 0) * (1 - e)).toFixed(1) + 'px ' + ((it.dy || 0) * (1 - e)).toFixed(1) + 'px';
      el.style.scale = (0.94 + 0.06 * e).toFixed(3);
    }
    el.style.pointerEvents = q < 0.4 ? 'none' : '';
  }

  function update() {
    raf = 0;
    if (!S || !S.sec.isConnected) return;
    var vh = innerHeight;
    // 1) текст
    var r = S.sec.getBoundingClientRect();
    var total = S.tsecH - vh + vh * 0.25;
    var p = clamp((vh * 0.25 - r.top) / total);
    var h = clamp(p / 0.08);
    S.head.style.opacity = h.toFixed(3);
    S.head.style.translate = '0 ' + ((1 - ease(h)) * 18).toFixed(1) + 'px';
    var n = S.nodes.length, f0 = 0.1, f1 = 0.74, win = Math.max(2.2 / n, 0.12);
    for (var i = 0; i < n; i++) {
      var t = f0 + (i / Math.max(1, n - 1)) * (f1 - f0 - win * (f1 - f0));
      var a = clamp((p - t) / (win * (f1 - f0)));
      S.nodes[i].style.opacity = (0.16 + 0.84 * ease(a)).toFixed(3);
    }
    var pa = clamp((p - 0.8) / 0.12);
    S.pill.style.setProperty('--pa', ease(pa).toFixed(3));
    var fo = clamp((p - 0.9) / 0.1);
    S.p.style.opacity = (1 - ease(fo)).toFixed(3);
    S.p.style.translate = '0 ' + (-ease(fo) * 40).toFixed(1) + 'px';
    // 2) графік
    var g;
    if (S.pinG) {
      var sr = S.spacer.getBoundingClientRect();
      var ex = vh * 0.3;
      g = clamp(((S.gtop + S.gH * S.gscale + ex) - sr.top) / (S.spH * 0.92 + ex));
      var k = S.items;
      var cards = k.filter(function (x) { return x.kind === 'card'; });
      var nc = cards.length;
      k.forEach(function (it) {
        if (it.kind === 'lines') { setItem(it, clamp((g - 0.5) / 0.3), 'lines'); }
        else if (it.kind === 'bar') { setItem(it, clamp((g - 0.8) / 0.12), 'bar'); }
        else {
          var idx = cards.indexOf(it);
          var starts = [0.02, 0.09, 0.16, 0.3, 0.43, 0.56];
          var st = starts[idx] !== undefined ? starts[idx] : 0.02 + idx * 0.1;
          setItem(it, clamp((g - st) / 0.13), 'card');
        }
      });
    } else {
      S.items.forEach(function (it) {
        var rr = it.el.getBoundingClientRect();
        var q = clamp((vh * 0.94 - rr.top) / (vh * 0.26));
        setItem(it, q, it.kind);
      });
    }
  }

  function tick() { if (!raf) raf = requestAnimationFrame(update); }

  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', function () { if (S) { clearTimeout(S.rt); S.rt = setTimeout(layout, 120); } });

  var tries = 0;
  setInterval(function () {
    var p = document.querySelector('.hero-graph .hero-note-p');
    if (S && (!S.p.isConnected || (p && !p.getAttribute('data-pbs')))) { S = null; de.classList.remove('pb-story'); }
    if (!S && p && tries++ < 4000) {
      try { build(); } catch (e) { S = null; de.classList.remove('pb-story'); }
    } else if (S) {
      // розмір графіка міг змінитися після завантаження шрифтів / картинок
      var H = S.gin.offsetHeight;
      if (S.pinG && Math.abs(H - S.gH) > 4) layout();
    }
  }, 500);
  document.fonts && document.fonts.ready && document.fonts.ready.then(function () { if (S) layout(); });
})();
