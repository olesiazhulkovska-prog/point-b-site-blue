// @ts-nocheck
import * as React from "react";
import "./AboutHeroScene.css";

/* Hero «Про компанію»: єдина цифрова екосистема.
   Месенджери → AI-агент → CRM (центр) → автоматизація / сповіщення / аналітика.
   HTML + CSS + SVG, без бібліотек. Стан сцени — одне число s (0…17) у циклі ≈19 с.
   Базовий стан (s = 0) уже наповнений: тексти й картки не зникають між циклами. */

const STEPS = [0, 400, 900, 1400, 1900, 2700, 3900, 4900, 6300, 7300, 8700, 9400, 10000, 10700, 11400, 12100, 12900, 13700];
const RESET_AT = 18200;
const LOOP_AT = 18900;

/* монохромні логотипи (currentColor) */
const Insta = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6.5" y="6.5" width="19" height="19" rx="5.6" />
    <circle cx="16" cy="16" r="4.4" />
    <circle cx="21.4" cy="10.6" r=".6" fill="currentColor" />
  </svg>
);
const Tg = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M26 7 5.8 14.9c-.8.3-.8 1.3 0 1.6l5.1 1.7 2 6.2c.2.6.9.8 1.4.4l2.9-2.4 5 3.7c.6.4 1.4.1 1.6-.6L27 8.2c.2-.9-.4-1.5-1-1.2Z" />
    <path d="m11 18.2 11.6-8.6-8.7 10.2" />
  </svg>
);
const Wa = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 6.2a9.8 9.8 0 0 0-8.4 14.8L6.2 25.8l4.9-1.3A9.8 9.8 0 1 0 16 6.2Z" />
    <path d="M12.3 11.4c.4-.6 1-.5 1.2 0l.9 2c.1.3 0 .6-.2.8l-.6.7c.7 1.4 1.8 2.4 3.3 3.1l.7-.7c.2-.2.6-.3.8-.1l2 1c.5.3.5.8 0 1.3-1 1-2.4 1.3-3.8.6-2.6-1.2-4.4-3.2-5.2-5.1-.3-.9-.2-2.1.9-2.9Z" fill="currentColor" stroke="none" />
  </svg>
);
const Vb = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.4 6.8h11.2A3.9 3.9 0 0 1 25.5 10.7v7.2a3.9 3.9 0 0 1-3.9 3.9h-3.5l-4.3 4v-4h-3.4a3.9 3.9 0 0 1-3.9-3.9v-7.2a3.9 3.9 0 0 1 3.9-3.9Z" />
    <path d="M13 11.5c.3-.4.8-.4 1 0l.8 1.5c.1.3 0 .5-.2.7l-.5.5c.6 1.1 1.4 1.8 2.5 2.3l.5-.5c.2-.2.5-.3.8-.1l1.4.8c.4.3.4.7 0 1.1-1 .9-2.2.9-3.2.4-1.6-.7-2.8-1.9-3.6-3.5-.4-.9-.3-1.9.5-2.7Z" fill="currentColor" stroke="none" />
  </svg>
);
const ICONS = [Insta, Tg, Wa, Vb];

const Tick = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12.5 4 4 8-9" /></svg>
);

const LINES = [
  /* месенджери → AI-агент */
  ["M23 166C23 250 30 280 30 350", 1],
  ["M73 118C73 230 62 290 62 350", 2],
  ["M123 176C123 260 104 290 104 350", 3],
  ["M171 130C171 240 142 290 142 350", 4],
  /* AI → CRM */
  ["M182 420C204 420 198 380 218 380", 8],
  /* CRM → автоматизація / сповіщення / аналітика */
  ["M560 168C560 162 520 162 520 152", 11],
  ["M330 168C330 130 320 112 320 80", 16],
  ["M520 460C520 472 530 474 530 482", 17],
];

const AUTO = ["Заявки в CRM", "Сповіщення команді", "Оновлення статусів", "Аналітика"];
const COLS = [
  { t: "Нові заявки", n: 2, cards: [["№1049", "Telegram"], ["№1047", "Viber"]] },
  { t: "В роботі", n: 2, cards: [["№1046", "WhatsApp"], ["№1045", "Telegram"]] },
  { t: "Угода", n: 2, cards: [["№1044", "Оплачено"], ["№1043", "Оплачено"]] },
];

