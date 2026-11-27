import { useEffect, useRef, useState } from "react";

/** Рахує від 0 до числа у value ("220+", "90%") коли елемент з'являється у вʼюпорті. */
export const CountUp = ({ value, delay = 0, duration = 1750 }: { value: string; delay?: number; duration?: number }) => {
  const m = /^(\d+)(.*)$/.exec(value);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(m ? 0 : target);

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setN(target);
      return;
    }
    let raf = 0;
    let timer = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [value]);

  if (!m) return <>{value}</>;
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block", fontVariantNumeric: "tabular-nums" }}>
      <span aria-hidden="true" style={{ visibility: "hidden" }}>{value}</span>
      <span style={{ position: "absolute", left: 0, top: 0 }} aria-label={value}>{n}{suffix}</span>
    </span>
  );
};
