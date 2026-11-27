import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Vv } from "../data/data";
import { CountUp } from "./CountUp";
import "./AboutDifferences.css";

const Viz = ({ i, run }: { i: number; run: number }) => {
  if (i === 0)
    return (
      <div className="ab-diff__viz ab-diff__viz--count">
        <b><CountUp key={run} value="200+" /></b>
        <span>реалізованих проєктів</span>
        <i className="ab-diff__bar"><em /></i>
      </div>
    );
  if (i === 1)
    return (
      <div className="ab-diff__viz ab-diff__viz--flow">
        <span className="ab-diff__node" style={{ "--d": "0s" } as React.CSSProperties}>Заявка</span>
        <u style={{ "--d": ".35s" } as React.CSSProperties} />
        <span className="ab-diff__node" style={{ "--d": ".6s" } as React.CSSProperties}>CRM</span>
        <u style={{ "--d": ".95s" } as React.CSSProperties} />
        <span className="ab-diff__node is-hot" style={{ "--d": "1.2s" } as React.CSSProperties}>Оплата</span>
      </div>
    );
  return (
    <ul className="ab-diff__viz ab-diff__viz--check">
      {["Ваші реальні замовлення", "Розбір кожного кроку", "Команда працює сама"].map((t, k) => (
        <li key={t} style={{ "--d": `${0.15 + k * 0.5}s` } as React.CSSProperties}>
          <span className="ab-diff__tick"><Check strokeWidth={3} /></span>
          {t}
        </li>
      ))}
    </ul>
  );
};

export const AboutDifferences = () => {
  const [on, setOn] = useState<boolean[]>(() => Vv.map(() => false));
  const [runs, setRuns] = useState<number[]>(() => Vv.map(() => 0));
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setOn(Vv.map(() => true));
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = rows.current.indexOf(e.target as HTMLLIElement);
          if (i < 0) return;
          setOn((p) => p.map((v, k) => (k === i ? true : v)));
          io.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const replay = (i: number) => {
    setOn((p) => p.map((v, k) => (k === i ? false : v)));
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setRuns((p) => p.map((v, k) => (k === i ? v + 1 : v)));
        setOn((p) => p.map((v, k) => (k === i ? true : v)));
      })
    );
  };

  return (
    <ol className="ab-diff">
      {Vv.map((d, i) => (
        <li
          key={d.number}
          ref={(el) => { rows.current[i] = el; }}
          className={"ab-diff__row" + (on[i] ? " is-in" : "")}
          onClick={() => replay(i)}
        >
          <span className="ab-diff__n">{d.number}</span>
          <div className="ab-diff__txt">
            {d.badge && <span className="ab-diff__badge">{d.badge}</span>}
            <div role="heading" aria-level={3} className="ab-diff__title">{d.title}</div>
            <p className="ab-diff__desc">{d.description}</p>
          </div>
          <Viz i={i} run={runs[i]} />
        </li>
      ))}
    </ol>
  );
};
