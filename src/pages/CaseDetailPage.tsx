// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CircleCheck,
  Clock,
  ExternalLink,
  Globe,
  Instagram,
  MapPin,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { ReviewCard } from "../components/ReviewCard";
import { LeadForm } from "../components/LeadForm";
import { HOME_REVIEWS } from "../data/homeReviews";

export const Ra = (n) =>
  n
    ? n
        .replace(/\bKeyCRM\b/g, "keyCRM")
        .replace(/\bКЕЙ СРМ\b/g, "кей СРМ")
        .replace(/\bКейCRM\b/g, "кейCRM")
        .replace(/\bКЕЙCRM\b/g, "кейCRM")
        .replace(/\bКей СРМ\b/g, "кей СРМ")
        .replace(/\bKey CRM\b/gi, "key CRM")
    : "";


const caseMetric = (t) => {
  const m = t.match(/(\$\s?\d+[.,]?\d*|×\s?\d+[.,]?\d*|[−\-–]\s?\d+\s?%|\d+[.,]?\d*\+?\s?(?:%|год\S*|хв|днів|дні|день|міс\S*))/i);
  if (!m) {
    const k = t.indexOf(" = ");
    return k > 0 ? { h: t.slice(0, k).trim(), l: t.slice(k + 3).trim() } : null;
  }
  const s = t.trim(), v = m[1];
  if (s.endsWith(v)) return { n: v, l: s.slice(0, s.length - v.length).replace(/[\s=:—-]+$/, "") };
  if (s.startsWith(v)) return { n: v, l: s.slice(v.length).replace(/^[\s=:—-]+/, "") };
  return null;
};

