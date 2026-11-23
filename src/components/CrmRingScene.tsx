import { useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, Factory, Handshake, Inbox, Plug, Warehouse, type LucideIcon } from "lucide-react";
import "./CrmRingScene.css";

/** Hero animation for "Власна CRM": six module sectors fly in one by one and assemble into a ring; the explanation is typed in the centre. */
const MODULES: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Заявки", text: "Усі звернення в одному місці, без втрат.", Icon: Inbox },
  { title: "Угоди", text: "Етапи й оплати під вашу воронку.", Icon: Handshake },
  { title: "Виробництво", text: "Терміни, виконавці й статуси замовлень.", Icon: Factory },
  { title: "Склад", text: "Залишки та відвантаження в реальному часі.", Icon: Warehouse },
  { title: "Інтеграції", text: "1С, сайт, банк і Нова пошта на зв'язку.", Icon: Plug },
  { title: "Звіти", text: "Цифри для власника без ручних таблиць.", Icon: BarChart3 },
];
const FINAL = { title: "Ваша CRM", text: "Система за формою вашого процесу." };
const N = MODULES.length;

const C = 200;
const R2 = 196;
const R1 = 124;
const PAD = 5; // stroke rounds the corners, so the geometry is shrunk by this
const GAP = 5; // degrees between sectors
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (r: number, a: number) => `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`;

function geo(i: number) {
  const mid = -90 + i * (360 / N);
  const half = 180 / N - GAP / 2;
  const ro = R2 - PAD;
  const ri = R1 + PAD;
  const a0 = rad(mid - half);
  const a1 = rad(mid + half);
  const d = [
    `M ${pt(ro, a0 + PAD / ro)}`,
    `A ${ro} ${ro} 0 0 1 ${pt(ro, a1 - PAD / ro)}`,
    `L ${pt(ri, a1 - PAD / ri)}`,
    `A ${ri} ${ri} 0 0 0 ${pt(ri, a0 + PAD / ri)}`,
    "Z",
  ].join(" ");
  const m = rad(mid);
  const rm = (R1 + R2) / 2;
  return { d, ix: C + rm * Math.cos(m), iy: C + rm * Math.sin(m), cos: Math.cos(m), sin: Math.sin(m) };
}
const GEO = MODULES.map((_, i) => geo(i));

export function CrmRingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // p: 0..N-1 = module being explained, N = assembled (final), N+1 = flying apart (restart)
  const [p, setP] = useState(N + 1);
  const [n, setN] = useState(0);
  const reduce = useMemo(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((e) => setVisible(e.some((x) => x.isIntersecting)), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setP(N);
      setN(FINAL.text.length);
      return;
    }
    if (!visible) return;
    if (p <= N) {
      const full = p < N ? MODULES[p].text : FINAL.text;
      if (n < full.length) {
        const prev = full[n - 1];
        const t = window.setTimeout(() => setN(n + 1), 58 + (prev === "," ? 160 : 0));
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(
        () => {
          setP(p + 1);
          setN(0);
        },
        p === N ? 4200 : 1500,
      );
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setP(0);
      setN(0);
    }, p === N + 1 && n === 0 ? 1100 : 0);
    return () => window.clearTimeout(t);
  }, [visible, p, n, reduce]);

  const built = p >= N + 1 ? 0 : p >= N ? N : p + 1;
  const active = p < N ? p : -1;
  const final = p === N;
  const title = p < N ? MODULES[p].title : FINAL.title;
  const full = p < N ? MODULES[p].text : FINAL.text;
  const shown = p > N ? "" : full.slice(0, n);

  return (
    <div className="pbr" ref={ref}>
      <ul className="pbr-sr">
        {MODULES.map((m) => (
          <li key={m.title}>
            {m.title}. {m.text}
          </li>
        ))}
        <li>
          {FINAL.title}. {FINAL.text}
        </li>
      </ul>

      <div className="pbr-ring" aria-hidden="true">
        <svg viewBox="-34 -34 468 468" focusable="false">
          {GEO.map((g, i) => {
            const on = i < built;
            const act = i === active;
            const off = on ? 0 : 30;
            return (
              <g
                key={i}
                className={`pbr-s${on ? " is-built" : ""}${act ? " is-active" : ""}${final ? " is-final" : ""}`}
                style={{ transform: `translate(${(g.cos * off).toFixed(1)}px, ${(g.sin * off).toFixed(1)}px)` }}
              >
                <path className="pbr-sp" d={g.d} />
                {(() => {
                  const Ic = MODULES[i].Icon;
                  return <Ic x={g.ix - 16} y={g.iy - 16} width={32} height={32} strokeWidth={2} />;
                })()}
              </g>
            );
          })}
        </svg>
        <div className="pbr-c">
          <div className="pbr-t" key={title} data-t={title} />
          <p className="pbr-p">
            <span>{shown}</span>
            {n < full.length && p <= N && <i className="pbr-caret" />}
          </p>
        </div>
      </div>

      <div className="pbr-foot" aria-hidden="true">
        <span className={`pbr-chip pbr-chip--own${final ? " is-on" : ""}`}>100% власність на систему і код</span>
        <span className={`pbr-chip pbr-chip--prog${final ? "" : " is-on"}`}>
          Збираємо під ваш процес <b>{Math.min(built, N)}/{N}</b>
        </span>
      </div>
    </div>
  );
}
