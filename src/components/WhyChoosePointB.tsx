// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from 'react/jsx-runtime';
import React from 'react';
import { animate, motionValue, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Bot, Check, ChevronLeft, ChevronRight, CodeXml, FileText, Inbox, Layers, MessageCircle, Play, Send, Volume2, X } from 'lucide-react';
import { Hl } from '../shared/Hl';
import { Ie } from '../shared/Ie';
import { ke } from '../shared/ke';
import { C_oi } from '../shared/C_oi';
import { AiChatSimulator } from './AiChatSimulator';
import { HeroSection } from './HeroSection';
import { D1, en } from '../data/data';
import { C_ii } from '../shared/C_ii';
import { useSite } from '../context/SiteContext';
import { ServicesList } from './ServicesList';
import { Ir } from '../shared/Ir';
import { CaseCard } from './CaseCard';
import { ReviewCard } from './ReviewCard';

export const PBP = {
  Хорошоп: "img",
  WordPress: "M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0",
  Instagram: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  TikTok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  Telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  Meta: "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
  "Google Ads": "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z"
};

export const pbIc = (t, d) => d === "img" ? <span role="img" aria-label={t} title={t} className="pb-brand-ic pb-brand-img" /> : <svg viewBox="0 0 24 24" role="img" aria-label={t} className="pb-brand-ic shrink-0" fill="currentColor"><title>{t}</title><path d={d} /></svg>;

export const pbSub = (ic, tx) => <span className="pb-brand-row">{ic.map(t => <React.Fragment key={t}>{pbIc(t, PBP[t])}</React.Fragment>)}{tx ? <span className="pb-brand-tx">{tx}</span> : null}</span>;

export const Qo = ({
  icon: n,
  label: s,
  sub: o,
  compact: i
}) => <div className={`flex ${i ? "flex-col justify-start text-center !gap-2.5 !px-2 !pt-4 !pb-4" : ""} items-center gap-2.5 md:gap-[1.1cqw] rounded-2xl md:rounded-[1.6cqw] px-3 py-2.5 md:px-[1.3cqw] md:py-0 h-full font-manrope`} style={Hl}><span className="shrink-0 grid place-items-center rounded-xl md:rounded-[1cqw] w-9 h-9 md:w-[3.4cqw] md:h-[3.4cqw]" style={{
    background: "rgba(var(--peach-deep-rgb),0.16)",
    color: "var(--peach-deep)",
    border: "1px solid rgba(var(--peach-deep-rgb),0.5)"
  }}>{n}</span><span className={`min-w-0 flex flex-col leading-tight ${i ? "items-center max-w-full" : ""}`}><span className={`${i ? "mb-1 text-[15px]" : "truncate text-[14px]"} md:text-[max(14px,1.7cqw)] font-bold`} style={{
      color: Ie.cream
    }}>{s}</span><span className={`text-[14px] md:text-[max(14px,1.2cqw)] ${i ? "leading-snug" : "leading-tight line-clamp-3"} font-medium${o && o.props && o.props.className === "pb-logos" ? " pb-sub-logos" : ""}`} style={{
      color: Ie.sand,
      opacity: 0.92
    }}>{o}</span></span></div>;

export const Hs = ({
  label: n,
  value: s,
  fill: o,
  color: i,
  progress: d
}) => <div className="flex flex-col gap-1 md:gap-[0.5cqw]"><div className="flex items-baseline justify-between font-manrope"><span className="text-[14px] md:text-[max(14px,1.6cqw)] font-semibold" style={{
      color: Ie.cream
    }}>{n}</span><span className="text-[14px] md:text-[max(14px,1.4cqw)] font-mono whitespace-nowrap shrink-0 pl-2" style={{
      color: Ie.sand
    }}>{s}</span></div><div className="h-2 md:h-[0.95cqw] rounded-full w-full" style={{
    background: "var(--track)"
  }}><ke.div className="h-full rounded-full origin-left" style={{
      width: `${o}%`,
      background: i,
      scaleX: d ?? 1
    }} /></div></div>;

export const C_iq = ({
  barProgress: n
}) => <div className="h-full w-full rounded-3xl md:rounded-[2.4cqw] p-4 md:p-[2cqw] flex flex-col gap-3 md:gap-[1.3cqw]" style={Hl}><div className="flex items-center justify-between gap-2"><C_oi>CRM</C_oi><span className="text-[14px] md:text-[max(14px,1.3cqw)] font-mono uppercase tracking-wider" style={{
      color: Ie.sand
    }}>одна система</span></div><div className="flex flex-col gap-3 md:gap-[1.5cqw] mt-1 md:mt-[0.6cqw]"><Hs label="Втрачені заявки" value="37 → 0" fill={37} color={Ie.patina} progress={n} /><Hs label="Час обробки замовлення" value="−40%" fill={40} color={Ie.goldLight} progress={n} /><Hs label="Конверсія у продаж" value="+18%" fill={18} color={Ie.goldLight} progress={n} /></div></div>;

export const C_oq = ({
  lineProgress: n,
  scene: s
}) => {
  const o = <l.Fragment><div className="flex items-center justify-between gap-2"><C_oi gold>Аналітика</C_oi><span className="text-[14px] md:text-[max(14px,1.3cqw)] font-mono uppercase tracking-wider" style={{
        color: Ie.text
      }}>звіт власнику</span></div><svg viewBox="0 0 200 60" className="w-full flex-1 min-h-[48px]" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--bar)" stopOpacity="0.28" /><stop offset="100%" stopColor="var(--bar)" stopOpacity="0" /></linearGradient></defs><path d="M0 52 L30 44 L60 47 L95 30 L130 33 L165 14 L200 6 L200 60 L0 60 Z" fill="url(#hero-area)" /><ke.path d="M0 52 L30 44 L60 47 L95 30 L130 33 L165 14 L200 6" fill="none" stroke={Ie.goldLight} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{
        pathLength: n ?? 1
      }} /></svg><div className="flex flex-wrap gap-1.5 md:gap-[0.8cqw]">{["Продажі по менеджерах", "Вартість заявки"].map(i => <span key={i} className="rounded-full px-2.5 py-1 md:px-[1.1cqw] md:py-[0.5cqw] text-[14px] md:text-[1.35cqw] font-manrope font-medium" style={{
        background: "var(--tint)",
        color: Ie.cream,
        border: "1px solid var(--card-border)"
      }}>{i}</span>)}</div></l.Fragment>;
  return s ? <div className="relative h-full w-full"><ke.div aria-hidden="true" className="absolute inset-0 rounded-3xl md:rounded-[2.4cqw]" style={{
      ...Hl,
      scaleX: s.frameSx,
      scaleY: s.frameSy,
      opacity: s.frameOp,
      willChange: "transform, opacity"
    }} /><ke.div className="relative h-full w-full rounded-3xl md:rounded-[2.4cqw] p-4 md:p-[2cqw] flex flex-col gap-2 md:gap-[1cqw]" style={{
      opacity: s.contentOp
    }}>{o}</ke.div></div> : <div className="h-full w-full rounded-3xl md:rounded-[2.4cqw] p-4 md:p-[2cqw] flex flex-col gap-2 md:gap-[1cqw]" style={Hl}>{o}</div>;
};

export const Lp = ({
  children: n,
  d: s = 5,
  amp: o = 6
}) => <div className="h-full w-full pb-hero-float" style={{
  "--fd": `${s}s`,
  "--fa": `${o}px`
}}><ke.div className="h-full w-full" whileHover={{
    scale: 1.035,
    y: -4
  }} whileTap={{
    scale: 0.99
  }} transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}>{n}</ke.div></div>;

export const wx = n => 20 - 12 * Math.sin(n / 1e3 * Math.PI * 2);

export const M1 = Array.from({
  length: 81
}, (n, s) => {
  const o = s * 12.5;
  return `${s === 0 ? "M" : "L"}${o} ${wx(o).toFixed(2)}`;
}).join(" ");

export const Pp = ["M178 89 C196 89 190 225 208 225", "M178 225 L208 225", "M178 361 C196 361 190 225 208 225", "M459 190 C476 190 472 120 486 120", "M628 232 L628 262"];