export const CaseDetailPage = ({ slug: n }) => {
  var x;
  const { cases: s, navigateTo: o, openLeadModal: i } = useSite(),
    d = s.find(
      (p) =>
        p.slug === n ||
        p.id === n ||
        p.slug === `case-${n}` ||
        p.id === `case-${n}`,
    );
  const [tabsHidden, setTabsHidden] = useState(false);
  useEffect(() => {
    let ly = window.scrollY;
    const f = () => {
      const y = window.scrollY, dy = y - ly;
      if (Math.abs(dy) > 6) {
        setTabsHidden(dy > 0 && y > 160);
        ly = y;
      }
    };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return d ? (
    <div className="pb-cases-page pb-case-page bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] pb-20">
      <div data-hidden={tabsHidden ? "1" : "0"} className="pb-case-tabs bg-[color:var(--card)] border-b border-[color:var(--card-border)] sticky top-20 z-30 shadow-2xs">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            id="case-back-to-list-btn"
            onClick={() => o("cases")}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Усі кейси</span>
          </button>
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <span className="text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider mr-1 hidden sm:inline">
              Кейси:
            </span>
            {s.map((p) => {
              const f = p.id === d.id || p.slug === d.slug;
              return (
                <button
                  key={p.id}
                  id={`case-switch-btn-${p.slug}`}
                  onClick={() => o(p.slug)}
                  className={`px-3 py-1 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap ${f ? "bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] shadow-xs" : "bg-[color:var(--tint)] text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:bg-[color:var(--tint)]"}`}
                >
                  {p.companyName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <section className="pb-case-hero pb-band--arch">
        {d.coverImageUrl && (
          <div className="pb-case-hero-bg" aria-hidden="true">
            <img src={d.coverImageUrl} alt="" referrerPolicy="no-referrer" />
            <div className="pb-case-hero-shade" />
          </div>
        )}
        <div className="pb-wrap pb-case-hero-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--ink)] border border-[color:var(--card-border)]">
              {d.heroSphereTag}
            </div>
            <div className="flex items-center gap-2">
              {d.websiteUrl && (
                <a
                  href={d.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-[color:var(--ink-soft)] bg-[color:var(--tint)] hover:bg-[color:var(--accent-green)] hover:text-[color:var(--on-dark)] transition-all border border-[color:var(--card-border)] shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-[color:var(--accent-green)] group-hover/link:text-[color:var(--ink)] transition-colors" />
                  <span>Вебсайт компанії</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
              {d.instagramUrl && (
                <a
                  href={d.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-[color:var(--ink-soft)] bg-[color:var(--tint)] hover:bg-pink-600 hover:text-[color:var(--ink)] transition-all border border-[color:var(--card-border)] shadow-2xs"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600 group-hover/link:text-[color:var(--ink)] transition-colors" />
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              )}
            </div>
          </div>
          <h1 className="pb-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
            {Ra(d.companyName)}
          </h1>
          <p className="text-base sm:text-lg text-[color:var(--ink-soft)] leading-relaxed max-w-3xl">
            {Ra(d.companyDescription)}
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider mb-1">
                <Briefcase className="w-3.5 h-3.5 text-[color:var(--ink-soft)]" />
                <span>Сфера</span>
              </div>
              <div className="text-base font-bold text-[color:var(--ink)] leading-snug">
                {d.metadata.sphere}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5 text-[color:var(--ink-soft)]" />
                <span>Співробітники</span>
              </div>
              <div className="text-base font-bold text-[color:var(--ink)] leading-snug">
                {d.metadata.employees}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[color:var(--ink-soft)]" />
                <span>Географія</span>
              </div>
              <div className="text-base font-bold text-[color:var(--ink)] leading-snug">
                {d.metadata.geography}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[color:var(--card)] border border-[color:var(--card-border)]">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--ink-soft)] uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5 text-[color:var(--ink-soft)]" />
                <span>Час впровадження</span>
              </div>
              <div className="text-base font-bold text-[color:var(--ink)] leading-snug">
                {d.metadata.implementationTime}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="pb-case-main">
        {((d.hasClientRequest && d.clientRequestItems && d.clientRequestItems.length > 0) ||
          (d.hasSituationBefore && d.situationBeforeItems && d.situationBeforeItems.length > 0)) && (
          <section className="pb-band pb-band-white"><div className="pb-wrap"><div className="pb-case-row">
            {d.hasSituationBefore && d.situationBeforeItems && d.situationBeforeItems.length > 0 && (
              <div id="section-situation-before" className="pb-case-card pb-case-before rounded-2xl border p-8 sm:p-10">
                <span className="text-[13px] font-bold uppercase tracking-widest block">Було</span>
                <h3 className="pb-case-card-t">Ситуація до впровадження</h3>
                <ul className="space-y-3.5">
                  {d.situationBeforeItems.map((p, f) => (
                    <li key={f} className="flex items-start gap-3.5 text-base text-[color:var(--ink)]">
                      <span className="pb-case-dot w-2 h-2 rounded-full mt-2 shrink-0" />
                      <span className="leading-relaxed">{Ra(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {d.hasClientRequest && d.clientRequestItems && d.clientRequestItems.length > 0 && (
              <div id="section-client-request" className="pb-case-card rounded-2xl border p-8 sm:p-10">
                <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)] block">Запит клієнта</span>
                <h3 className="pb-case-card-t">Що потрібно було зробити</h3>
                <ul className="space-y-3.5">
                  {d.clientRequestItems.map((p, f) => (
                    <li key={f} className="flex items-start gap-3.5 text-base text-[color:var(--ink)]">
                      <div className="w-5 h-5 rounded-full bg-[color:var(--tint)] text-[color:var(--accent-green)] flex items-center justify-center shrink-0 mt-0.5">
                        <CircleCheck className="w-4 h-4" />
                      </div>
                      <span className="leading-relaxed">{Ra(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div></div></section>
        )}
        <section id="section-what-we-did" className="pb-band pb-band-grad"><div className="pb-wrap">
          <div className="mb-8">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">Реалізація</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[color:var(--ink)] mt-1">Що ми зробили</h2>
          </div>
          <div className="pb-case-stepgrid">
            {d.whatWeDidSteps.map((p, f) => (
              <div key={f} className="flex items-start gap-4">
                <div className="pb-case-steps-n w-9 h-9 rounded-lg bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] flex items-center justify-center font-bold text-[14px] shrink-0">
                  {f + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[color:var(--ink)]">{Ra(p.title)}</h3>
                  <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">{Ra(p.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div></section>
        <section id="section-result" className="pb-band pb-band-white">
          <div className="pb-wrap">
            <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">Стало</span>
            <h2 className="pb-h2 text-3xl sm:text-4xl font-extrabold text-[color:var(--ink)] mt-1 sm:tracking-tight">
              Результати впровадження
            </h2>
            {d.resultIntro && (
              <div className="pb-case-intro">{Ra(d.resultIntro)}</div>
            )}
            {d.businessValues && d.businessValues.length > 0 && (
              <div className="pb-case-metrics">
                {d.businessValues.map((p, f) => {
                  const m = caseMetric(Ra(p));
                  return (
                    <div key={f} className="pb-case-metric">
                      {m && m.h ? (
                        <>
                          <div className="pb-case-metric-h">{m.h}</div>
                          <div className="pb-case-metric-l">{m.l}</div>
                        </>
                      ) : m ? (
                        <>
                          <div className="pb-case-metric-n">{m.n}</div>
                          <div className="pb-case-metric-l">{m.l}</div>
                        </>
                      ) : (
                        <div className="pb-case-metric-t">{Ra(p)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="pb-case-resgrid">
              {d.resultItems.map((p, f) => (
                <div key={f} className="pb-case-res p-5 rounded-2xl border flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--lime)] border border-[color:var(--accent-green)] flex items-center justify-center shrink-0 mt-0.5">
                    <CircleCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base text-[color:var(--ink)] leading-relaxed font-medium">{Ra(p)}</span>
                </div>
              ))}
            </div>
            {(() => {
              const own = d.clientQuote && d.clientQuote.text && !/Тут буде відгук/i.test(d.clientQuote.text) ? d.clientQuote : null;
              const nm = (d.companyName || "").toLowerCase();
              const home = own ? null : HOME_REVIEWS.find((r) => nm && r.role.toLowerCase().includes(nm));
              const r = own || home;
              return r ? (
                <div className="mt-8 pb-case-review">
                  <ReviewCard review={{ ...r, text: Ra(r.text) }} />
                </div>
              ) : null;
            })()}
            <div id="section-mid-cta" className="pb-case-cta">
              <div className="space-y-1.5 max-w-2xl">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[color:var(--ink)]">Такий результат — і для вашого бізнесу</h3>
                <p className="text-base text-[color:var(--ink-soft)] leading-relaxed">
                  Розкажіть про свої задачі, і ми покажемо, як це буде у вашій ніші.
                </p>
              </div>
              <button
                id="case-mid-cta-btn"
                onClick={() => i(`Хочу так само, як у кейсі: ${d.companyName}`)}
                className="pb-case-cta-btn cursor-pointer"
              >
                <span>Хочу так само</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
        <section className="pb-band pb-band-navy"><div className="pb-wrap pb-case-end">
        <section id="section-systems-cta" className="pb-case-stack">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">Технологічний стек</span>
          <h3 className="text-xl font-bold text-[color:var(--ink)] mt-1 mb-4">Системи, які інтегрували</h3>
          <div className="flex flex-wrap gap-2.5">
            {d.integratedSystems.map((p, f) => (
              <span key={f} className="pb-case-chip">
                {p.replace(/\bKeyCRM\b/g, "keyCRM").replace(/\bКЕЙ СРМ\b/g, "кей СРМ")}
              </span>
            ))}
          </div>
        </section>
        <section id="case-skalar-form-section">
          <LeadForm
            title="Заявка на консультацію"
            defaultService={d.serviceType || "Впровадження keyCRM"}
            sourcePage={`case-${d.slug}`}
          />
        </section>
        {s.filter((p) => p.id !== d.id).length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
                  Більше досвіду
                </span>
                <h3 className="text-2xl font-bold text-[color:var(--ink)] mt-0.5">
                  Інші кейси впровадження
                </h3>
              </div>
              <button
                onClick={() => o("cases")}
                className="text-[13px] font-semibold text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] flex items-center gap-1"
              >
                <span>Каталог</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {s
                .filter((p) => p.id !== d.id)
                .slice(0, 3)
                .map((p) => (
                  <div
                    key={p.id}
                    onClick={() => o(p.slug)}
                    className="p-5 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)] hover:border-[color:var(--card-border)] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-[13px] font-semibold text-[color:var(--ink-soft)] mb-2">
                        {p.industryTag}
                      </div>
                      <h4 className="text-base font-bold text-[color:var(--ink)] group-hover:text-[color:var(--accent-green)] transition-colors mb-2">
                        {p.companyName}
                      </h4>
                      <div className="text-lg font-extrabold text-[color:var(--accent-green)]">
                        {p.shortResultMetric}
                      </div>
                      <div className="text-[13px] text-[color:var(--ink-soft)] mt-0.5 line-clamp-1">
                        {p.shortResultCaption}
                      </div>
                    </div>
                    <div className="pt-4 mt-3 border-t border-[color:var(--card-border)] flex items-center justify-between text-[13px] font-semibold text-[color:var(--ink-soft)] group-hover:text-[color:var(--accent-green)]">
                      <span>Переглянути</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
        </div></section>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-[color:var(--card)] flex items-center justify-center p-6 text-center">
      <div className="bg-[color:var(--card)] p-10 rounded-3xl border border-[color:var(--card-border)] shadow-sm max-w-md">
        <h2 className="text-xl font-bold text-[color:var(--ink)] mb-2">
          Кейс не знайдено
        </h2>
        <p className="text-base text-[color:var(--ink-soft)] mb-6">
          Запитаний матеріал відсутній або був переміщений.
        </p>
        <button
          onClick={() => o("cases")}
          className="px-5 py-2.5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-sm font-semibold hover:bg-[color:var(--btn-dark-hover)]"
        >
          Повернутися до списку кейсів
        </button>
      </div>
    </div>
  );
};
