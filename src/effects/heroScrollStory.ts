// @ts-nocheck
!(function () {
  var e = document.documentElement;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var t = matchMedia("(pointer: coarse)").matches,
      n = Math.max(innerHeight, document.documentElement.clientHeight),
      r = innerWidth,
      i = null,
      a = 0,
      o = function (e, t, n) {
        return Math.min(
          void 0 === n ? 1 : n,
          Math.max(void 0 === t ? 0 : t, e),
        );
      },
      s = function (e) {
        return 1 - Math.pow(1 - e, 3);
      };
    (addEventListener(
      "scroll",
      function () {
        a || (a = requestAnimationFrame(u));
      },
      { passive: !0 },
    ),
      addEventListener("resize", function () {
        if (t) {
          if (innerWidth === r) return void (n = Math.max(n, innerHeight));
          ((r = innerWidth),
            (n = Math.max(innerHeight, document.documentElement.clientHeight)));
        }
        i && (clearTimeout(i.rt), (i.rt = setTimeout(d, 120)));
      }));
    var l = 0;
    (setInterval(function () {
      var t = document.querySelector(".hero-graph .hero-note-p");
      if (
        (i &&
          (!i.p.isConnected || (t && !t.getAttribute("data-pbs"))) &&
          ((i = null), e.classList.remove("pb-story")),
        !i && t && l++ < 4e3)
      )
        try {
          !(function () {
            var t = document.querySelector(".hero-graph .hero-note-p"),
              n = document.querySelector(".hero-graph-in");
            if (!t || !n) return !1;
            var r = t.closest("section"),
              a = t.closest(".hero-graph"),
              o = t.closest(".hero-note");
            if (!r || !a || !o) return !1;
            if (t.getAttribute("data-pbs")) return !0;
            var s = t.querySelectorAll(":scope > span"),
              l = s[0],
              c = s[1];
            if (!c) return !1;
            t.setAttribute("data-pbs", "1");
            var p = c.textContent.trim().split(/\s+/),
              u = document.createElement("span");
            ((u.className = "pb-words"), u.setAttribute("aria-hidden", "true"));
            var h = [],
              m = Math.max(0, p.length - 2),
              y = document.createElement("span");
            ((y.className = "pb-pill"),
              p.forEach(function (e, t) {
                var n = document.createElement("span");
                ((n.className = "pb-w"), (n.textContent = e), h.push(n));
                var r = t >= m ? y : u;
                (t === m && u.appendChild(y),
                  r.appendChild(n),
                  t < p.length - 1 &&
                    r.appendChild(document.createTextNode(" ")));
              }),
              c.classList.add("pb-sr"),
              c.parentNode.insertBefore(u, c.nextSibling));
            var f = document.createElement("div");
            ((f.className = "pb-gspacer"),
              f.setAttribute("aria-hidden", "true"),
              a.appendChild(f),
              (i = {
                p: t,
                sec: r,
                graph: a,
                note: o,
                head: l,
                nodes: h,
                pill: y,
                gin: n,
                spacer: f,
                items: [],
                pinG: !1,
              }),
              e.classList.add("pb-story"),
              d());
          })();
        } catch (t) {
          ((i = null), e.classList.remove("pb-story"));
        }
      else if (i) {
        var n = i.gin.offsetHeight;
        i.pinG && Math.abs(n - i.gH) > 4 && d();
      }
    }, 500),
      document.fonts &&
        document.fonts.ready &&
        document.fonts.ready.then(function () {
          i && d();
        }),
      [300, 1200, 3e3].forEach(function (e) {
        setTimeout(h, e);
      }),
      addEventListener("resize", h),
      document.fonts && document.fonts.ready && document.fonts.ready.then(h));
  }
  function c() {
    return t ? n : innerHeight;
  }
  function d() {
    if (i) {
      var e = c(),
        t = innerWidth;
      (i.items.forEach(function (e) {
        ((e.el.style.opacity = ""),
          (e.el.style.translate = ""),
          (e.el.style.scale = ""),
          (e.el.style.pointerEvents = ""));
      }),
        (i.gin.style.scale = ""));
      var n = (function () {
        var e = [],
          t = i.gin.firstElementChild;
        if (!t) return e;
        var n = t.querySelector(":scope > .md\\:block");
        if (n && "none" !== getComputedStyle(n).display) {
          var r = n.firstElementChild,
            a = r ? Array.prototype.slice.call(r.children) : [],
            o = a.filter(function (e) {
              return "svg" === e.tagName || "SVG" === e.tagName;
            })[0],
            s = a.filter(function (e) {
              return "DIV" === e.tagName;
            }),
            l = a.filter(function (e) {
              return "BUTTON" === e.tagName;
            });
          (o && e.push({ el: o, kind: "lines" }),
            s.forEach(function (t) {
              e.push({ el: t, kind: "card", dx: -48, dy: 16 });
            }),
            l.forEach(function (t, n) {
              e.push({
                el: t,
                kind: "card",
                dx: 0 === n ? 0 : 56,
                dy: 0 === n ? 48 : 1 === n ? -24 : 32,
              });
            }));
          var c = t.querySelector(
            ":scope > div:not(.md\\:block):not(.md\\:hidden)",
          );
          return (
            c && e.push({ el: c, kind: "bar" }),
            { deskOn: !0, items: e }
          );
        }
        var d = t.querySelector(":scope > .md\\:hidden");
        return (
          d &&
            Array.prototype.forEach.call(d.children, function (t) {
              "DIV" === t.tagName && t.classList.contains("grid")
                ? Array.prototype.forEach.call(t.children, function (t) {
                    e.push({ el: t, kind: "card", dx: 0, dy: 36 });
                  })
                : e.push({ el: t, kind: "card", dx: 0, dy: 36 });
            }),
          { deskOn: !1, items: e }
        );
      })();
      ((i.items = n.items),
        (i.deskOn = n.deskOn),
        (i.tsecH = Math.round(e * (t >= 1024 ? 2.3 : 2.1))),
        i.sec.style.setProperty("height", i.tsecH + "px", "important"),
        i.sec.style.setProperty("margin-bottom", "0", "important"),
        (i.note.style.cssText =
          "position:sticky;top:" +
          Math.round(0.15 * e) +
          "px;height:" +
          Math.round(0.7 * e) +
          "px;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 !important;"));
      var r = i.gin.offsetHeight,
        a = Math.min(1, (e - 76 - 12) / r);
      if (((i.pinG = i.deskOn && a >= 0.66), i.pinG)) {
        i.gscale = a;
        var o = r * a,
          s = Math.max(76, Math.round((e - o) / 2));
        ((i.gtop = s),
          (i.gH = r),
          (i.gin.style.cssText =
            "position:sticky;top:" +
            s +
            "px;margin-top:0;transform-origin:50% 0;" +
            (a < 1 ? "scale:" + a + ";" : "")));
        var l = Math.round(1.5 * e);
        ((i.spacer.style.height = l + "px"),
          (i.spH = l),
          i.graph.style.setProperty("display", "block", "important"),
          i.graph.style.setProperty("padding-top", "0", "important"),
          i.graph.style.setProperty("min-height", "0", "important"),
          a < 1 && (i.gin.style.marginBottom = -(r - o) + "px"));
      } else
        ((i.gin.style.cssText = ""),
          (i.spacer.style.height = "0px"),
          i.graph.style.removeProperty("display"),
          i.graph.style.setProperty("padding-top", "0", "important"),
          i.graph.style.setProperty("min-height", "0", "important"),
          i.graph.style.setProperty("display", "block", "important"));
      u();
    }
  }
  function p(e, t, n) {
    var r = e.el;
    if (t >= 0.999)
      return (
        (r.style.opacity = ""),
        (r.style.translate = ""),
        (r.style.scale = ""),
        void (r.style.pointerEvents = "")
      );
    var i = s(t);
    ((r.style.opacity = String(t)),
      "card" === n &&
        ((r.style.translate =
          ((e.dx || 0) * (1 - i)).toFixed(1) +
          "px " +
          ((e.dy || 0) * (1 - i)).toFixed(1) +
          "px"),
        (r.style.scale = (0.94 + 0.06 * i).toFixed(3))),
      (r.style.pointerEvents = t < 0.4 ? "none" : ""));
  }
  function u() {
    if (((a = 0), i && i.sec.isConnected)) {
      var e = c(),
        t = i.sec.getBoundingClientRect(),
        n = i.tsecH - e + 0.25 * e,
        r = o((0.25 * e - t.top) / n),
        l = o(r / 0.08);
      ((i.head.style.opacity = l.toFixed(3)),
        (i.head.style.translate = "0 " + (18 * (1 - s(l))).toFixed(1) + "px"));
      for (
        var d = i.nodes.length, u = 0.1, h = Math.max(2.2 / d, 0.12), m = 0;
        m < d;
        m++
      ) {
        var y = u + (m / Math.max(1, d - 1)) * (0.56 - 0.56 * h),
          f = o((r - y) / (0.56 * h));
        i.nodes[m].style.opacity = (0.16 + 0.84 * s(f)).toFixed(3);
      }
      var g = o((r - 0.7) / 0.12);
      i.pill.style.setProperty("--pa", s(g).toFixed(3));
      var v,
        x = o((r - 0.86) / 0.12);
      if (
        ((i.p.style.opacity = (1 - s(x)).toFixed(3)),
        (i.p.style.translate = "0 " + (40 * -s(x)).toFixed(1) + "px"),
        i.pinG)
      ) {
        var b = i.spacer.getBoundingClientRect(),
          E = 0.16 * e;
        v = o((i.gtop + i.gH * i.gscale + E - b.top) / (0.92 * i.spH + E));
        var k = i.items,
          M = k.filter(function (e) {
            return "card" === e.kind;
          });
        M.length;
        k.forEach(function (e) {
          if ("lines" === e.kind) p(e, o((v - 0.5) / 0.3), "lines");
          else if ("bar" === e.kind) p(e, o((v - 0.8) / 0.12), "bar");
          else {
            var t = M.indexOf(e),
              n = [0.02, 0.09, 0.16, 0.3, 0.43, 0.56];
            p(
              e,
              o((v - (void 0 !== n[t] ? n[t] : 0.02 + 0.1 * t)) / 0.13),
              "card",
            );
          }
        });
      } else
        i.items.forEach(function (t) {
          var n = t.el.getBoundingClientRect();
          p(t, o((0.94 * e - n.top) / (0.26 * e)), t.kind);
        });
    }
  }
  function h() {
    var e = document.querySelector(".sv3-card .sv3-h3");
    if (e && !(innerWidth < 1100)) {
      var t = document.createElement("span"),
        n = getComputedStyle(e);
      ((t.textContent = e.textContent.trim()),
        (t.style.cssText =
          "position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0;font:" +
          n.font +
          ";letter-spacing:" +
          n.letterSpacing +
          ";text-transform:" +
          n.textTransform),
        document.body.appendChild(t));
      var r = Math.ceil(t.getBoundingClientRect().width) + 2;
      t.remove();
      var i = document.documentElement.style;
      r > 100 &&
        i.getPropertyValue("--sv3-tw") !== r + "px" &&
        i.setProperty("--sv3-tw", r + "px");
      var a = document.querySelectorAll(".sv3-card"),
        o = document.documentElement.style;
      if (a.length) {
        o.setProperty("--sv3-eq", "0px");
        for (var s = 0, l = 0; l < a.length; l++)
          s = Math.max(s, a[l].offsetHeight);
        o.setProperty("--sv3-eq", s + "px");
      }
    }
  }
})();
