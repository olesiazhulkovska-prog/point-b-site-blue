// @ts-nocheck
import * as React from "react";
import { siViber } from "simple-icons";
import "./AboutHeroScene.css";

/* Hero «Про компанію»: демонстрація CRM-продукту.
   Повідомлення клієнта → відповідь AI-агента → створення замовлення → заявка рухається воронкою CRM.
   HTML + CSS + SVG, без бібліотек. Один цикл ≈ 16 с. Стан — одне число s. */

const STEPS = [0, 500, 1500, 2700, 3900, 5400, 6700, 7900, 9300, 10700, 13000];
const RESET_AT = 15000;
const LOOP_AT = 15800;

/* монохромні іконки месенджерів (currentColor) */
const SV = { viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
const Insta = () => (
  <svg {...SV}><rect x="6.5" y="6.5" width="19" height="19" rx="5.6" /><circle cx="16" cy="16" r="4.4" /><circle cx="21.4" cy="10.6" r=".6" fill="currentColor" /></svg>
);
const Tg = () => (
  <svg {...SV}><path d="M26 7 5.8 14.9c-.8.3-.8 1.3 0 1.6l5.1 1.7 2 6.2c.2.6.9.8 1.4.4l2.9-2.4 5 3.7c.6.4 1.4.1 1.6-.6L27 8.2c.2-.9-.4-1.5-1-1.2Z" /><path d="m11 18.2 11.6-8.6-8.7 10.2" /></svg>
);
const Wa = () => (
  <svg {...SV}><path d="M16 6.2a9.8 9.8 0 0 0-8.4 14.8L6.2 25.8l4.9-1.3A9.8 9.8 0 1 0 16 6.2Z" /><path d="M12.3 11.4c.4-.6 1-.5 1.2 0l.9 2c.1.3 0 .6-.2.8l-.6.7c.7 1.4 1.8 2.4 3.3 3.1l.7-.7c.2-.2.6-.3.8-.1l2 1c.5.3.5.8 0 1.3-1 1-2.4 1.3-3.8.6-2.6-1.2-4.4-3.2-5.2-5.1-.3-.9-.2-2.1.9-2.9Z" fill="currentColor" stroke="none" /></svg>
);
const Vb = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={siViber.path} /></svg>
);
const ICONS = [Insta, Tg, Wa, Vb];
export const CHANNEL_ICONS = ICONS;

const NAV = ["Огляд", "Замовлення", "Клієнти", "Склад", "Аналітика"];
const COLS = [
  { t: "Нові заявки", n: 3, cards: [["Андрій М.", "2 480 ₴"], ["Олена К.", "1 240 ₴"]] },
  { t: "В роботі", n: 4, cards: [["Ірина Л.", "3 150 ₴"], ["Тарас Д.", "890 ₴"]] },
  { t: "Успішні", n: 12, cards: [["Наталя Т.", "5 600 ₴"], ["Олег С.", "1 760 ₴"]] },
];

export const AboutHeroScene = () => {
  const root = React.useRef(null);
  const [s, setS] = React.useState(0);
  const [ch, setCh] = React.useState(1);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setS(10);
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
      setCh((c) => (c + 1) % 4);
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

  const on = (k) => (s >= k ? " is-on" : "");
  /* s: 1 канал · 2 питання клієнта · 3 агент друкує · 4 відповідь · 5 «Так, оформлюйте» · 6 «Готово…» + імпульс · 7 сповіщення · 8 заявка в CRM · 9 «В роботі» · 10 «Успішні» */
  const col = s >= 10 ? 2 : s >= 9 ? 1 : 0;

  return (
    <div className="abx" ref={root} aria-hidden="true">
      <div className="abx__stage">
        {/* канали */}
        <div className="abx__ch">
          <span className="abx__chl">Канали комунікації</span>
          <div className="abx__chi">
            {ICONS.map((I, i) => (
              <span key={i} className={"abx__i" + (s >= 1 && i === ch ? " is-on" : "")}><I /></span>
            ))}
          </div>
        </div>
        <span className={"abx__wire" + (s === 1 || s === 6 ? " is-run" : "")}><i /></span>

        {/* CRM */}
        <div className="abx__crm">
          <div className="abx__top"><i /><b>POINT B / CRM workspace</b></div>
          <div className="abx__body">
            <ul className="abx__nav">
              {NAV.map((n, i) => (
                <li key={n} className={i === 1 ? "is-act" : ""}>{n}</li>
              ))}
            </ul>
            <div className="abx__main">
              <div className="abx__cols">
                {COLS.map((c) => (
                  <div className="abx__col" key={c.t}>
                    <span className="abx__ct">{c.t}<em>{c.n}</em></span>
                    {c.cards.map(([a, b]) => (
                      <span className="abx__k" key={a}><b>{a}</b><i>{b}</i></span>
                    ))}
                  </div>
                ))}
                <span className={"abx__k abx__k--new" + (s >= 8 ? " is-on" : "") + (s === 0 ? " is-reset" : "") + (s >= 10 ? " is-done" : "")} style={{ "--c": col }}>
                  <b>Марія Ш.</b><i>1 890 ₴</i>
                </span>
              </div>
              <div className="abx__low">
                <div className="abx__bars">
                  <span className="abx__bl">Продажі за тиждень</span>
                  <div>{[38, 52, 44, 66, 58, 76, 92].map((h, i) => <span key={i} style={{ height: h + "%" }} className={i === 6 ? "is-last" : ""} />)}</div>
                </div>
                <div className="abx__sum">
                  <span>Сума в роботі<b>48 320 ₴</b></span>
                  <span>Конверсія<b>34%</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI-агент */}
        <div className="abx__ai">
          <div className="abx__ah"><i />AI-агент</div>
          <div className="abx__chat">
            <div className={"abx__m abx__m--c" + (s >= 2 && s < 5 ? " is-on" : "")}>Чи є розмір M? Скільки коштує доставка до Одеси?</div>
            <div className={"abx__m abx__m--b" + (s >= 3 && s < 6 ? " is-on" : "") + (s === 3 ? " is-typing" : "")}>
              <span className="abx__typing"><i /><i /><i /></span>
              <span className="abx__tx">Вітаю!<br />Так, розмір M є в наявності, доставка до Одеси коштує 70 ₴. Оформити замовлення?</span>
            </div>
            <div className={"abx__m abx__m--c" + (s < 2 || s >= 5 ? " is-on" : "")}>Так, оформлюйте</div>
            <div className={"abx__m abx__m--b" + (s < 2 || s >= 6 ? " is-on" : "")}>Готово, замовлення оформлено. Надішлю ТТН сюди, щойно відправимо.</div>
          </div>
        </div>

        {/* сповіщення */}
        <div className={"abx__toast" + (s >= 7 && s < 10 ? " is-on" : "")}>
          <span className="abx__ck"><svg viewBox="0 0 24 24"><path d="m6 12.5 4 4 8-9" /></svg></span>
          Замовлення створено в CRM
        </div>
      </div>
    </div>
  );
};
