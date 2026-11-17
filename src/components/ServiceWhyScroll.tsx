import React from "react";
import "./ServiceWhyScroll.css";

type Item = { title: string; desc: string };

/** Scroll-driven steps: the block pins while the page scrolls, the numbered rail lights up step by step. */
export function ServiceWhyScroll({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow?: string;
  items: Item[];
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [p, setP] = React.useState(0);
  const n = items.length;

  React.useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const v = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      setP((prev) => (Math.abs(prev - v) < 0.002 ? prev : v));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  // line fill: from the first circle centre to the last one
  const fill = n > 1 ? Math.min(1, Math.max(0, (p * n - 0.5) / (n - 1))) : 1;

  return (
    <div
      ref={trackRef}
      className="sws"
      style={{ ["--n" as any]: n } as React.CSSProperties}
    >
      <div className="sws__stick">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 w-full">
          <div className="pb-head max-w-3xl">
            {eyebrow && (
              <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
                {eyebrow}
              </span>
            )}
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
              {title}
            </h2>
          </div>

          <div className="sws__rail" aria-hidden="true">
            <div className="sws__line">
              <div className="sws__fill" style={{ transform: `scaleX(${fill})` }} />
            </div>
            {items.map((_, i) => (
              <div key={i} className={`sws__dot${i === active ? " is-on" : i < active ? " is-done" : ""}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>

          <div className="sws__cards">
            {items.map((it, i) => (
              <div
                key={i}
                className={`sws__card${i === active ? " is-on" : ""}`}
                aria-current={i === active ? "step" : undefined}
              >
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
