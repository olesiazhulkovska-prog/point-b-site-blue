// @ts-nocheck
!(function () {
  function a() {
    if (0 === location.hash.indexOf("#/keycrm")) {
      var a = document.querySelector("h1");
      if (a) {
        var n = a.closest("section");
        if (n) {
          var c = n.querySelector(
            ":scope > div.relative > div.relative.rounded-2xl",
          );
          if (c && !c.querySelector(":scope > .pb-kv-host")) {
            c.setAttribute("data-pb-kv", "");
            var i = document.createElement("div");
            ((i.className = "pb-kv-host"),
              (i.style.cssText = "width:100%;display:block"),
              c.appendChild(i));
            var r = i.attachShadow({ mode: "open" });
            ((r.innerHTML =
              '<style>:host{display:block;\n  --base:#111144; --accent:#F98513; --light:#F4F7FF; --soft:#C9D3FF; --indigo:#2431A4; --page:#0B0B33;\n  --display:"Manrope","Inter Variable",system-ui,sans-serif; --text:"Manrope","Inter Variable",system-ui,sans-serif;\n  \n}\n*{box-sizing:border-box}\n.stagebox{container-type:inline-size;container-name:stage}\n.stage{--u:1cqw;position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:calc(var(--u)*1.6);\n  background:linear-gradient(180deg,#111144 0%,#111144 62%,#2431A4 100%);font-family:var(--text);color:var(--light)}\n.scene{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility 0s linear .45s;padding:calc(var(--u)*4)}\n.scene.on{opacity:1;visibility:visible;transition:opacity .45s ease}\n.cap{position:absolute;left:calc(var(--u)*4);bottom:calc(var(--u)*4);background:var(--light);color:var(--base);\n  font:800 calc(var(--u)*2.7)/1.15 var(--display);padding:calc(var(--u)*1.3) calc(var(--u)*2.2);border-radius:999px;max-width:calc(100% - var(--u)*8);\n  transform:translateY(calc(var(--u)*1.5));opacity:0;transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .4s}\n.scene.on .cap{transform:none;opacity:1;transition-delay:.15s}\n.card{background:var(--base);border:1px solid var(--indigo);border-radius:calc(var(--u)*1.6)}\n.small{color:var(--soft);font-size:calc(var(--u)*1.55)}\n.pill{display:inline-flex;align-items:center;border-radius:999px;font:700 calc(var(--u)*1.5)/1 var(--display);padding:calc(var(--u)*.8) calc(var(--u)*1.3)}\n.pill.o{background:var(--accent);color:var(--base)}\n\n/* scene 1 */\n.s1 .inbox{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:calc(var(--u)*66);padding:calc(var(--u)*2.2)}\n.hd{display:flex;align-items:center;justify-content:space-between;gap:var(--u);margin-bottom:calc(var(--u)*1.6)}\n.hd b{font:700 calc(var(--u)*2)/1.2 var(--display)}\n.rows{display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*1.1)}\n.row{display:flex;align-items:center;gap:calc(var(--u)*1.1);padding:calc(var(--u)*1.2);border-radius:calc(var(--u)*1.2);background:#1A1A5E;font-size:calc(var(--u)*1.9);font-weight:500;\n  opacity:0;transform:translateX(calc(var(--u)*-6));transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .4s}\n.row.on{opacity:1;transform:none}\n.ic{flex:none;width:calc(var(--u)*3.2);height:calc(var(--u)*3.2);border-radius:50%;background:var(--indigo);display:grid;place-items:center;font:700 calc(var(--u)*1.4)/1 var(--display)}\n.row em{margin-left:auto;font-style:normal;color:var(--base);background:var(--accent);border-radius:999px;font:700 calc(var(--u)*1.2)/1 var(--display);padding:calc(var(--u)*.5) calc(var(--u)*.8)}\n\n/* scene 2 */\n.s2 .board{position:absolute;left:calc(var(--u)*4);right:calc(var(--u)*4);top:calc(var(--u)*4);display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*1.4)}\n.col{background:rgba(17,17,68,.72);border:1px solid var(--indigo);border-radius:calc(var(--u)*1.4);height:calc(var(--u)*30);padding:calc(var(--u)*1.2)}\n.col h4{margin:0;font:700 calc(var(--u)*1.6)/1.2 var(--display);color:var(--soft)}\n.deals{position:absolute;left:calc(var(--u)*4);right:calc(var(--u)*4);top:calc(var(--u)*10);display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*1.4);pointer-events:none}\n.deal{grid-column:1;background:var(--light);color:var(--base);border-radius:calc(var(--u)*1.1);padding:calc(var(--u)*1.1) calc(var(--u)*1.2);margin-bottom:calc(var(--u)*1);margin-left:calc(var(--u)*1.2);margin-right:calc(var(--u)*1.2);\n  font-size:calc(var(--u)*1.6);font-weight:600;line-height:1.25;opacity:0;transform:translateX(calc(var(--c,0)*(100% + var(--u)*3.8))) translateY(calc(var(--u)*1.5));\n  transition:transform .8s cubic-bezier(.65,0,.35,1),opacity .4s}\n.deal.on{opacity:1;transform:translateX(calc(var(--c,0)*(100% + var(--u)*3.8)))}\n.deal small{display:block;font-weight:500;opacity:.8;font-size:calc(var(--u)*1.3)}\n.deal.done{background:var(--accent)}\n.deals{align-content:start}\n.deal:nth-child(2){grid-row:2}.deal:nth-child(3){grid-row:3}.deal:nth-child(1){grid-row:1}\n\n/* scene 3 */\n.s3 .order{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:calc(var(--u)*52);padding:calc(var(--u)*2.4)}\n.s3 .order .hd b{font-size:calc(var(--u)*2.2)}\n.steps{display:flex;flex-direction:column;gap:calc(var(--u)*1.1)}\n.step{display:flex;align-items:center;gap:calc(var(--u)*1.4);font-size:calc(var(--u)*2);font-weight:500;padding:calc(var(--u)*1.2);border-radius:calc(var(--u)*1.2);background:#1A1A5E;\n  opacity:.45;transition:opacity .4s}\n.step .ck{flex:none;width:calc(var(--u)*3);height:calc(var(--u)*3);border-radius:50%;border:2px solid var(--indigo);display:grid;place-items:center;transition:background .3s,border-color .3s}\n.step .ck svg{width:62%;height:62%;opacity:0;transition:opacity .25s}\n.step.on{opacity:1}\n.step.on .ck{background:var(--accent);border-color:var(--accent)}\n.step.on .ck svg{opacity:1}\n\n/* scene 4 */\n.s4 .kpis{position:absolute;left:calc(var(--u)*4);right:calc(var(--u)*4);top:calc(var(--u)*4);display:grid;grid-template-columns:repeat(3,1fr);gap:calc(var(--u)*1.6)}\n.kpi{padding:calc(var(--u)*2.2)}\n.kpi b{display:block;font:800 calc(var(--u)*5.6)/1 var(--display);font-variant-numeric:tabular-nums;margin-bottom:calc(var(--u)*1)}\n.kpi:first-child b{color:var(--accent)}\n.kpi span{font-size:calc(var(--u)*1.8);color:var(--soft)}\n.bars{position:absolute;left:calc(var(--u)*4);right:calc(var(--u)*4);top:calc(var(--u)*24);height:calc(var(--u)*17);display:flex;align-items:flex-end;gap:calc(var(--u)*1.2)}\n.bar{flex:1;background:var(--indigo);border-radius:calc(var(--u)*.7) calc(var(--u)*.7) 0 0;height:0}\n.bar:last-child{background:var(--accent)}\n\n/* scene 5 */\n.s5 .what{position:absolute;left:calc(var(--u)*4);right:calc(var(--u)*4);top:calc(var(--u)*5);display:grid;grid-template-columns:1fr 1fr;gap:calc(var(--u)*1.6)}\n.what div{padding:calc(var(--u)*2.6) calc(var(--u)*2.4);font:700 calc(var(--u)*3)/1.15 var(--display);opacity:0;transform:translateY(calc(var(--u)*2));transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .4s}\n.what div.on{opacity:1;transform:none}\n.what div small{display:block;font:500 calc(var(--u)*1.7)/1.35 var(--text);color:var(--soft);margin-top:calc(var(--u)*.8)}\n\n/* scene 6 */\n.s6{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:calc(var(--u)*2.4)}\n.s6 h2{margin:0;font:800 calc(var(--u)*6.2)/1.08 var(--display);max-width:16ch;text-wrap:balance}\n.btn{display:inline-flex;align-items:center;gap:calc(var(--u)*1.4);background:var(--accent);color:var(--base);font:800 calc(var(--u)*2.4)/1 var(--display);padding:calc(var(--u)*1.9) calc(var(--u)*3.2);border-radius:999px}\n.s6 .small{font-size:calc(var(--u)*1.9)}\n.s6 .cap{display:none}\n\n/* narrow stage: taller frame, bigger unit, single-column layouts */\n@container stage (min-width:521px) and (max-width:760px){.stage{--u:1.2cqw;aspect-ratio:3/2}}\n@container stage (max-width:520px){\n  .stage{--u:1.72cqw;aspect-ratio:4/5}\n  .s1 .inbox{width:calc(var(--u)*53);top:42%}\n  .rows{grid-template-columns:1fr}\n  .col{height:calc(var(--u)*27);padding:calc(var(--u)*.8)}\n  .col h4{font-size:calc(var(--u)*1.4)}\n  .deal{font-size:calc(var(--u)*1.35);padding:calc(var(--u)*.8)}\n  .deal small{display:none}\n  .s3 .order{width:calc(var(--u)*50)}\n  .s4 .kpis{grid-template-columns:1fr}\n  .kpi{padding:calc(var(--u)*1.4) calc(var(--u)*2)}\n  .kpi b{font-size:calc(var(--u)*4.2);margin-bottom:0}\n  .s4 .bars{top:calc(var(--u)*40);height:calc(var(--u)*12)}\n  .s5 .what{grid-template-columns:1fr}\n  .what div{padding:calc(var(--u)*1.8) calc(var(--u)*2);font-size:calc(var(--u)*2.7)}\n  .s6 h2{font-size:calc(var(--u)*5.4)}\n}\n\n</style><div class="stagebox">\n    <div class="stage" id="stage" role="img" aria-label="Анімація: заявки з усіх каналів, воронка продажів, автоматичне оформлення замовлення, аналітика, послуги Point B">\n\n      <section class="scene s1">\n        <div class="card inbox">\n          <div class="hd"><b>keyCRM · Нові заявки</b><span class="pill o" id="cnt">0</span></div>\n          <div class="rows" id="rows1"></div>\n        </div>\n        <div class="cap">Усі заявки в одному місці</div>\n      </section>\n\n      <section class="scene s2">\n        <div class="board">\n          <div class="col"><h4>Нова</h4></div><div class="col"><h4>В роботі</h4></div><div class="col"><h4>Оплата</h4></div><div class="col"><h4>Відправлено</h4></div>\n        </div>\n        <div class="deals" id="deals">\n          <div class="deal">Замовлення з Instagram<small>Сорочка, М · 1 890 ₴</small></div>\n          <div class="deal">Заявка з сайту<small>Консультація · 3 200 ₴</small></div>\n          <div class="deal">Telegram-бот<small>Набір, 2 шт · 940 ₴</small></div>\n        </div>\n        <div class="cap">Кожна заявка проходить воронку</div>\n      </section>\n\n      <section class="scene s3">\n        <div class="card order">\n          <div class="hd"><b>Замовлення з Instagram</b><span class="pill o">авто</span></div>\n          <div class="steps" id="steps">\n            <div class="step"><span class="ck"><svg viewBox="0 0 12 12"><path d="M2.4 6.4 5 9l4.6-5.4" fill="none" stroke="#111144" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Картка з реальним залишком</div>\n            <div class="step"><span class="ck"><svg viewBox="0 0 12 12"><path d="M2.4 6.4 5 9l4.6-5.4" fill="none" stroke="#111144" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>ТТН Нової пошти</div>\n            <div class="step"><span class="ck"><svg viewBox="0 0 12 12"><path d="M2.4 6.4 5 9l4.6-5.4" fill="none" stroke="#111144" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Чек ПРРО</div>\n            <div class="step"><span class="ck"><svg viewBox="0 0 12 12"><path d="M2.4 6.4 5 9l4.6-5.4" fill="none" stroke="#111144" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Повідомлення клієнту</div>\n          </div>\n        </div>\n        <div class="cap">Замовлення оформлюється само</div>\n      </section>\n\n      <section class="scene s4">\n        <div class="kpis">\n          <div class="card kpi"><b id="k1">37</b><span>Втрачені заявки на місяць</span></div>\n          <div class="card kpi"><b id="k2">0%</b><span>Час обробки замовлення</span></div>\n          <div class="card kpi"><b id="k3">+0%</b><span>Конверсія у продаж</span></div>\n        </div>\n        <div class="bars" id="bars"><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div><div class="bar"></div></div>\n        <div class="cap">Цифри замість здогадок</div>\n      </section>\n\n      <section class="scene s5">\n        <div class="what" id="what">\n          <div class="card">Воронки продажів<small>Етапи, задачі, нагадування</small></div>\n          <div class="card">Інтеграції<small>Сайт, боти, 1С, склад, облік</small></div>\n          <div class="card">Автоматизації<small>Статуси, ТТН, ПРРО, повідомлення</small></div>\n          <div class="card">Навчання команди<small>Відеоінструкції та підтримка</small></div>\n        </div>\n        <div class="cap">Що робимо ми</div>\n      </section>\n\n      <section class="scene s6">\n        <h2>Обговоримо ваші процеси</h2>\n        <span class="btn">Залишити заявку</span>\n        <span class="small">Point B Group · офіційний партнер keyCRM</span>\n      </section>\n    </div>\n  </div>'),
              (function (a) {
                !(function () {
                  var n = 30,
                    c = [0, 5, 11, 17, 23, 27],
                    i = [].slice.call(a.querySelectorAll(".scene")),
                    r = [
                      "Сайт",
                      "Instagram",
                      "Telegram",
                      "Маркетплейс",
                      "Дзвінки",
                      "Email",
                    ],
                    s = ["С", "In", "Tg", "М", "Т", "@"],
                    t = a.getElementById("rows1");
                  r.forEach(function (a, n) {
                    var c = document.createElement("div");
                    ((c.className = "row"),
                      (c.innerHTML =
                        '<span class="ic">' +
                        s[n] +
                        "</span>" +
                        a +
                        "<em>нова</em>"),
                      t.appendChild(c));
                  });
                  var e = [].slice.call(t.children),
                    l = a.getElementById("cnt"),
                    o = [].slice.call(a.querySelectorAll(".deal")),
                    d = [].slice.call(a.querySelectorAll(".step")),
                    v = a.getElementById("k1"),
                    p = a.getElementById("k2"),
                    u = a.getElementById("k3"),
                    g = [].slice.call(a.querySelectorAll(".bar")),
                    m = [0.28, 0.36, 0.34, 0.52, 0.5, 0.72, 0.92],
                    h = [].slice.call(a.querySelectorAll("#what div")),
                    b = function (a) {
                      return (
                        (a = Math.max(0, Math.min(1, a))),
                        1 - Math.pow(1 - a, 3)
                      );
                    },
                    f = [
                      [0, 0.9, 1.8, 2.7],
                      [0, 1.3, 2.4, 3.5],
                      [0, 1.8, 3, 4.2],
                    ];
                  function y(a) {
                    for (var n = 0, r = 0; r < 6; r++) a >= c[r] && (n = r);
                    var s = a - c[n];
                    i.forEach(function (a, c) {
                      a.classList.toggle("on", c === n);
                    });
                    var t = Math.max(
                      0,
                      Math.min(6, Math.floor((s - 0.5) / 0.5) + 1),
                    );
                    (0 !== n && (t = n > 0 && n > 0 && a < c[0] ? 0 : t),
                      e.forEach(function (a, c) {
                        a.classList.toggle("on", 0 !== n || c < t);
                      }),
                      (l.textContent = 0 === n ? t : 6),
                      o.forEach(function (a, c) {
                        for (var i = f[c], r = 0, t = 1; t < i.length; t++)
                          1 === n && s >= i[t] + 0.8 && (r = t);
                        (n > 1 && (r = 3),
                          1 === n && s < 0.5 && (r = 0),
                          a.style.setProperty("--c", r),
                          a.classList.toggle(
                            "on",
                            1 === n ? s > 0.3 + 0.25 * c : n > 1,
                          ),
                          a.classList.toggle("done", 3 === r));
                      }));
                    var y =
                      2 === n
                        ? Math.max(
                            0,
                            Math.min(4, Math.floor((s - 0.6) / 1) + 1),
                          )
                        : n > 2
                          ? 4
                          : 0;
                    d.forEach(function (a, n) {
                      a.classList.toggle("on", n < y);
                    });
                    var k = 3 === n ? b((s - 0.3) / 2) : n > 3 ? 1 : 0;
                    ((v.textContent = Math.round(37 * (1 - k))),
                      (p.textContent = "−" + Math.round(40 * k) + "%"),
                      (u.textContent = "+" + Math.round(18 * k) + "%"),
                      g.forEach(function (a, c) {
                        ((a.style.height =
                          100 *
                            m[c] *
                            b((s - 0.2 - 0.12 * c) / 1) *
                            (3 === n || n > 3 ? 1 : 0) +
                          "%"),
                          (a.style.transition = "height .6s"));
                      }));
                    var w =
                      4 === n ? Math.floor((s - 0.2) / 0.5) + 1 : n > 4 ? 4 : 0;
                    h.forEach(function (a, n) {
                      a.classList.toggle("on", n < w);
                    });
                  }
                  var k = 0,
                    w = !0,
                    x = !0,
                    M = 0,
                    E = matchMedia("(prefers-reduced-motion: reduce)").matches;
                  function z(a) {
                    (w &&
                      x &&
                      (k += Math.min(0.1, (a - M) / 1e3)) >= n &&
                      (k = 0),
                      (M = a),
                      y(k),
                      requestAnimationFrame(z));
                  }
                  ((window.__pbKvSeek = function (a) {
                    ((w = !1), y((k = a)));
                  }),
                    window.IntersectionObserver &&
                      new IntersectionObserver(function (a) {
                        x = a[0].isIntersecting;
                      }).observe(a.getElementById("stage")),
                    E && ((w = !1), (k = 3.8)),
                    requestAnimationFrame(function (a) {
                      ((M = a), z(a));
                    }));
                })();
              })(r));
          }
        }
      }
    }
  }
  var n = document.createElement("style");
  ((n.textContent =
    "[data-pb-kv]{padding:0 !important;border:0 !important;box-shadow:none !important;background:transparent !important;overflow:visible !important}[data-pb-kv]>div:not(.pb-kv-host){display:none !important}"),
    document.head.appendChild(n),
    new MutationObserver(function () {
      0 === location.hash.indexOf("#/keycrm") && a();
    }).observe(document.documentElement, { childList: !0, subtree: !0 }),
    window.addEventListener("hashchange", a),
    a());
})();
