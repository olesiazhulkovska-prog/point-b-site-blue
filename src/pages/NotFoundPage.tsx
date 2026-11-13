// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { Briefcase, House, Layers } from "lucide-react";
import { useSite } from "../context/SiteContext";

export const NotFoundPage = () => {
  const { navigateTo: n } = useSite();
  return (
    <div className="bg-[color:var(--card)] min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-[color:var(--card)] rounded-3xl border border-[color:var(--card-border)] p-8 sm:p-10 shadow-xs text-center space-y-6">
        <div className="text-6xl font-black text-[color:var(--ink)] sm:tracking-tight">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[color:var(--ink)]">
            Сторінку не знайдено
          </h1>
          <p className="text-base sm:text-base text-[color:var(--ink-soft)] leading-relaxed">
            Сторінка, яку ви шукаєте, була видалена, перейменована або тимчасово
            недоступна.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2.5">
          <button
            onClick={() => n("index")}
            className="w-full py-3 rounded-xl bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-[13px] font-semibold hover:bg-[color:var(--btn-dark-hover)] flex items-center justify-center gap-2"
          >
            <House className="w-4 h-4" />
            <span>Повернутись на головну</span>
          </button>
          <button
            onClick={() => n("cases")}
            className="w-full py-3 rounded-xl border border-[color:var(--card-border)] text-[color:var(--ink)] text-[13px] font-semibold hover:bg-[color:var(--card)] flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>Переглянути всі кейси</span>
          </button>
          <button
            onClick={() => n("keycrm")}
            className="w-full py-3 rounded-xl border border-[color:var(--card-border)] text-[color:var(--ink)] text-[13px] font-semibold hover:bg-[color:var(--card)] flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Послуги з впровадження CRM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