export const C_ag = ({
  onSelectService: n,
  className: s = "",
  progress: o,
  analyticsScene: i,
  aiGlow: d
}) => {
  const x = useSpring(o, {
      stiffness: 90,
      damping: 26,
      restDelta: 0.001
    }),
    [p, f] = React.useState(0);
  React.useEffect(() => (f(Math.floor(x.get() * 25) / 25), x.on("change", X => f(Math.floor(X * 25) / 25))), [x]);
  const b = (X, Z, oe = 0, be = 1) => useTransform(x, [X, Z], [oe, be]),
    y = b(0, 0.1),
    j = b(0, 0.1, -20, 0),
    h = b(0.1, 0.22),
    A = b(0.18, 0.3),
    U = b(0.18, 0.3, 24, 0),
    v = b(0.18, 0.3, 0.96, 1);
  b(0.3, 0.36), b(0.4, 0.45), b(0.46, 0.51), b(0.52, 0.58);
  const w = b(0.54, 0.64),
    k = b(0.6, 0.72),
    R = b(0.6, 0.72, 24, 0),
    H = b(0.68, 0.84),
    F = b(0.8, 0.86),
    C = b(0.84, 0.94),
    ee = b(0.84, 0.94, 24, 0),
    B = b(0.9, 1),
    D = b(0.96, 1),
    L = b(0.1, 0.97),
    $ = useMotionValue(0),
    te = useMotionValue(0),
    ae = React.useRef(false);
  React.useEffect(() => {
    const X = L.on("change", oe => {
        ae.current || $.set(oe);
      }),
      Z = te.on("change", oe => {
        ae.current && $.set(oe);
      });
    return () => {
      X(), Z();
    };
  }, [L, te, $]), React.useEffect(() => {
    var oe;
    if (true || p < 0.99 || ((oe = window.matchMedia) == null ? undefined : oe.call(window, "(prefers-reduced-motion: reduce)").matches)) return;
    ae.current = true, te.set(0);
    const Z = animate(te, [0, 1], {
      duration: 8,
      ease: "easeInOut",
      repeat: 1 / 0,
      repeatDelay: 1.2
    });
    return () => {
      Z.stop(), ae.current = false;
    };
  }, [p >= 0.99, te]);
  const re = useTransform($, X => `${X * 100}%`),
    me = useTransform($, X => wx(X * 1e3)),
    Ne = useTransform($, [0, 0.03, 0.97, 1], [0, 1, 1, 0]),
    ge = X => Z => {
      const oe = Math.min(1, Math.max(0, (Z - (X - 0.04)) / 0.04)),
        be = ae.current ? 0.22 : 0;
      return be + (1 - be) * oe;
    },
    _ = useTransform($, ge(0)),
    se = useTransform($, ge(0.5)),
    ne = useTransform($, ge(1)),
    Se = useTransform(h, [0, 0.05], [0, 1]),
    he = useTransform(w, [0, 0.05], [0, 1]),
    Re = useTransform(F, [0, 0.05], [0, 1]),
    G = p >= 0.3,
    E = () => n == null ? undefined : n(0),
    S = () => n == null ? undefined : n(1),
    O = () => n == null ? undefined : n(2),
    I = X => <ke.circle key={X} r="3.6" fill="var(--peach-deep)" style={{
      opacity: D,
      filter: "drop-shadow(0 0 4px rgba(var(--peach-deep-rgb),0.7))"
    }}><animateMotion dur="3s" begin="0s" repeatCount="indefinite" path={Pp[X]} /></ke.circle>;
  return <div className={`relative w-full select-none flex flex-col items-center ${s}`}><div className="hidden md:block relative z-10 w-full" style={{
      containerType: "inline-size",
      aspectRatio: "760 / 450",
      maxWidth: "min(1180px, max(620px, calc((100svh - 240px) * 760 / 450)))"
    }}><div className="absolute inset-0"><svg viewBox="0 0 760 450" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true"><defs><linearGradient id="link-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" style={{
                stopColor: "var(--bar)"
              }} /><stop offset="100%" style={{
                stopColor: "var(--bar)"
              }} /></linearGradient></defs>{Pp.map((X, Z) => {
            const oe = Z < 3 ? h : Z === 3 ? w : F,
              be = Z < 3 ? Se : Z === 3 ? he : Re;
            return <ke.g key={Z} style={{
              opacity: be
            }}><path d={X} fill="none" stroke="rgba(17,17,68,0.2)" strokeWidth="2" strokeDasharray="3 5" /><ke.path d={X} fill="none" stroke="url(#link-grad)" strokeWidth="2.6" strokeLinecap="round" style={{
                pathLength: oe
              }} /></ke.g>;
          })}{Pp.map((X, Z) => I(Z))}</svg>{[{
          top: "10.25%",
          icon: <Inbox className="w-[2cqw] h-[2cqw]" />,
          label: "Сайт",
          sub: <span className="pb-logos"><img className="pb-wm pb-wm-wp" src="/assets/wm-wordpress.webp" alt="WordPress" width={400} height={52} draggable={false} /><img className="pb-wm pb-wm-hr" src="/assets/wm-horoshop.webp" alt="Хорошоп" width={400} height={49} draggable={false} /><img className="pb-wm pb-wm-sh" src="/assets/wm-shopify.webp" alt="Shopify" width={249} height={80} draggable={false} /></span>
        }, {
          top: "40.5%",
          icon: <MessageCircle className="w-[2cqw] h-[2cqw]" />,
          label: "Месенджери",
          sub: pbSub(["Instagram", "TikTok", "Telegram"])
        }, {
          top: "70.75%",
          icon: <Volume2 className="w-[2cqw] h-[2cqw]" />,
          label: "Реклама",
          sub: pbSub([], "Видно, яка реклама принесла гроші")
        }].map(X => <ke.div key={X.label} className="absolute" style={{
          left: 0,
          top: X.top,
          width: "23.4%",
          height: "19%",
          opacity: y,
          x: j
        }}><Qo icon={X.icon} label={X.label} sub={X.sub} /></ke.div>)}<ke.button type="button" onClick={S} aria-label="Боти та AI" className="absolute text-left cursor-pointer" style={{
          left: "27%",
          top: "12%",
          width: "33.4%",
          height: "76%",
          opacity: A,
          y: U,
          scale: v
        }}>{d && <ke.div aria-hidden="true" className="absolute -inset-[22%] -z-10 pointer-events-none" style={{
            opacity: d,
            background: "radial-gradient(closest-side, rgba(var(--lime-rgb),0.35), rgba(var(--lime-rgb),0) 72%)"
          }} />}<Lp d={6} amp={5}><AiChatSimulator play={G} /></Lp></ke.button><ke.button type="button" onClick={E} aria-label="Впровадження keyCRM" className="absolute text-left cursor-pointer" style={{
          left: "64%",
          top: "2%",
          width: "36%",
          height: "50%",
          opacity: k,
          y: R
        }}><Lp d={7} amp={6}><C_iq barProgress={H} /></Lp></ke.button><ke.button type="button" onClick={O} aria-label="Наскрізна аналітика" className="absolute text-left cursor-pointer" ref={i == null ? undefined : i.targetRef} style={i ? {
          left: "64%",
          top: "58%",
          width: "36%",
          height: "40%"
        } : {
          left: "64%",
          top: "58%",
          width: "36%",
          height: "40%",
          opacity: C,
          y: ee
        }}><Lp d={8} amp={5}><C_oq lineProgress={B} scene={i} /></Lp></ke.button></div></div><div className="md:hidden relative z-10 w-full flex flex-col items-stretch"><ke.div className="grid grid-cols-3 gap-2" style={{
        opacity: y
      }}><div className="min-h-[120px]"><Qo icon={<Inbox className="w-4 h-4" />} label="Сайт" sub={<span className="pb-logos"><img className="pb-wm pb-wm-wp" src="/assets/wm-wordpress.webp" alt="WordPress" width={400} height={52} draggable={false} /><img className="pb-wm pb-wm-hr" src="/assets/wm-horoshop.webp" alt="Хорошоп" width={400} height={49} draggable={false} /><img className="pb-wm pb-wm-sh" src="/assets/wm-shopify.webp" alt="Shopify" width={249} height={80} draggable={false} /></span>} compact /></div><div className="min-h-[120px]"><Qo icon={<MessageCircle className="w-4 h-4" />} label="Месенджери" sub={pbSub(["Instagram", "TikTok", "Telegram"])} compact /></div><div className="min-h-[120px]"><Qo icon={<Volume2 className="w-4 h-4" />} label="Реклама" sub={pbSub([], "Видно, яка реклама принесла гроші")} compact /></div></ke.div><ke.div className="mx-auto h-4 w-px" style={{
        background: `linear-gradient(${Ie.patina}, ${Ie.goldLight})`,
        opacity: h
      }} /><ke.button type="button" onClick={S} className="text-left" style={{
        opacity: A
      }}><AiChatSimulator play={G} /></ke.button><ke.div className="mx-auto h-4 w-px" style={{
        background: `linear-gradient(${Ie.patina}, ${Ie.goldLight})`,
        opacity: w
      }} /><div className="grid grid-cols-2 gap-2"><ke.button type="button" onClick={E} className="text-left" style={{
          opacity: k
        }}><div className="h-full rounded-3xl p-3.5 flex flex-col gap-2.5" style={Hl}><C_oi>CRM</C_oi><div className="flex flex-col gap-2 mt-0.5"><Hs label="Втрачені заявки" value="37 → 0" fill={37} color={Ie.patina} progress={H} /><Hs label="Час обробки замовлення" value="−40%" fill={40} color={Ie.goldLight} progress={H} /><Hs label="Конверсія у продаж" value="+18%" fill={18} color={Ie.goldLight} progress={H} /></div></div></ke.button><ke.button type="button" onClick={O} className="text-left" style={{
          opacity: C
        }}><div className="h-full rounded-3xl p-3.5 flex flex-col gap-2" style={Hl}><C_oi gold>Звіт</C_oi><svg viewBox="0 0 200 60" className="w-full flex-1 min-h-[56px]" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hero-area-m" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--bar)" stopOpacity="0.28" /><stop offset="100%" stopColor="var(--bar)" stopOpacity="0" /></linearGradient></defs><path d="M0 52 L30 44 L60 47 L95 30 L130 33 L165 14 L200 6 L200 60 L0 60 Z" fill="url(#hero-area-m)" /><ke.path d="M0 52 L30 44 L60 47 L95 30 L130 33 L165 14 L200 6" fill="none" stroke={Ie.goldLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                pathLength: B
              }} /></svg><span className="text-[14px] font-manrope" style={{
              color: Ie.sand
            }}>для власника</span></div></ke.button></div></div><div className="relative z-10 w-full mt-3 sm:mt-4 px-1 hidden [@media(min-height:740px)]:block"><div className="relative w-full" style={{
        height: 40
      }}><svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true"><path d={M1} fill="none" stroke="rgba(17,17,68,0.2)" strokeWidth="1.5" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" /><ke.path d={M1} fill="none" stroke={Ie.goldLight} strokeWidth="2" strokeLinecap="round" style={{
            pathLength: L
          }} /></svg><ke.div className="absolute rounded-full" style={{
          left: re,
          top: me,
          width: 14,
          height: 14,
          x: "-50%",
          y: "-50%",
          background: "var(--peach-deep)",
          boxShadow: "0 0 0 4px rgba(var(--peach-deep-rgb),0.22), 0 0 14px 2px rgba(var(--peach-deep-rgb),0.6)",
          opacity: Ne
        }} />{[0, 50, 100].map((X, Z) => <ke.span key={X} className="absolute rounded-full" style={{
          left: `${X}%`,
          top: wx(X * 10),
          width: Z === 2 ? 12 : 9,
          height: Z === 2 ? 12 : 9,
          x: "-50%",
          y: "-50%",
          background: Z === 2 ? "var(--peach-deep)" : Ie.goldLight,
          opacity: [_, se, ne][Z],
          boxShadow: Z === 2 && p >= 0.96 ? "0 0 0 6px rgba(var(--peach-deep-rgb),0.25), 0 0 26px 6px rgba(var(--peach-deep-rgb),0.85)" : "0 0 8px rgba(var(--lime-rgb),0.5)",
          transition: "box-shadow .5s"
        }} />)}</div><div className="flex items-start justify-between text-[14px] sm:text-[14px] font-mono uppercase tracking-wider leading-tight">{[{
          label: "Все в одній системі",
          op: _,
          al: "text-left items-start"
        }, {
          label: "Менше ручної роботи",
          op: se,
          al: "text-center items-center"
        }, {
          label: "Кероване зростання",
          op: ne,
          al: "text-right items-end"
        }].map((X, Z) => <ke.div key={X.label} style={{
          opacity: X.op
        }} className={`flex flex-col max-w-[33%] ${X.al}`}><span className={Z === 2 ? "font-bold" : ""} style={{
            color: "var(--ink)"
          }}>{X.label}</span></ke.div>)}</div></div></div>;
};

