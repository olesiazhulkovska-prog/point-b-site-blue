// @ts-nocheck
import * as React from "react";
import "./AboutHeroScene.css";

/* Hero «Про компанію»: цифрова екосистема (месенджери → AI-бот → CRM → автоматизація → результат).
   Чистий HTML/CSS/SVG. Один цикл ~19 с, потім безшовно повторюється.
   Стан сцени — одне число s (0…18), CSS реагує на класи, без важких бібліотек. */

const STEPS = [0, 400, 900, 1400, 1900, 2500, 3500, 4600, 5600, 7000, 8000, 9400, 10800, 11600, 12300, 13000, 13700, 14500, 15300];
const RESET_AT = 18800;
const LOOP_AT = 19500;

const Insta = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <defs>
      <linearGradient id="abx-ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#F58529" />
        <stop offset=".5" stopColor="#DD2A7B" />
        <stop offset="1" stopColor="#8134AF" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="9" fill="url(#abx-ig)" />
    <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="16" cy="16" r="3.8" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="21" cy="11" r="1.1" fill="#fff" />
  </svg>
);
const Tg = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#29A9EB" />
    <path d="M7.5 15.6 23.4 9.4c.7-.3 1.3.2 1.1 1.1l-2.7 12.7c-.2.9-.7 1.1-1.5.7l-4.1-3-2 1.9c-.2.2-.4.4-.8.4l.3-4.2 7.6-6.9c.3-.3-.1-.4-.5-.2l-9.4 5.9-4-1.3c-.9-.3-.9-.9.2-1.3Z" fill="#fff" />
  </svg>
);
const Wa = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path d="M16 7.5a8.5 8.5 0 0 0-7.3 12.8L7.5 24.5l4.3-1.1A8.5 8.5 0 1 0 16 7.5Z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12.7 12.3c.3-.5.8-.4 1 0l.8 1.7c.1.3 0 .5-.2.7l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.6c.2-.2.5-.3.7-.1l1.7.9c.4.2.4.7 0 1.1-.8.9-2 1.1-3.3.5-2.2-1-3.8-2.7-4.5-4.4-.3-.8-.2-1.8.4-2.5Z" fill="#fff" />
  </svg>
);
const Vb = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#7360F2" />
    <path d="M10.5 9.5h11a2.5 2.5 0 0 1 2.5 2.5v6a2.5 2.5 0 0 1-2.5 2.5H18l-3.6 3v-3h-3.9A2.5 2.5 0 0 1 8 18v-6a2.5 2.5 0 0 1 2.5-2.5Z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M13 12.6c.2-.3.6-.3.8 0l.7 1.2c.1.2 0 .4-.1.6l-.4.4c.5.9 1.2 1.5 2.1 1.9l.4-.4c.2-.2.4-.2.6-.1l1.2.7c.3.2.3.6 0 .8-.8.7-1.7.7-2.6.3a6 6 0 0 1-3-2.9c-.3-.7-.2-1.7.3-2.5Z" fill="#fff" />
  </svg>
);
const ICONS = [Insta, Tg, Wa, Vb];

const AUTO = ["Заявки в CRM", "Сповіщення команді", "Оновлення статусів", "Аналітика"];
const COLS = ["Нові заявки", "В роботі", "Угода"];

