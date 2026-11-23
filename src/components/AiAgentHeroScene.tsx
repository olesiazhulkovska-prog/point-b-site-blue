import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Database, MessageCircle, UserRound } from "lucide-react";
import "./AiAgentHeroScene.css";

/** Hero animation for the "Боти та AI" service: the mascot explains how the agent works, text is typed step by step. */
const STEPS = [
  {
    tab: "Приймає",
    title: "Відповідаю одразу",
    text: "Клієнт пише в Telegram, Instagram чи на сайті, і я відповідаю за секунди. Вночі, у вихідні, без черги.",
    chip: "Telegram, Instagram, сайт",
    Icon: MessageCircle,
  },
  {
    tab: "Розуміє",
    title: "Беру дані з вашої бази",
    text: "Дивлюся в каталог, залишки та умови доставки. Нічого не вигадую: відповідаю тим, що є у вашій базі.",
    chip: "Каталог і залишки підключені",
    Icon: Database,
  },
  {
    tab: "Виконує",
    title: "Виконую рутину",
    text: "Створюю замовлення в CRM, виписую ТТН і чек, нагадую клієнту про оплату.",
    chip: "Замовлення створено в CRM",
    Icon: Check,
  },
  {
    tab: "Передає",
    title: "Кличу менеджера",
    text: "Якщо розмова виходить за межі сценарію, підключаю менеджера й передаю всю історію листування.",
    chip: "Менеджер бачить увесь контекст",
    Icon: UserRound,
  },
] as const;

const HOLD_MS = 3200;

function Mascot({ step, talking }: { step: number; talking: boolean }) {
  return (
    <svg
      className={`pbh-bot${talking ? " is-talking" : ""}`}
      data-step={step}
      viewBox="0 0 240 300"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="pbhBody" cx="35%" cy="25%" r="95%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d3f5" />
        </radialGradient>
        <linearGradient id="pbhVisor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1c78" />
          <stop offset="1" stopColor="#06062a" />
        </linearGradient>
        <filter id="pbhGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse className="pbh-shadow" cx="120" cy="288" rx="48" ry="7" fill="#000" opacity=".3" />
      <g className="pbh-float">
        <g className="pbh-ant">
          <path d="M108 48 C100 30 88 18 72 8" stroke="#F98513" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="72" cy="8" r="6" fill="#F98513" filter="url(#pbhGlow)" />
        </g>
        <g className="pbh-arm pbh-arm--l">
          <rect x="44" y="166" width="22" height="62" rx="11" fill="url(#pbhBody)" />
          <circle cx="55" cy="232" r="12" fill="#1B2E8C" />
        </g>
        <rect x="90" y="244" width="24" height="30" rx="11" fill="#1B2E8C" />
        <rect x="126" y="244" width="24" height="30" rx="11" fill="#1B2E8C" />
        <rect x="90" y="266" width="24" height="8" rx="4" fill="#F98513" />
        <rect x="126" y="266" width="24" height="8" rx="4" fill="#F98513" />
        <path
          d="M80 150 H160 Q172 150 170 164 L164 232 Q162 252 144 252 H96 Q78 252 76 232 L70 164 Q68 150 80 150Z"
          fill="url(#pbhBody)"
        />
        <rect x="100" y="178" width="40" height="5" rx="2.5" fill="#1B2E8C" opacity=".5" />
        <rect x="108" y="190" width="24" height="5" rx="2.5" fill="#F98513" />
        <circle cx="50" cy="100" r="15" fill="#2F4BD8" />
        <circle cx="50" cy="100" r="7" fill="#1B2E8C" />
        <circle cx="190" cy="100" r="15" fill="#2F4BD8" />
        <circle cx="190" cy="100" r="7" fill="#1B2E8C" />
        <ellipse cx="120" cy="98" rx="72" ry="58" fill="url(#pbhBody)" />
        <rect x="66" y="64" width="108" height="68" rx="34" fill="url(#pbhVisor)" />
        <path d="M82 74 Q98 66 118 68" stroke="#fff" strokeOpacity=".28" strokeWidth="4" strokeLinecap="round" fill="none" />
        <g className="pbh-eyes">
          <ellipse className="pbh-eye" cx="100" cy="99" rx="8" ry="11" fill="#F98513" filter="url(#pbhGlow)" />
          <ellipse className="pbh-eye" cx="140" cy="99" rx="8" ry="11" fill="#F98513" filter="url(#pbhGlow)" />
        </g>
        <g className="pbh-arm pbh-arm--r">
          <rect x="158" y="160" width="22" height="62" rx="11" fill="url(#pbhBody)" />
          <circle cx="169" cy="226" r="12" fill="#1B2E8C" />
        </g>
      </g>
    </svg>
  );
}

export function AiAgentHeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
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
    if (!visible) return;
    const full = STEPS[step].text;
    if (reduce) {
      setN(full.length);
      const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), 5500);
      return () => window.clearTimeout(t);
    }
    if (n < full.length) {
      const prev = full[n - 1];
      const pause = prev === "." || prev === ":" ? 220 : prev === "," ? 110 : 0;
      const t = window.setTimeout(() => setN(n + 1), 26 + pause);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setStep((s) => (s + 1) % STEPS.length);
      setN(0);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [visible, step, n, reduce]);

  const jump = (i: number) => {
    setStep(i);
    setN(reduce ? STEPS[i].text.length : 0);
  };

  const cur = STEPS[step];
  const typing = n < cur.text.length;
  const done = n >= cur.text.length;

  return (
    <div className="pbh" ref={ref}>
      <ul className="pbh-sr">
        {STEPS.map((s) => (
          <li key={s.tab}>
            {s.title}. {s.text}
          </li>
        ))}
      </ul>

      <div className="pbh-mascot" aria-hidden="true">
        <Mascot step={step} talking={typing} />
        <span className="pbh-badge" key={step}>
          <cur.Icon strokeWidth={2.2} />
        </span>
      </div>

      <div className="pbh-card" aria-hidden="true">
      <div className="pbh-head">
        <div className="pbh-tabs">
          {STEPS.map((s, i) => (
            <button
              key={s.tab}
              type="button"
              className={`pbh-tab${i === step ? " is-on" : ""}${i < step ? " is-done" : ""}`}
              onClick={() => jump(i)}
              tabIndex={-1}
            >
              <span className="pbh-bar">
                <span
                  style={{
                    width: i < step ? "100%" : i === step ? `${Math.round((n / cur.text.length) * 100)}%` : "0%",
                  }}
                />
              </span>
              <span className="pbh-tab__l">
                {s.tab}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pbh-body">
        <div className="pbh-stack pbh-stack--t">
          {STEPS.map((s, i) => (
            <h3 key={s.tab} className={i === step ? "is-on" : ""}>
              {s.title}
            </h3>
          ))}
        </div>
        <div className="pbh-stack pbh-stack--p">
          {STEPS.map((s, i) => (
            <p key={s.tab} className={i === step ? "is-on" : ""}>
              {i === step ? (
                <>
                  <span>{s.text.slice(0, n)}</span>
                  {!done && <i className="pbh-caret" />}
                  <span className="pbh-rest">{s.text.slice(n)}</span>
                </>
              ) : (
                s.text
              )}
            </p>
          ))}
        </div>
        <div className={`pbh-chip${done ? " is-on" : ""}`} key={`c${step}`}>
          <cur.Icon strokeWidth={2.4} />
          <span>{cur.chip}</span>
        </div>
      </div>
      </div>
    </div>
  );
}
