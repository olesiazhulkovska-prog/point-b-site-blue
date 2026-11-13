// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import {
  Building2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { LeadForm } from "../components/LeadForm";

export const ContactPage = () => {
  const { contactInfo: n } = useSite();
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] pb-20">
      <section className="bg-[color:var(--card)] border-b border-[color:var(--card-border)] py-24 md:py-32">
        <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[color:var(--tint)] text-[color:var(--ink)] border border-[color:var(--card-border)]">
              Зв'язок з Point B
            </span>
            <h1 className="pb-h2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] sm:tracking-tight leading-tight">
              Контакти та обговорення проєкту
            </h1>
            <p className="text-base sm:text-lg text-[color:var(--ink-soft)] leading-relaxed font-normal pt-1">
              Ми завжди на зв’язку. Зателефонуйте нам, напишіть у месенджер або
              заповніть форму зворотного зв’язку — провідний експерт зв’яжеться
              з вами протягом 30 хвилин.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <div className="bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-4">
                Прямі канали комунікації
              </h2>
              <div className="space-y-5 pt-4">
                {(n.channels || []).map((s, o) => {
                  let i = <Phone className="w-5 h-5" />,
                    d =
                      "bg-[color:var(--tint)] text-[color:var(--accent-green)]",
                    x = null,
                    p;
                  const f =
                      s.type === "phone" || /телефон|phone/i.test(s.label),
                    b = s.type === "email" || /email|пошта/i.test(s.label),
                    y = s.type === "telegram" || /telegram|тг/i.test(s.label),
                    j =
                      s.type === "whatsapp" || /whatsapp|вотсап/i.test(s.label),
                    h = s.type === "viber" || /viber|вайбер/i.test(s.label),
                    A = s.type === "hours" || /графік|годин/i.test(s.label);
                  return (
                    f
                      ? ((i = <Phone className="w-5 h-5" />),
                        (d =
                          "bg-[color:var(--tint)] text-[color:var(--accent-green)]"),
                        (x = `tel:${s.value.replace(/[^0-9+]/g, "")}`))
                      : b
                        ? ((i = <Mail className="w-5 h-5" />),
                          (d = "bg-[#F4F7FF] text-[#1111a1]"),
                          (x = `mailto:${s.value}`))
                        : y
                          ? ((i = <Send className="w-5 h-5" />),
                            (d = "bg-[#F4F7FF] text-[#1111a1]"),
                            (x = s.value.startsWith("http")
                              ? s.value
                              : `https://t.me/${s.value.replace("@", "")}`),
                            (p = "_blank"))
                          : j
                            ? ((i = <Phone className="w-5 h-5" />),
                              (d = "bg-[#F4F7FF] text-[#1111a1]"),
                              (x = `https://wa.me/${s.value.replace(/[^0-9]/g, "")}`),
                              (p = "_blank"))
                            : h
                              ? ((i = <Phone className="w-5 h-5" />),
                                (d = "bg-[#F4F7FF] text-[#1111a1]"),
                                (x = `viber://chat?number=${s.value.replace(/[^0-9]/g, "")}`))
                              : A
                                ? ((i = <Clock className="w-5 h-5" />),
                                  (d =
                                    "bg-[color:var(--tint)] text-[color:var(--ink-soft)]"))
                                : ((i = <Sparkles className="w-5 h-5" />),
                                  (d =
                                    "bg-[color:var(--tint)] text-[color:var(--ink-soft)]"),
                                  s.value.startsWith("http") &&
                                    ((x = s.value), (p = "_blank"))),
                    (
                      <div
                        key={s.id || `ch-${o}`}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl ${d} flex items-center justify-center shrink-0 mt-0.5`}
                        >
                          {i}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-semibold text-[color:var(--muted)] uppercase tracking-wider">
                            {s.label}
                          </div>
                          {x ? (
                            <a
                              href={x}
                              target={p}
                              rel={p ? "noopener noreferrer" : undefined}
                              className="text-base font-bold text-[color:var(--ink)] hover:text-[color:var(--accent-green)] transition-colors break-all mt-0.5 inline-block"
                            >
                              {s.value}
                            </a>
                          ) : (
                            <div className="text-base font-bold text-[color:var(--ink)] break-words mt-0.5">
                              {s.value}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-7 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[color:var(--ink)] border-b border-[color:var(--card-border)] pb-4">
                <div className="w-8 h-8 rounded-lg bg-[color:var(--tint)] text-[color:var(--ink-soft)] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="uppercase tracking-wider text-[13px] font-bold text-[color:var(--ink)]">
                  Юридичні реквізити
                </h2>
              </div>
              <div className="space-y-4 pt-5">
                {(n.requisites || []).map((s, o) => {
                  const i = /адрес/i.test(s.label),
                    d = /єдрпоу|код|iban/i.test(s.label);
                  return (
                    <div
                      key={s.id || `req-${o}`}
                      className="text-[13px] sm:text-sm text-[color:var(--ink-soft)] pb-3 border-b border-[color:var(--card-border)] last:border-b-0 last:pb-0"
                    >
                      {i ? (
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[color:var(--muted)] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[13px] font-semibold text-[color:var(--muted)] uppercase tracking-wider block mb-0.5">
                              {s.label}
                            </span>
                            <span className="font-semibold text-[color:var(--ink)] leading-relaxed block">
                              {s.value}
                            </span>
                          </div>
                        </div>
                      ) : d ? (
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <span className="text-[color:var(--muted)] font-medium">
                            {s.label}:
                          </span>
                          <span className="font-bold text-[color:var(--ink)] font-mono sm:tracking-tight sm:text-right select-all">
                            {s.value}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <span className="text-[color:var(--muted)] font-medium">
                            {s.label}:
                          </span>
                          <span className="font-bold text-[color:var(--ink)] sm:text-right">
                            {s.value}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)] flex items-center gap-3 text-[13px] text-[color:var(--ink-soft)]">
              <ShieldCheck className="w-4 h-4 text-[color:var(--accent-green)] shrink-0" />
              <span>
                Офіційна співпраця за договором та безготівковий розрахунок на
                рахунок IBAN.
              </span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <LeadForm
            defaultService="Комплексна автоматизація"
            sourcePage="contact.html"
          />
        </div>
      </section>
    </div>
  );
};