export const Am = {
  background: "var(--card)",
  border: "1px solid var(--card-border)",
  boxShadow: "none"
};

export const Gp = [{
  src: "Instagram",
  who: "Нове замовлення",
  sum: "4 280 ₴"
}, {
  src: "Telegram",
  who: "Заявка від бота",
  sum: "1 950 ₴"
}, {
  src: "Сайт",
  who: "Нова угода",
  sum: "8 600 ₴"
}, {
  src: "Instagram",
  who: "Оплата отримана",
  sum: "3 120 ₴"
}, {
  src: "Telegram",
  who: "Нове замовлення",
  sum: "2 740 ₴"
}, {
  src: "Сайт",
  who: "Заявка від бота",
  sum: "5 400 ₴"
}];

export const C_cq = () => {
  const [n, s] = React.useState(3);
  React.useEffect(() => {
    var d;
    if ((d = window.matchMedia) != null && d.call(window, "(prefers-reduced-motion: reduce)").matches) return;
    const i = setInterval(() => s(x => x + 1), 2600);
    return () => clearInterval(i);
  }, []);
  const o = Array.from({
    length: 4
  }, (i, d) => Gp[(n - d + Gp.length * 10) % Gp.length]);
  return <div className="rounded-2xl p-4 font-manrope" style={Am}><div className="flex items-center justify-between mb-3"><span className="text-[14px] font-mono uppercase tracking-wider text-[color:var(--accent-green)]">Потік заявок</span><span className="flex items-center gap-1.5 text-[14px] text-[color:var(--ink-soft)]"><span className="w-2 h-2 rounded-full bg-[color:var(--peach)] animate-pulse" />{" live"}</span></div><div className="flex flex-col gap-2">{o.map((i, d) => <ke.div key={n - d} initial={d === 0 ? {
        opacity: 0,
        y: -14
      } : false} animate={{
        opacity: 1 - d * 0.2,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-white/60 border border-[color:var(--card-border)]"><span className="min-w-0 flex flex-col leading-tight"><span className="text-[14px] font-semibold text-[color:var(--ink)] truncate">{i.who}</span><span className="text-[14px] text-[color:var(--accent-green)]">{i.src}</span></span><span className="text-[14px] font-semibold text-[color:var(--accent-green)] whitespace-nowrap">{i.sum}</span></ke.div>)}</div></div>;
};

export const F1 = ({
  label: n,
  value: s,
  delta: o
}) => <div className="rounded-2xl p-4 font-manrope" style={Am}><div className="text-[14px] text-[color:var(--ink-soft)]">{n}</div><div className="flex items-end justify-between mt-1"><span className="text-[28px] font-extrabold text-[color:var(--ink)] leading-none">{s}</span><span className="flex items-center gap-0.5 text-[14px] font-semibold text-[color:var(--accent-green)]"><ArrowUpRight className="w-4 h-4" />{o}</span></div></div>;

export const C_uq = () => <div className="rounded-2xl p-4 font-manrope" style={Am}><div className="flex items-center justify-between"><span className="text-[14px] text-[color:var(--ink-soft)]">Виручка за тиждень</span><span className="text-[14px] font-semibold text-[color:var(--accent-green)]">+18%</span></div><svg viewBox="0 0 200 60" className="w-full h-16 mt-2" aria-hidden="true"><defs><linearGradient id="hfk" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--bar)" stopOpacity="0.3" /><stop offset="1" stopColor="var(--bar)" stopOpacity="0" /></linearGradient></defs><path d="M0 48 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14 L200 60 L0 60Z" fill="url(#hfk)" /><path d="M0 48 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14" fill="none" stroke="var(--bar)" strokeWidth="2" strokeLinejoin="round" /></svg></div>;

export const C_dq = ({
  progress: n
}) => {
  const s = useTransform(n, [0.45, 0.9], [0, 1]),
    o = useTransform(n, [0.45, 0.9], [-24, 0]),
    i = useTransform(n, [0.45, 0.9], [24, 0]),
    [d, x] = React.useState(() => typeof window > "u" ? {
      w: 1920,
      h: 1080
    } : {
      w: window.innerWidth,
      h: window.innerHeight
    });
  React.useEffect(() => {
    const y = () => x({
      w: window.innerWidth,
      h: window.innerHeight
    });
    return window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, []);
  const p = Math.min(1180, Math.max(620, (d.h - 240) * 760 / 450), d.w - 64),
    f = Math.floor((d.w - p) / 2 - 56);
  if (f < 190) return null;
  const b = `${Math.min(330, f)}px`;
  return <div aria-hidden="true" className="hidden 2xl:block pointer-events-none absolute inset-0 z-10"><ke.div className="absolute left-8 top-1/2 -translate-y-1/2 pt-12" style={{
      width: b,
      opacity: s,
      x: o
    }}><C_cq /></ke.div><ke.div className="absolute right-8 top-1/2 -translate-y-1/2 pt-12 flex flex-col gap-3" style={{
      width: b,
      opacity: s,
      x: i
    }}><F1 label="Конверсія в продаж" value="32%" delta="+6%" /><C_uq /><F1 label="Час відповіді клієнту" value="2 хв" delta="−85%" /></ke.div></div>;
};

export const C_sg = () => <p className="pb-hero-desc">Зводимо в систему: агент приймає перше повідомлення, CRM веде замовлення, наскрізна аналітика показує, що спрацювало</p>;

export const HS = class extends React.Component {
  constructor(p) {
    super(p);
    this.m1 = window.matchMedia("(max-width: 767px)");
    this.m2 = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.state = {
      mob: false,
      rm: true
    };
    this.root = React.createRef();
    this.prog = motionValue(0);
    this.pm = motionValue(0);
    this.ch = () => {};
  }
  componentDidMount() {
    this.m1.addEventListener("change", this.ch);
    this.m2.addEventListener("change", this.ch);
    this.dn = this.boot();
  }
  componentDidUpdate(q, ps) {
    if (ps.mob !== this.state.mob || ps.rm !== this.state.rm) {
      this.dn && this.dn();
      this.dn = this.boot();
    }
  }
  componentWillUnmount() {
    this.m1.removeEventListener("change", this.ch);
    this.m2.removeEventListener("change", this.ch);
    this.dn && this.dn();
    this.dn = null;
  }
  boot() {
    const {
        mob,
        rm
      } = this.state,
      R = this.root.current,
      prog = this.prog,
      pm = this.pm;
    if (!R) return;
    const track = R.querySelector(".hero-track"),
      pin = R.querySelector(".hero-pin"),
      L = R.querySelector(".hero-L"),
      hero = R.querySelector("#hero-dark"),
      h1 = hero && hero.querySelector("h1"),
      slot = h1 && h1.querySelector(".hero-portal-slot"),
      gw = R.querySelector(".hero-graph"),
      bg = R.querySelector(".hero-L-bg"),
      mb = R.querySelector(".hero-graph-m");
    if (!track || !pin || !L || !hero || !h1 || !slot) return;
    const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)),
      sm = u => u * u * (3 - 2 * u);
    if (rm) {
      prog.set(1);
      pm.set(1);
      track.dataset.static = "1";
      return;
    }
    track.dataset.static = "0";
    const off = (el, stop) => {
      let x = 0,
        y = 0,
        e = el;
      while (e && e !== stop) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
      }
      return {
        x,
        y
      };
    };
    const g = {
      W: 1,
      H: 1,
      cx: 0,
      cy: 0,
      w0: 88,
      h0: 22,
      z: 6
    };
    let last = -1,
      open = null,
      raf = 0;
    const measure = () => {
      const p = off(slot, pin),
        hh = off(h1, pin);
      g.W = pin.clientWidth;
      g.H = pin.clientHeight;
      g.w0 = slot.offsetWidth;
      g.h0 = slot.offsetHeight;
      g.cx = p.x + g.w0 / 2;
      g.cy = p.y + g.h0 / 2;
      h1.style.transformOrigin = p.x - hh.x + g.w0 / 2 + "px " + (p.y - hh.y + g.h0 / 2) + "px";
      g.z = window.innerWidth < 768 ? 3.4 : 6;
      L.style.setProperty("--cx", g.cx + "px");
      L.style.setProperty("--cy", g.cy + "px");
      last = -1;
      run();
    };
    const run = () => {
      raf = 0;
      const rng = Math.max(1, track.offsetHeight - pin.offsetHeight),
        P = cl(-track.getBoundingClientRect().top / rng);
      if (mb) {
        const r = mb.getBoundingClientRect();
        pm.set(cl((window.innerHeight * 0.9 - r.top) / Math.max(1, r.height * 0.75)));
      }
      if (P === last) return;
      last = P;
      const u = cl((P - 0.2) / 0.5),
        e = sm(u),
        z = 1 + (g.z - 1) * u * u,
        hw = g.w0 * z / 2,
        hh = g.h0 * z / 2;
      const lf = (g.cx - hw) * (1 - e),
        tp = (g.cy - hh) * (1 - e),
        rt = g.W - ((g.cx + hw) * (1 - e) + g.W * e),
        bt = g.H - ((g.cy + hh) * (1 - e) + g.H * e);
      L.style.clipPath = "inset(" + Math.max(0, tp).toFixed(1) + "px " + Math.max(0, rt).toFixed(1) + "px " + Math.max(0, bt).toFixed(1) + "px " + Math.max(0, lf).toFixed(1) + "px round " + (hh * (1 - e)).toFixed(1) + "px)";
      h1.style.scale = z.toFixed(4);
      hero.style.setProperty("--hf", (1 - cl((P - 0.2) / 0.45)).toFixed(3));
      L.style.setProperty("--mg", (1 - cl((P - 0.05) / 0.2)).toFixed(3));
      hero.style.setProperty("--hn", (1 - cl((P - 0.2) / 0.2)).toFixed(3));
      if (bg) {
        bg.style.transform = "scale(" + (1.12 - 0.12 * e).toFixed(4) + ")";
        bg.style.setProperty("--ga", (1 - 0.15 * e).toFixed(3));
      }
      const gp = cl((P - 0.58) / 0.22);
      if (gw) {
        gw.style.opacity = gp.toFixed(3);
        gw.style.transform = "translate3d(0," + ((1 - cl((P - 0.58) / 0.34)) * 32).toFixed(1) + "px,0)";
      }
      prog.set(cl((P - 0.66) / 0.32));
      const o = P >= 0.7;
      if (o !== open) {
        open = o;
        hero.inert = o;
        L.inert = !o;
        L.style.pointerEvents = o ? "auto" : "none";
      }
    };
    const on = () => {
      raf || (raf = requestAnimationFrame(run));
    };
    measure();
    const t1 = setTimeout(measure, 700),
      t2 = setTimeout(measure, 1800);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("scroll", on, {
      passive: true
    });
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      raf && cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", measure);
      h1.style.scale = "";
      hero.inert = false;
      L.inert = false;
    };
  }
  render() {
    const {
        mob,
        rm
      } = this.state,
      n = this.props,
      prog = this.prog,
      pm = this.pm,
      root = this.root;
    return <div id="hero-stage" ref={root} className="relative w-full z-20 overflow-clip" data-mob={mob ? "1" : "0"}><div className="hero-track" data-static={rm ? "1" : "0"}><div className="hero-pin"><HeroSection onScrollToCases={n.onScrollToCases} onScrollToServices={() => n.onSelectService == null ? undefined : n.onSelectService(0)} /><div className="hero-L" inert={!rm}><div className="hero-L-bg" aria-hidden="true" />{!mob && <div className="hero-graph"><C_sg /><div className="hero-graph-in"><C_ag onSelectService={n.onSelectService} progress={prog} /></div></div>}{!mob && <C_dq progress={prog} />}</div></div></div>{mob && <div className="hero-graph-m"><C_sg /><C_ag onSelectService={n.onSelectService} progress={pm} /></div>}</div>;
  }
};

export const C_fq = n => <HS {...n} />;

export const Nq = ({
  value: n,
  start: s,
  delayMs: o = 0,
  durationMs: i = 1750
}) => {
  const d = n.match(/^(\d+)(.*)$/),
    x = d ? parseInt(d[1], 10) : 0,
    p = d ? d[2] : "",
    [f, b] = React.useState(0);
  return React.useEffect(() => {
    if (!s) return;
    let y,
      j = null,
      h;
    return h = setTimeout(() => {
      const A = U => {
        j || (j = U);
        const v = U - j,
          w = Math.min(v / i, 1),
          k = 1 - Math.pow(1 - w, 4),
          R = Math.round(k * x);
        b(R), w < 1 ? y = requestAnimationFrame(A) : b(x);
      };
      y = requestAnimationFrame(A);
    }, o), () => {
      clearTimeout(h), y && cancelAnimationFrame(y);
    };
  }, [s, x, o, i]), <span className="tabular-nums">{s ? f : 0}<span className="text-[color:var(--accent)]">{p}</span></span>;
};

export const _e = {
  cream: "var(--ink)",
  gold: "var(--accent-green)",
  patina: "var(--accent-green)",
  amber: "var(--peach-deep)",
  bar: "var(--bar)"
};

export const Es = () => {
  const n = React.useRef(null),
    [s, o] = React.useState(false);
  return React.useEffect(() => {
    const i = n.current;
    if (!i || typeof IntersectionObserver > "u") {
      o(true);
      return;
    }
    const d = new IntersectionObserver(p => {
      p.some(f => f.isIntersecting) && (o(true), d.disconnect());
    }, {
      threshold: 0.4
    });
    d.observe(i);
    const x = window.setTimeout(() => o(true), 900);
    return () => {
      d.disconnect(), window.clearTimeout(x);
    };
  }, []), {
    ref: n,
    on: s
  };
};

export const Zs = ({
  children: n,
  caption: s,
  onRef: o
}) => <div ref={o} className="flex h-[252px] sm:h-[240px] w-full flex-col justify-between rounded-xl border p-3.5" style={{
  background: "var(--panel-gradient)",
  borderColor: "var(--card-border)"
}}><div className="@container flex flex-1 items-center">{n}</div><div className="mt-2 font-mono text-[14px] uppercase tracking-wider" style={{
    color: _e.gold
  }}>{s}</div></div>;

export const Cs = (n = {}) => ({
  background: "var(--chip-bg)",
  border: "1px solid var(--card-border)",
  color: _e.cream,
  ...n
});

export const Ma = (n, s) => ({
  opacity: n ? 1 : 0,
  transform: n ? "none" : "translateY(8px)",
  transition: `all .6s ${s * 0.12}s`
});

export const Ua = "font-manrope text-[14px] font-semibold leading-tight";

export const dg = () => {
  const {
    ref: n,
    on: s
  } = Es();
  return <Zs onRef={n} caption="Від хаосу до системи"><div className="flex w-full flex-col items-stretch gap-2.5 @min-[300px]:flex-row @min-[300px]:items-center"><div className="flex flex-1 flex-row flex-wrap gap-1.5 @min-[300px]:flex-col">{[["Excel", -2], ["Чати", 1.5], ["Блокнот", -1]].map(([o, i], d) => <div key={o} className={`${Ua} rounded-md px-2.5 py-1.5 text-center`} style={{
          ...Cs({
            border: "1px dashed rgba(var(--bar-rgb),0.8)",
            background: "var(--chip-bg)"
          }),
          ...Ma(s, d),
          transform: s ? `rotate(${i}deg)` : "translateY(8px)"
        }}>{o}</div>)}</div><ArrowRight size={18} color={_e.amber} className="shrink-0 self-center rotate-90 @min-[300px]:rotate-0" /><div className="flex-1 rounded-lg p-2" style={{
        background: "rgba(var(--lime-rgb),0.4)",
        border: `1px solid ${_e.bar}`
      }}><div className="mb-1.5 font-mono text-[14px]" style={{
          color: _e.gold
        }}>Одна система</div>{["Замовлення", "Склад", "Звіт"].map((o, i) => <div key={o} className={`${Ua} flex items-center justify-between py-0.5`} style={{
          color: _e.cream,
          ...Ma(s, i + 3)
        }}>{o}<Check size={14} color={_e.amber} /></div>)}</div></div></Zs>;
};

export const Vq = () => {
  const {
    ref: n,
    on: s
  } = Es();
  return <Zs onRef={n} caption="Не з нуля — з основи"><div className="flex w-full flex-col items-stretch gap-0.5 @min-[300px]:flex-row @min-[300px]:items-center @min-[300px]:gap-1"><div className="min-w-0 flex-1"><div className="mb-1 font-mono text-[14px]" style={{
          color: _e.patina
        }}>Основа</div><div className="grid grid-cols-3 gap-1 @min-[300px]:grid-cols-1">{["Воронка", "Статуси", "Інтеграції"].map((o, i) => <div key={o} className={`${Ua} rounded-md px-1 py-1 text-center text-[14px]`} style={{
            ...Cs(),
            ...Ma(s, i)
          }}>{o}</div>)}</div></div><span className="self-center font-manrope text-base @min-[300px]:text-lg font-bold leading-none" style={{
        color: _e.amber
      }}>+</span><div className="min-w-0 flex-1"><div className="mb-1 font-mono text-[14px]" style={{
          color: _e.patina
        }}>ВАШЕ</div><div className={`${Ua} rounded-md px-1 py-1.5 text-center text-[14px]`} style={{
          ...Cs({
            border: "1px dashed rgba(var(--bar-rgb),0.8)"
          }),
          ...Ma(s, 3)
        }}>Ваша специфіка</div></div><span className="self-center font-manrope text-base @min-[300px]:text-lg font-bold leading-none" style={{
        color: _e.amber
      }}>=</span><div className={`${Ua} min-w-0 flex-1 rounded-lg px-2 py-1.5 @min-[300px]:py-5 text-center`} style={{
        background: "var(--btn-dark)",
        border: `1px solid ${_e.bar}`,
        color: "var(--on-dark)",
        ...Ma(s, 5)
      }}>Ваша CRM</div></div></Zs>;
};

export const Kq = () => {
  const {
      ref: n,
      on: s
    } = Es(),
    o = ["Заявка", "Замір", "Виробництво", "Доставка"];
  return <Zs onRef={n} caption="Під вашу специфіку, не під шаблон"><div className="w-full space-y-2.5"><div><div className="mb-1 font-mono text-[14px]" style={{
          color: "var(--muted)"
        }}>ШАБЛОН CRM — ЖОРСТКІ ЕТАПИ</div><div className="flex gap-1.5">{["Заявка", "Угода", "Оплата"].map(i => <div key={i} className={`${Ua} flex-1 rounded-md px-1.5 py-1 text-center`} style={{
            background: "var(--chip-bg-soft)",
            border: "1px solid var(--card-border)",
            color: "var(--muted)"
          }}>{i}</div>)}</div></div><div><div className="mb-1 font-mono text-[14px]" style={{
          color: _e.gold
        }}>ВАША ВОРОНКА — ВАШІ ЕТАПИ</div><div className="grid grid-cols-2 gap-1.5 @min-[430px]:flex">{o.map((i, d) => <div key={i} className={`${Ua} min-w-0 flex-1 rounded-md px-1 py-1.5 text-center`} style={{
            ...Cs({
              border: `1px solid ${_e.bar}`
            }),
            ...Ma(s, d)
          }}>{i}</div>)}</div></div></div></Zs>;
};

export const kq = () => {
  const {
      ref: n,
      on: s
    } = Es(),
    o = ["Заявка", "Склад", "Оплата", "Звіт"];
  return <Zs onRef={n} caption="Аудит — де це справді потрібно"><div className="relative w-full"><div className="absolute left-3 right-3 top-[18px] h-px" style={{
        background: "rgba(17,17,68,0.25)"
      }} /><div className="relative flex justify-between">{o.map((i, d) => {
          const x = d === 1 || d === 2;
          return <div key={i} className="flex w-1/4 flex-col items-center" style={Ma(s, d)}><div className="h-[18px] w-[18px] rounded-full" style={{
              background: x ? _e.amber : _e.bar,
              boxShadow: x ? "0 0 0 5px rgba(var(--peach-deep-rgb),0.25)" : "none",
              border: "2px solid #FFFFFF"
            }} /><div className={`${Ua} mt-2 text-[14px]`} style={{
              color: _e.cream
            }}>{i}</div></div>;
        })}</div><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-manrope text-[14px]" style={{
        color: "var(--ink-soft)",
        ...Ma(s, 5)
      }}><span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{
            background: _e.bar
          }} />етап працює</span><span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{
            background: _e.amber,
            boxShadow: "0 0 0 3px rgba(var(--peach-deep-rgb),0.25)"
          }} />вузьке місце — тут втрачається час</span></div></div></Zs>;
};

