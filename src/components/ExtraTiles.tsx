import {
  BarChart3, Building2, KeyRound, Layers, LifeBuoy, MessageCircle,
  MessageSquare, Send, ShieldCheck, Smartphone, Phone, PlayCircle,
  type LucideIcon,
} from "lucide-react";
import { siTelegram, siInstagram, siViber, siWhatsapp, siMessenger } from "simple-icons";

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
const BRANDS: [RegExp, { path: string; title: string }][] = [
  [/telegram/i, siTelegram],
  [/instagram/i, siInstagram],
  [/viber/i, siViber],
  [/whatsapp/i, siWhatsapp],
  [/messenger/i, siMessenger],
];

function BrandTiles({ items }: { items: string[] }) {
  return (
    <div className="pbxt pbxt--brand">
      {items.map((t, i) => {
        const m = t.match(/^(.*?)\s*\((.*)\)\s*$/);
        const name = m ? m[1] : t;
        const desc = m ? m[2] : "";
        const icons = BRANDS.filter(([r]) => r.test(t)).map(([, ic]) => ic);
        return (
          <div className="pbxt__t pbxt__t--brand" key={i}>
            <span className="pbxt__logos" aria-hidden="true">
              {icons.map((ic) => (
                <svg key={ic.title} viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
                  <path d={ic.path} />
                </svg>
              ))}
            </span>
            <span className="pbxt__name">{name}</span>
            {desc && <span className="pbxt__desc">{desc}</span>}
          </div>
        );
      })}
    </div>
  );
}

const FALLBACK: LucideIcon[] = [PlayCircle, Phone, BarChart3, LifeBuoy];

export default function ExtraTiles({ items }: { items: string[] }) {
  if (items.some((t) => BRANDS.some(([r]) => r.test(t)))) return <BrandTiles items={items} />;
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
