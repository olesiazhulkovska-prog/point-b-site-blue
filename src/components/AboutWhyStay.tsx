import { useState } from "react";
import { Search, SlidersHorizontal, Building2, BadgeCheck, Bot, ChartNoAxesCombined, GraduationCap, FileText, Headset, CalendarClock, Eye, Target } from "lucide-react";
import { Kv } from "../data/data";
import "./AboutWhyStay.css";

const ICONS = [Search, SlidersHorizontal, Building2, BadgeCheck, Bot, ChartNoAxesCombined, GraduationCap, FileText, Headset, CalendarClock, Eye, Target];
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

  const start = Math.min(TOTAL - PAGE, Math.max(0, active - 3));
  const items = Kv.slice(start, start + PAGE);
  const p = pos(active);
  const top = pos(0);
  const large = active > TOTAL / 2 ? 1 : 0;

  return (
    <div className="ab-why">
      <div className="ab-why__left">
        <span className="ab-why__eyebrow">Довіра клієнтів</span>
        <div role="heading" aria-level={3} className="ab-why__title">Чому клієнти залишаються з нами</div>
        <div className="ab-why__ring" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <circle cx={C} cy={C} r={R} className="ab-why__track" />
            {active === TOTAL - 1 && <circle cx={C} cy={C} r={R} className="ab-why__arc" />}
            {active > 0 && active < TOTAL - 1 && (
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
          const Ico = ICONS[i] || Target;
          return (
            <li key={i} className={i === active ? "is-active" : ""}>
              <button type="button" onClick={() => setActive(i)} aria-current={i === active}>
                <span className="ab-why__ico" aria-hidden="true"><Ico strokeWidth={1.8} /></span>
                <span className="ab-why__t">{clean(d.title)}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
