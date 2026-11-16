// Події сайту для маскота: маскот слухає window.addEventListener("pb:mascot", e => e.detail)
// detail: { type, rect?, label? }
//  cta-hover / cta-leave  — курсор над кнопкою «Залишити заявку» (rect — її положення у вікні)
//  cta-click              — натискання на кнопку заявки
//  cta-visible            — кнопка заявки зараз у видимій частині екрана (раз на показ)
//  form-focus / form-blur — фокус у полі форми заявки
//  idle / active          — 8 с без дій користувача / будь-яка дія
//  Також window.__pbMascotLast зберігає останню подію (для маскота, що завантажився пізніше).
(function () {
  var w = window as any;
  function emit(type: string, el?: Element | null) {
    var detail: any = { type: type, t: Date.now() };
    if (el) {
      var r = el.getBoundingClientRect();
      detail.rect = { x: r.left, y: r.top, w: r.width, h: r.height };
      detail.label = (el.textContent || "").trim().slice(0, 40);
    }
    w.__pbMascotLast = detail;
    try {
      dispatchEvent(new CustomEvent("pb:mascot", { detail: detail }));
    } catch (e) {}
  }
  function cta(t: EventTarget | null) {
    var el = t && (t as Element).closest ? (t as Element).closest("a,button") : null;
    return el && /залишити заявку/i.test(el.textContent || "") ? el : null;
  }
  var cur: Element | null = null;
  document.addEventListener(
    "pointerover",
    function (e) {
      if ((e as PointerEvent).pointerType === "touch") return;
      var c = cta(e.target);
      if (c && c !== cur) {
        cur = c;
        emit("cta-hover", c);
      }
    },
    { passive: true },
  );
  document.addEventListener(
    "pointerout",
    function (e) {
      if (!cur) return;
      var to = (e as PointerEvent).relatedTarget as Node | null;
      if (!to || !cur.contains(to)) {
        var c = cur;
        cur = null;
        emit("cta-leave", c);
      }
    },
    { passive: true },
  );
  document.addEventListener(
    "click",
    function (e) {
      var c = cta(e.target);
      if (c) emit("cta-click", c);
    },
    { passive: true },
  );
  document.addEventListener("focusin", function (e) {
    var t = e.target as Element;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) emit("form-focus", t);
  });
  document.addEventListener("focusout", function (e) {
    var t = e.target as Element;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) emit("form-blur", t);
  });
  // idle / active
  var idle = false,
    timer: any = 0;
  function arm() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      idle = true;
      emit("idle");
    }, 4000);
  }
  function act() {
    if (idle) {
      idle = false;
      emit("active");
    }
    arm();
  }
  ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"].forEach(function (n) {
    addEventListener(n, act, { passive: true });
  });
  arm();
  // cta-visible: перша видима кнопка заявки в основному контенті
  if ("IntersectionObserver" in window) {
    var seen = new WeakSet<Element>();
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting && !seen.has(en.target)) {
            seen.add(en.target);
            emit("cta-visible", en.target);
          } else if (!en.isIntersecting) seen.delete(en.target);
        });
      },
      { threshold: 0.6 },
    );
    var scan = function () {
      document.querySelectorAll("a,button").forEach(function (b) {
        if (/залишити заявку/i.test(b.textContent || "") && !(b as any).__pbio) {
          (b as any).__pbio = 1;
          io.observe(b);
        }
      });
    };
    new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
    scan();
  }
})();