export const qq = () => {
  const {
      ref: n,
      on: s
    } = Es(),
    o = ["E-commerce", "Послуги", "Виробництво", "Медицина", "HoReCa", "+4 ніші"];
  return <Zs onRef={n} caption="Досвід у різних нішах"><div className="flex w-full flex-col items-start gap-2 @min-[300px]:flex-row @min-[300px]:items-center @min-[300px]:gap-3"><div className="flex shrink-0 items-baseline gap-2 @min-[300px]:block"><div className="font-namu text-[44px] font-extrabold leading-none" style={{
          color: _e.gold
        }}>160+</div><div className={Ua} style={{
          color: _e.cream
        }}>клієнтів</div></div><div className="grid w-full flex-1 grid-cols-2 gap-1.5">{o.map((i, d) => <div key={i} className={`${Ua} min-w-0 rounded-md px-1 py-1.5 text-center text-[14px] @min-[300px]:text-[14px] ${d === 0 || d === o.length - 1 ? "col-span-2" : ""}`} style={{
          ...Cs(d === 0 ? {
            background: "var(--btn-dark)",
            color: "var(--on-dark)",
            border: `1px solid ${_e.bar}`
          } : {}),
          ...Ma(s, d)
        }}>{i}</div>)}</div></div></Zs>;
};

