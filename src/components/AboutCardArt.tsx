import { Layers, Boxes, Receipt, Zap, Bot, Check, Building2, CodeXml, Package } from "lucide-react";
import { CHANNEL_ICONS } from "./AboutHeroScene";
import "./AboutCardArt.css";

/** Анімовані мініатюри продукту для карток «Три напрямки роботи» (HTML + CSS, цикл 8 с). */
const COLS = [
  { t: "Нові", n: 3, c: [["Андрій М.", "2 480 ₴"], ["Олена К.", "1 240 ₴"]] },
  { t: "В роботі", n: 4, c: [["Ірина Л.", "3 150 ₴"]] },
  { t: "Успішні", n: 12, c: [["Наталя Т.", "5 600 ₴"], ["Олег С.", "1 760 ₴"]] },
];

const Crm = () => (
  <div className="acx__in acx__crm" role="img" aria-label="Воронка замовлень у keyCRM">
    <div className="acx__hd">
      <span className="acx__logo"><Layers strokeWidth={2} /></span>
      <b>Воронка продажів</b>
      <i>21 угода</i>
    </div>
    <div className="acx__cols">
      {COLS.map((col) => (
        <div key={col.t} className="acx__col">
          <div className="acx__ch"><span>{col.t}</span><em>{col.n}</em></div>
          {col.c.map(([n, a]) => (
            <div key={n} className="acx__k"><b>{n}</b><span>{a}</span></div>
          ))}
        </div>
      ))}
      <div className="acx__mv"><b>Марія Ш.</b><span>1 890 ₴</span></div>
    </div>
    <div className="acx__tags">
      <span><Boxes strokeWidth={2} />Склад</span>
      <span><Receipt strokeWidth={2} />ПРРО</span>
      <span><Zap strokeWidth={2} />Тригери</span>
    </div>
  </div>
);


const Mascot = () => (
  <>
    <div className="acx__bot" aria-hidden="true">
      <svg viewBox="0 0 100 150">
        <path className="acx__ant a1" d="M24 38C13 29 11 13 22 6" />
        <path className="acx__ant a2" d="M76 38C87 29 89 13 78 6" />
        <g className="acx__lleg"><rect x="37" y="106" width="10" height="17" rx="5" className="mw" /><ellipse cx="42" cy="125" rx="8.5" ry="4.2" className="mn" /></g>
        <g className="acx__rleg"><rect x="53" y="106" width="10" height="17" rx="5" className="mw" /><ellipse cx="58" cy="125" rx="8.5" ry="4.2" className="mn" /></g>
        <g className="acx__larm"><rect x="25" y="70" width="9" height="28" rx="4.5" className="mw" /><circle cx="29.5" cy="100" r="5" className="mn" /></g>
        <rect x="30" y="62" width="40" height="46" rx="18" className="mw" />
        <rect x="40" y="78" width="20" height="10" rx="2.5" className="mn" />
        <text x="50" y="85" textAnchor="middle" className="mt">POINT B</text>
        <g className="acx__rarm"><rect x="66" y="70" width="9" height="28" rx="4.5" className="mw" /><circle cx="70.5" cy="100" r="5.5" className="mn" /></g>
        <ellipse cx="50" cy="38" rx="28" ry="25" className="mw" />
        <circle cx="22" cy="40" r="5" className="mn" />
        <circle cx="78" cy="40" r="5" className="mn" />
        <rect x="26" y="26" width="48" height="25" rx="12.5" className="mv" />
        <g className="acx__eyes"><path d="M35 41q4.5-7 9 0" /><path d="M56 41q4.5-7 9 0" /></g>
      </svg>
    </div>
    <div className="acx__say">Привіт! Я AI-агент Point B</div>
  </>
);

const Chat = () => (
  <div className="acx__in acx__chat" role="img" aria-label="Діалог клієнта з AI-агентом">
    <Mascot />
    <div className="acx__hd">
      <span className="acx__logo acx__logo--hot"><Bot strokeWidth={2} /></span>
      <b>AI-агент</b>
      <u>онлайн</u>
      <div className="acx__chn">{CHANNEL_ICONS.map((I, i) => <I key={i} />)}</div>
    </div>
    <div className="acx__msgs">
      <div className="acx__m acx__m--c m1">Чи є розмір M? Скільки коштує доставка до Одеси?</div>
      <div className="acx__m acx__m--a m2">
        <span className="acx__txt">Так, розмір M є. Доставка — 70 ₴. Оформити замовлення?</span>
        <span className="acx__typ"><i /><i /><i /></span>
      </div>
      <div className="acx__m acx__m--c m3">Так, оформлюйте</div>
      <div className="acx__ok m4"><span><Check strokeWidth={3} /></span>Замовлення створено в CRM</div>
    </div>
  </div>
);

const Code = () => (
  <div className="acx__in acx__code" role="img" aria-label="Розробка власної CRM-системи">
    <div className="acx__win">
      <div className="acx__bar"><i /><i /><i /><span>crm-core.ts</span></div>
      <pre className="acx__src">
        <span className="l1"><s>module</s> Orders {"{"}</span>
        <span className="l2">  roles: owner, manager</span>
        <span className="l3">  entity: Client, Order</span>
        <span className="l4">  legalEntities: <s>3</s></span>
        <span className="l5">  sync: "1С", "Telegram"</span>
        <span className="l6">{"}"}</span>
      </pre>
      <div className="acx__build"><Check strokeWidth={3} />build ok</div>
    </div>
    <div className="acx__mods">
      <div className="acx__mod m1"><span><Building2 strokeWidth={2} /></span><div><b>Юрособи</b><em>до 3 компаній</em></div></div>
      <div className="acx__mod m2"><span><Package strokeWidth={2} /></span><div><b>Склад і залишки</b><em>облік онлайн</em></div></div>
      <div className="acx__mod m3 is-hot"><span><CodeXml strokeWidth={2} /></span><div><b>Власний код</b><em>100% ваш</em></div></div>
    </div>
  </div>
);

export const AboutCardArt = ({ kind }: { kind: number }) => (
  <div className="acx" aria-hidden={false}>
    <div className="acx__s">{kind === 0 ? <Crm /> : kind === 1 ? <Chat /> : <Code />}</div>
  </div>
);
