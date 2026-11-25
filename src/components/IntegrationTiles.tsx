import {
  Workflow, Phone, Receipt, Truck, Mail, ShoppingCart, ShoppingBag, Boxes, Factory,
  CreditCard, MessageSquareText, Store, Database, Plug, type LucideIcon,
} from "lucide-react";
import { siTelegram, siInstagram, siViber, siGoogleads, siMeta, siNotion, siAnthropic } from "simple-icons";

type Brand = { path: string; title: string };
type Rule = { re: RegExp; brand?: Brand; icon?: LucideIcon; cat: string };

const RULES: Rule[] = [
  { re: /keycrm|кей\s*срм/i, icon: Workflow, cat: "CRM-система" },
  { re: /telegram/i, brand: siTelegram, cat: "Месенджер" },
  { re: /instagram/i, brand: siInstagram, cat: "Соцмережа" },
  { re: /viber/i, brand: siViber, cat: "Месенджер" },
  { re: /google\s*ads/i, brand: siGoogleads, cat: "Реклама" },
  { re: /meta\s*ads/i, brand: siMeta, cat: "Реклама" },
  { re: /notion/i, brand: siNotion, cat: "База знань" },
  { re: /anthropic/i, brand: siAnthropic, cat: "AI" },
  { re: /binotel|телефон/i, icon: Phone, cat: "Телефонія" },
  { re: /checkbox|ппро|прро/i, icon: Receipt, cat: "Фіскалізація" },
  { re: /нова\s*пошта/i, icon: Truck, cat: "Доставка" },
  { re: /укрпошта/i, icon: Mail, cat: "Доставка" },
  { re: /rozetka|розетка/i, icon: ShoppingBag, cat: "Маркетплейс" },
  { re: /хорошоп|horoshop|opencart|shopify|woocommerce/i, icon: Store, cat: "Інтернет-магазин" },
  { re: /еквайринг|iban|оплат/i, icon: CreditCard, cat: "Оплата" },
  { re: /sms/i, icon: MessageSquareText, cat: "Сповіщення" },
  { re: /склад/i, icon: Boxes, cat: "Облік" },
  { re: /виробництв/i, icon: Factory, cat: "Модуль" },
  { re: /api|інтеграц/i, icon: Plug, cat: "Інтеграція" },
];

export default function IntegrationTiles({ items }: { items: string[] }) {
  return (
    <div className="pb-int">
      {items.map((raw, i) => {
        const name = raw.replace(/\bKeyCRM\b/g, "keyCRM").replace(/\bКЕЙ СРМ\b/g, "кей СРМ");
        const r = RULES.find((x) => x.re.test(name));
        const Icon = r?.icon ?? (r?.brand ? undefined : Database);
        return (
          <div className="pb-int-t" key={i}>
            <span className={`pb-int-i${r?.brand ? " pb-int-i--brand" : ""}`} aria-hidden="true">
              {r?.brand ? (
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d={r.brand.path} /></svg>
              ) : Icon ? (
                <Icon size={26} strokeWidth={1.8} />
              ) : null}
            </span>
            <span className="pb-int-n">{name}</span>
            <span className="pb-int-c">{r?.cat ?? "Інтеграція"}</span>
          </div>
        );
      })}
    </div>
  );
}