export const Oq = () => {
  const {
      ref: n,
      on: s
    } = Es(),
    o = [[Play, "Відеоінструкції"], [FileText, "Регламенти"], [Check, "Тренування на ваших замовленнях"]];
  return <Zs onRef={n} caption="Впевнено з першого дня"><div className="flex w-full flex-col items-stretch gap-2 @min-[300px]:flex-row @min-[300px]:items-center"><div className="flex-1 space-y-1.5">{o.map(([C_i, d], x) => <div key={d} className={`${Ua} flex items-center gap-2 rounded-md px-2 py-1.5`} style={{
          ...Cs(),
          ...Ma(s, x)
        }}><C_i size={14} color={_e.amber} className="shrink-0" />{d}</div>)}</div><ArrowRight size={18} color={_e.amber} className="shrink-0 self-center rotate-90 @min-[300px]:rotate-0" /><div className={`${Ua} @min-[300px]:w-[34%] rounded-lg px-2 py-2.5 @min-[300px]:py-4 text-center`} style={{
        background: "var(--btn-dark)",
        border: `1px solid ${_e.bar}`,
        color: "var(--on-dark)",
        ...Ma(s, 4)
      }}>Менеджери без вас</div></div></Zs>;
};

export const wq = [dg, Vq, Kq, kq, qq, Oq];

