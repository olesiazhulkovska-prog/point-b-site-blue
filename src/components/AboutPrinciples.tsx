import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Check, ArrowRight } from "lucide-react";
import { kv } from "../data/data";
import "./AboutPrinciples.css";

const d = (v: number) => ({ "--d": `${v}s` }) as CSSProperties;

const Viz = ({ i }: { i: number }) => {
  if (i === 0)
    return (
      <div className="ap__viz ap__viz--tbl">
        <div style={d(0.1)}><span>Строк запуску</span><b>6 тижнів</b></div>
        <div style={d(0.5)}><span>Вартість</span><b>фіксована</b></div>
        <div className="is-hot" style={d(0.9)}><span>Прихованих платежів</span><b><Check strokeWidth={3} />0</b></div>
      </div>
    );
  if (i === 1)
    return (
      <div className="ap__viz ap__viz--sw">
        {[["Воронка продажів", false], ["Складський облік", false], ["Зайвий модуль", true]].map(([t, off], k) => (
          <div key={t as string} className={off ? "is-off" : ""} style={d(0.1 + k * 0.3)}>
            <span>{t}</span>
            <i className="ap__sw" style={d(off ? 1.1 : 0)}><em /></i>
          </div>
        ))}
      </div>
    );
  if (i === 2)
    return (
      <div className="ap__viz ap__viz--tr">
        <span className="ap__term" style={d(0.1)}>API · webhook</span>
        <ArrowRight className="ap__arr" strokeWidth={2.4} style={d(0.7)} />
        <span className="ap__plain" style={d(1)}>міст між системами</span>
      </div>
    );
  return (
    <div className="ap__viz ap__viz--pr">
      <div className="ap__bar"><em /></div>
      <ul>
        {["Запуск", "Навчання", "Підтримка"].map((t, k) => (
          <li key={t} style={d(0.5 + k * 0.5)}><span className="ap__tick"><Check strokeWidth={3} /></span>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export const AboutPrinciples = () => {
  const [on, setOn] = useState<boolean[]>(() => kv.map(() => false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setOn(kv.map(() => true));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = refs.current.indexOf(e.target as HTMLDivElement);
          if (i >= 0) setOn((p) => p.map((v, k) => (k === i ? true : v)));
          io.unobserve(e.target);
        }),
      { threshold: 0.5 }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const replay = (i: number) => {
    setOn((p) => p.map((v, k) => (k === i ? false : v)));
    requestAnimationFrame(() => requestAnimationFrame(() => setOn((p) => p.map((v, k) => (k === i ? true : v)))));
  };

  return (
    <div className="ap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kv.map((x, i) => (
        <div
          key={x.number}
          ref={(el) => { refs.current[i] = el; }}
          className={"ap__card rounded-3xl bg-[color:var(--card)] border border-[color:var(--card-border)]" + (on[i] ? " is-in" : "")}
          onClick={() => replay(i)}
        >
          <Viz i={i} />
          <span className="ap__n">{x.number}</span>
          <h3 className="ap__t">{x.title}</h3>
          <p className="ap__p">{x.description}</p>
        </div>
      ))}
    </div>
  );
};
