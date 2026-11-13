// @ts-nocheck
(function () {
  var SP = [8, 12, 16, 24, 32, 48, 64, 80, 96];
  function snapSp(v) {
    if (v < 6) return v;
    var b = SP[0],
      d = 1e9;
    for (var i = 0; i < SP.length; i++) {
      var x = Math.abs(SP[i] - v);
      if (x < d) {
        d = x;
        b = SP[i];
      }
    }
    return b;
  }
  function snapFs(px) {
    if (px >= 100) return ["var(--fs-h1)", ".95"];
    if (px >= 48) return ["var(--fs-h2)", "1"];
    if (px >= 30) return ["var(--fs-h3)", "1.1"];
    if (px >= 18.5) return ["20px", "1.5"];
    if (px >= 15) return ["16px", "1.5"];
    return ["14px", "1.4"];
  }
  var seen = new WeakMap();
  function setp(e, p, v) {
    if (!e.__ds) e.__ds = {};
    if (!(p in e.__ds))
      e.__ds[p] = [e.style.getPropertyValue(p), e.style.getPropertyPriority(p)];
    e.style.setProperty(p, v, "important");
  }
  function restore(e) {
    if (!e.__ds) return;
    for (var p in e.__ds) {
      var o = e.__ds[p];
      if (o[0]) e.style.setProperty(p, o[0], o[1]);
      else e.style.removeProperty(p);
    }
    e.__ds = null;
  }
  var PROPS = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"];
  var CP = ["padding-top", "padding-right", "padding-bottom", "padding-left"];
  function run(root) {
    var host =
      !root || root === document.body ? document.documentElement : root;
    if (host.classList.contains("pb-ds-run")) return run0(root);
    host.classList.add("pb-ds-run");
    try {
      run0(root);
    } finally {
      void getComputedStyle(host).transitionDuration;
      host.classList.remove("pb-ds-run");
    }
  }
  function run0(root) {
    var small = matchMedia("(max-width:480px)").matches,
      mobile = matchMedia("(max-width:767px)").matches;
    var key = (small ? "s" : "") + (mobile ? "m" : "") + innerWidth;
    var all;
    if (Array.isArray(root)) {
      all = [];
      for (var ri = 0; ri < root.length; ri++) {
        all.push(root[ri]);
        var dd = root[ri].querySelectorAll("*");
        for (var q2 = 0; q2 < dd.length; q2++) all.push(dd[q2]);
      }
    } else {
      all = (root || document.body).querySelectorAll("*");
      if (root && root !== document.body) {
        var _l = [root];
        for (var q = 0; q < all.length; q++) _l.push(all[q]);
        all = _l;
      }
    }
    /* perf: phase 0 restores, phase 1 only READS styles, phase 2 WRITES - one style recalc instead of one per element */
    var todo = [];
    for (var n0 = 0; n0 < all.length; n0++) {
      var e0 = all[n0],
        t0 = e0.tagName;
      if (
        t0 === "SCRIPT" ||
        t0 === "STYLE" ||
        t0 === "CANVAS" ||
        t0 === "svg" ||
        t0 === "path" ||
        t0 === "VIDEO" ||
        e0.closest("svg")
      )
        continue;
      if (seen.get(e0) === key) continue;
      restore(e0);
      seen.set(e0, key);
      todo.push(e0);
    }
    var list = todo,
      guard = 0;
    while (list.length && guard++ < 8) {
      var ops = [],
        fsSet = new Set(),
        def = [];
      for (var n = 0; n < list.length; n++) {
        var e = list[n],
          tag = e.tagName;
        /* inherited font-size: if an ancestor gets a new size in this pass, re-read this node in the next pass */
        if (fsSet.size) {
          var anc = false;
          for (var pp = e.parentElement; pp; pp = pp.parentElement)
            if (fsSet.has(pp)) {
              anc = true;
              break;
            }
          if (anc) {
            def.push(e);
            fsSet.add(e);
            continue;
          }
        }
        var cs = getComputedStyle(e),
          r = cs.borderTopLeftRadius;
        /* 1. radius */
        var rv = parseFloat(r);
        if (rv > 0 && !e.dataset.dsRound) {
          var w = e.offsetWidth,
            h = e.offsetHeight;
          if (Math.abs(w - h) <= 2 && w <= 64 && w > 0)
            ops.push(e, "border-radius", "50%");
          else if (r.indexOf("%") < 0)
            ops.push(e, "border-radius", "var(--radius)");
          else if (rv === 50 && Math.abs(w - h) > 2)
            ops.push(e, "border-radius", "var(--radius)");
        }
        var isHead = /^H[1-4]$/.test(tag),
          inHeader = e.closest("header,nav.fixed,#cookie-consent-banner");
        /* 2. font size */
        if (
          !isHead &&
          !e.closest("h1,h2,h3,h4") &&
          !e.matches("h2 + p") &&
          !e.closest(".hero-fan") &&
          !e.matches('#why-us-section [class*="text-[44px]"]') &&
          !(small && e.closest(".sv3-viz"))
        ) {
          var hasText = false;
          for (var c = e.firstChild; c; c = c.nextSibling) {
            if (c.nodeType === 3 && c.textContent.trim()) {
              hasText = true;
              break;
            }
          }
          if (
            hasText &&
            !/^(Point|B|POINT)$/.test(e.textContent.trim()) &&
            !e.closest("[data-hero-title]")
          ) {
            var fs = parseFloat(cs.fontSize),
              sn = snapFs(fs);
            /* v95: text inside the hero scheme reads one step larger on desktop (14->16, 16->18) */
            if (innerWidth >= 1100 && e.closest(".hero-note")) {
              sn = ["clamp(30px,4.45vw,64px)", "1.156"];
            } else if (
              innerWidth < 1100 &&
              e.closest(".hero-graph .hero-note")
            ) {
              sn = ["clamp(26px,6.8vw,40px)", "1.22"];
            } else if (
              e.closest(".sv3-viz") &&
              ((innerWidth >= 768 && innerWidth < 1100) ||
                (innerWidth >= 1100 && innerHeight <= 900))
            ) {
              sn = e.matches(".font-bold.leading-tight")
                ? ["12px", "1.3"]
                : fs >= 15
                  ? ["14px", "1.4"]
                  : ["13px", "1.35"];
            } else if (
              innerWidth >= 1360 &&
              innerHeight <= 830 &&
              e.closest(".hero-graph-in")
            ) {
              sn = fs >= 15 ? ["13.5px", "1.3"] : ["12px", "1.28"];
            } else if (innerWidth >= 1360 && e.closest(".hero-graph-in")) {
              sn = fs >= 15 ? ["17px", "1.4"] : ["15px", "1.4"];
            } else if (innerWidth >= 1100 && e.closest(".hero-graph-in")) {
              sn = fs >= 15 ? ["13.5px", "1.3"] : ["12px", "1.28"];
            }
            if (
              e.parentElement &&
              e.parentElement.matches(
                ':is(#services-section,#why-us-section,#cases-section,#reviews-section,#cta-section) :is(div[class*="font-mono"],.cta-col > div.inline-flex):has(+ h2)',
              )
            )
              sn = ["16px", "1.4"];
            ops.push(e, "font-size", sn[0]);
            ops.push(e, "line-height", sn[1]);
            fsSet.add(e);
          }
        }
        /* 3. spacing (padding + gap), not on sections / graphs */
        if (
          tag !== "SECTION" &&
          tag !== "FOOTER" &&
          tag !== "HEADER" &&
          tag !== "MAIN" &&
          tag !== "BODY" &&
          !e.classList.contains("sv3-card") &&
          !e.closest(".sv3-viz") &&
          !e.closest(".sv3-dg")
        ) {
          for (var k = 0; k < 4; k++) {
            var pv = parseFloat(cs[PROPS[k]]);
            if (pv >= 6) {
              var sp = snapSp(pv);
              if (sp !== Math.round(pv)) ops.push(e, CP[k], sp + "px");
            }
          }
          var g1 = parseFloat(cs.rowGap),
            g2 = parseFloat(cs.columnGap);
          if (g1 >= 6) {
            var s1 = snapSp(g1);
            if (s1 !== Math.round(g1)) ops.push(e, "row-gap", s1 + "px");
          }
          if (g2 >= 6) {
            var s2 = snapSp(g2);
            if (s2 !== Math.round(g2)) ops.push(e, "column-gap", s2 + "px");
          }
        }
      }
      for (var z = 0; z < ops.length; z += 3)
        setp(ops[z], ops[z + 1], ops[z + 2]);
      list = def;
    }
  }
  var t = 0;
  function sched() {
    clearTimeout(t);
    t = setTimeout(function () {
      run();
    }, 120);
  }
  /* #71: новододані вузли (модалки, картки) нормалізуємо синхронно в мікротаску, до першого кадру, а не через 120мс — щоб не було стрибка радіусів і відступів */
  new MutationObserver(function (ms) {
    var nodes = [];
    for (var i = 0; i < ms.length; i++) {
      var ad = ms[i].addedNodes;
      for (var j = 0; j < ad.length; j++) {
        var nd = ad[j];
        if (nd.nodeType === 1 && nd.isConnected) nodes.push(nd);
      }
    }
    if (!nodes.length) return;
    /* one batched pass for all nodes added in this tick (React mounts hundreds): skip nodes inside another added node */
    var set = new Set(nodes),
      roots = nodes.filter(function (n) {
        for (var p = n.parentElement; p; p = p.parentElement)
          if (set.has(p)) return false;
        return true;
      });
    roots.forEach(function (r) {
      r.classList.add("pb-ds-run");
    });
    try {
      run0(roots);
    } finally {
      void getComputedStyle(document.documentElement).transitionDuration;
      roots.forEach(function (r) {
        r.classList.remove("pb-ds-run");
      });
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener("resize", sched);
  setTimeout(function () {
    run();
  }, 300);
  __pbxTick(function () {
    run();
  });
})();
