import React from "react";
import "./ServiceStairs.css";

/** Маленький маскот-спрайт: стоїть на активній сходинці й перестрибує на наступну. */
const Sprite = () => (
  <svg viewBox="0 0 56 68" width="56" height="68" aria-hidden="true">
    <ellipse cx="28" cy="65" rx="17" ry="3" fill="rgba(17,17,68,.18)" />
    <line x1="28" y1="6" x2="28" y2="15" stroke="#2431A4" strokeWidth="3" strokeLinecap="round" />
    <circle cx="28" cy="5" r="4.5" fill="#F98513" />
    <rect x="7" y="14" width="42" height="38" rx="14" fill="#2431A4" />
    <rect x="12" y="21" width="32" height="20" rx="9" fill="#E9EDFF" />
    <circle cx="21" cy="31" r="3.3" fill="#111144" />
    <circle cx="35" cy="31" r="3.3" fill="#111144" />
    <path d="M23.5 37q4.5 3.2 9 0" fill="none" stroke="#111144" strokeWidth="2" strokeLinecap="round" />
    <rect x="15" y="52" width="10" height="9" rx="4" fill="#111144" />
    <rect x="31" y="52" width="10" height="9" rx="4" fill="#111144" />
  </svg>
);

/**
 * «Результат»: сходинки від першої до останньої, маскот перестрибує
 * з кроку на крок, поки блок прокручується в екран.
 */
export function ServiceStairs({ items }: { items: string[] }) {
  const n = items.length;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);
  const [calm, setCalm] = React.useState(false);
  const [botOn, setBotOn] = React.useState(() => {
    try {
      return /^#\/(keycrm|ai-bots|analytics)/.test(location.hash);
    } catch {
      return false;
    }
  });
  const activeRef = React.useRef(0);
  activeRef.current = active;

  React.useEffect(() => {
    try {
      setCalm(matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      /* ignore */
    }
  }, []);

  // який крок активний: залежить від того, наскільки блок прокручено в екран
  React.useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const q = Math.min(1, Math.max(0, (window.innerHeight * 0.9 - r.top) / (r.height * 0.95)));
      const a = Math.min(n - 1, Math.floor(q * n));
      setActive((p) => (p === a ? p : a));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  // справжній 3D-маскот (point-b-bot.js): віддаємо йому координати активної сходинки
  React.useEffect(() => {
    const publish = () => {
      const el = stepRefs.current[activeRef.current];
      const root = rootRef.current;
      if (!el || !root) return;
      const rr = root.getBoundingClientRect();
      const vis = rr.top < window.innerHeight * 0.82 && rr.bottom > window.innerHeight * 0.12;
      const mobile = window.matchMedia("(max-width:767px)").matches;
      const h = mobile ? 68 : 110;
      const r = el.getBoundingClientRect();
      const last = activeRef.current === n - 1;
      const x = mobile ? r.right - 14 - h * 0.3 : r.left + r.width * (last ? 0.34 : 0.5);
      (window as any).__pbStairs = {
        on: vis,
        i: activeRef.current,
        x: x + window.scrollX,
        yDoc: r.top + window.scrollY + 3,
        s: h / 3.3,
      };
      window.dispatchEvent(new Event("pb:stairs"));
    };
    publish();
    const t = window.setInterval(() => {
      publish();
      setBotOn(
        !!(window as any).__pbStairsBot ||
          (/^#\/(keycrm|ai-bots|analytics)/.test(location.hash) && !(window as any).__pbBotWhy),
      );
    }, 400);
    window.addEventListener("scroll", publish, { passive: true });
    window.addEventListener("resize", publish);
    return () => {
      window.clearInterval(t);
      window.removeEventListener("scroll", publish);
      window.removeEventListener("resize", publish);
      (window as any).__pbStairs = { on: false };
      window.dispatchEvent(new Event("pb:stairs"));
    };
  }, [active, n]);

  // де стоїть маскот: на верхній грані активної сходинки
  const place = React.useCallback(() => {
    const el = stepRefs.current[active];
    const root = rootRef.current;
    if (!el || !root) return;
    const mobile = window.matchMedia("(max-width:767px)").matches;
    const w = 56;
    const h = 68;
    const x = mobile ? el.offsetLeft + el.offsetWidth - w - 14 : el.offsetLeft + (el.offsetWidth - w) / 2;
    const y = el.offsetTop - h + 6;
    setPos({ x, y });
  }, [active]);
  React.useLayoutEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  return (
    <div className="pbst" ref={rootRef} style={{ ["--n" as any]: n } as React.CSSProperties}>
      <ol className="pbst__steps">
        {items.map((t, i) => (
          <li
            key={i}
            ref={(el) => {
              stepRefs.current[i] = el as unknown as HTMLDivElement;
            }}
            className={`pbst__step${i === active ? " is-on" : ""}${i < active ? " is-done" : ""}`}
            style={{ ["--i" as any]: i } as React.CSSProperties}
          >
            {i === n - 1 && (
              <span className="pbst__flag" aria-hidden="true">
                Результат
              </span>
            )}
            <span className="pbst__n">{String(i + 1).padStart(2, "0")}</span>
            <span className="pbst__t">{t}</span>
          </li>
        ))}
      </ol>
      <div className="pbst__ground" aria-hidden="true" />
      {pos && (
        <div
          className={`pbst__bot${calm ? " is-calm" : ""}${botOn ? " is-hidden" : ""}`}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          aria-hidden="true"
        >
          <div key={active} className="pbst__hop">
            <Sprite />
          </div>
        </div>
      )}
    </div>
  );
}
