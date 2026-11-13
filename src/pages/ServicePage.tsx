// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { CircleCheck, Mail, Phone, Send } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { KeyCrmPainsDiagram } from "../shared/KeyCrmPainsDiagram";
import { AiAgentFlowDiagram } from "../shared/AiAgentFlowDiagram";
import { CustomCrmCompareDiagram } from "../shared/CustomCrmCompareDiagram";
import { LeadForm } from "../components/LeadForm";
export const tc = "249,133,19";
export const In = "143,163,255";
export const ac = (n, s, o, i, d, x) => {
  (n.beginPath(),
    n.moveTo(s + x, o),
    n.arcTo(s + i, o, s + i, o + d, x),
    n.arcTo(s + i, o + d, s, o + d, x),
    n.arcTo(s, o + d, s, o, x),
    n.arcTo(s, o, s + i, o, x),
    n.closePath());
};
export const Cq = ({ mode: n }) => {
  const s = React.useRef(null);
  return (
    React.useEffect(() => {
      var B;
      const o = s.current;
      if (!o) return;
      const i = o.getContext("2d");
      if (!i) return;
      const d =
        (B = window.matchMedia) == null
          ? undefined
          : B.call(window, "(prefers-reduced-motion: reduce)").matches;
      let x = 0,
        p = 0,
        f = 0,
        b = true,
        y = performance.now(),
        j = 0;
      const h = Math.min(window.devicePixelRatio || 1, 2);
      let A = [],
        U = [],
        v = [],
        w = [];
      const k = () => {
          if (n === "keycrm")
            ((A = Array.from(
              {
                length: 6,
              },
              (L, $) => ({
                x: x * (0.06 + ($ / 5) * 0.88),
                y: p * (0.5 + Math.sin($ * 1.7) * 0.28),
              }),
            )),
              (U = Array.from(
                {
                  length: 14,
                },
                (L, $) => ({
                  seg: $ % 5,
                  p: Math.random(),
                  v: 0.08 + Math.random() * 0.08,
                  gold: $ % 3 === 0,
                }),
              )));
          else if (n === "ai-bots") {
            const D = Math.max(6, Math.round(x / 170));
            v = Array.from(
              {
                length: D,
              },
              (L, $) => ({
                x: ($ / D) * x + Math.random() * 60,
                y: Math.random() * p,
                w: 90 + Math.random() * 70,
                lines: 1 + Math.floor(Math.random() * 2),
                v: 10 + Math.random() * 10,
                mine: $ % 2 === 0,
                ph: Math.random() * 6,
              }),
            );
          } else {
            const te = Math.ceil(x / 146) + 1,
              ae = Math.ceil(p / 90) + 1;
            w = [];
            for (let re = 0; re < ae; re++)
              for (let me = 0; me < te; me++) {
                const Ne = (re + me) % 3 === 0;
                w.push({
                  x: me * 146 + (re % 2) * 40 - 20,
                  y: re * 90 - 10,
                  w: Ne ? 120 : 120 * 0.6,
                  h: 64,
                  ph: Math.random() * 12,
                });
              }
          }
        },
        R = () => {
          const D = o.getBoundingClientRect();
          ((x = D.width),
            (p = D.height),
            (o.width = Math.max(1, Math.round(x * h))),
            (o.height = Math.max(1, Math.round(p * h))),
            i.setTransform(h, 0, 0, h, 0, 0),
            k(),
            H(0));
        },
        H = (D) => {
          if (((j += D), i.clearRect(0, 0, x, p), n === "keycrm")) {
            i.lineWidth = 1;
            for (let L = 0; L < A.length - 1; L++) {
              const $ = A[L],
                te = A[L + 1];
              ((i.strokeStyle = `rgba(${In},0.22)`),
                i.setLineDash([3, 7]),
                i.beginPath(),
                i.moveTo($.x, $.y),
                i.bezierCurveTo(
                  ($.x + te.x) / 2,
                  $.y,
                  ($.x + te.x) / 2,
                  te.y,
                  te.x,
                  te.y,
                ),
                i.stroke());
            }
            i.setLineDash([]);
            for (const L of A)
              ((i.strokeStyle = `rgba(${In},0.4)`),
                (i.fillStyle = "rgba(255,255,255,0.6)"),
                ac(i, L.x - 14, L.y - 14, 28, 28, 8),
                i.fill(),
                i.stroke(),
                (i.fillStyle = `rgba(${In},0.5)`),
                i.fillRect(L.x - 5, L.y - 5, 10, 10));
            for (const L of U) {
              d ||
                ((L.p += L.v * D),
                L.p > 1 && ((L.p = 0), (L.seg = (L.seg + 1) % (A.length - 1))));
              const $ = A[L.seg],
                te = A[L.seg + 1],
                ae = L.p,
                re = ($.x + te.x) / 2,
                me =
                  (1 - ae) ** 3 * $.x +
                  3 * (1 - ae) ** 2 * ae * re +
                  3 * (1 - ae) * ae * ae * re +
                  ae ** 3 * te.x,
                Ne =
                  (1 - ae) ** 3 * $.y +
                  3 * (1 - ae) ** 2 * ae * $.y +
                  3 * (1 - ae) * ae * ae * te.y +
                  ae ** 3 * te.y,
                ge = L.gold ? tc : In;
              ((i.fillStyle = `rgba(${ge},0.85)`),
                (i.shadowColor = `rgba(${ge},0.8)`),
                (i.shadowBlur = 10),
                ac(i, me - 5, Ne - 4, 10, 8, 2),
                i.fill(),
                (i.shadowBlur = 0));
            }
          } else if (n === "ai-bots")
            for (const L of v) {
              d ||
                ((L.y -= L.v * D),
                L.y < -60 && ((L.y = p + 30), (L.x = Math.random() * x)));
              const $ = 14 + L.lines * 11,
                te = Math.min(1, Math.min(L.y + 60, p - L.y + 20) / 120),
                ae = Math.max(0, te) * 0.9;
              ((i.fillStyle = L.mine
                ? `rgba(${In},${0.12 * ae + 0.04})`
                : `rgba(17,17,68,${0.08 * ae + 0.02})`),
                (i.strokeStyle = L.mine
                  ? `rgba(${In},${0.4 * ae})`
                  : `rgba(17,17,68,${0.28 * ae})`),
                ac(i, L.x, L.y, L.w, $, 10),
                i.fill(),
                i.stroke(),
                (i.fillStyle = L.mine
                  ? `rgba(${In},${0.45 * ae})`
                  : `rgba(17,17,68,${0.35 * ae})`));
              for (let re = 0; re < L.lines; re++)
                i.fillRect(
                  L.x + 10,
                  L.y + 9 + re * 11,
                  (L.w - 20) * (re === L.lines - 1 && L.lines > 1 ? 0.55 : 1),
                  3,
                );
              if (!L.mine)
                for (let re = 0; re < 3; re++) {
                  const me =
                    0.4 + 0.6 * Math.max(0, Math.sin(j * 4 - re * 0.9 + L.ph));
                  ((i.fillStyle = `rgba(${tc},${0.7 * ae * me})`),
                    i.beginPath(),
                    i.arc(L.x + L.w - 26 + re * 8, L.y + $ + 8, 2.2, 0, 7),
                    i.fill());
                }
            }
          else
            for (const L of w) {
              const $ = Math.max(0, Math.sin(j * 0.6 + L.ph)),
                te = $ > 0.82 ? ($ - 0.82) / 0.18 : 0;
              ((i.strokeStyle = `rgba(${In},${0.14 + te * 0.5})`),
                (i.fillStyle =
                  te > 0 ? `rgba(${tc},${te * 0.12})` : "rgba(17,17,68,0)"),
                ac(i, L.x, L.y, L.w, L.h, 10),
                i.fill(),
                i.stroke(),
                te > 0.3 &&
                  ((i.strokeStyle = `rgba(${tc},${te * 0.55})`), i.stroke()));
            }
        },
        F = (D) => {
          f = requestAnimationFrame(F);
          const L = Math.min(0.05, (D - y) / 1e3);
          ((y = D), b && H(L));
        };
      R();
      const C = new ResizeObserver(R);
      C.observe(o);
      const ee = new IntersectionObserver((D) => {
        b = D.some((L) => L.isIntersecting);
      });
      return (
        ee.observe(o),
        d || (f = requestAnimationFrame(F)),
        () => {
          (cancelAnimationFrame(f), C.disconnect(), ee.disconnect());
        }
      );
    }, [n]),
    (
      <canvas
        ref={s}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      />
    )
  );
};
export const ServicePage = ({ serviceType: n }) => {
  const { navigateTo: s } = useSite(),
    o = {
      keycrm: {
        tag: "Послуга · CRM/ERP Системи",
        title: "Впровадження keyCRM під ключ",
        shortDescription:
          "Ми допомагаємо бізнесам перейти від хаосу до зрозумілої та автоматизованої системи продажів, обліку та спілкування із клієнтами.",
        whatWeDoTitle: "Що ми робимо:",
        whatWeDoItems: [
          {
            step: "01",
            title: "Аналіз і брифінг",
            desc: "Вивчаємо ваші бізнес-процеси, ролі співробітників, модель продажів. Спільно формуємо технічне завдання і узгоджуємо очікування.",
          },
          {
            step: "02",
            title: "Налаштування системи",
            desc: "Створюємо воронки продажів із чіткою структурою дій, налаштовуємо статуси, автоматизації, завдання, нагадування. Підключаємо месенджери, email, телефонію та інтегруємо keyCRM із сайтами, ботами, платіжними системами, 1С або іншими обліковими програмами.",
          },
          {
            step: "03",
            title: "Фіскалізація",
            desc: "Налаштовуємо фіскалізацію відповідно до вимог податкової. Працюємо у тандемі з бухгалтерами, консультуємо та адаптуємо систему під ваші процеси. Оновлюємо налаштування при змінах у законодавстві чи функціоналі.",
          },
          {
            step: "04",
            title: "Документи і регламенти",
            desc: "Створюємо зрозумілі регламенти для співробітників (що і як робити). Налаштовуємо права доступу відповідно до ролей у компанії.",
          },
          {
            step: "05",
            title: "Навчання та супровід",
            desc: "Готуємо індивідуальні відеоінструкції по всіх основних сценаріях роботи. Проводимо навчальні дзвінки та консультації. Даємо поради по інтерпретації даних та бізнес-аналітиці.",
          },
          {
            step: "06",
            title: "Аудит і підтримка",
            desc: "Перевіряємо коректність роботи інтеграцій і процесів. За потреби робимо коригування. Супроводжуємо проєкт після запуску.",
          },
        ],
        secondBlockTitle: "Чому обирають нас",
        secondBlockItems: [
          {
            title: "Будуємо робочу систему",
            desc: "Ми не просто «налаштовуємо кнопки», а будуємо робочу систему, що відповідає вашим бізнес-цілям.",
          },
          {
            title: "Адаптація під специфіку",
            desc: "Кожна деталь адаптується під специфіку вашої компанії без шаблонних рішень.",
          },
          {
            title: "Навчання команди та підтримка",
            desc: "Ви отримуєте команду, яка навчає ваших співробітників, допомагає делегувати процеси, та завжди готова відповісти на запитання.",
          },
        ],
        resultTitle: "Результат для вашого бізнесу",
        resultSubtitle:
          "Прозорі воронки, автоматизовані процеси, контроль кожного клієнта і команда, яка працює з CRM впевнено",
        resultItems: [
          "Впроваджуємо keyCRM під ключ",
          "Інтегруємо CRM з 1С, сайтами, ботами, складською системою, фінансовим обліком",
          "Налаштовуємо кастомні рішення під ваші потреби",
          "Будуємо воронки продажів з автоматизаціями (задачі, повідомлення, фіскалізація, контроль менеджерів)",
        ],
        extraBlockTitle: "Навчання та супровід",
        extraBlockItems: [
          "Готуємо відеоінструкції для команди",
          "Проводимо навчальні дзвінки",
          "Даємо рекомендації щодо інтерпретації даних (бізнес-аналітика)",
          "Супроводжуємо проєкт після запуску",
        ],
        leadServicePreset: "Впровадження keyCRM",
      },
      "ai-bots": {
        tag: "Послуга · AI & Автоматизація",
        title: "Рішення на базі ботів та AI",
        shortDescription:
          "Ми створюємо кастомні чат-боти, які автоматизують ключові бізнес-процеси, спрощують комунікацію з клієнтами та інтегрують штучний інтелект для ще більш ефективної взаємодії.",
        whatWeDoTitle: "Функціонал чат-ботів",
        whatWeDoItems: [
          {
            step: "01",
            title: "Продажі та заявки",
            bullets: [
              "Автоматичне отримання та обробка заявок із соцмереж і месенджерів",
              "Кваліфікація звернення за запитаннями",
              "Передача даних у CRM",
              "Розрахунок вартості замовлення або попередня калькуляція",
              "Бронювання послуг чи товарів",
            ],
          },
          {
            step: "02",
            title: "Підтримка клієнтів",
            bullets: [
              "FAQ та відповіді на часті запитання 24/7",
              "Збір зворотного зв’язку",
              "Запит додаткових документів або інформації",
              "Підказки по статусу замовлення",
            ],
          },
          {
            step: "03",
            title: "Нотифікації та нагадування",
            bullets: [
              "Нагадування про оплату або наступний крок",
              "Сповіщення про зміну статусу замовлення",
              "Миттєва реакція на нові звернення",
            ],
          },
          {
            step: "04",
            title: "Оплати та інтеграції",
            bullets: [
              "Прийом оплат через інтеграцію з платіжними системами",
              "Підключення до сайтів, CRM, Google Таблиць",
              "Робота з різними платформами (Telegram, Viber, WhatsApp, Facebook)",
            ],
          },
          {
            step: "05",
            title: "Штучний інтелект (AI)",
            bullets: [
              "Впровадження AI-асистентів для обробки складних запитів",
              "Генерація персоналізованих відповідей",
              "Навчання моделі на вашій базі знань для підвищення якості спілкування",
            ],
          },
        ],
        secondBlockTitle: "Переписки з клієнтом",
        secondBlockSubtitle:
          "Чат-боти не замінюють живе спілкування, а допомагають команді працювати ефективніше:",
        secondBlockItems: [
          {
            title: "Підхоплення діалогу в будь-який момент",
            desc: "Менеджер може підхопити діалог у будь-який момент, бачачи всю історію попередніх повідомлень.",
          },
          {
            title: "Аналітика по конверсії",
            desc: "Прозора статистика: скільки клієнтів розпочали спілкування та дійшли до фіналу сценарію.",
          },
          {
            title: "Контроль якості та передача в CRM",
            desc: "Можливість передавати переписку у Telegram або CRM для аудиту та контролю стандартів обслуговування.",
          },
        ],
        resultTitle: "Результати для бізнесу",
        resultSubtitle:
          "Чіткі вигоди від автоматизації комунікацій для компанії та команди",
        resultItems: [
          "Збільшення швидкості реакції на запити",
          "Зменшення навантаження на менеджерів",
          "Підвищення конверсії завдяки автоматизації",
          "Прозорість переписки та процесу обробки заявок",
          "Підвищення лояльності клієнтів через персоналізовані відповіді",
        ],
        extraBlockTitle: "Платформи та канали комунікацій",
        extraBlockItems: [
          "Telegram (боти з WebApp, каталогами та оплатами)",
          "Instagram Direct (автоматизація коментарів, stories та direct)",
          "Viber (публічні чат-боти та сервісні розсилки)",
          "WhatsApp Business API та Facebook Messenger",
        ],
        leadServicePreset: "Кастомні чат-боти та AI",
      },
      analytics: {
        tag: "Послуга · Власна розробка",
        title: "Власна CRM-система",
        shortDescription:
          "Ми будуємо CRM-систему з нуля — під вашу логіку бізнесу, а не в межах чужої платформи. Проєктуємо та розробляємо рішення без обмежень готових платформ, вендор-локу чи ліцензій. Повна власність на код, інтеграції будь-якої складності та супровід після запуску.",
        whatWeDoTitle: "Що ми робимо (етапи створення системи)",
        whatWeDoItems: [
          {
            step: "01",
            title: "Аналіз і ТЗ",
            desc: 'Розбираємо реальні бізнес-процеси компанії, а не типову логіку "з коробки". Формуємо технічне завдання під конкретну структуру угод, юросіб, циклів виробництва чи логістики.',
          },
          {
            step: "02",
            title: "Розробка системи",
            desc: "Будуємо CRM з нуля — без обмежень чужої платформи чи ліцензії. Проєктуємо структуру під ваш процес, а не підганяємо процес під готове рішення.",
          },
          {
            step: "03",
            title: "Інтеграції",
            desc: "Підключаємо систему до зовнішніх сервісів: фінанси, сайти, платіжні системи, склад, телефонія та інші канали комунікації.",
          },
          {
            step: "04",
            title: "Навчання та супровід",
            desc: "Навчаємо команду впевнено працювати в новій системі. Супроводжуємо після запуску, вносимо доопрацювання за результатами реальної роботи.",
          },
        ],
        secondBlockTitle: "Чому обирають нас",
        secondBlockItems: [
          {
            title: "Код і система — повна власність клієнта",
            desc: "Без залежності від вендора чи ліцензії.",
          },
          {
            title: "Жодних функціональних стель",
            desc: "Рішення проєктується під ваш процес, а не навпаки.",
          },
          {
            title: "10+ років досвіду в IT-інтеграціях",
            desc: "CRM, 1С, аналітика, боти — тому розробка одразу враховує майбутні підключення.",
          },
        ],
        resultTitle: "Результат для вашого бізнесу",
        resultSubtitle:
          "Система, яка відповідає вашій реальній логіці роботи — без костилів і без процесів, що ведуться поза CRM",
        resultItems: [
          "Проєктуємо і розробляємо CRM з нуля під ваш бізнес",
          "Інтегруємо з фінансами, сайтами, ботами, складською системою, фінансовим обліком",
          "Навчаємо команду і супроводжуємо після запуску",
          "Повна відсутність процесів, які доводиться вести в Excel чи на папері",
        ],
        extraBlockTitle: "Кому підходить",
        extraBlockItems: [
          "Середньому і великому бізнесу зі специфічними процесами: кілька юросіб, нетипові статуси угод, складна логістика чи виробничий цикл",
          "Компаніям, у яких готова CRM або кастомізація в межах платформи (наприклад, keyCRM) вже впирається в стелю можливостей",
          "Бізнесам, що потребують повної незалежності від регулярних ліцензійних тарифів за кожного співробітника",
          "Компаніям із специфічною безпекою даних та вимогами до розміщення на власних серверах",
        ],
        comparison: {
          title: "Чим це відрізняється від впровадження keyCRM",
          keycrm:
            "Впровадження keyCRM — це налаштування готової платформи під ваші процеси.",
          custom:
            "Власна CRM-система — розробка з нуля, коли готова платформа (навіть з кастомізацією) вже не витримує складність ваших процесів.",
        },
        leadServicePreset: "Власна CRM-система",
      },
    }[n];
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] pb-20">
      <section className="relative overflow-hidden bg-transparent border-b border-[color:var(--card-border)] py-24 md:py-32">
        <Cq mode={n} />
        <div className="relative z-10 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--lime)]/15 text-[color:var(--accent-green)] border border-[color:var(--lime)]/40">
              {o.tag}
            </span>
            <h1 className="pb-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
              {String(o.title)
                .split(/(keyCRM)/)
                .map((t, i) =>
                  t === "keyCRM" ? (
                    <span key={i} className="normal-case">
                      {t}
                    </span>
                  ) : (
                    t
                  ),
                )}
            </h1>
            <p className="text-base sm:text-lg text-[color:var(--ink)]/85 leading-relaxed font-normal pt-2">
              {o.shortDescription}
            </p>
          </div>
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[color:var(--card-border)] shadow-[0_24px_60px_-20px_rgba(17,17,68,0.25)] p-4 sm:p-6 flex items-center justify-center"
            style={{
              backgroundImage: "var(--panel-gradient)",
            }}
          >
            <div className="w-full max-w-[720px] flex items-center justify-center">
              {n === "keycrm" && <KeyCrmPainsDiagram />}
              {n === "ai-bots" && <AiAgentFlowDiagram svc />}
              {n === "analytics" && <CustomCrmCompareDiagram svc />}
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 md:py-20 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 max-w-2xl">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
            Методологія
          </span>
          <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
            {o.whatWeDoTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {o.whatWeDoItems.map((i, d) => (
            <div
              key={d}
              className="bg-[color:var(--card)] rounded-2xl border border-[color:var(--card-border)] p-7 shadow-xs hover:border-[color:var(--card-border)] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[13px] font-bold px-2.5 py-1 rounded bg-[color:var(--tint)] text-[color:var(--ink-soft)] border border-[color:var(--card-border)] inline-block mb-4">
                  {i.step ? `Крок ${i.step}` : `Модуль 0${d + 1}`}
                </span>
                <h3 className="text-lg font-bold text-[color:var(--ink)] mb-2">
                  {i.title}
                </h3>
                {i.desc && (
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed mb-3">
                    {i.desc}
                  </p>
                )}
                {"bullets" in i && Array.isArray(i.bullets) && (
                  <ul
                    className={`space-y-2.5 ${i.desc ? "mt-3 pt-3 border-t border-[color:var(--card-border)]" : "mt-4"}`}
                  >
                    {i.bullets.map((x, p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-base sm:text-base text-[color:var(--ink-soft)]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--accent-green)] shrink-0 mt-2" />
                        <span className="leading-relaxed">{x}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 md:py-32 bg-[color:var(--card)] border-y border-[color:var(--card-border)]">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mb-10 max-w-3xl">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
              Цінність
            </span>
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
              {o.secondBlockTitle}
            </h2>
            {"secondBlockSubtitle" in o && o.secondBlockSubtitle && (
              <p className="text-base sm:text-base text-[color:var(--ink-soft)] mt-2 font-normal">
                {o.secondBlockSubtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {o.secondBlockItems.map((i, d) => (
              <div
                key={d}
                className="p-7 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[color:var(--btn-dark)] text-[color:var(--lime)] flex items-center justify-center font-bold text-sm mb-4">
                  {d + 1}
                </div>
                <h3 className="text-base font-bold text-[color:var(--ink)] mb-2">
                  {i.title}
                </h3>
                <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-28 md:py-36 bg-[color:var(--card)] text-[color:var(--ink)]">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-12">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
              Фінансовий та операційний ефект
            </span>
            <h2 className="pb-h2 text-3xl sm:text-4xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
              {o.resultTitle}
            </h2>
            <p className="text-[color:var(--muted)] text-base mt-1">
              {o.resultSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {o.resultItems.map((i, d) => (
              <div
                key={d}
                className="p-6 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--lime)] border border-[color:var(--accent-green)] flex items-center justify-center shrink-0 mt-0.5">
                  <CircleCheck className="w-4 h-4" />
                </div>
                <span className="text-[color:var(--ink)] text-base sm:text-base leading-relaxed font-medium">
                  {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 md:py-32 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[color:var(--card)] border border-[color:var(--card-border)] shadow-xs">
          <div className="max-w-2xl mb-8">
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] sm:tracking-tight">
              {o.extraBlockTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {o.extraBlockItems.map((i, d) => (
              <div
                key={d}
                className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[color:var(--accent-green)] shrink-0" />
                <span className="text-base text-[color:var(--ink)] font-medium">
                  {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {"comparison" in o && o.comparison && (
        <section className="py-20 md:py-28 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-[color:var(--card)] text-[color:var(--ink)] border border-[color:var(--card-border)] shadow-sm">
            <div className="max-w-2xl mb-8">
              <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] sm:tracking-tight">
                {o.comparison.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)] space-y-2">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[color:var(--muted)]">
                  Готова платформа
                </span>
                <h3 className="text-lg font-bold text-[color:var(--ink)]">
                  Впровадження keyCRM
                </h3>
                <p className="text-base text-[color:var(--muted)] leading-relaxed">
                  {o.comparison.keycrm}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[color:var(--card)] border border-[color:var(--lime)]/40 space-y-2 relative overflow-hidden">
                <span className="text-[13px] font-bold uppercase tracking-wider text-[color:var(--accent-green)]">
                  Власна розробка з нуля
                </span>
                <h3 className="text-lg font-bold text-[color:var(--ink)]">
                  Власна CRM-система
                </h3>
                <p className="text-base text-[color:var(--ink)] leading-relaxed">
                  {o.comparison.custom}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="mt-8 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
            Готові почати?
          </span>
          <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
            Обговоримо ваші процеси і оцінимо технічне завдання
          </h2>
          <p className="text-[color:var(--ink-soft)] text-base mt-1">
            Заповніть заявку або зв'яжіться з нашою командою будь-яким зручним
            способом
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-5">
            <a
              href="mailto:point.b.here@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--card)] border border-[color:var(--card-border)] text-[13px] sm:text-sm font-semibold text-[color:var(--ink)] hover:border-[color:var(--card-border)] hover:bg-[color:var(--card)] transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
              <span>point.b.here@gmail.com</span>
            </a>
            <a
              href="tel:+380737860040"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color:var(--card)] border border-[color:var(--card-border)] text-[13px] sm:text-sm font-semibold text-[color:var(--ink)] hover:border-[color:var(--card-border)] hover:bg-[color:var(--card)] transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
              <span>+380 73 78 600 40</span>
            </a>
            <a
              href="https://t.me/pointb_valentyna"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2F4BFF]/10 border border-[#2F4BFF]/30 text-[13px] sm:text-sm font-semibold text-[#1B2Ea1] hover:bg-[#2F4BFF]/20 transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-[#2F4BFF]" />
              <span>Telegram: Відкрити чат</span>
            </a>
          </div>
        </div>
        <LeadForm
          defaultService={o.leadServicePreset}
          sourcePage={`service-${n}`}
        />
      </section>
    </div>
  );
};
