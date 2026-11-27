import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Kv } from "../data/data";
import "./AboutReasons.css";

// У даних заголовки починаються з «1. », «2. »…: номер показуємо окремо (01–12), тож у заголовку його прибираємо
const clean = (t: string) => t.replace(/^\d+\.\s*/, "");
const num = (i: number) => String(i + 1).padStart(2, "0");

/** Editorial sticky-секція «Понад 35% клієнтів…»: ліворуч sticky 35% + заголовок, праворуч усі 12 пунктів. */
export const AboutReasons = ({ head }: { head: ReactNode }) => {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = listRef.current;
    if (!ol) return;
    const lis = Array.from(ol.querySelectorAll<HTMLElement>(":scope > li"));
    let raf = 0;
    const upd = () => {
      raf = 0;
      const anchor = window.innerHeight * 0.5;
      let best = 0;
      let bd = Infinity;
      lis.forEach((li, i) => {
        const r = li.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - anchor);
        if (d < bd) { bd = d; best = i; }
      });
      setActive(best);
      const r = ol.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
      ol.style.setProperty("--p", p.toFixed(4));
    };
    const req = () => { if (!raf) raf = requestAnimationFrame(upd); };
    upd();
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="ab-ed">
      <div className="ab-ed__left">
        <div className="ab-ed__big acx" aria-hidden="true"><small>Понад</small>35%</div>
        {head}
      </div>
      <ol className="ab-ed__list" ref={listRef} aria-label="12 причин, чому клієнти залишаються">
        <i className="ab-ed__rail" aria-hidden="true"><em /></i>
        {Kv.map((d, i) => (
          <li key={i} className={i === active ? "is-active" : ""}>
            <span className="ab-ed__n">{num(i)}</span>
            <div className="ab-ed__txt">
              <div role="heading" aria-level={3} className="ab-ed__t">{clean(d.title)}</div>
              <p className="ab-ed__d">{d.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
