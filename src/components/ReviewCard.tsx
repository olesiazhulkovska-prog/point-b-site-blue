// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { Quote } from 'lucide-react';

export const ReviewCard = ({
  review: n,
  className: s = ""
}) => {
  const o = !n;
  return <figure className={`relative flex h-full flex-col justify-between rounded-2xl border p-6 sm:p-7 ${s}`} style={{
    background: "var(--card)",
    borderColor: o ? "rgba(var(--bar-rgb),0.55)" : "var(--card-border)",
    borderStyle: o ? "dashed" : "solid"
  }}><Quote className="absolute right-5 top-5 h-8 w-8" style={{
      color: "var(--bar)",
      opacity: 0.45
    }} /><blockquote className="pr-8 font-manrope text-base leading-relaxed text-[color:var(--ink)]">{o ? <span className="space-y-2 block" aria-label="Місце для відгуку клієнта"><span className="block text-[color:var(--ink-soft)] italic">«Тут буде відгук клієнта — кілька речень про результат впровадження.»</span></span> : <span className="italic">«{n.text}»</span>}</blockquote><figcaption className="mt-5 flex items-center gap-3 border-t border-[color:var(--card-border)] pt-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--tint)] font-manrope text-sm font-bold text-[color:var(--accent-green)] overflow-hidden">{o ? "?" : n.photo ? <img src={n.photo} alt={n.author} width={48} height={48} loading="lazy" className="pb-rev-photo h-full w-full object-cover" /> : n.author.charAt(0)}</div><div className="min-w-0"><div className="font-manrope text-sm font-bold text-[color:var(--ink)]">{o ? "Ім’я Прізвище" : n.author}</div><div className="font-manrope text-[14px] text-[color:var(--ink-soft)]">{o ? "Посада, компанія" : n.role}</div></div></figcaption></figure>;
};