export const Tq = ({
  index: n
}) => {
  const C_s = wq[n] ?? dg;
  return <C_s />;
};

export const at = en.length;

export const Kl = 360 / at;

export const Mc = ({
  diff: n,
  idx: s,
  active: o,
  flat: i
}) => <div className="theme-light relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-[color:var(--card)] p-5 transition-shadow duration-500 sm:p-7" style={{
  borderColor: o ? "var(--bar)" : "var(--card-border)",
  boxShadow: i ? "none" : o ? "0 0 0 1px var(--accent)" : "none"
}}><div><div className="mb-3 flex items-center justify-between sm:mb-5"><span className="font-namu text-4xl font-extrabold text-[color:var(--accent-green)]">{n.number}</span>{n.badge && <span className="font-mono text-[14px] font-normal uppercase tracking-wider text-[color:var(--accent-green)]">{n.badge}</span>}</div><h3 className="mb-2 font-manrope text-xl font-bold leading-snug sm:tracking-tight text-[color:var(--ink)] sm:text-[22px]"><C_ii text={n.title} /></h3><p className="font-manrope text-base leading-[1.5] text-[color:var(--ink)]">{n.description}</p></div><div className="mt-3 w-full sm:mt-5"><Tq index={n.ill ?? s} /></div></div>;

export const Hq = ({
  cardW: n,
  cardH: s
}) => {
  const o = React.useRef(null),
    [i, d] = React.useState(0),
    x = React.useRef(null),
    p = 10,
    f = typeof window < "u" && window.innerWidth >= 640 ? 24 : 20,
    b = n + p,
    y = at * b;
  React.useLayoutEffect(() => {
    o.current && (o.current.scrollLeft = y);
  }, [y]);
  const j = () => {
      const U = o.current;
      U && (U.scrollLeft < y * 0.5 ? U.scrollLeft += y : U.scrollLeft > y * 1.5 && (U.scrollLeft -= y));
    },
    h = () => {
      const U = o.current;
      if (!U) return;
      const v = (Math.round(U.scrollLeft / b) % at + at) % at;
      d(w => w === v ? w : v), x.current && window.clearTimeout(x.current), x.current = window.setTimeout(j, 140);
    };
  React.useEffect(() => () => {
    x.current && window.clearTimeout(x.current);
  }, []);
  const A = [...en, ...en, ...en];
  return <div ref={o} onScroll={h} className={"flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"} style={{
    gap: p,
    marginLeft: -f,
    marginRight: -f,
    paddingLeft: f,
    paddingRight: f,
    scrollPaddingLeft: f,
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorX: "contain"
  }}>{A.map((U, v) => {
      const w = v % at;
      return <div key={v} className="shrink-0 snap-start flex" style={{
        width: n,
        minHeight: s
      }}><div className="w-full flex"><div className="w-full"><Mc diff={U} idx={w} active={i === w} flat /></div></div></div>;
    })}</div>;
};

export const Xp = (n, s) => ((n - s) % 360 + 540) % 360 - 180;

export const Rq = ({
  diff: n,
  idx: s,
  angle: o,
  cardW: i,
  R: d,
  CARD_H: x
}) => {
  const p = useTransform(o, j => {
      const h = Math.abs(Xp(s * Kl, j));
      return Math.max(0.28, 1 - h / 95);
    }),
    f = useTransform(o, j => {
      const h = Math.abs(Xp(s * Kl, j));
      return `brightness(${Math.max(0.7, 1 - h / 260).toFixed(3)})`;
    }),
    [b, y] = React.useState(s === 0);
  return useMotionValueEvent(o, "change", j => {
    const h = Math.abs(Xp(s * Kl, j)) < Kl / 2;
    y(A => A === h ? A : h);
  }), <ke.div className="absolute left-1/2 top-0" style={{
    width: i,
    height: x,
    marginLeft: -i / 2,
    transform: `rotateY(${s * Kl}deg) translateZ(${d}px)`,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    opacity: p,
    filter: f
  }}><Mc diff={n} idx={s} active={b} /></ke.div>;
};

