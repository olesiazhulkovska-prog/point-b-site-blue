import React from "react";
import "./KeyCrmStepsGallery.css";

export interface StepItem {
  step?: string;
  title: string;
  desc?: string;
}

const EXPAND = 1.95;
const SHRINK = 0.9;

const tracks = (count: number, active: number | null) =>
  Array.from({ length: count }, (_, i) =>
    active === null ? "1fr" : i === active ? `${EXPAND}fr` : `${SHRINK}fr`,
  ).join(" ");

/**
 * «Що ми робимо» на сторінці keyCRM: сітка карток. Картка під курсором
 * розкривається (росте її рядок і колонка), решта поступаються місцем.
 * Hover, фокус (Tab + стрілки) і тап на дотикових екранах.
 */
export function KeyCrmStepsGallery({ items }: { items: StepItem[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const tileRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const touch = React.useRef(false);
  const [active, setActive] = React.useState<number | null>(null);
  const [width, setWidth] = React.useState(1000);

  React.useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || 1000);
    measure();
    if (!("ResizeObserver" in window)) {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mode = width >= 900 ? 3 : width >= 560 ? 2 : 1;
  const cols = mode;
  const rows = Math.ceil(items.length / cols);

  const gridStyle: React.CSSProperties = { gap: mode === 3 ? 16 : 12 };
  if (mode === 1) {
    const closed = 92;
    const open = Math.min(340, Math.round(width * 0.95));
    gridStyle.height = "auto";
    gridStyle.gridTemplateColumns = "1fr";
    gridStyle.gridTemplateRows = items
      .map((_, i) => `${active === i ? open : closed}px`)
      .join(" ");
  } else {
    gridStyle.height =
      mode === 3
        ? Math.max(500, Math.min(620, Math.round(width * 0.46)))
        : Math.round(rows * Math.max(190, width * 0.32));
    const ac = active === null ? null : active % cols;
    const ar = active === null ? null : Math.floor(active / cols);
    gridStyle.gridTemplateColumns = tracks(cols, ac);
    gridStyle.gridTemplateRows = tracks(rows, ar);
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Escape") return setActive(null);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      return setActive(active === i ? null : i);
    }
    const step = (
      {
        ArrowRight: 1,
        ArrowLeft: -1,
        ArrowDown: cols,
        ArrowUp: -cols,
      } as Record<string, number>
    )[e.key];
    if (step === undefined) return;
    const next = i + step;
    if (next < 0 || next >= items.length) return;
    e.preventDefault();
    tileRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`pbg${mode === 1 ? " m1" : ""}`}
      onBlur={(e) => {
        if (
          !touch.current &&
          !rootRef.current?.contains(e.relatedTarget as Node)
        )
          setActive(null);
      }}
    >
      <div
        className="pbg-grid"
        role="list"
        style={gridStyle}
        onMouseLeave={() => !touch.current && setActive(null)}
      >
        {items.map((it, i) => {
          const num = (it.step && it.step.match(/\d+/)?.[0]) || `0${i + 1}`;
          return (
            <div
              key={i}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              className={`pbg-tile${active === i ? " on" : ""}`}
              role="listitem"
              tabIndex={0}
              aria-label={`Крок ${num}: ${it.title}`}
              onMouseEnter={() => !touch.current && setActive(i)}
              onFocus={() => setActive(i)}
              onPointerDown={(e) => {
                if (e.pointerType !== "mouse") {
                  touch.current = true;
                  setActive(active === i ? null : i);
                } else touch.current = false;
              }}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <div className="pbg-num">Крок {num}</div>
              <div className="pbg-foot">
                <div className="pbg-cap">{it.title}</div>
                <p className="pbg-desc">{it.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
