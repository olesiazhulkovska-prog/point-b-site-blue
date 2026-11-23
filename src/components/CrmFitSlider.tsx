import React, { useEffect, useRef, useState } from "react";
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
  const [pos, setPos] = useState(0); // continuous position 0..4, the thumb follows it
  const [demo, setDemo] = useState(true);
  const touched = useRef(false);
  const drag = useRef(false);
  const raf = useRef(0);
  const v = Math.round(pos);
  const pick = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const k = Math.round(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * (STOPS.length - 1));
    touched.current = true;
    cancelAnimationFrame(raf.current);
    setDemo(false);
    setPos(k);
  };

  // when the block comes into view the thumb glides to the end by itself; the visitor can then drag it back
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPos(3);
      setDemo(false);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (!e.some((x) => x.isIntersecting)) return;
        io.disconnect();
        const DUR = 5200;
        const t0 = performance.now() + 400;
        const tick = (now: number) => {
          if (touched.current) return;
          const u = Math.min(1, Math.max(0, (now - t0) / DUR));
          const e2 = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
          setPos(e2 * (STOPS.length - 1));
          if (u < 1) raf.current = requestAnimationFrame(tick);
          else setDemo(false);
        };
        raf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const custom_on = v > EDGE;
  const pct = (pos / (STOPS.length - 1)) * 100;
  return (
    <div className="pbf" ref={ref}>
      <div className="pbf-scale">
        <div className="pbf-ends" aria-hidden="true">
          <span>Типовий процес</span>
          <span>Унікальний процес</span>
        </div>
        <div
          className={`pbf-track${demo ? " is-demo" : ""}`}
          onPointerDown={(e) => {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            drag.current = true;
            pick(e);
          }}
          onPointerMove={(e) => drag.current && pick(e)}
          onPointerUp={() => (drag.current = false)}
          onPointerCancel={() => (drag.current = false)}
          style={{ ["--p" as string]: `${pct}%`, ["--edge" as string]: `${((EDGE + 0.5) / (STOPS.length - 1)) * 100}%` }}>
          <span className="pbf-fill" />
          <span className="pbf-edge" aria-hidden="true">
            <b>keyCRM тут перестає вистачати</b>
          </span>
          {STOPS.map((_, i) => (
            <span key={i} className={`pbf-dot${i <= pos + 0.01 ? " is-on" : ""}`} style={{ left: `${(i / (STOPS.length - 1)) * 100}%` }} />
          ))}
          <span className={`pbf-thumb${!demo && !touched.current ? " is-hint" : ""}`} aria-hidden="true" />
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
              cancelAnimationFrame(raf.current);
              setDemo(false);
              setPos(Number(e.target.value));
            }}
          />
        </div>
        <p className="pbf-legend" aria-hidden="true">
          <i />
          keyCRM тут перестає вистачати
        </p>
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