export const C_zq = () => {
  const n = React.useRef(null),
    [s, o] = React.useState(0),
    [i, d] = React.useState(3),
    [x, p] = React.useState(() => typeof window < "u" ? window.innerWidth : 1280);
  React.useEffect(() => {
    const ee = () => {
      d(window.innerWidth >= 1280 ? 3 : 2), p(window.innerWidth);
    };
    return ee(), window.addEventListener("resize", ee), () => window.removeEventListener("resize", ee);
  }, []);
  const f = 24,
    b = x >= 1280 ? 48 : 32,
    y = Math.max(0, (x - 1680) / 2) + b,
    h = x >= 1025 ? Math.min(560, Math.max(500, x * 0.35)) : (x - y * 2 - (i - 1) * f) / i,
    A = h + f,
    U = at * A,
    v = React.useRef(null);
  React.useLayoutEffect(() => {
    n.current && (n.current.scrollLeft = U);
  }, [U]);
  const w = () => {
      const ee = n.current;
      ee && (ee.scrollLeft < U * 0.5 ? ee.scrollLeft += U : ee.scrollLeft > U * 1.5 && (ee.scrollLeft -= U));
    },
    k = () => {
      const ee = n.current;
      if (!ee) return;
      const B = (Math.round(ee.scrollLeft / A) % at + at) % at;
      o(D => D === B ? D : B), v.current && window.clearTimeout(v.current), v.current = window.setTimeout(w, 160);
    };
  React.useEffect(() => () => {
    v.current && window.clearTimeout(v.current);
  }, []);
  const R = ee => {
      const B = n.current;
      B && B.scrollTo({
        left: (Math.round(B.scrollLeft / A) + ee) * A,
        behavior: "smooth"
      });
    },
    H = ee => {
      const B = n.current;
      if (!B) return;
      const D = Math.round(B.scrollLeft / A),
        L = (D % at + at) % at;
      let $ = ee - L;
      $ > at / 2 && ($ -= at), $ < -at / 2 && ($ += at), B.scrollTo({
        left: (D + $) * A,
        behavior: "smooth"
      });
    },
    F = [...en, ...en, ...en],
    C = "flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--card-border)] bg-[color:var(--card)] text-[color:var(--ink)] shadow-sm transition hover:bg-[color:var(--btn-dark-hover)] hover:text-[color:var(--on-dark)] cursor-pointer";
  return <div><div ref={n} onScroll={k} className={"flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-8 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"} style={{
      gap: f,
      width: "100vw",
      marginLeft: "calc(50% - 50vw)",
      paddingLeft: y,
      paddingRight: y,
      scrollPaddingLeft: y,
      overscrollBehaviorX: "contain"
    }}>{F.map((ee, B) => {
        const D = B % at;
        return <div key={B} className={"flex min-h-[530px] shrink-0 snap-start select-none [&>*]:h-auto [&>*]:w-full"} style={{
          width: h,
          flexBasis: h
        }}><Mc diff={ee} idx={D} /></div>;
      })}</div><div className="flex items-center justify-center gap-4"><button type="button" aria-label="Попередня картка" onClick={() => R(-1)} className={C}><ChevronLeft className="h-5 w-5" /></button><div className="flex items-center gap-2">{en.map((ee, B) => <button key={B} type="button" aria-label={`Перейти до картки ${B + 1}`} onClick={() => H(B)} className="h-2.5 cursor-pointer rounded-full transition-all duration-300" style={{
          width: s === B ? 28 : 10,
          background: s === B ? "var(--peach-deep)" : "color-mix(in srgb, var(--ink) 35%, transparent)"
        }} />)}</div><button type="button" aria-label="Наступна картка" onClick={() => R(1)} className={C}><ChevronRight className="h-5 w-5" /></button></div></div>;
};

export const Wq = () => {
  const n = useReducedMotion(),
    s = React.useRef(null),
    [o, i] = React.useState(() => typeof window < "u" ? window.innerWidth : 1280),
    [d, x] = React.useState(() => typeof window < "u" ? window.innerHeight : 800);
  React.useEffect(() => {
    const k = () => {
      i(window.innerWidth), x(window.innerHeight);
    };
    return window.addEventListener("resize", k), () => window.removeEventListener("resize", k);
  }, []);
  const p = o >= 1024,
    f = o < 340 ? 590 : o < 385 ? 555 : o < 640 ? 535 : 590,
    b = o < 640 ? Math.min(380, o - 56) : 390,
    y = Math.round(b / 2 / Math.tan(Math.PI / at) * 1.1),
    j = p ? Math.max(0.68, Math.min(1, (d - 270) / (f + 20))) : 1,
    h = useMotionValue(0),
    A = useSpring(h, {
      stiffness: 70,
      damping: 18,
      mass: 0.9
    }),
    {
      scrollYProgress: U
    } = useScroll({
      target: s,
      offset: ["start start", "end end"]
    });
  useMotionValueEvent(U, "change", k => {
    if (!p) return;
    const R = Math.max(0, Math.min(1, k)) * (at - 1),
      H = Math.floor(R),
      F = R - H,
      C = F < 0.5 ? 4 * F * F * F : 1 - Math.pow(-2 * F + 2, 3) / 2;
    h.set((H + C) * Kl);
  }), React.useEffect(() => {
    p && h.set(0);
  }, [p, h]);
  const [v, w] = React.useState(0);
  return useMotionValueEvent(A, "change", k => {
    const R = (Math.round(k / Kl) % at + at) % at;
    w(H => H === R ? H : R);
  }), n ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{en.map((k, R) => <div key={R} className="min-h-[520px]"><Mc diff={k} idx={R} /></div>)}</div> : (f * j + 20, `${j}`, ke.div, useTransform(A, k => `translateZ(${-y}px) rotateY(${-k}deg)`), en.map((k, R) => <Rq key={R} diff={k} idx={R} angle={A} cardW={b} R={y} CARD_H={f} />), p ? <C_zq /> : <Hq cardW={b} cardH={f} />);
};

