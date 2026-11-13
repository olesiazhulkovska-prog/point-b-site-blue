// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { Ie } from './Ie';

export const C_oi = ({
  children: n,
  gold: s
}) => <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[14px] md:text-[1.35cqw] md:px-[1.2cqw] md:py-[0.45cqw] font-mono uppercase tracking-wider leading-none" style={{
  background: s ? "var(--tint)" : "rgba(255,255,255,0.6)",
  color: s ? Ie.text : Ie.cream,
  border: `1px solid ${s ? "rgba(var(--lime-rgb),0.7)" : "var(--card-border)"}`
}}>{n}</span>;

