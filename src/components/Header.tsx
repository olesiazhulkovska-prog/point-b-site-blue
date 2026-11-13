// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from 'react/jsx-runtime';
import React from 'react';
import { ArrowRight, ArrowUpRight, Bot, Briefcase, ChevronDown, CodeXml, House, Info, Layers, Mail, Menu, Phone, Send, Settings, ShieldCheck, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Logo } from './Logo';

export const Dk = n => true;

export const Header = () => {
  const {
      currentPage: n,
      navigateTo: s,
      openLeadModal: o,
      contactInfo: i
    } = useSite(),
    [d, x] = React.useState(false),
    p = React.useRef(0),
    [f, b] = React.useState(false),
    [y, j] = React.useState(false),
    [h, A] = React.useState(false),
    [U, v] = React.useState(false),
    [w, k] = React.useState(false),
    R = H => n === H;
  return React.useEffect(() => {
    let A0 = 0;
    const H = () => {
      const F = window.scrollY,
        M = document.documentElement.scrollHeight - window.innerHeight;
      if (F < 0 || F > M + 1) return;
      const C = F - p.current;
      if (Math.abs(C) < 1) return;
      if (p.current = F, F <= 120) {
        A0 = 0, x(false);
        return;
      }
      A0 = 0, x(false);
    };
    return window.addEventListener("scroll", H, {
      passive: true
    }), () => window.removeEventListener("scroll", H);
  }, []), React.useEffect(() => {
    k(false), x(false);
  }, [n]), React.useEffect(() => {
    let H = 0;
    const F = () => {
        H = 0, b(Dk()), A(false);
        const B = document.getElementById("hero-dark");
        j(!!B && B.getBoundingClientRect().bottom > 84);
      },
      C = () => {
        H || (H = requestAnimationFrame(F));
      };
    F();
    const ee = window.setTimeout(F, 800);
    return window.addEventListener("scroll", C, {
      passive: true
    }), window.addEventListener("resize", C), () => {
      window.clearTimeout(ee), H && cancelAnimationFrame(H), window.removeEventListener("scroll", C), window.removeEventListener("resize", C);
    };
  }, [n]), <header className={`${n === "index" ? "fixed inset-x-0" : "sticky"} top-0 z-40 border-b transition-[transform,colors,background-color] duration-300 ${n === "index" && y && !w ? "theme-dark pb-hdr-hero bg-transparent border-transparent text-[#F4F7FF]" : "bg-[color:var(--bg-1)] border-[color:var(--line)]"} ${d && !w ? "max-lg:-translate-y-full" : ""}`}><div className={`${n === "index" ? "max-w-none lg:px-[3vw]" : "max-w-[1680px] xl:px-12"} mx-auto px-5 sm:px-6 lg:px-8 h-14 sm:h-20 flex items-center justify-between`}><button id="nav-logo-btn" onClick={() => s("index")} className="flex items-center text-left group focus:outline-none cursor-pointer shrink-0 min-h-11 lg:min-w-[210px]"><span className={`flex flex-col items-start gap-1 transition-all duration-300 ${h ? "lg:rounded-full lg:glass-strong lg:h-12 lg:w-12 lg:items-center lg:justify-center lg:gap-0" : ""}`}><span className="lg:hidden"><Logo className="text-[color:var(--ink)]" /></span><span className="hidden lg:block"><Logo compact={h} className="text-[color:var(--ink)]" /></span><span className={`hidden ${h ? "lg:hidden" : ""} sm:inline-flex items-center gap-1.5 font-manrope text-[9px] font-medium uppercase tracking-[0.1em] leading-none -mt-0.5 text-[color:var(--ink)]/65`}>Офіційний партнер<span className="normal-case tracking-normal font-semibold text-[10px] text-[color:var(--accent-green)]">keyCRM</span></span></span></button><nav aria-label="Основна навігація" className="pb-nav hidden lg:flex items-center gap-1"><button id="nav-home-btn" onClick={() => s("index")} className={`px-4 xl:px-5 py-2 whitespace-nowrap rounded-full text-[15px] font-manrope font-medium transition-colors cursor-pointer ${R("index") ? "pb-nl is-active" : "pb-nl"}`}>Головна</button><div className="relative" onMouseEnter={() => {
          matchMedia("(hover:hover)").matches && v(true);
        }} onMouseLeave={() => {
          matchMedia("(hover:hover)").matches && v(false);
        }}><button id="nav-services-dropdown-btn" onClick={() => v(matchMedia("(hover:hover)").matches ? true : !U)} className={`px-4 xl:px-5 py-2 whitespace-nowrap rounded-full text-[15px] font-manrope font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${["keycrm", "ai-bots", "analytics"].includes(n) ? "pb-nl is-active" : "pb-nl"}`}><span>Послуги</span><ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${U ? "rotate-180 text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"}`} /></button>{U && <div className="absolute top-full left-0 w-80 rounded-2xl shadow-xl p-2.5 mt-1 space-y-1 z-50 before:content-[''] before:absolute before:left-0 before:right-0 before:-top-2 before:h-2 animate-in fade-in slide-in-from-top-2 duration-150 bg-[color:var(--surface)] border border-[color:var(--card-border)]"><button id="dropdown-keycrm-btn" onClick={() => {
              v(false), s("keycrm");
            }} className="w-full text-left p-3 rounded-xl flex items-start gap-3 group transition-colors cursor-pointer hover:bg-[color:var(--tint)]"><div className="p-2 rounded-lg mt-0.5 transition-colors bg-[color:var(--tint)] text-[color:var(--accent-green)] group-hover:bg-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]"><Layers className="w-5 h-5 text-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]" /></div><div><div className="text-sm font-semibold transition-colors text-[color:var(--ink)]">Впровадження keyCRM</div><div className="text-[14px] mt-0.5 text-[color:var(--ink-soft)]">CRM/ERP під ключ, налаштування воронок, склад та логістика</div></div></button><button id="dropdown-aibots-btn" onClick={() => {
              v(false), s("ai-bots");
            }} className="w-full text-left p-3 rounded-xl flex items-start gap-3 group transition-colors cursor-pointer hover:bg-[color:var(--tint)]"><div className="p-2 rounded-lg mt-0.5 transition-colors bg-[color:var(--tint)] text-[color:var(--accent-green)] group-hover:bg-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]"><Bot className="w-5 h-5 text-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]" /></div><div><div className="text-sm font-semibold transition-colors text-[color:var(--ink)]">Боти та AI-автоматизація</div><div className="text-[14px] mt-0.5 text-[color:var(--ink-soft)]">Чат-боти в месенджерах, авто-кваліфікація та AI-асистенти</div></div></button><button id="dropdown-analytics-btn" onClick={() => {
              v(false), s("analytics");
            }} className="w-full text-left p-3 rounded-xl flex items-start gap-3 group transition-colors cursor-pointer hover:bg-[color:var(--tint)]"><div className="p-2 rounded-lg mt-0.5 transition-colors bg-[color:var(--tint)] text-[color:var(--accent-green)] group-hover:bg-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]"><CodeXml className="w-5 h-5 text-[color:var(--accent-green)] group-hover:text-[color:var(--on-dark)]" /></div><div><div className="text-sm font-semibold transition-colors text-[color:var(--ink)]">Власна CRM-система</div><div className="text-[14px] mt-0.5 text-[color:var(--ink-soft)]">Кастомна система під специфічні процеси без обмежень платформ</div></div></button></div>}</div><button id="nav-cases-btn" onClick={() => s("cases")} className={`px-4 xl:px-5 py-2 whitespace-nowrap rounded-full text-[15px] font-manrope font-medium transition-colors cursor-pointer ${n === "cases" || n === "case-detail" ? "pb-nl is-active" : "pb-nl"}`}>Кейси</button><button id="nav-about-btn" onClick={() => s("about")} className={`px-4 xl:px-5 py-2 whitespace-nowrap rounded-full text-[15px] font-manrope font-medium transition-colors cursor-pointer ${R("about") ? "pb-nl is-active" : "pb-nl"}`}>Про компанію</button><button id="nav-contact-btn" onClick={() => s("contact")} className={`px-4 xl:px-5 py-2 whitespace-nowrap rounded-full text-[15px] font-manrope font-medium transition-colors cursor-pointer ${R("contact") ? "pb-nl is-active" : "pb-nl"}`}>Контакти</button></nav><div className="hidden lg:flex items-center gap-3"><button id="header-admin-cms-btn" onClick={() => s("admin")} title="Адмін-панель керування кейсами та контентом" aria-label="Адмінка (CMS)" className={`flex items-center gap-1.5 px-4 py-2.5 text-[15px] font-semibold rounded-full border transition-all cursor-pointer ${R("admin") ? "bg-[color:var(--nav-active-bg)] text-[color:var(--ink)] border-[color:var(--nav-active-border)]" : "glass text-[color:var(--ink)] hover:bg-[rgba(255,255,255,0.85)]"}`}><Settings className="w-4 h-4 text-[color:var(--ink-soft)]" /><span className="hidden xl:inline">CMS</span></button>{n === "index" && y ? <button id="header-lead-modal-btn" onClick={() => o("Загальна консультація")} className="group flex items-center gap-4 cursor-pointer text-[#F4F7FF] font-manrope text-[19px] font-medium lowercase whitespace-nowrap"><span>залишити заявку</span><span className="grid place-items-center w-12 h-12 rounded-[8px] bg-[color:var(--accent)] transition-transform group-hover:-translate-y-0.5"><ArrowUpRight className="w-5 h-5 text-[#FFFFFF]" /></span></button> : <button id="header-lead-modal-btn" onClick={() => o("Загальна консультація")} className="whitespace-nowrap px-5 xl:px-6 py-2.5 rounded-full text-[15px] font-bold transition-all flex items-center gap-2 active:scale-98 cursor-pointer bg-[color:var(--peach)] hover:bg-[color:var(--peach-hover)] border border-[color:var(--peach)] text-[color:var(--ink)] shadow-[0_10px_26px_-10px_rgba(var(--peach-deep-rgb),0.55)]"><span>Залишити заявку</span><ArrowRight className="w-3.5 h-3.5 text-[color:var(--ink)]" /></button>}</div><div className="flex lg:hidden items-center gap-2"><button id="mobile-menu-burger-btn" onClick={() => k(!w)} className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[color:var(--card-border)] bg-[color:var(--card)] hover:bg-[color:var(--tint)] cursor-pointer" aria-label={w ? "Закрити меню" : "Відкрити меню"}>{w ? <X className="w-5 h-5 text-[color:var(--ink)]" /> : <Menu className="w-5 h-5 text-[color:var(--ink)]" />}</button></div></div>{w && <div className="lg:hidden absolute left-0 right-0 top-full max-h-[calc(100svh-80px)] overflow-y-auto px-5 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-2xl border-t bg-[color:var(--surface)] border-[color:var(--card-border)] text-[color:var(--ink)]">{[{
        id: "home",
        label: "Головна",
        Icon: House,
        go: () => s("index")
      }, {
        id: "services",
        label: "Послуги",
        Icon: Layers,
        go: () => {
          const H = () => {
            var F;
            return (F = document.getElementById("services-section")) == null ? undefined : F.scrollIntoView({
              behavior: "smooth"
            });
          };
          n === "index" ? H() : (s("index"), setTimeout(H, 450));
        }
      }, {
        id: "cases",
        label: "Кейси",
        Icon: Briefcase,
        go: () => s("cases")
      }, {
        id: "contact",
        label: "Контакти",
        Icon: Phone,
        go: () => s("contact")
      }].map(({
        id: H,
        label: F,
        Icon: C,
        go: ee
      }) => <l.Fragment key={H}><button id={`mobile-nav-${H}`} aria-expanded={H === "services" ? !!U : undefined} onClick={() => {
          H === "services" ? v(!U) : (k(false), ee());
        }} className="w-full text-left py-3 px-3 rounded-xl flex items-center gap-3 font-bold font-namu uppercase text-base cursor-pointer hover:bg-[color:var(--card)] text-[color:var(--ink)]"><C className="w-5 h-5 text-[color:var(--accent-green)]" /><span>{F}</span>{H === "services" && <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${U ? "rotate-180" : ""}`} />}</button>{H === "services" && U && <div className="pl-2 pb-1 space-y-1">{[["keycrm", "Впровадження keyCRM"], ["ai-bots", "Боти та AI-автоматизація"], ["analytics", "Власна CRM-система"]].map(([P, T]) => <button key={P} id={`mobile-sub-${P}`} onClick={() => {
            k(false), v(false), s(P);
          }} className="w-full text-left py-2.5 pl-11 pr-3 rounded-xl font-semibold font-manrope text-[15px] cursor-pointer hover:bg-[color:var(--card)] text-[color:var(--ink)]">{T}</button>)}</div>}</l.Fragment>)}<button id="mobile-nav-about" onClick={() => {
        k(false), s("about");
      }} className="w-full text-left py-3 px-3 rounded-xl flex items-center gap-3 font-bold font-namu uppercase text-base cursor-pointer hover:bg-[color:var(--card)] text-[color:var(--ink)]"><Info className="w-5 h-5 text-[color:var(--accent-green)]" /><span>Про компанію</span></button><button id="mobile-nav-privacy" onClick={() => {
        k(false), s("privacy");
      }} className="w-full text-left py-3 px-3 rounded-xl flex items-center gap-3 font-semibold font-manrope text-base cursor-pointer hover:bg-[color:var(--card)] text-[color:var(--ink)]"><ShieldCheck className="w-5 h-5 text-[color:var(--accent-green)]" /><span>Політика конфіденційності</span></button><div className="pt-3 mt-1 border-t border-[color:var(--card-border)] flex flex-col gap-1 text-[14px] font-manrope font-semibold text-[color:var(--ink)]">{i.telegram && <a href={`https://t.me/${i.telegram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[color:var(--card)]"><Send className="w-5 h-5 text-[color:var(--accent-green)]" /><span>{i.telegram}</span></a>}{i.email && <a href={`mailto:${i.email}`} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[color:var(--card)]"><Mail className="w-5 h-5 text-[color:var(--accent-green)]" /><span>{i.email}</span></a>}{i.phone && <a href={`tel:${i.phone}`} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[color:var(--card)]"><Phone className="w-5 h-5 text-[color:var(--accent-green)]" /><span>{i.phone}</span></a>}</div><button id="mobile-nav-admin" onClick={() => {
        k(false), s("admin");
      }} className="w-full min-h-[44px] mt-2 py-2 rounded-xl border border-[color:var(--card-border)] text-center flex items-center justify-center gap-2 text-[14px] font-mono font-normal uppercase tracking-wider cursor-pointer text-[color:var(--ink)]/70 hover:bg-[color:var(--card)]"><Settings className="w-3.5 h-3.5 text-[color:var(--ink)]/70" /><span>Адмін-панель (CMS)</span></button></div>}</header>;
};

