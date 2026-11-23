import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ClipboardList, Database, LayoutDashboard, MessageCircle, Plug, ShieldCheck, UserRound, type LucideIcon } from "lucide-react";
import "./AiAgentHeroScene.css";

export type HeroStep = { tab: string; title: string; text: string; chip: string; Icon: LucideIcon };

/** Hero animation for a service: step list + text typed step by step. "Боти та AI": the real mascot stands on the panel (see ServicePage). */
export const AI_HERO_STEPS: HeroStep[] = [
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
];

export const CRM_HERO_STEPS: HeroStep[] = [
  {
    tab: "Аналіз",
    title: "Розбираємо ваш процес",
    text: "Проходимо ваш шлях від заявки до відвантаження. Бачимо, де процес рветься і що живе в таблицях та чатах.",
    chip: "Карта процесів",
    Icon: ClipboardList,
  },
  {
    tab: "Проєкт",
    title: "Малюємо систему під вас",
    text: "Збираємо модулі під вашу логіку: заявки, угоди, виробництво, склад. Без зайвих полів і чужих обмежень.",
    chip: "Прототип на погодження",
    Icon: LayoutDashboard,
  },
  {
    tab: "Розробка",
    title: "Будуємо й підключаємо",
    text: "Пишемо CRM з нуля та інтегруємо з 1С, сайтом, месенджерами, оплатою й аналітикою.",
    chip: "Інтеграції налаштовані",
    Icon: Plug,
  },
  {
    tab: "Запуск",
    title: "Запуск і супровід",
    text: "Навчаємо команду, переносимо дані та супроводжуємо після запуску. Код і система повністю ваші.",
    chip: "100% власність на код",
    Icon: ShieldCheck,
  },
];

const HOLD_MS = 2600;

export function AiAgentHeroScene({ steps: STEPS = AI_HERO_STEPS }: { steps?: HeroStep[] }) {
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
      const pause = prev === "." || prev === ":" ? 120 : prev === "," ? 60 : 0;
      const t = window.setTimeout(() => setN(n + 1), 20 + pause);
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

      <div className="pbh-tabs" aria-hidden="true">
        {STEPS.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            className={`pbh-tab${i === step ? " is-on" : ""}${i < step ? " is-done" : ""}`}
            onClick={() => jump(i)}
            tabIndex={-1}
          >
            <span className="pbh-ic">
              <s.Icon strokeWidth={2.2} />
            </span>
            <span className="pbh-tab__l">{s.tab}</span>
            <span className="pbh-bar">
              <span
                style={{
                  width: i < step ? "100%" : i === step ? `${Math.round((n / cur.text.length) * 100)}%` : "0%",
                }}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="pbh-body" aria-hidden="true">
        <div className="pbh-stack pbh-stack--t">
          {STEPS.map((s, i) => (
            <div key={s.tab} className={`pbh-title${i === step ? " is-on" : ""}`} data-t={s.title} />
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
  );
}
