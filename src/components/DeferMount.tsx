import React from "react";

/*
 * perf: нижні секції головної монтуються не одночасно з hero, а
 *  - коли підходять до екрана (IntersectionObserver із запасом),
 *  - або у фоні по черзі, через ~2 с після повного завантаження (по одній за задачу),
 * тож перший екран і LCP не чекають на тисячі DOM-вузлів нижче.
 * Заглушка тримає той самий id і приблизну висоту, щоб якорі й скрол не стрибали.
 */
const queue: Array<() => void> = [];
let draining = false;

const idle = (cb: () => void) =>
  "requestIdleCallback" in window
    ? (window as any).requestIdleCallback(cb, { timeout: 1500 })
    : setTimeout(cb, 120);

function drain() {
  if (draining) return;
  draining = true;
  const step = () => {
    const f = queue.shift();
    if (!f) {
      draining = false;
      return;
    }
    f();
    setTimeout(() => idle(step), 250);
  };
  idle(step);
}

let armed = false;
function arm() {
  if (armed) return;
  armed = true;
  const go = () => setTimeout(drain, 2200);
  document.readyState === "complete"
    ? go()
    : addEventListener("load", go, { once: true });
}

type Props = {
  children: React.ReactNode;
  /** висота заглушки: [десктоп, мобільний] */
  height: [number, number];
  id?: string;
  className?: string;
};

export const DeferMount = ({ children, height, id, className }: Props) => {
  const [on, setOn] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (on) return;
    const mount = () => setOn(true);
    queue.push(mount);
    arm();
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && ref.current) {
      io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting)) mount();
        },
        { rootMargin: "500px 0px" },
      );
      io.observe(ref.current);
    }
    return () => {
      const i = queue.indexOf(mount);
      if (i >= 0) queue.splice(i, 1);
      io && io.disconnect();
    };
  }, [on]);
  /* відкладений контент уже після того, як головна підписала .pb-rv — підписуємо нові елементи самі */
  React.useEffect(() => {
    if (!on) return;
    const els = Array.from(
      document.querySelectorAll(".pb-rv:not(.pb-rv-in)"),
    ) as HTMLElement[];
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((e) => e.classList.add("pb-rv-in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("pb-rv-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [on]);
  if (on) return <>{children}</>;
  const h = window.innerWidth < 768 ? height[1] : height[0];
  return (
    <div
      ref={ref}
      id={id}
      className={className}
      aria-hidden="true"
      style={{ minHeight: h }}
    />
  );
};