export const AboutHeroScene = () => {
  const root = React.useRef(null);
  const [s, setS] = React.useState(0);

  /* цикл сценарію: стартує, коли блок у полі зору; зупиняється поза екраном/у фоновій вкладці */
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setS(18);
      return;
    }
    let timers = [];
    let visible = true;
    let tabOn = !document.hidden;
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const run = () => {
      clear();
      STEPS.forEach((t, k) => k > 0 && timers.push(setTimeout(() => setS(k), t)));
      timers.push(setTimeout(() => setS(0), RESET_AT));
      timers.push(setTimeout(run, LOOP_AT));
    };
    const sync = () => {
      if (visible && tabOn) run();
      else {
        clear();
      }
    };
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => {
          const v = es.some((e) => e.isIntersecting);
          if (v !== visible) {
            visible = v;
            sync();
          }
        },
        { threshold: 0.15 },
      );
      io.observe(el);
    }
    const onVis = () => {
      const t = !document.hidden;
      if (t !== tabOn) {
        tabOn = t;
        sync();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    sync();
    return () => {
      clear();
      io && io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  /* дуже делікатний parallax від курсора (лише пристрої з hover, без reduced-motion) */
  React.useEffect(() => {
    const el = root.current;
    const host = el && el.closest(".ab-hero");
    if (!host) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--px", cx.toFixed(3));
      el.style.setProperty("--py", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      const r = host.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      raf && cancelAnimationFrame(raf);
    };
  }, []);

  const on = (k) => (s >= k ? " is-on" : "");
  const ic = Math.min(s, 4); /* скільки іконок вже активовано */
  const col = s >= 12 ? 2 : s >= 11 ? 1 : 0;
  const cardOn = s >= 10;

  return (
    <div className="abx" ref={root} aria-hidden="true">
      <div className="abx__stage">
        <div className="abx__glow" />

        {/* з'єднання (desktop/tablet) */}
        <svg className="abx__lines" viewBox="0 0 640 560" preserveAspectRatio="none">
          {[
            ["M130 64V100", 5],
            ["M300 200H330", 9],
            ["M485 304V320H315V356H150V372", 13],
            ["M300 466H330", 18],
            ["M485 84V54", 17],
          ].map(([d, k], i) => (
            <g key={i}>
              <path d={d} className={"abx__ln" + (s >= k ? " is-live" : "")} />
              <path d={d} pathLength="1" className={"abx__pulse" + (s === k ? " is-run" : "")} />
            </g>
          ))}
        </svg>

        {/* 1. месенджери */}
        <div className="abx__p abx__ic" style={{ "--d": 3 }}>
          {ICONS.map((I, i) => (
            <span key={i} className={"abx__i" + (ic > i ? " is-on" : "") + (ic === i + 1 && s < 5 ? " is-now" : "")}>
              <I />
            </span>
          ))}
        </div>
        <span className={"abx__vl" + on(5)} />

        {/* 2. AI-бот */}
        <div className="abx__p abx__bot" style={{ "--d": 5 }}>
          <div className="abx__hd">
            <span className="abx__bd">
              <svg viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 4v4M9.5 13h.01M14.5 13h.01" /></svg>
            </span>
            <b>AI-агент</b>
            <em className="abx__tag">24/7</em>
          </div>
          <div className="abx__chat">
            <div className={"abx__m abx__m--c" + on(6)}>Чи є розмір M? Скільки доставка до Одеси?</div>
            <div className={"abx__m abx__m--b" + on(7) + (s === 7 ? " is-typing" : "")}>
              <span className="abx__typing"><i /><i /><i /></span>
              <span className="abx__tx">Так, M є в наявності. Доставка до Одеси — 70 ₴. Оформити замовлення?</span>
            </div>
          </div>
        </div>
        <span className={"abx__vl" + on(9)} />

        {/* 3. CRM */}
        <div className="abx__p abx__crm" style={{ "--d": 7 }}>
          <div className="abx__hd">
            <b>CRM</b>
            <span className="abx__dots"><i /><i /><i /></span>
          </div>
          <div className="abx__board">
            {COLS.map((c, i) => (
              <div key={c} className={"abx__col" + (cardOn && col === i ? " is-hot" : "")}>
                <span className="abx__ct">{c}</span>
                {i === 0 && <span className="abx__ghost" />}
                {i === 1 && <span className="abx__ghost abx__ghost--s" />}
                {i === 2 && <span className="abx__ghost" />}
              </div>
            ))}
            <div className={"abx__card" + (cardOn ? " is-on" : "")} style={{ "--c": col }}>
              <b>№1048</b>
              <span>Одеса</span>
            </div>
          </div>
        </div>

        {/* сповіщення */}
        <div className={"abx__p abx__toast" + on(17)} style={{ "--d": 9 }}>
          <span className="abx__ck"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9" /></svg></span>
          Замовлення створено в CRM
        </div>
        <span className={"abx__vl" + on(13)} />

        {/* 4. автоматизація */}
        <div className="abx__p abx__auto" style={{ "--d": 4 }}>
          <div className="abx__hd"><b>Автоматизація</b></div>
          <ul>
            {AUTO.map((a, i) => (
              <li key={a} className={s >= 13 + i ? "is-on" : ""}>
                <span className="abx__ck"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9" /></svg></span>
                {a}
              </li>
            ))}
          </ul>
        </div>
        <span className={"abx__vl" + on(18)} />

        {/* 5. результати */}
        <div className="abx__p abx__chart" style={{ "--d": 6 }}>
          <div className="abx__hd"><b>Результати</b><em className="abx__tag abx__tag--o">↗</em></div>
          <svg viewBox="0 0 200 90" className={"abx__gr" + on(18)}>
            <path d="M0 80H200M0 55H200M0 30H200" className="abx__grid" />
            <path d="M6 76 38 66 70 70 104 46 138 38 170 16 194 8V90H6Z" className="abx__area" />
            <path d="M6 76 38 66 70 70 104 46 138 38 170 16 194 8" pathLength="1" className="abx__ln2" />
            <circle cx="194" cy="8" r="3.4" className="abx__dot" />
          </svg>
        </div>
      </div>
    </div>
  );
};
