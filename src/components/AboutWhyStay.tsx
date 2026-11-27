import { useEffect, useRef, useState } from "react";
import { Kv } from "../data/data";
import "./AboutWhyStay.css";

const TOTAL = Kv.length;
const PAGE = 6;
const R = 180; // радіус кільця у viewBox 400
const C = 200;
const pos = (i: number) => {
  const a = (i / TOTAL) * Math.PI * 2 - Math.PI / 2;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
};
const clean = (t: string) => t.replace(/^\d+\.\s*/, "");
const num = (i: number) => String(i + 1).padStart(2, "0");

export const AboutWhyStay = () => {
  const [active, setActive] = useState(3);
  const paused = useRef(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setActive((a) => (a + 1) % TOTAL);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const start = Math.min(TOTAL - PAGE, Math.max(0, active - 3));
  const items = Kv.slice(start, start + PAGE);
  const p = pos(active);
  const top = pos(0);
  const large = active > TOTAL / 2 ? 1 : 0;

  return (
    <div
      className="ab-why"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="ab-why__left">
        <span className="ab-why__eyebrow">Довіра клієнтів</span>
        <div role="heading" aria-level={3} className="ab-why__title">Чому клієнти залишаються з нами</div>
        <div className="ab-why__ring" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle cx={C} cy={C} r={R} className="ab-why__track" />
            {active > 0 && (
              <path
                className="ab-why__arc"
                d={`M ${top.x} ${top.y} A ${R} ${R} 0 ${large} 1 ${p.x} ${p.y}`}
              />
            )}
            {Kv.map((_, i) => {
              const d = pos(i);
              return (
                <circle
                  key={i}
                  cx={d.x}
                  cy={d.y}
                  r={i === active ? 12 : 6}
                  className={i <= active ? "ab-why__dot is-on" : "ab-why__dot"}
                />
              );
            })}
          </svg>
          <div className="ab-why__count">
            <b>{num(active)}</b>
            <span>із {TOTAL} причин</span>
          </div>
        </div>
      </div>
      <ol className="ab-why__list" aria-label="12 причин, чому клієнти залишаються">
        {items.map((d, k) => {
          const i = start + k;
          return (
            <li key={i} className={i === active ? "is-active" : ""}>
              <button type="button" onClick={() => setActive(i)} aria-current={i === active}>
                <span className="ab-why__n">{num(i)}</span>
                <span className="ab-why__t">{clean(d.title)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
