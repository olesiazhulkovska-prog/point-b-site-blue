// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { ArrowRight, CircleCheck, House } from "lucide-react";
import { useSite } from "../context/SiteContext";

export const ThankYouPage = () => {
  const { navigateTo: n, contactInfo: s } = useSite();
  return (
    <div className="bg-[color:var(--card)] min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--tint)] selection:text-[color:var(--ink)] flex flex-col justify-center py-20 px-4">
      <div className="max-w-2xl mx-auto w-full bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-8 sm:p-12 shadow-sm text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-[color:var(--tint)] text-[color:var(--accent-green)] flex items-center justify-center mx-auto shadow-xs">
          <CircleCheck className="w-10 h-10" />
        </div>
        <div className="space-y-3">
          <span className="text-[13px] font-bold uppercase tracking-widest text-[color:var(--accent-green)]">
            Заявку успішно прийнято
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[color:var(--ink)] sm:tracking-tight">
            Дякуємо за звернення до Point B!
          </h1>
          <p className="text-[color:var(--ink-soft)] text-base sm:text-base leading-relaxed max-w-lg mx-auto">
            Ваш запит зареєстровано в системі. Провідний бізнес-аналітик уже
            вивчає деталі вашого проєкту.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-[color:var(--card)] border border-[color:var(--card-border)] text-left space-y-4">
          <div className="text-[13px] font-bold uppercase tracking-wider text-[color:var(--ink-soft)]">
            Подальші кроки:
          </div>
          <div className="space-y-3 text-[13px] sm:text-sm text-[color:var(--ink)]">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[color:var(--tint)] text-[color:var(--accent-green)] flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5">
                1
              </div>
              <p className="leading-snug">
                <strong>Дзвінок або повідомлення в Telegram:</strong>
                {" зв’яжемося з вами протягом 15–30 хвилин у робочий час."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[color:var(--tint)] text-[color:var(--accent-green)] flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5">
                2
              </div>
              <p className="leading-snug">
                <strong>Експрес-діагностика:</strong>
                {
                  " уточнимо поточну кількість замовлень, канали продажів та складність інтеграцій."
                }
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[color:var(--tint)] text-[color:var(--accent-green)] flex items-center justify-center font-bold text-[13px] shrink-0 mt-0.5">
                3
              </div>
              <p className="leading-snug">
                <strong>План та кошторис:</strong>
                {
                  " надішлемо персональну дорожню карту впровадження з фіксованою вартістю та термінами."
                }
              </p>
            </div>
          </div>
        </div>
        <div className="text-[13px] text-[color:var(--ink-soft)]">
          Потрібна термінова відповідь? Напишіть напряму в Telegram:{" "}
          <a
            href={`https://t.me/${s.telegram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--ink)] font-bold underline hover:text-[#A84300]"
          >
            {s.telegram}
          </a>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="thank-you-home-btn"
            onClick={() => n("index")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] font-semibold text-[13px] hover:bg-[color:var(--btn-dark-hover)] transition-all flex items-center justify-center gap-2"
          >
            <House className="w-4 h-4" />
            <span>На головну сторінку</span>
          </button>
          <button
            id="thank-you-cases-btn"
            onClick={() => n("cases")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[color:var(--card-border)] text-[color:var(--ink)] font-semibold text-[13px] hover:bg-[color:var(--tint)] transition-all flex items-center justify-center gap-2"
          >
            <span>Читати наші кейси</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
