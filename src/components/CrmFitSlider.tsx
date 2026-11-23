import { useEffect, useRef, useState } from "react";
import "./CrmFitSlider.css";

const STOPS = [
  { label: "Типові продажі", note: "Стандартна воронка, менеджери, оплати." },
  { label: "Свої етапи й автоматизації", note: "Нестандартні статуси, нагадування, шаблони." },
  { label: "Кілька юросіб", note: "Різні воронки й ролі. Платформа ще тримає." },
  { label: "Нетипова логіка", note: "Виробництво, склад, розрахунки під ваш процес." },
  { label: "Свої вимоги до даних", note: "Безпека, власні сервери, незалежність від ліцензій." },
];
const EDGE = 2; // index from which the ready platform no longer holds

/** "Чим це відрізняється від keyCRM": the visitor drags process complexity and sees which option fits. */
export function CrmFitSlider({ keycrm, custom }: { keycrm: string; custom: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  const touched = useRef(false);

  // one gentle demo run when the block first comes into view
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setV(0);
      return;
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (e) => {
        if (!e.some((x) => x.isIntersecting)) return;
        io.disconnect();
        [1, 2, 3, 4].forEach((k, i) => timers.push(window.setTimeout(() => !touched.current && setV(k), 900 + i * 750)));
        timers.push(window.setTimeout(() => !touched.current && setV(1), 900 + 4 * 750 + 900));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const custom_on = v > EDGE;
  const pct = (v / (STOPS.length - 1)) * 100;
  return (
    <div className="pbf" ref={ref}>
      <div className="pbf-scale">
        <div className="pbf-ends" aria-hidden="true">
          <span>Типовий процес</span>
          <span>Унікальний процес</span>
        </div>
        <div className="pbf-track" style={{ ["--p" as string]: `${pct}%`, ["--edge" as string]: `${((EDGE + 0.5) / (STOPS.length - 1)) * 100}%` }}>
          <span className="pbf-fill" />
          <span className="pbf-edge" aria-hidden="true">
            <b>keyCRM тут перестає вистачати</b>
          </span>
          {STOPS.map((_, i) => (
            <span key={i} className={`pbf-dot${i <= v ? " is-on" : ""}`} style={{ left: `${(i / (STOPS.length - 1)) * 100}%` }} />
          ))}
          <input
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={v}
            aria-label="Складність вашого процесу"
            aria-valuetext={STOPS[v].label}
            onChange={(e) => {
              touched.current = true;
              setV(Number(e.target.value));
            }}
          />
        </div>
        <div className="pbf-now" aria-live="polite">
          <strong>{STOPS[v].label}</strong>
          <span>{STOPS[v].note}</span>
        </div>
      </div>

      <div className="pbf-cards">
        <div className={`pbf-card${custom_on ? "" : " is-on"}`}>
          <span className="pbf-tag">Готова платформа</span>
          <h3>Впровадження keyCRM</h3>
          <p>{keycrm}</p>
          <i className="pbf-badge">{custom_on ? "Вже не вистачає" : "Підходить вам"}</i>
        </div>
        <div className={`pbf-card pbf-card--o${custom_on ? " is-on" : ""}`}>
          <span className="pbf-tag">Власна розробка з нуля</span>
          <h3>Власна CRM-система</h3>
          <p>{custom}</p>
          <i className="pbf-badge">{custom_on ? "Підходить вам" : "Поки зарано"}</i>
        </div>
      </div>
    </div>
  );
}
