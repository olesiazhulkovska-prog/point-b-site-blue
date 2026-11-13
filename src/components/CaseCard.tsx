// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Globe, Image, Instagram } from 'lucide-react';
import { ke } from '../shared/ke';
import { C_ii } from '../shared/C_ii';

export const Jp = n => n ? n.replace(/\bKeyCRM\b/g, "keyCRM").replace(/\bКЕЙ СРМ\b/g, "кей СРМ").replace(/\bКейCRM\b/g, "кейCRM").replace(/\bКЕЙCRM\b/g, "кейCRM").replace(/\bКей СРМ\b/g, "кей СРМ").replace(/\bKey CRM\b/gi, "key CRM") : "";

export const CaseCard = ({
  item: n,
  onSelect: s,
  idPrefix: o = "case-card"
}) => {
  var k, R, H, F;
  const [i, d] = React.useState(false),
    x = ((k = n.hooks) == null ? undefined : k.filter(C => C.type === "metric" && (C.value || C.label))) || [],
    p = ((R = n.hooks) == null ? undefined : R.filter(C => C.type === "sentence" && C.text)) || [],
    f = n.coverImageUrl || "",
    b = x.length > 0 ? x.slice(0, 2).map(C => ({
      value: C.value,
      label: C.label
    })) : n.shortResultMetric ? [{
      value: n.shortResultMetric,
      label: n.shortResultCaption
    }] : [],
    y = ((H = p[0]) == null ? undefined : H.text) || ((F = n.businessValues) == null ? undefined : F[0]) || "",
    j = React.useRef(null),
    h = useReducedMotion(),
    {
      scrollYProgress: A
    } = useScroll({
      target: j,
      offset: ["start end", "end start"]
    }),
    U = useTransform(A, [0, 1], h ? [0, 0] : [-14, 14]),
    [v, w] = React.useState("");
  return React.useEffect(() => {
    var $, te;
    const C = j.current;
    if (!C) return;
    const ee = () => {
      const ae = C.offsetWidth,
        re = C.offsetHeight;
      if (!ae || !re) return;
      const me = 24,
        Ne = 76,
        ge = 28,
        _ = 16;
      w(`path('M ${me} 0 H ${ae - me} A ${me} ${me} 0 0 1 ${ae} ${me} V ${re - Ne - _} A ${_} ${_} 0 0 1 ${ae - _} ${re - Ne} H ${ae - Ne + ge} A ${ge} ${ge} 0 0 0 ${ae - Ne} ${re - Ne + ge} V ${re - _} A ${_} ${_} 0 0 1 ${ae - Ne - _} ${re} H ${me} A ${me} ${me} 0 0 1 0 ${re - me} V ${me} A ${me} ${me} 0 0 1 ${me} 0 Z')`);
    };
    ee();
    const B = new ResizeObserver(ee);
    B.observe(C), C.parentElement && B.observe(C.parentElement);
    const D = () => ee();
    window.addEventListener("resize", D), window.addEventListener("load", D), (te = ($ = document.fonts) == null ? undefined : $.ready) == null || te.then(D);
    const L = [250, 800, 2e3].map(ae => window.setTimeout(D, ae));
    return () => {
      B.disconnect(), window.removeEventListener("resize", D), window.removeEventListener("load", D), L.forEach(window.clearTimeout);
    };
  }, []), <div id={`${o}-${n.slug}`} data-industry={n.dataIndustry} data-cursor-label="Дивитись кейс →" onClick={() => s(n.slug)} className="group relative h-full cursor-pointer"><div ref={j} className="absolute inset-0 overflow-hidden bg-[color:var(--card)]" style={v ? {
      clipPath: v
    } : {
      borderRadius: 24
    }}>{f && !i ? <div className="absolute left-0 top-0 w-full h-[202px] sm:h-[180px] overflow-hidden"><ke.img style={{
          y: U
        }} src={f} alt="" aria-hidden="true" referrerPolicy="no-referrer" loading="lazy" decoding="async" onError={() => d(true)} className="absolute left-0 -top-5 w-full h-[260px] sm:h-[238px] object-cover object-[50%_62%]" /></div> : <div className="absolute left-0 top-0 w-full h-[200px] sm:h-[178px] bg-[color:var(--line)] flex items-center justify-center"><div className="w-14 h-14 rounded-2xl border border-[color:var(--lime)]/30 bg-[color:var(--lime)]/10 flex items-center justify-center"><Image className="w-6 h-6 text-[color:var(--accent-green)]/70" /></div></div>}<div className="absolute left-0 top-0 w-full h-[202px] sm:h-[180px] [background:linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.7)_72%,var(--surface)_100%)]" /></div><div className="relative z-10 flex flex-col h-full p-5 sm:p-6 gap-3"><div className="h-[150px] sm:h-[122px] shrink-0 flex items-start justify-end"><div className="flex items-center gap-1.5 shrink-0">{n.websiteUrl && <a href={n.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={C => C.stopPropagation()} aria-label={`Сайт ${n.companyName}`} title="Сайт" className="w-11 h-11 md:w-8 md:h-8 rounded-full inline-flex items-center justify-center glass hover:bg-white transition-colors"><Globe className="w-4 h-4 text-[color:var(--ink)]" /></a>}{n.instagramUrl && <a href={n.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={C => C.stopPropagation()} aria-label={`Instagram ${n.companyName}`} title="Instagram" className="w-11 h-11 md:w-8 md:h-8 rounded-full inline-flex items-center justify-center glass hover:bg-white transition-colors"><Instagram className="w-4 h-4 text-[color:var(--ink)]" /></a>}</div></div><span className="text-[14px] font-mono uppercase tracking-wider text-[color:var(--ink)] leading-snug break-words min-w-0 min-h-[1.4rem] md:min-h-[2.2rem]">{n.industryTag}</span><h3 className="text-2xl sm:text-[24px] font-bold font-manrope text-[color:var(--ink)] sm:tracking-tight leading-snug min-h-[3.2rem] sm:min-h-[3.2rem] md:max-lg:min-h-[6.9rem]"><C_ii text={Jp(n.companyName)} /></h3><div className="mt-auto flex flex-col gap-3.5">{b.length > 0 && <div className="rounded-2xl bg-[color:var(--card)] backdrop-blur-md border border-[color:var(--card-border)] p-3.5 grid grid-cols-2 gap-x-4 gap-y-3 min-h-[7.9rem] md:min-h-[8.4rem] md:max-lg:min-h-[10.8rem] lg:max-[1095px]:min-h-[10.8rem] content-start">{b.map((C, ee) => <div key={ee} className="min-w-0"><div className="text-2xl font-extrabold font-namu text-[color:var(--ink)] sm:tracking-tight leading-none">{C.value}</div><div className="text-base text-[color:var(--ink)] leading-snug mt-1.5 font-manrope font-medium">{Jp(C.label)}</div></div>)}</div>}{y && <p className="text-base text-[color:var(--ink)] font-manrope leading-snug line-clamp-2 min-h-[2.7rem] mb-3.5 sm:mb-2">{Jp(y)}</p>}<span className="pr-16 text-[14px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--ink)] transition-colors min-h-[32px] flex items-center">Читати повний кейс</span></div></div><div className="absolute right-2 bottom-2 z-20 w-14 h-14 rounded-full bg-[color:var(--peach)] flex items-center justify-center md:transition-colors group-hover:bg-[color:var(--peach-hover)]"><ArrowRight className="w-5 h-5 text-[color:var(--ink)] -rotate-45 md:transition-transform duration-300 group-hover:rotate-0" /></div></div>;
};

