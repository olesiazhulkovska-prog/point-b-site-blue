// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from 'react';
import { Check } from 'lucide-react';
import { Hl } from '../shared/Hl';
import { C_oi } from '../shared/C_oi';
import { Ie } from '../shared/Ie';
import { ke } from '../shared/ke';

export const C_sq = ({
  light: n
}) => <span className="inline-flex items-center gap-1 md:gap-[0.5cqw]" aria-label="друкує">{[0, 1, 2].map(s => <span key={s} className="block rounded-full w-1.5 h-1.5 md:w-[0.8cqw] md:h-[0.8cqw] pb-typing-dot" style={{
    background: "var(--ink)",
    animationDelay: `${s * 0.16}s`
  }} />)}</span>;

export const rq = n => {
  const [s, o] = React.useState(0),
    [i, d] = React.useState(false),
    [x, p] = React.useState(false),
    [f, b] = React.useState(false);
  return React.useEffect(() => {
    var U;
    if (!n) return;
    if ((U = window.matchMedia) == null ? undefined : U.call(window, "(prefers-reduced-motion: reduce)").matches) {
      o(3), p(true);
      return;
    }
    let j = [];
    const h = (v, w) => {
        j.push(window.setTimeout(w, v));
      },
      A = () => {
        b(false), o(0), d(false), p(false), h(500, () => o(1)), h(1500, () => d(true)), h(3e3, () => {
          d(false), o(2);
        }), h(4400, () => o(3)), h(5400, () => p(true)), h(10200, A);
      };
    return A(), () => j.forEach(v => window.clearTimeout(v));
  }, [n]), {
    n: s,
    typing: i,
    badge: x,
    hide: f
  };
};

export const _o = n => ({
  initial: false,
  animate: {
    opacity: n ? 1 : 0,
    y: n ? 0 : 12,
    scale: n ? 1 : 0.94
  },
  transition: {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const AiChatSimulator = ({
  play: n = true
}) => {
  const {
      n: s,
      typing: o,
      badge: i,
      hide: d
    } = rq(n),
    x = {
      background: "var(--chat-client)",
      color: "var(--ink)",
      border: "1px solid var(--card-border)"
    };
  return <div className="h-full w-full rounded-3xl md:rounded-[2.4cqw] p-4 md:p-[2cqw] flex flex-col gap-3 md:gap-[1.3cqw]" style={Hl}><div className="flex items-center justify-between gap-2"><C_oi>AI-агент</C_oi><span className="flex items-center gap-1.5 text-[14px] md:text-[max(14px,1.3cqw)] font-mono uppercase tracking-wider" style={{
        color: Ie.text
      }}><span className="w-1.5 h-1.5 md:w-[0.8cqw] md:h-[0.8cqw] rounded-full bg-[color:var(--peach)] animate-pulse" />24/7</span></div><ke.div className="flex flex-col gap-2 md:gap-[1cqw] font-manrope" animate={{
      opacity: d ? 0 : 1
    }} transition={{
      duration: 0.6
    }}><ke.div {..._o(s >= 1)} className="self-start max-w-[90%] rounded-2xl rounded-bl-md md:rounded-[1.4cqw] md:rounded-bl-[0.4cqw] px-3 py-2 md:px-[1.3cqw] md:py-[0.9cqw] text-[14px] md:text-[max(14px,1.6cqw)] leading-snug" style={x}>{"Чи є розмір M? Скільки коштує доставка до Одеси?"}</ke.div><div className="relative self-end max-w-[90%]"><ke.div {..._o(s >= 2)} className="rounded-2xl rounded-br-md md:rounded-[1.4cqw] md:rounded-br-[0.4cqw] px-3 py-2 md:px-[1.3cqw] md:py-[0.9cqw] text-[14px] md:text-[max(14px,1.6cqw)] leading-snug font-medium" style={{
          background: "var(--chat-bot)",
          color: "var(--ink)"
        }}>{"Вітаю!\nТак, розмір M є в наявності, доставка до Одеси коштує 70 ₴. Оформити замовлення?"}</ke.div><ke.div {..._o(o)} className="absolute right-0 top-0 rounded-2xl rounded-br-md md:rounded-[1.4cqw] md:rounded-br-[0.4cqw] px-3.5 py-2.5 md:px-[1.5cqw] md:py-[1.1cqw]" style={{
          background: "var(--chat-bot)"
        }}><C_sq /></ke.div></div><ke.div {..._o(s >= 3)} className="self-start max-w-[90%] rounded-2xl rounded-bl-md md:rounded-[1.4cqw] md:rounded-bl-[0.4cqw] px-3 py-2 md:px-[1.3cqw] md:py-[0.9cqw] text-[14px] md:text-[max(14px,1.6cqw)] leading-snug" style={x}>Так, оформлюйте</ke.div></ke.div><ke.div className="mt-auto flex items-center gap-2 md:gap-[0.9cqw] self-stretch rounded-2xl md:rounded-[1.6cqw] px-3 py-2 md:px-[1.3cqw] md:py-[0.9cqw] text-[14px] md:text-[max(14px,1.45cqw)] leading-tight font-semibold font-manrope" style={{
      background: "var(--tint-strong)",
      color: Ie.cream,
      border: "1px solid rgba(var(--bar-rgb),0.4)"
    }} animate={{
      opacity: i && !d ? 1 : 0,
      y: i && !d ? 0 : 10,
      scale: i && !d ? 1 : 0.95
    }} transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }}><Check className="shrink-0 w-3.5 h-3.5 md:w-[max(14px,1.8cqw)] md:h-[max(14px,1.8cqw)]" style={{
        color: Ie.text
      }} /><span>Замовлення створено в CRM</span></ke.div></div>;
};

