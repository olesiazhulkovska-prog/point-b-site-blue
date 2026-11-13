// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { Cookie, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const CookieBanner = () => {
  const {
      navigateTo: n,
      currentPage: s
    } = useSite(),
    [o, i] = React.useState(false);
  React.useEffect(() => {
    try {
      if (!localStorage.getItem("point_b_cookie_consent")) {
        const f = setTimeout(() => i(true), 1200);
        return () => clearTimeout(f);
      }
    } catch {}
  }, []);
  const d = () => {
      try {
        localStorage.setItem("point_b_cookie_consent", "accepted");
      } catch {}
      i(false);
    },
    x = () => {
      try {
        localStorage.setItem("point_b_cookie_consent", "essential");
      } catch {}
      i(false);
    };
  return !o || s === "admin" ? null : <div id="cookie-consent-banner" className="fixed bottom-[104px] md:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[color:var(--card)] backdrop-blur-md rounded-2xl border border-[color:var(--card-border)] shadow-xl p-3 md:p-4 text-[color:var(--ink)] animate-in fade-in slide-in-from-bottom-5 duration-300"><div className="md:hidden -m-1 flex flex-col gap-2"><p className="text-[14px] leading-snug text-[color:var(--ink-soft)]">Використовуємо cookies для роботи сайту й аналітики.{" "}<button id="cookie-privacy-link-btn-m" onClick={() => {
          n("privacy"), i(false);
        }} className="text-[color:var(--accent-green)] font-semibold underline">Політика конфіденційності</button></p><div className="flex items-center gap-2"><button id="cookie-accept-all-btn-m" onClick={d} className="flex-1 min-h-[40px] rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-[14px] font-semibold">Прийняти всі</button><button id="cookie-essential-only-btn-m" onClick={x} className="flex-1 min-h-[40px] rounded-full bg-[color:var(--tint)] text-[color:var(--ink-soft)] text-[14px] font-medium">Лише необхідні</button></div></div><div className="hidden md:flex items-start gap-3"><div className="p-2 rounded-xl bg-[color:var(--tint)] text-[color:var(--ink-soft)] shrink-0 mt-0.5"><Cookie className="w-5 h-5 text-[color:var(--accent-green)]" /></div><div className="space-y-2 flex-1"><div className="flex items-center justify-between"><h4 role="heading" aria-level={2} className="text-[14px] font-bold text-[color:var(--ink)] uppercase tracking-wider">Файли Cookie та приватність</h4><button id="cookie-close-x-btn" onClick={x} className="text-[color:var(--muted)] hover:text-[color:var(--ink-soft)] p-3.5 -m-3" aria-label="Закрити"><X className="w-4 h-4" /></button></div><p className="text-base text-[color:var(--ink-soft)] leading-relaxed">Ми використовуємо обов’язкові та аналітичні cookies для зручної роботи сайту та покращення сервісу. Детальніше — у нашій{" "}<button id="cookie-privacy-link-btn" onClick={() => {
            n("privacy"), i(false);
          }} className="text-[color:var(--accent-green)] font-semibold underline hover:text-[color:var(--ink)]">Політиці конфіденційності</button>.</p><div className="flex items-center gap-2 pt-1"><button id="cookie-accept-all-btn" onClick={d} className="px-4 py-3 rounded-full bg-[color:var(--btn-dark)] text-[color:var(--on-dark)] text-[14px] font-semibold hover:bg-[color:var(--btn-dark-hover)] transition-colors shadow-2xs">Прийняти всі</button><button id="cookie-essential-only-btn" onClick={x} className="px-4 py-3 rounded-full bg-[color:var(--tint)] text-[color:var(--ink-soft)] text-[14px] font-medium hover:bg-[color:var(--tint)] transition-colors">Лише необхідні</button></div></div></div></div>;
};

