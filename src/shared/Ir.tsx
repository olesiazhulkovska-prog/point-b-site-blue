// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';

export const Ir = ({
  children: n,
  className: s
}) => {
  var p;
  const o = React.useRef(null),
    [i, d] = React.useState(false),
    x = typeof window < "u" && ((p = window.matchMedia) == null ? undefined : p.call(window, "(prefers-reduced-motion: reduce)").matches);
  return React.useEffect(() => {
    if (x) {
      d(true);
      return;
    }
    const f = o.current;
    if (!f) return;
    const b = new IntersectionObserver(y => {
      y.some(j => j.isIntersecting) && (d(true), b.disconnect());
    }, {
      threshold: 0.15
    });
    return b.observe(f), () => b.disconnect();
  }, [x]), <span ref={o} className={`pb-fade ${i ? "pb-fade-in" : ""} ${s || ""}`}>{n}</span>;
};

