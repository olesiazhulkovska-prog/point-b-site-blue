// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from "react/jsx-runtime";
import React from "react";
import { LoaderCircle, Send, X } from "lucide-react";
import { useSite } from "../context/SiteContext";
export const Qk = (n) => {
  const s = n.startsWith("+380");
  let o = s ? n.slice(4).replace(/\D/g, "") : n.replace(/\D/g, "");
  if (!s) {
    if (o.length > 0 && o.length < 3 && "380".startsWith(o)) return "+" + o;
    o.startsWith("380")
      ? (o = o.slice(3))
      : o.startsWith("0") && (o = o.slice(1));
  }
  if (((o = o.slice(0, 9)), !o && !s && !n.replace(/\D/g, ""))) return "";
  let i = "+380";
  return (
    o.length > 0 && (i += " " + o.slice(0, 2)),
    o.length > 2 && (i += " " + o.slice(2, 5)),
    o.length > 5 && (i += " " + o.slice(5, 7)),
    o.length > 7 && (i += " " + o.slice(7, 9)),
    i
  );
};
export const _k = (n) => n.replace(/\D/g, "").length === 12;
export const $k = (n) => /^[\p{L}][\p{L}\s'’.\-]{1,59}$/u.test(n.trim());
export const eq = (n) => !n.trim() || /^@?[A-Za-z0-9_]{5,32}$/.test(n.trim());
export const LeadForm = ({
  defaultService: n,
  sourcePage: s = "contact",
  className: o = "",
  compact: i = false,
  title: d = "Заявка на консультацію",
  subtitle:
    x = "Розкажіть коротко про ваш бізнес і задачу — підготуємо персональний план та розрахуємо орієнтовну вартість.",
  submitButtonText: p = "Отримати план автоматизації",
}) => {
  const { submitLead: f, navigateTo: b, closeLeadModal: y } = useSite(),
    [j, h] = React.useState(""),
    [A, U] = React.useState(""),
    [v, w] = React.useState(""),
    [k, R] = React.useState(""),
    H = React.useMemo(
      () => [
        "Впровадження CRM / ERP-систем",
        "Власна CRM-система",
        "Рішення на базі ботів та AI",
      ],
      [],
    ),
    F = React.useMemo(() => {
      if (n) {
        const Z = n.toLowerCase();
        return Z.includes("ai") || Z.includes("бот") || Z.includes("чат")
          ? "Рішення на базі ботів та AI"
          : Z.includes("власна") ||
              Z.includes("під ваш бізнес") ||
              Z.includes("кастом") ||
              Z.includes("lms") ||
              Z.includes("розроб") ||
              Z.includes("з нуля") ||
              Z.includes("нуля")
            ? "Власна CRM-система"
            : "Впровадження CRM / ERP-систем";
      }
      return "Впровадження CRM / ERP-систем";
    }, [n]),
    [C, ee] = React.useState(F),
    B = ["Товарний", "Послуги", "Виробництво", "Інше"],
    [D, L] = React.useState(""),
    [$, te] = React.useState(""),
    ae = ["1–5 людей", "6–20 людей", "21–50 людей", "50+ людей"],
    [re, me] = React.useState(""),
    Ne = ["< 100 / міс", "100–500 / міс", "500–2 000 / міс", "2 000+ / міс"],
    [ge, _] = React.useState(""),
    [se, ne] = React.useState(""),
    [Se, he] = React.useState(""),
    [Re, G] = React.useState(""),
    [E, S] = React.useState(false),
    [O, I] = React.useState(""),
    X = async (Z) => {
      if ((Z.preventDefault(), I(""), !j.trim())) {
        I("Будь ласка, введіть своє ім’я");
        return;
      }
      if (!$k(j)) {
        I("Ім’я має містити лише літери (від 2 символів)");
        return;
      }
      if (!A.trim()) {
        I("Будь ласка, вкажіть номер телефону для зв’язку");
        return;
      }
      if (!_k(A)) {
        I("Введіть повний номер телефону у форматі +380 XX XXX XX XX");
        return;
      }
      if (!k.trim() || k.trim().length < 2) {
        I("Будь ласка, вкажіть вашу посаду");
        return;
      }
      if (!eq(v)) {
        I(
          "Telegram: введіть ім’я користувача латиницею, наприклад @username (від 5 символів)",
        );
        return;
      }
      if (D === "Інше" && !$.trim()) {
        I("Будь ласка, уточніть сферу діяльності");
        return;
      }
      S(true);
      try {
        const oe = D
            ? D === "Інше"
              ? $.trim()
                ? `Інше: ${$.trim()}`
                : "Інше"
              : D
            : undefined,
          be = Se.trim() || "Запит на первинну консультацію";
        (await f({
          name: j.trim(),
          contact: A.trim(),
          telegram: v.trim() || undefined,
          role: k.trim(),
          service: C,
          industry: oe,
          employeesCount: re || undefined,
          ordersCount: ge || undefined,
          primaryTask: be,
          budget: se.trim() || undefined,
          heardFrom: Re.trim() || undefined,
          sourcePage: s,
        }),
          y && y(),
          setTimeout(() => {
            b("thank-you");
          }, 300));
      } catch {
        (I(
          "Виникла помилка під час відправки. Спробуйте ще раз або напишіть нам у Telegram.",
        ),
          S(false));
      }
    };
  return (
    <div
      className={`w-full max-w-5xl lg:max-w-6xl mx-auto rounded-3xl bg-[color:var(--card)] p-4 sm:p-12 md:p-16 text-[color:var(--ink)] shadow-sm border border-[color:var(--card-border)] transition-all ${o}`}
    >
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[color:var(--ink)] sm:tracking-tight">
          {d}
        </h2>
        {x && (
          <p className="text-base sm:text-base text-[color:var(--ink-soft)] font-normal mt-2.5 max-w-2xl mx-auto leading-relaxed">
            {x}
          </p>
        )}
      </div>
      <form onSubmit={X} className="space-y-10 sm:space-y-14">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14">
            <div className="space-y-1">
              <span className="text-[13px] font-bold text-[color:var(--accent-green)] uppercase tracking-wider block">
                Обов'язково
              </span>
              <input
                id="lead-skalar-name"
                type="text"
                required
                value={j}
                onChange={(Z) => h(Z.target.value)}
                placeholder="Введіть своє ім'я*"
                className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-sm sm:text-base text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[13px] font-bold text-[color:var(--accent-green)] uppercase tracking-wider block">
                Обов'язково
              </span>
              <input
                id="lead-skalar-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={A}
                maxLength={17}
                onChange={(Z) => U(Qk(Z.target.value))}
                placeholder="+380 00 000 00 00*"
                className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-sm sm:text-base text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14">
            <div className="space-y-1">
              <span className="text-[13px] font-bold text-[color:var(--accent-green)] uppercase tracking-wider block">
                Обов'язково
              </span>
              <input
                id="lead-skalar-role"
                type="text"
                required
                value={k}
                onChange={(Z) => R(Z.target.value)}
                placeholder="Ваша посада (напр. СЕО, Власник)*"
                className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-sm sm:text-base text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider block">
                Опційно
              </span>
              <input
                id="lead-skalar-telegram"
                type="text"
                value={v}
                onChange={(Z) => w(Z.target.value)}
                placeholder="Ім’я користувача (@) в Телеграм"
                className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-sm sm:text-base text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-sm sm:text-base font-bold text-[color:var(--ink)] sm:tracking-tight">
            Вибрати напрямок послуги
          </h3>
          <div className="flex justify-center px-1">
            <div className="w-full sm:w-auto max-w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center bg-[color:var(--card)] rounded-2xl sm:rounded-3xl p-2 sm:p-1.5 shadow-[0_4px_20px_rgba(17,17,68,0.06)] border border-[color:var(--card-border)] gap-1.5 sm:gap-1 max-w-md sm:max-w-none">
              {H.map((Z) => {
                const oe = C === Z;
                return (
                  <button
                    key={Z}
                    type="button"
                    onClick={() => ee(Z)}
                    className={`w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-2.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all cursor-pointer text-center leading-snug sm:leading-normal sm:whitespace-nowrap ${oe ? "bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] shadow-xs font-bold" : "bg-transparent text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] hover:bg-[color:var(--tint)]"}`}
                  >
                    {Z}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-center space-y-3 max-w-4xl mx-auto">
          <div
            id="lead-label-industry"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)] py-1 px-2.5"
          >
            <span>Сфера діяльності</span>
            <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
              Необов'язково
            </span>
            {!!D && (
              <span className="text-[13px] font-semibold normal-case text-[color:var(--accent-green)] bg-[color:var(--tint)] px-2.5 py-0.5 rounded-full border border-[color:var(--card-border)]">
                {D === "Інше" ? $.trim() || "Інше" : D}
              </span>
            )}
          </div>
          <div className="pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {B.map((Z) => {
                const oe = D === Z;
                return (
                  <button
                    key={Z}
                    type="button"
                    onClick={() => L((be) => (be === Z ? "" : Z))}
                    className={`rounded-full px-5 py-2 text-[13px] sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer shadow-[0_2px_8px_rgba(17,17,68,0.04)] ${oe ? "bg-white border-2 border-[color:var(--bar)] text-[color:var(--ink)] font-bold shadow-md" : "bg-white border border-[color:var(--card-border)] text-[color:var(--ink-soft)] hover:border-[color:var(--bar)] hover:text-[color:var(--ink)]"}`}
                  >
                    {oe ? (
                      <span className="w-4 h-4 rounded-full bg-[color:var(--lime)] text-[color:var(--ink)] flex items-center justify-center text-[13px] font-bold shrink-0">
                        ✓
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-[color:var(--card-border)] shrink-0" />
                    )}
                    <span>{Z}</span>
                  </button>
                );
              })}
            </div>
            {D === "Інше" && (
              <div className="pt-2 max-w-sm mx-auto animate-in fade-in">
                <input
                  type="text"
                  value={$}
                  onChange={(Z) => te(Z.target.value)}
                  placeholder="Вкажіть вашу сферу діяльності*"
                  className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-1.5 text-[13px] sm:text-sm text-center text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors"
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-14 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div
              id="lead-label-employees"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)] py-1 px-2.5"
            >
              <span>Кількість співробітників</span>
              <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
                Необов'язково
              </span>
              {!!re && (
                <span className="text-[13px] font-semibold normal-case text-[color:var(--accent-green)] bg-[color:var(--tint)] px-2.5 py-0.5 rounded-full border border-[color:var(--card-border)]">
                  {re}
                </span>
              )}
            </div>
            <div className="pt-1 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-wrap items-center justify-center gap-2">
              {ae.map((Z) => {
                const oe = re === Z;
                return (
                  <button
                    key={Z}
                    type="button"
                    onClick={() => me((be) => (be === Z ? "" : Z))}
                    className={`rounded-full px-4 py-2 text-[13px] sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_2px_8px_rgba(17,17,68,0.03)] ${oe ? "bg-[color:var(--card)] border-2 border-[color:var(--lime)] text-[color:var(--ink)] font-bold shadow-xs" : "bg-[color:var(--card)] border border-[color:var(--card-border)] text-[color:var(--ink-soft)] hover:border-[color:var(--card-border)]"}`}
                  >
                    {oe ? (
                      <span className="w-3.5 h-3.5 rounded-full bg-[color:var(--lime)] text-[color:var(--ink)] flex items-center justify-center text-[13px] font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-[color:var(--card-border)]" />
                    )}
                    <span>{Z}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="text-center space-y-3">
            <div
              id="lead-label-orders"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)] py-1 px-2.5"
            >
              <span>Замовлень на місяць</span>
              <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
                Необов'язково
              </span>
              {!!ge && (
                <span className="text-[13px] font-semibold normal-case text-[color:var(--accent-green)] bg-[color:var(--tint)] px-2.5 py-0.5 rounded-full border border-[color:var(--card-border)]">
                  {ge}
                </span>
              )}
            </div>
            <div className="pt-1 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-wrap items-center justify-center gap-2">
              {Ne.map((Z) => {
                const oe = ge === Z;
                return (
                  <button
                    key={Z}
                    type="button"
                    onClick={() => _((be) => (be === Z ? "" : Z))}
                    className={`rounded-full px-4 py-2 text-[13px] sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_2px_8px_rgba(17,17,68,0.03)] ${oe ? "bg-white border-2 border-[color:var(--bar)] text-[color:var(--ink)] font-bold shadow-xs" : "bg-white border border-[color:var(--card-border)] text-[color:var(--ink-soft)] hover:border-[color:var(--bar)]"}`}
                  >
                    {oe ? (
                      <span className="w-3.5 h-3.5 rounded-full bg-[color:var(--lime)] text-[color:var(--ink)] flex items-center justify-center text-[13px] font-bold">
                        ✓
                      </span>
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-[color:var(--card-border)]" />
                    )}
                    <span>{Z}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <div
            id="lead-label-budget"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)] py-1 px-2.5"
          >
            <span>Бюджет, на який розраховуєте</span>
            <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
              Необов'язково
            </span>
            {se.trim() && (
              <span className="text-[13px] font-semibold text-[color:var(--accent-green)] bg-[color:var(--tint)] px-2.5 py-0.5 rounded-full border border-[color:var(--card-border)]">
                {se}
              </span>
            )}
          </div>
          <div className="relative pt-1 max-w-md mx-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <input
              id="lead-skalar-budget"
              type="text"
              value={se}
              onChange={(Z) => ne(Z.target.value)}
              placeholder="Вкажіть орієнтовний бюджет у євро / доларі"
              className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-[13px] sm:text-base placeholder:text-[13px] sm:placeholder:text-base text-center text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors font-medium px-2"
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="text-center">
            <div
              id="lead-label-comment"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)] py-1 px-2.5"
            >
              <span>Коментар до проекту та першочергова задача</span>
              <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
                Необов'язково
              </span>
              {Se.trim() && (
                <span className="text-[13px] font-semibold text-[color:var(--accent-green)] bg-[color:var(--tint)] px-2 py-0.5 rounded-full border border-[color:var(--card-border)]">
                  Заповнено
                </span>
              )}
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <textarea
              id="lead-skalar-comment"
              rows={3}
              value={Se}
              onChange={(Z) => he(Z.target.value)}
              placeholder="Коротко опишіть проект, поточні вузькі місця або задачі, які потрібно автоматизувати..."
              className="w-full bg-[color:var(--card)] border border-[color:var(--card-border)] rounded-xl p-4 text-sm sm:text-base text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] focus:ring-1 focus:ring-[color:var(--card-border)] transition-all shadow-xs leading-relaxed resize-y"
            />
          </div>
        </div>
        <div className="max-w-lg mx-auto space-y-2 text-center">
          <label
            htmlFor="lead-heard-from"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[color:var(--ink)]"
          >
            <span>Звідки ви про нас дізналися?</span>
            <span className="text-[13px] font-medium text-[color:var(--muted)] uppercase tracking-wider">
              Необов'язково
            </span>
          </label>
          <input
            id="lead-heard-from"
            type="text"
            value={Re}
            onChange={(Z) => G(Z.target.value.slice(0, 200))}
            placeholder="Наприклад, порадили «Назва компанії» або промокод партнера"
            className="w-full bg-transparent border-b-2 border-[color:var(--card-border)] pb-2 text-sm sm:text-base text-center text-[color:var(--ink)] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--accent-green)] transition-colors px-2"
          />
        </div>
        {O && (
          <div
            id="lead-form-error"
            role="alert"
            className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 border border-red-200 text-[13px] sm:text-sm text-red-700 font-medium text-center animate-in fade-in"
          >
            {O}
          </div>
        )}
        <div className="pt-4 text-center space-y-3">
          <button
            id="lead-form-submit-btn"
            type="submit"
            disabled={E}
            className="px-10 py-3.5 rounded-full bg-[color:var(--btn-dark)] hover:bg-[color:var(--btn-dark-hover)] text-[color:var(--on-dark)] font-bold text-sm sm:text-base shadow-md transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {E ? (
              <l.Fragment>
                <LoaderCircle className="w-5 h-5 animate-spin text-[color:var(--accent-green)]" />
                <span>Надсилаємо заявку...</span>
              </l.Fragment>
            ) : (
              <l.Fragment>
                <span>{p}</span>
                <Send className="w-4 h-4 text-[color:var(--accent-green)]" />
              </l.Fragment>
            )}
          </button>
          <p className="text-base text-[color:var(--muted)] max-w-md mx-auto leading-relaxed">
            Натискаючи на кнопку «{p}», ви погоджуєтеся на обробку персональних
            даних.
          </p>
        </div>
      </form>
    </div>
  );
};
