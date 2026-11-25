import { useState } from "react";
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

const ROLES: [RegExp, string][] = [
  [/нова\s*пошта/i, "ТТН створюється автоматично"],
  [/укрпошта/i, "Відправлення з CRM"],
  [/checkbox|ппро|прро/i, "Чеки без ручної роботи"],
  [/binotel|телефон/i, "Дзвінки в картці клієнта"],
  [/instagram|telegram|viber/i, "Заявки одразу в CRM"],
  [/rozetka|розетка|хорошоп|horoshop|opencart|shopify|woocommerce/i, "Замовлення в одній стрічці"],
];

function norm(raw: string) {
  return raw.replace(/\bKeyCRM\b/g, "keyCRM").replace(/\bКЕЙ СРМ\b/g, "кей СРМ");
}

function Glyph({ name }: { name: string }) {
  const r = RULES.find((x) => x.re.test(name));
  const Icon = r?.icon ?? (r?.brand ? undefined : Database);
  return (
    <span className={`pb-int-i${r?.brand ? " pb-int-i--brand" : ""}`} aria-hidden="true">
      {r?.brand ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d={r.brand.path} /></svg>
      ) : Icon ? (
        <Icon size={22} strokeWidth={1.9} />
      ) : null}
    </span>
  );
}

export default function IntegrationTiles({ items }: { items: string[] }) {
  const [hot, setHot] = useState<number | null>(null);
  const names = items.map(norm);
  const hubIdx = names.findIndex((n) => /keycrm/i.test(n));
  const spokes = names.filter((_, i) => i !== hubIdx);

  // Без keyCRM або занадто багато систем — залишаємо просту сітку
  if (hubIdx < 0 || spokes.length < 2 || spokes.length > 10) {
    return (
      <div className="pb-int">
        {names.map((name, i) => {
          const r = RULES.find((x) => x.re.test(name));
          return (
            <div className="pb-int-t" key={i}>
              <Glyph name={name} />
              <span className="pb-int-n">{name}</span>
              <span className="pb-int-c">{r?.cat ?? "Інтеграція"}</span>
            </div>
          );
        })}
      </div>
    );
  }

  const n = spokes.length;
  const pts = spokes.map((_, i) => {
    const a = ((-90 + (360 / n) * (i + 0.5)) * Math.PI) / 180;
    return { x: 50 + 41 * Math.cos(a), y: 50 + 39 * Math.sin(a) };
  });

  return (
    <div className="pb-hub" onMouseLeave={() => setHot(null)}>
      <svg className="pb-hub-l" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {pts.map((p, i) => (
          <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} data-on={hot === i ? "" : undefined} />
        ))}
      </svg>
      <div className="pb-hub-c">
        <Glyph name={names[hubIdx]} />
        <b>{names[hubIdx]}</b>
        <small>центр екосистеми</small>
      </div>
      {spokes.map((name, i) => {
        const r = RULES.find((x) => x.re.test(name));
        const role = ROLES.find(([re]) => re.test(name))?.[1];
        return (
          <div
            key={i}
            className="pb-hub-n"
            data-on={hot === i ? "" : undefined}
            style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
            tabIndex={0}
            onMouseEnter={() => setHot(i)}
            onFocus={() => setHot(i)}
            onBlur={() => setHot(null)}
          >
            {role && <span className="pb-hub-role">{role}</span>}
            <Glyph name={name} />
            <span className="pb-hub-t">
              <b>{name}</b>
              <small>{r?.cat ?? "Інтеграція"}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}
