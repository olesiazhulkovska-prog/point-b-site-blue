// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { useEffect } from "react";
import { ArrowRight, Bot, Check, CodeXml, Layers, Send, ChartColumn, Database } from "lucide-react";

const STACK_ICONS = { "keyCRM": Layers, "Telegram": Send, "Power BI": ChartColumn, "1С / BAS": Database };
import { useSite } from "../context/SiteContext";
import "./ServicePage.css";
import "./AboutPage.css";
import { D1, Kv, Vv, kv } from "../data/data";
import { AboutHeroScene } from "../components/AboutHeroScene";
import { ReviewsSection } from "../components/ReviewsSection";
import { AboutDifferences } from "../components/AboutDifferences";
import { AboutReasons } from "../components/AboutReasons";
import { CountUp } from "../components/CountUp";
import { AboutCardArt } from "../components/AboutCardArt";

const DIRECTION_PAGES = ["keycrm", "ai-bots", "analytics"];

export const AboutPage = () => {
  // захист від горизонтального «зльоту» полотна на мобілці
  useEffect(() => {
    const fix = () => { if (window.scrollX) window.scrollTo(0, window.scrollY); };
    window.addEventListener("scroll", fix, { passive: true });
    return () => window.removeEventListener("scroll", fix);
  }, []);
  // блок із відео «залипає» (sticky), доки наступний блок його накриває: позиція = низ блоку біля низу екрана
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".ab-prin");
    if (!el) return;
    const set = () => el.style.setProperty("--prin-top", Math.min(0, window.innerHeight - el.offsetHeight) + "px");
    set();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(set) : null;
    ro?.observe(el);
    window.addEventListener("resize", set);
    return () => { ro?.disconnect(); window.removeEventListener("resize", set); };
  }, []);
  const { navigateTo: n, openLeadModal: s } = useSite(),
    o = [
      {
        title: "Впровадження CRM/ERP на базі keyCRM",
        description:
          "Повне проєктування архітектури даних, налаштування воронок, каталогів, складського обліку, ПРРО та автоматичних тригерів без зупинки поточних продажів.",
        icon: Layers,
      },
      {
        title: "Боти та AI-автоматизація",
        description:
          "Розробка сценаріїв залучення заявок у Telegram, Instagram, Viber та WhatsApp, інтеграція мовних моделей штучного інтелекту для цілодобового обслуговування.",
        icon: Bot,
      },
      {
        title: "Власна CRM-система",
        description:
          "Проєктування та розробка власних CRM/ERP систем без обмежень чужих платформ, зі специфічною логікою, кількома юрособами та повною власністю на код.",
        icon: CodeXml,
      },
    ],
    i = [
      {
        name: "keyCRM",
        role: "Офіційний сертифікований інтегратор",
      },
      {
        name: "Telegram",
        role: "Bot API & корпоративні чати",
      },
      {
        name: "Power BI",
        role: "Глибока візуалізація бізнес-метрик",
      },
      {
        name: "1С / BAS",
        role: "Двостороння синхронізація баз даних",
      },
    ];
  const wrap = "max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16";
  const eyebrow = "text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]";
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)]">
      {/* 1. hero (blue) + key figures */}
      <div className="pb-band pb-band--blue pb-band--arch">
        <section className="pb-hero ab-hero relative overflow-hidden bg-transparent py-24 md:py-32">
          <div className={wrap}>
            <div className="ab-hero__grid">
            <div className="ab-hero__txt max-w-4xl">
              <span className={eyebrow}>Про компанію Point B Group</span>
              <h1 className="pb-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
                Ми будуємо системи, які звільняють час власників та примножують дохід
              </h1>
              <p className="text-base sm:text-lg text-[color:var(--ink)]/85 leading-relaxed max-w-3xl">
                <strong>Місія Point B</strong>
                {" — допомогти малому та середньому бізнесу перейти від операційного хаосу до керованої системи через правильну автоматизацію та впровадження CRM."}
              </p>
              <a
                className="pb-hero-cta"
                data-ds-round="1"
                href="#lead"
                onClick={(e) => {
                  e.preventDefault();
                  s("Сторінка Про компанію");
                }}
              >
                <span>Залишити заявку</span>
                <span className="pb-hero-cta__ic" aria-hidden="true">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </a>
            </div>
            <div className="ab-hero__art">
              <AboutHeroScene />
            </div>
            </div>
            <div className="ab-stats">
              {D1.map((d, x) => (
                <div key={x}>
                  <div className="ab-stats__v text-[color:var(--ink)]"><CountUp value={d.value} delay={x * 100} /></div>
                  <div className="ab-stats__l text-[color:var(--ink)]">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 2. directions + stack (light) */}
      <div className="pb-band pb-band--light">
        <section className={wrap}>
          <div className="pb-head max-w-2xl">
            <span className={eyebrow}>Спеціалізація</span>
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">Три напрямки роботи</h2>
            <p className="text-base mt-2">Комплексна синергія трьох ключових компетенцій в одній експертній команді</p>
          </div>
          <div className="ab-dir grid grid-cols-1 md:grid-cols-3 gap-5">
            {o.map((d, x) => {
              return (
                <button
                  key={x}
                  type="button"
                  style={{ "--i": x }}
                  onClick={() => n(DIRECTION_PAGES[x])}
                  className="text-left flex flex-col gap-4 p-7 rounded-3xl bg-[color:var(--surface)] border border-[color:var(--card-border)] shadow-[0_18px_36px_-26px_rgba(0,0,40,.55)] hover:border-[#F98513] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <AboutCardArt kind={x} />
                  <h3 className="text-xl font-bold text-[color:var(--ink)] leading-snug">{d.title}</h3>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">{d.description}</p>
                  <span className="mt-auto pt-2 inline-flex items-center gap-2 text-[15px] font-semibold text-[color:var(--ink)]">
                    Детальніше <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
          <div className="ab-stack">
            <div className="ab-stack__t text-[13px] font-bold uppercase tracking-widest text-[color:var(--ink-soft)]">Ключові технологічні стеки та інтеграції</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {i.map((d, x) => {
                const SI = STACK_ICONS[d.name] || Layers;
                return (
                <div key={x} className="ab-stack__c p-5 rounded-2xl bg-[color:var(--surface)] border border-[color:var(--card-border)]">
                  <span className="ab-stack__ico" aria-hidden="true"><SI strokeWidth={1.8} /></span>
                  <div className="font-bold text-[color:var(--ink)] text-lg">{d.name}</div>
                  <div className="text-[15px] text-[color:var(--ink-soft)] mt-1 leading-snug">{d.role}</div>
                </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* 3. communication principles (blue) + відео на фоні */}
      <div className="pb-band pb-band--blue ab-prin">
        <video
          className="ab-prin__v"
          src="https://res.cloudinary.com/dset5uqua/video/upload/v1795802482/gemini_generated_video_32dc1f9a_xoyydt.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <span className="ab-prin__shade" aria-hidden="true" />
        <section className={wrap}>
          <div className="pb-head max-w-3xl">
            <span className={eyebrow}>Культура взаємодії</span>
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">Принципи комунікації</h2>
            <p className="text-base mt-2">Фундаментальні принципи співпраці, за які нас рекомендують партнерам</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kv.map((d) => (
              <div key={d.number} className="p-7 rounded-3xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
                <span className="text-3xl font-extrabold text-[color:var(--accent-green)] block mb-4">{d.number}</span>
                <h3 className="text-lg font-bold text-[color:var(--ink)] mb-2 leading-snug">{d.title}</h3>
                <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. standards (light) — наїжджає на блок з відео */}
      <div className="pb-band pb-band--light ab-sheet">
        <section className={wrap}>
          <div className="pb-head max-w-3xl">
            <span className={eyebrow}>Позиціонування</span>
            <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">Чим ми відрізняємось</h2>
            <p className="text-base mt-2">Короткі та запам’ятовувані орієнтири нашої роботи, сформульовані через цінність для вашого бізнесу</p>
          </div>
          <AboutDifferences />
        </section>
      </div>

      {/* 5. 12 reasons + CTA (blue, same as footer tone) */}
      <div className="pb-band pb-band--blue ab-last">
        <section className={wrap}>
          <AboutReasons
            head={
              <div className="pb-head max-w-3xl">
                <span className={eyebrow}>Стандарти якості</span>
                <h2 className="pb-h2 text-2xl sm:text-3xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">Понад 35% клієнтів стають постійними</h2>
                <p className="text-base mt-2">Повний перелік 12 причин, чому бізнеси залишаються з Point B Group на роки</p>
              </div>
            }
          />
          <div className="pb-hero ab-cta rounded-3xl border border-[color:var(--card-border)] px-6 py-14 sm:px-14 sm:py-20 text-center" style={{ backgroundImage: "var(--panel-gradient)" }}>
            <span className={eyebrow}>Партнерство з Point B</span>
            <h2 className="pb-h2 text-3xl sm:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight mt-3 max-w-3xl mx-auto leading-tight">Почніть з аудиту ваших процесів</h2>
            <p className="text-base sm:text-lg text-[color:var(--ink)]/85 mt-5 max-w-xl mx-auto">Зв’яжіться з нами або перегляньте реалізовані проєкти у вашій галузі.</p>
            <div className="ab-cta__row flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                id="about-cta-lead"
                className="pb-hero-cta"
                style={{ marginTop: 0 }}
                href="#lead"
                onClick={(e) => { e.preventDefault(); s("Сторінка Про компанію"); }}
              >
                <span>Залишити заявку</span>
                <span className="pb-hero-cta__ic" aria-hidden="true"><ArrowRight className="w-5 h-5" /></span>
              </a>
              <button
                id="about-cta-cases"
                type="button"
                onClick={() => n("cases")}
                className="px-8 py-4 rounded-full border border-[color:var(--card-border)] text-[color:var(--ink)] font-semibold text-[17px] hover:border-[#F98513] transition-colors cursor-pointer"
              >
                Дивитись кейси
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 6. відгуки — той самий спільний компонент і дані, що на головній */}
      <ReviewsSection />
    </div>
  );
};
