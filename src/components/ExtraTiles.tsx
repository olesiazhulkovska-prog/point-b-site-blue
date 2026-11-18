import {
  BarChart3, Building2, KeyRound, Layers, LifeBuoy, MessageCircle,
  MessageSquare, Send, ShieldCheck, Smartphone, Phone, PlayCircle,
  type LucideIcon,
} from "lucide-react";

const RULES: [RegExp, LucideIcon][] = [
  [/відео/i, PlayCircle],
  [/дзвін/i, Phone],
  [/рекоменд|аналіт/i, BarChart3],
  [/супровод/i, LifeBuoy],
  [/telegram/i, Send],
  [/instagram/i, MessageCircle],
  [/viber/i, Smartphone],
  [/whatsapp|messenger/i, MessageSquare],
  [/середньому|великому/i, Building2],
  [/готова crm|кастомізац/i, Layers],
  [/незалежн|ліценз/i, KeyRound],
  [/безпек|сервер/i, ShieldCheck],
];
const FALLBACK: LucideIcon[] = [PlayCircle, Phone, BarChart3, LifeBuoy];

export default function ExtraTiles({ items }: { items: string[] }) {
  return (
    <div className="pbxt">
      {items.map((t, i) => {
        const Icon = RULES.find(([r]) => r.test(t))?.[1] ?? FALLBACK[i % FALLBACK.length];
        return (
          <div className="pbxt__t" key={i}>
            <span className="pbxt__i"><Icon size={26} strokeWidth={1.7} /></span>
            <span className="pbxt__x">{t}</span>
          </div>
        );
      })}
    </div>
  );
}
