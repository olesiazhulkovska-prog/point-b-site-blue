// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from 'react/jsx-runtime';
import React from 'react';
import { Bot, Briefcase, ChevronRight, CodeXml, House, Layers, MessageSquarePlus, Phone, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const MobileTabBar = () => {
  const {
      currentPage: n,
      navigateTo: s,
      openLeadModal: o
    } = useSite(),
    i = ["keycrm", "ai-bots", "analytics"].includes(n),
    d = n === "cases" || n === "case-detail",
    x = () => {
      n === "index" ? window.scrollTo({
        top: 0,
        behavior: "smooth"
      }) : s("index");
    },
    [p, f] = React.useState(false),
    [b, y] = React.useState(false),
    j = React.useRef(0);
  React.useEffect(() => {
    const H = () => {
      const F = window.scrollY,
        C = F - j.current;
      if (F < 60) {
        y(false), j.current = F;
        return;
      }
      Math.abs(C) < 10 || (y(C > 0), j.current = F);
    };
    return window.addEventListener("scroll", H, {
      passive: true
    }), () => window.removeEventListener("scroll", H);
  }, []), React.useEffect(() => {
    y(false);
  }, [n]);
  const h = b && !p;
  React.useEffect(() => {
    f(false);
  }, [n]), React.useEffect(() => {
    if (!p) return;
    const H = F => F.key === "Escape" && f(false);
    return window.addEventListener("keydown", H), () => window.removeEventListener("keydown", H);
  }, [p]);
  const A = H => {
      f(false), s(H);
    },
    U = () => {
      f(false);
      const H = () => {
        var F;
        return (F = document.getElementById("services-section")) == null ? undefined : F.scrollIntoView({
          behavior: "smooth"
        });
      };
      n === "index" ? H() : (s("index"), setTimeout(H, 450));
    },
    v = [{
      id: "keycrm",
      title: "Впровадження keyCRM",
      hint: "Продажі, склад і фінанси в одній системі",
      icon: <Layers className="w-5 h-5" />
    }, {
      id: "ai-bots",
      title: "Боти та AI-автоматизація",
      hint: "Відповідають клієнтам 24/7",
      icon: <Bot className="w-5 h-5" />
    }, {
      id: "analytics",
      title: "Власна CRM-система",
      hint: "Під ваші процеси та звіти",
      icon: <CodeXml className="w-5 h-5" />
    }],
    w = () => f(H => !H),
    k = () => {
      n === "index" ? window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      }) : s("contact");
    },
    R = ({
      id: H,
      label: F,
      active: C,
      onClick: ee,
      icon: B
    }) => <button id={H} onClick={ee} aria-label={F} aria-current={C ? "page" : undefined} className={`relative flex-1 min-w-0 flex flex-col items-center justify-center font-manrope active:scale-95 transition-all duration-300 ${h ? "gap-0 pt-3 pb-3" : "gap-1 pt-2 pb-1.5"}`}><span className={`transition-colors ${C ? "text-[color:var(--accent-green)]" : "text-[color:var(--ink)]/70"}`}>{B}</span><span className={`max-[359px]:hidden text-[14px] leading-none font-semibold transition-all duration-300 overflow-hidden ${h ? "max-h-0 opacity-0" : "max-h-5 opacity-100"} ${C ? "text-[color:var(--accent-green)]" : "text-[color:var(--ink)]/70"}`}>{F}</span><span aria-hidden="true" className={`absolute top-0.5 w-1.5 h-1.5 rounded-full bg-[color:var(--peach)] transition-opacity ${C ? "opacity-100" : "opacity-0"}`} /></button>;
  return <l.Fragment>{p && <div className="md:hidden fixed inset-0 z-[39]" role="dialog" aria-label="Послуги"><button aria-label="Закрити" onClick={() => f(false)} className="absolute inset-0 w-full h-full bg-[color:var(--card)] animate-in fade-in duration-200" /><div className="absolute inset-x-3 rounded-[26px] border border-[color:var(--line)] p-3 animate-in slide-in-from-bottom-6 fade-in duration-250" style={{
        bottom: "calc(max(10px, env(safe-area-inset-bottom)) + 84px)",
        background: "var(--surface)"
      }}><div className="flex items-center justify-between px-2 pt-1 pb-2"><span className="text-[14px] font-mono uppercase tracking-wider text-[color:var(--accent-green)]">Оберіть послугу</span><button aria-label="Закрити" onClick={() => f(false)} className="w-8 h-8 grid place-items-center rounded-full bg-[color:var(--card)] text-[color:var(--ink)]"><X className="w-4 h-4" /></button></div><div className="flex flex-col gap-2">{v.map(H => <button key={H.id} id={`sheet-${H.id}`} onClick={() => A(H.id)} className={`flex items-center gap-3 text-left rounded-2xl px-3 py-3 border active:scale-[0.99] transition-transform font-manrope ${n === H.id ? "border-[color:var(--lime)]/70 bg-[color:var(--lime)]/10" : "border-[color:var(--lime)]/25 bg-[color:var(--card)]/[0.06]"}`}><span className="shrink-0 w-10 h-10 rounded-xl grid place-items-center bg-[color:var(--lime)]/15 border border-[color:var(--lime)]/35 text-[color:var(--accent-green)]">{H.icon}</span><span className="min-w-0 flex-1 flex flex-col leading-tight"><span className="text-base font-semibold text-[color:var(--ink)]">{H.title}</span><span className="text-[14px] text-[color:var(--ink)]/75 mt-0.5">{H.hint}</span></span><ChevronRight className="w-5 h-5 shrink-0 text-[color:var(--accent-green)]" /></button>)}</div><button onClick={U} className="mt-2 w-full text-center py-2.5 text-[14px] font-semibold text-[color:var(--accent-green)] font-manrope">Усі послуги на головній ↓</button></div></div>}<nav aria-label="Нижня навігація" className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pointer-events-none" style={{
      paddingBottom: "max(10px, env(safe-area-inset-bottom))"
    }}><div className={`pointer-events-auto relative mx-auto w-full flex items-end rounded-[26px] px-1.5 border border-[color:var(--line)] transition-[max-width] duration-300 ease-out ${h ? "max-w-[290px]" : "max-w-[460px]"}`} style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)"
      }}><R id="tab-home" label="Головна" active={n === "index"} onClick={x} icon={<House className="w-[22px] h-[22px]" />} /><R id="tab-services" label="Послуги" active={i || p} onClick={w} icon={<Layers className="w-[22px] h-[22px]" />} /><div className="flex-1 min-w-0 flex flex-col items-center justify-end transition-all duration-300 pb-1.5"><button id="tab-lead" onClick={() => o("mobile_tabbar")} aria-label="Залишити заявку" className={`pb-circle rounded-full bg-[color:var(--peach)] text-[color:var(--on-orange)] grid place-items-center border-4 border-white active:scale-95 transition-all duration-300 ${h ? "-mt-2 w-[48px] h-[48px]" : "-mt-6 w-[58px] h-[58px]"}`}><MessageSquarePlus className="w-6 h-6" /></button><span className={`max-[359px]:hidden text-[14px] leading-none font-semibold text-[color:var(--accent-green)] font-manrope transition-all duration-300 overflow-hidden ${h ? "max-h-0 opacity-0 mt-0" : "max-h-5 opacity-100 mt-1"}`}>Заявка</span></div><R id="tab-cases" label="Кейси" active={d} onClick={() => s("cases")} icon={<Briefcase className="w-[22px] h-[22px]" />} /><R id="tab-contact" label="Контакти" active={n === "contact"} onClick={k} icon={<Phone className="w-[22px] h-[22px]" />} /></div></nav></l.Fragment>;
};