export const AboutHeroScene = () => {
  const root = React.useRef(null);
  const [s, setS] = React.useState(0);

  /* цикл сценарію: лише коли блок видно і вкладка активна */
  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setS(17);
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
    const sync = () => (visible && tabOn ? run() : clear());
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

  /* делікатний parallax: нахил сцени за курсором (лише hover-пристрої, без reduced-motion) */
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
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
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
  const col = s >= 10 ? 2 : s >= 9 ? 1 : 0;
  const hot = s >= 8 ? col : -1;

  return (
    <div className="abx" ref={root} aria-hidden="true">
      <div className="abx__persp">
        <div className="abx__stage">
          <div className="abx__glow" />
          <span className="abx__plate abx__plate--a" />
          <span className="abx__plate abx__plate--b" />
          <span className="abx__plate abx__plate--c" />

          {/* плавні криві з'єднання */}
          <svg className="abx__lines" viewBox="0 0 640 620" preserveAspectRatio="none">
            {LINES.map(([d, k], i) => (
              <g key={i}>
                <path d={d} className={"abx__ln" + (s >= k ? " is-live" : "")} />
                <path d={d} pathLength="1" className={"abx__pulse" + (s === k ? " is-run" : "")} />
              </g>
            ))}
          </svg>

          {/* месенджери: скляні контейнери, монохром; активні — помаранчеві */}
          <div className="abx__ics">
            {ICONS.map((I, i) => (
              <span key={i} className={`abx__i abx__i--${i}` + (s > i ? " is-on" : "") + (s === i + 1 ? " is-now" : "")}>
                <I />
              </span>
            ))}
          </div>
          <span className={"abx__vl" + on(1)} />

          {/* AI-агент */}
          <div className="abx__p abx__ai">
            <div className="abx__hd">
              <span className="abx__bd">
                <svg viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="10" rx="3" /><path d="M12 4v4M9.5 13h.01M14.5 13h.01" /></svg>
              </span>
              <b>AI-агент</b>
              <em className="abx__tag">24/7</em>
            </div>
            <div className="abx__chat">
              <div className="abx__m abx__m--c">Є доставка по Україні?</div>
              <div className="abx__m abx__m--b">Так, Новою поштою 1–2 дні</div>
              <div className={"abx__m abx__m--c abx__m--new" + on(5)}>Чи є розмір M? Скільки доставка до Одеси?</div>
              <div className={"abx__m abx__m--b abx__m--new" + on(6) + (s === 6 ? " is-typing" : "")}>
                <span className="abx__typing"><i /><i /><i /></span>
                <span className="abx__tx">Так, M є. Доставка до Одеси — 70 ₴. Оформити?</span>
              </div>
            </div>
            <div className="abx__input">Напишіть повідомлення…</div>
          </div>
          <span className={"abx__vl" + on(8)} />

          {/* CRM — центр композиції */}
          <div className="abx__p abx__crm">
            <div className="abx__hd">
              <b>CRM · Воронка продажів</b>
              <span className="abx__dots"><i /><i /><i /></span>
            </div>
            <div className="abx__board">
              {COLS.map((c, i) => (
                <div key={c.t} className={"abx__col" + (hot === i ? " is-hot" : "")}>
                  <span className="abx__ct">{c.t}<em>{c.n}</em></span>
                  {c.cards.map(([a, b]) => (
                    <span className="abx__k" key={a}><b>{a}</b><i>{b}</i></span>
                  ))}
                </div>
              ))}
              <span className={"abx__k abx__k--new" + (s >= 8 ? " is-hot" : "") + (s === 0 ? " is-reset" : "")} style={{ "--c": col }}>
                <b>№1048</b><i>Instagram</i>
              </span>
            </div>
            <div className="abx__foot">
              <span>Конверсія воронки</span>
              <span className="abx__bar"><i /></span>
            </div>
          </div>

          {/* сповіщення */}
          <div className={"abx__p abx__toast" + (s >= 16 ? " is-on" : "")}>
            <span className="abx__ck"><Tick /></span>
            <span>Замовлення створено в CRM</span>
          </div>
          <span className={"abx__vl" + on(11)} />

          {/* автоматизація */}
          <div className="abx__p abx__auto">
            <div className="abx__hd"><b>Автоматизація</b></div>
            <ul>
              {AUTO.map((a, i) => (
                <li key={a} className={s >= 12 + i ? "is-on" : ""}>
                  <span className="abx__ck"><Tick /></span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <span className={"abx__vl" + on(17)} />

          {/* аналітика */}
          <div className="abx__p abx__an">
            <div className="abx__hd">
              <b>Аналітика</b>
              <span className="abx__lg"><i className="abx__lg--o" />Продажі</span>
              <span className="abx__lg"><i className="abx__lg--d" />Було</span>
            </div>
            <svg viewBox="0 0 200 80" className={"abx__gr" + on(17)} preserveAspectRatio="none">
              <path d="M0 68H200M0 44H200M0 20H200" className="abx__grid" />
              <path d="M4 62 36 56 68 58 100 44 132 40 164 30 196 26" className="abx__prev" />
              <path d="M4 68 36 56 68 60 102 34 136 28 168 12 196 6V80H4Z" className="abx__area" />
              <path d="M4 68 36 56 68 60 102 34 136 28 168 12 196 6" pathLength="1" className="abx__ln2" />
              <circle cx="196" cy="6" r="3.2" className="abx__dot" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
