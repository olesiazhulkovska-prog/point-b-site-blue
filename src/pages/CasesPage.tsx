// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { ArrowRight, Funnel } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { CaseCard } from "../components/CaseCard";

export const CasesPage = () => {
  const {
      cases: n,
      industries: s,
      navigateTo: o,
      openLeadModal: i,
    } = useSite(),
    [d, x] = React.useState("all"),
    p = d === "all" ? n : n.filter((f) => f.dataIndustry === d);
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] pb-20">
      <section className="bg-[color:var(--card)] border-b border-[color:var(--card-border)] py-24 md:py-32">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--ink)] border border-[color:var(--card-border)]">
              Портфоліо та результати
            </span>
            <h1 className="pb-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
              Кейси впровадження систем у реальному бізнесі
            </h1>
            <p className="text-base sm:text-lg text-[color:var(--ink-soft)] leading-relaxed font-normal pt-1">
              Реальні приклади того, як компанії позбулися операційного хаосу,
              пришвидшили обробку замовлень та налагодили системні продажі на
              базі keyCRM, AI-ботів та Power BI.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center gap-2 mb-4 text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider">
          <Funnel className="w-3.5 h-3.5" />
          <span>Фільтр за галуззю бізнесу:</span>
        </div>
        <div className="flex flex-wrap gap-2.5 items-center">
          {s.map((f) => {
            const b =
              f.id === "all"
                ? n.length
                : n.filter((y) => y.dataIndustry === f.id).length;
            return (
              <button
                key={f.id}
                id={`filter-pill-${f.id}`}
                onClick={() => x(f.id)}
                data-industry={f.id}
                className={`px-4 py-2 rounded-full text-[13px] sm:text-sm font-semibold transition-all flex items-center gap-2 ${d === f.id ? "bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] shadow-sm" : "bg-[color:var(--card)] text-[color:var(--ink-soft)] border border-[color:var(--card-border)] hover:bg-[color:var(--tint)]"}`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[13px] px-1.5 py-0.5 rounded-full ${d === f.id ? "bg-[color:var(--btn-dark)] text-[color:var(--on-dark)]" : "bg-[color:var(--tint)] text-[color:var(--ink-soft)]"}`}
                >
                  {b}
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        {p.length === 0 ? (
          <div className="bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-12 text-center max-w-md mx-auto my-8">
            <p className="text-[color:var(--ink-soft)] text-base">
              У цій галузі наразі немає опублікованих кейсів. Спробуйте інший
              фільтр або створіть новий кейс в адмін-панелі.
            </p>
            <button
              onClick={() => x("all")}
              className="mt-4 px-4 py-2 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-[13px] font-semibold"
            >
              Скинути фільтр
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {p.map((f) => (
              <CaseCard
                key={f.id}
                item={f}
                onSelect={o}
                idPrefix="home-case-card-l"
              />
            ))}
          </div>
        )}
      </section>
      <section className="mt-28 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="rounded-3xl bg-[color:var(--card)] text-[color:var(--ink)] p-8 sm:p-14 border border-[color:var(--card-border)] text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
              Подібний результат для вашого бізнесу
            </span>
            <h2 className="pb-h2 text-3xl sm:text-4xl font-extrabold text-[color:var(--ink)] sm:tracking-tight">
              Бажаєте систематизувати свій відділ продажів?
            </h2>
            <p className="text-[color:var(--muted)] text-base sm:text-base leading-relaxed">
              Розкажіть про свої задачі. Ми підберемо відповідні технології та
              покажемо, як саме вирішувалися аналогічні виклики у вашій ніші.
            </p>
            <div className="pt-3">
              <button
                id="cases-cta-lead"
                onClick={() => i("Сторінка списку кейсів")}
                className="px-8 py-4 rounded-full bg-[color:var(--lime)] text-[color:var(--ink)] font-bold text-sm hover:bg-[color:var(--lime)] active:scale-98 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>Залишити заявку на розбір</span>
                <ArrowRight className="w-4 h-4 text-[color:var(--ink)]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