export const WhyChoosePointB = () => {
  const {
      navigateTo: n,
      openLeadModal: s,
      cases: o,
      contactInfo: i
    } = useSite(),
    d = React.useRef(null);
  React.useEffect(() => {
    const A = Array.from(document.querySelectorAll(".pb-rv"));
    if (typeof IntersectionObserver > "u") {
      A.forEach(v => v.classList.add("pb-rv-in"));
      return;
    }
    const U = new IntersectionObserver(v => {
      v.forEach(w => {
        w.isIntersecting && (w.target.classList.add("pb-rv-in"), U.unobserve(w.target));
      });
    }, {
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.06
    });
    return A.forEach(v => U.observe(v)), () => U.disconnect();
  }, []);
  const [x, p] = React.useState(false);
  React.useEffect(() => {
    if (x) return;
    const A = new IntersectionObserver(v => {
        v.forEach(w => {
          w.isIntersecting && (p(true), A.disconnect());
        });
      }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }),
      U = d.current || document.getElementById("stats-section");
    return U && A.observe(U), () => A.disconnect();
  }, [x]);
  const f = o.filter(A => A.showOnHome).slice(0, 3),
    b = f.length > 0 ? f : o.slice(0, 3),
    y = [...b, ...o.filter(A => !b.some(U => U.id === A.id))].slice(0, 4),
    j = [{
      text: "Ми дуже задоволені співпрацею! Усі налаштування CRM були виконані чітко та у строки, система працює саме так, як ми і планували. Команда із задоволенням працює в новій CRM — процеси стали простішими та прозорішими. Дякуємо за професіоналізм і увагу до деталей!",
      author: "Руслан Тольба",
      role: "СЕО та співвласник Ukrainian Solar",
      photo: "/assets/rev-ruslan-v3.webp"
    }, {
      text: "Point B не просто підключили CRM, а зробили так, щоб вона лягла на наші внутрішні процеси.",
      author: "Кріс Художнікова",
      role: "Директорка з маркетингу Minelly",
      photo: "/assets/rev-kris-v3.webp"
    }, {
      text: "Команда завжди на зв’язку, моментально реагує на всі запитання та уточнення. Також деталізовані та продумані брифи — це суттєво зекономило наш час при наданій інформації.",
      author: "Катерина Кушнірьова",
      role: "Співвласниця Osik Barefoot",
      photo: "/assets/rev-kateryna-v3.webp"
    }],
    h = [{
      id: "crm",
      number: "01",
      tag: "CRM / ERP",
      title: "Впровадження keyCRM",
      description: "Комплексна побудова відділу продажів та операційної системи: всі комунікації в одному вікні, клієнти, замовлення, залишки, каса і склад.",
      bullets: ["Маркетплейси, доставка, каса і комунікація в одній системі", "Автоматичні ТТН, чеки ПРРО та статуси без затримок", "Навчаємо команду на ваших процесах"],
      ctaText: "Замовити впровадження",
      leadSource: "Головна - Секція keyCRM",
      icon: Layers
    }, {
      id: "bots",
      number: "02",
      tag: "Штучний інтелект & Боти",
      title: "Бот на зв'язку 24/7\u00A0— і для клієнтів, і для команди",
      description: "Боти для Instagram, Facebook, TikTok, Telegram, Viber і сайту: кваліфікують звернення, відповідають, оформлюють замовлення й передають дані в CRM.",
      bullets: ["Відповідає клієнту за секунди й оформлює заявку в переписці", "Передає готового клієнта менеджеру", "Працює цілодобово, а в CRM видно шлях від реклами до прибутку"],
      ctaText: "Розробити AI-агента",
      leadSource: "Головна - Секція AI-ботів",
      icon: Bot
    }, {
      id: "analytics",
      number: "03",
      tag: "Кастомна розробка",
      title: "Власна CRM-система",
      description: "Власна система для нестандартних процесів: кілька юросіб, особливі статуси, складна логістика чи виробництво.",
      bullets: ["100% власність на систему й код, без щомісячних платежів", "Архітектура під ваші процеси, без обмежень коробкових рішень", "Інтеграція з сайтами, складом, фінансами, банками та логістикою"],
      ctaText: "Обговорити власну CRM",
      leadSource: "Головна - Секція власної CRM",
      icon: CodeXml
    }];
  return <div className="bg-transparent min-h-screen text-[color:var(--ink)] selection:bg-[color:var(--lime)]/25 selection:text-[color:var(--ink)] font-manrope"><C_fq openLeadModal={s} onScrollToCases={() => {
      const A = document.getElementById("cases-section");
      A == null || A.scrollIntoView({
        behavior: "smooth"
      });
    }} onSelectService={A => {
      const U = document.getElementById("services-section");
      U == null || U.scrollIntoView({
        behavior: "smooth"
      });
    }} /><div id="bridge-hero-to-stats" aria-hidden="true" className="relative z-10 h-0" /><section id="stats-section" ref={d} className="theme-dark pb-sec relative z-10"><div className="py-16 sm:py-24 lg:py-32"><div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-rv"><div className="grid grid-cols-1 md:grid-cols-3 border-t border-[color:var(--line)] md:border-t-0">{D1.map((A, U) => <div key={U} className={`py-6 sm:py-8 md:py-4 px-0 md:px-8 lg:px-12 ${U === 0 ? "md:pl-0 lg:pl-0" : "md:border-l md:border-[color:var(--line)]"} ${U > 0 ? "border-t border-[color:var(--line)] md:border-t-0" : ""} flex flex-col justify-between group`}><div className="text-6xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] font-semibold font-namu leading-[0.95] tabular-nums text-[color:var(--ink)]"><Nq value={A.value} start={x} delayMs={U * 100} durationMs={1750} /></div><div className="mt-3 sm:mt-4 space-y-1"><div className="text-[14px] sm:text-sm md:text-[15px] font-semibold font-mono uppercase tracking-wider text-[color:var(--ink)]">{A.label}</div>{A.sub && <div className="text-base font-manrope font-normal leading-relaxed text-[color:var(--ink-soft)]">({A.sub})</div>}</div></div>)}</div></div></div></section><div id="service-cards-container" className="pb-sec relative z-20"><ServicesList services={h} openLeadModal={s} /></div><section id="why-us-section" className="theme-dark pb-sec relative z-20 py-20 sm:py-28 lg:py-40 text-[color:var(--ink)] overflow-x-clip"><div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10"><div className="max-w-3xl mb-10 sm:mb-16 pb-rv"><div className="flex items-center gap-2 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)] mb-2"><span>Чому ми</span></div><h2 className="pb-h2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] font-namu uppercase sm:tracking-tight leading-[1.08]"><Ir>Чому обирають Point B</Ir></h2><p className="text-[color:var(--ink-soft)] text-base sm:text-base mt-2 sm:mt-3 leading-relaxed font-manrope">Практичні стандарти роботи, сфокусовані на вашому результаті, стабільній операційці та контролі бізнесу.</p></div><Wq /></div></section><div id="bridge-why-to-cases" aria-hidden="true" className="relative z-20 h-0" /><div className="relative z-30"><section id="cases-section" className="pb-sec relative z-30 pt-20 sm:pt-28 lg:pt-40 pb-20 sm:pb-28 lg:pb-40 text-[color:var(--ink)] overflow-x-clip"><div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10"><div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-0 md:gap-6 pb-0 pb-rv"><div><div className="flex items-center gap-2 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)] mb-2"><span>Результати клієнтів</span></div><h2 className="pb-h2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] font-namu uppercase sm:tracking-tight"><Ir>Реальні цифри впровадження</Ir></h2></div><button id="home-all-cases-btn" onClick={() => n("cases")} className="inline-flex items-center gap-2 py-3 text-sm font-semibold text-[color:var(--ink)] hover:text-[color:var(--ink)] transition-colors group cursor-pointer font-manrope uppercase tracking-wider"><span>Усі кейси ({o.length})</span><ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button></div><div className="md:hidden flex flex-col gap-6">{b.map(A => <div key={A.id} className="shadow-none h-full"><CaseCard item={A} onSelect={n} idPrefix="home-case-card" /></div>)}</div><div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">{(y.length >= 4 ? y : b).map((A, U) => <div key={A.id} className={U >= 3 ? "lg:hidden" : ""}><CaseCard item={A} onSelect={n} idPrefix="home-case-card-d" /></div>)}</div></div></section><section id="reviews-section" className="theme-dark pb-sec relative z-30 py-20 sm:py-28 lg:py-40 text-[color:var(--ink)] overflow-hidden"><div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10"><div className="mb-10 sm:mb-16 max-w-3xl pb-rv"><h2 className="pb-h2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] font-namu uppercase sm:tracking-tight leading-[1.08]"><Ir>Що кажуть клієнти</Ir></h2></div><div className={"max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:-mx-5 max-md:px-5 max-md:scroll-px-5 max-md:pb-2 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"} style={{
            WebkitOverflowScrolling: "touch"
          }}>{Array.from({
              length: 3
            }).map((A, U) => <div key={U} className={"max-md:snap-start max-md:shrink-0 max-md:w-[86%] flex [&>*]:w-full"}><ReviewCard review={j[U]} /></div>)}</div></div></section><section id="cta-section" className="pb-sec relative z-40 py-20 sm:py-28 lg:py-40"><div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16"><div className="cta-card rounded-2xl sm:rounded-3xl cta-flow-bg text-[color:var(--cta-text)] p-6 sm:p-12 lg:p-16 relative overflow-hidden text-center pb-rv"><div data-cta-col className="cta-col max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--cta-accent)] bg-[color:var(--cta-badge-bg)] border border-[color:var(--cta-badge-border)]"><span>Наступний крок</span></div><h2 className="pb-h2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--cta-text)] font-namu uppercase sm:tracking-tight leading-[1.08]"><Ir>Готові дізнатися, що можна автоматизувати вже цього місяця?</Ir></h2><p className="text-[color:var(--cta-text)] text-base sm:text-base leading-relaxed max-w-2xl mx-auto font-manrope">Залиште заявку — підберемо рішення під ваші процеси й порахуємо вартість.</p><div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto"><button id="home-cta-bottom-lead" onClick={() => s("Нижній CTA головної сторінки")} className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-8 py-3.5 sm:py-4 rounded-full bg-[#1111a1] hover:bg-[#1B2E8C] shadow-[0_10px_26px_-8px_rgba(17,17,68,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] border border-[#1111a1] text-[#F4F7FF] font-bold text-base active:scale-98 transition-all flex items-center justify-center gap-2 font-manrope group cursor-pointer uppercase tracking-wider"><span>Залишити заявку</span><ArrowRight className="w-4 h-4 text-[#F4F7FF] transition-transform group-hover:translate-x-1" /></button><a id="home-cta-bottom-telegram" href={`https://t.me/${i.telegram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-h-[52px] sm:min-h-[56px] px-4 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[color:var(--cta-text)]/45 bg-transparent hover:bg-[color:var(--cta-text)]/10 hover:border-[color:var(--cta-text)]/70 text-[color:var(--cta-text)] font-semibold text-[15px] sm:text-base whitespace-nowrap active:scale-98 transition-all flex items-center justify-center gap-2 font-manrope uppercase tracking-wide sm:tracking-wider"><Send className="w-4 h-4 text-[color:var(--cta-text)]" /><span>Написати в Telegram</span></a></div><div className="pt-2 sm:pt-4 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--cta-accent)]">Попередній розрахунок — безкоштовно</div></div></div></div></section></div></div>;
};

