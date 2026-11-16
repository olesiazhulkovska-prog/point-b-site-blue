import React from "react";

/* Ілюстрації кроків «Що ми робимо» (keyCRM): міні-інтерфейси з підписами,
   щоб з картинки було зрозуміло, що саме робиться на кроці. Простір 276 × 198. */
const INK = "#111144";
const ORG = "#F98A1B";
const IND = "#2431A4";
const SOFT = "#EEF2FF";
const LINE = "#D5DDFA";
const MID = "#B9C4F0";
const GRN = "#1FA971";
const MUTED = "#5B6499";
const FONT = 'Manrope, "Inter Variable", system-ui, sans-serif';

const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 276 198" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" fontFamily={FONT}>
    {children}
  </svg>
);

const T = ({ x, y, size = 13, weight = 500, fill = INK, anchor, children }: { x: number; y: number; size?: number; weight?: number; fill?: string; anchor?: "start" | "middle" | "end"; children: React.ReactNode }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor}>{children}</text>
);

const Panel = ({ w = 268, h = 186 }: { w?: number; h?: number }) => (
  <rect x="4" y="6" width={w} height={h} rx="18" fill={SOFT} stroke={LINE} />
);

const Tick = ({ x, y, color = ORG, r = 9 }: { x: number; y: number; color?: string; r?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={color} />
    <path d={`M${-r * 0.45} ${r * 0.05}l${r * 0.33} ${r * 0.35} ${r * 0.62}-${r * 0.75}`} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Pill = ({ x, y, w, h = 22, fill = "#fff", stroke = LINE, children }: { x: number; y: number; w: number; h?: number; fill?: string; stroke?: string; children?: React.ReactNode }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} />
    {children}
  </g>
);

/* 01 Аналіз і брифінг: технічне завдання з чеклістом */
const Brief = () => (
  <Svg>
    <Panel />
    <Pill x={20} y={20} w={34} h={22} fill={ORG} stroke={ORG}>
      <T x={17} y={15} size={12} weight={700} fill="#fff" anchor="middle">ТЗ</T>
    </Pill>
    <T x={64} y={36} size={15} weight={700}>Технічне завдання</T>
    {["Бізнес-процеси", "Ролі співробітників", "Модель продажів", "Очікування"].map((l, i) => (
      <g key={l} transform={`translate(18 ${58 + i * 33})`}>
        <rect width="240" height="27" rx="10" fill="#fff" stroke={LINE} />
        {i < 3 ? <Tick x={17} y={13.5} /> : <circle cx="17" cy="13.5" r="8.5" fill="#fff" stroke={MID} strokeWidth="1.6" strokeDasharray="3 3" />}
        <T x={34} y={18} size={13}>{l}</T>
        {i === 3 && <T x={230} y={18} size={11} weight={600} fill={ORG} anchor="end">узгоджуємо</T>}
      </g>
    ))}
  </Svg>
);

/* 02 Налаштування системи: воронка + інтеграції */
const Setup = () => (
  <Svg>
    <Panel />
    <T x={20} y={32} size={14} weight={700}>Воронка продажів</T>
    {[["Нова", 0], ["В роботі", 1], ["Оплата", 2]].map(([l, i]) => (
      <g key={l as string} transform={`translate(${18 + (i as number) * 82} 44)`}>
        <rect width="74" height="22" rx="8" fill={i === 1 ? ORG : "#fff"} stroke={i === 1 ? ORG : LINE} />
        <T x={37} y={15} size={12} weight={600} fill={i === 1 ? "#fff" : INK} anchor="middle">{l}</T>
        {[0, 1].slice(0, i === 2 ? 1 : 2).map((j) => (
          <g key={j} transform={`translate(0 ${30 + j * 26})`}>
            <rect width="74" height="20" rx="7" fill="#fff" stroke={LINE} />
            <rect x="8" y="6" width={[44, 34, 52][(i as number) + j - (i === 2 ? 1 : 0)] ?? 40} height="5" rx="2.5" fill={MID} />
            <rect x="8" y="13" width="20" height="3" rx="1.5" fill={LINE} />
          </g>
        ))}
      </g>
    ))}
    <T x={20} y={150} size={11} weight={600} fill={MUTED}>ІНТЕГРАЦІЇ</T>
    {["Сайт", "Telegram", "1С"].map((l, i) => (
      <Pill key={l} x={18 + [0, 72, 180][i]} y={158} w={[64, 100, 54][i]} h={24}>
        <circle cx="13" cy="12" r="4.5" fill={GRN} />
        <T x={24} y={16.5} size={12}>{l}</T>
      </Pill>
    ))}
  </Svg>
);

/* 03 Фіскалізація: чек і статуси */
const Fiscal = () => (
  <Svg>
    <path d="M18 8h118v170l-9.8-7-9.8 7-9.8-7-9.8 7-9.8-7-9.8 7-9.8-7-9.8 7-9.8-7-9.8 7-9.8-7-9.8 7z" transform="scale(1 1)" fill="#fff" stroke={LINE} />
    <T x={30} y={30} size={13} weight={700}>Чек № 1024</T>
    <T x={30} y={46} size={11} weight={500} fill={MUTED}>ПРРО</T>
    {[["Товар", "1 890"], ["Доставка", "120"]].map(([a, b], i) => (
      <g key={a}>
        <T x={30} y={72 + i * 18} size={12}>{a}</T>
        <T x={124} y={72 + i * 18} size={12} weight={600} anchor="end">{b} ₴</T>
      </g>
    ))}
    <line x1="30" y1="106" x2="124" y2="106" stroke={LINE} strokeDasharray="3 3" />
    <T x={30} y={124} size={12} weight={700}>Разом</T>
    <T x={124} y={124} size={13} weight={700} anchor="end">2 010 ₴</T>
    {Array.from({ length: 5 }).map((_, r) =>
      Array.from({ length: 5 }).map((__, c) =>
        ((r * 7 + c * 3 + r * c) % 3 !== 0 || (r + c) % 4 === 0) && (
          <rect key={`${r}${c}`} x={30 + c * 8} y={136 + r * 6.5} width="6" height="5" rx="1" fill={INK} />
        ),
      ),
    )}
    <Pill x={150} y={30} w={118} h={44} fill={SOFT}>
      <Tick x={20} y={22} color={GRN} r={10} />
      <T x={36} y={19} size={12} weight={600}>ПРРО</T>
      <T x={36} y={33} size={10} weight={500} fill={MUTED}>підключено</T>
    </Pill>
    <Pill x={150} y={86} w={118} h={44} fill={SOFT}>
      <Tick x={20} y={22} color={GRN} r={10} />
      <T x={36} y={19} size={12} weight={600}>Чек</T>
      <T x={36} y={33} size={10} weight={500} fill={MUTED}>фіскалізовано</T>
    </Pill>
    <Pill x={150} y={142} w={118} h={36} fill="#fff">
      <T x={59} y={22} size={11} weight={600} fill={IND} anchor="middle">з бухгалтером</T>
    </Pill>
  </Svg>
);

/* 04 Документи і регламенти: регламент + ролі */
const Docs = () => (
  <Svg>
    <g transform="translate(6 8)">
      <rect width="130" height="182" rx="14" fill="#fff" stroke={LINE} />
      <rect x="14" y="14" width="76" height="20" rx="10" fill={ORG} />
      <T x={52} y={28} size={11} weight={700} fill="#fff" anchor="middle">Регламент</T>
      {["Заявка", "В роботу", "Оплата й чек", "Відправка"].map((l, i) => (
        <g key={l} transform={`translate(14 ${46 + i * 31})`}>
          <circle cx="9" cy="9" r="9" fill={SOFT} stroke={LINE} />
          <T x={9} y={13.5} size={11} weight={700} fill={IND} anchor="middle">{i + 1}</T>
          <T x={26} y={13.5} size={12}>{l}</T>
        </g>
      ))}
    </g>
    <g transform="translate(148 8)">
      <rect width="124" height="182" rx="14" fill={SOFT} stroke={LINE} />
      <T x={14} y={28} size={12} weight={700}>Права доступу</T>
      {[["Менеджер", "заявки"], ["Бухгалтер", "оплати"], ["Адмін", "усе"]].map(([r, a], i) => (
        <g key={r} transform={`translate(10 ${44 + i * 46})`}>
          <rect width="104" height="38" rx="10" fill="#fff" stroke={LINE} />
          <circle cx="17" cy="19" r="9" fill={i === 2 ? ORG : MID} />
          <T x={32} y={16} size={12} weight={700}>{r}</T>
          <T x={32} y={30} size={11} weight={500} fill={MUTED}>{a}</T>
        </g>
      ))}
    </g>
  </Svg>
);

/* 05 Навчання та супровід: відеоінструкція + дзвінок */
const Learn = () => (
  <Svg>
    <Panel />
    <g transform="translate(18 18)">
      <rect width="150" height="96" rx="14" fill={ORG} />
      <circle cx="75" cy="42" r="21" fill="#fff" />
      <path d="M69 32v20l17-10z" fill={ORG} />
      <rect x="14" y="78" width="122" height="6" rx="3" fill="rgba(255,255,255,.45)" />
      <rect x="14" y="78" width="52" height="6" rx="3" fill="#fff" />
    </g>
    <T x={18} y={138} size={13} weight={700}>Відеоінструкції</T>
    <T x={18} y={154} size={11} weight={500} fill={MUTED}>по всіх сценаріях роботи</T>
    <Pill x={18} y={166} w={78} h={22} fill="#fff"><T x={39} y={15} size={11} weight={600} anchor="middle">Урок 1</T></Pill>
    <Pill x={102} y={166} w={66} h={22} fill="#fff"><T x={33} y={15} size={11} weight={600} anchor="middle">Урок 2</T></Pill>
    <g transform="translate(172 36)">
      <rect width="94" height="64" rx="14" fill="#fff" stroke={LINE} />
      <path d="M26 64l-4 12 14-12z" fill="#fff" stroke={LINE} />
      <path d="M24 63h14" stroke="#fff" strokeWidth="3" />
      <circle cx="22" cy="22" r="11" fill={SOFT} stroke={LINE} />
      <path d="M17.5 18.5c0 6 4 10 9 10l2-3-3.5-2-1.5 1.2c-1.8-.8-3-2-3.8-3.8l1.2-1.5-2-3.5z" fill={IND} />
      <T x={38} y={20} size={11} weight={700}>Дзвінок</T>
      <T x={38} y={34} size={11} weight={500} fill={MUTED}>навчання</T>
      <rect x="12" y="47" width="70" height="5" rx="2.5" fill={LINE} />
    </g>
    <g transform="translate(172 116)">
      <rect width="94" height="30" rx="10" fill="#fff" stroke={LINE} />
      <T x={47} y={19.5} size={11} weight={600} fill={IND} anchor="middle">Консультація</T>
    </g>
  </Svg>
);

/* 06 Аудит і підтримка: перевірка після запуску */
const Audit = () => (
  <Svg>
    <Panel />
    <T x={20} y={32} size={14} weight={700}>Перевірка після запуску</T>
    {["Інтеграції", "Автоматизації", "Права доступу"].map((l, i) => (
      <g key={l} transform={`translate(18 ${46 + i * 36})`}>
        <rect width="240" height="30" rx="10" fill="#fff" stroke={LINE} />
        <T x={14} y={20} size={13}>{l}</T>
        <Pill x={184} y={5} w={48} h={20} fill={SOFT} stroke={LINE}>
          <circle cx="12" cy="10" r="4" fill={GRN} />
          <T x={21} y={14.5} size={11} weight={700} fill={GRN}>OK</T>
        </Pill>
      </g>
    ))}
    <Pill x={18} y={156} w={172} h={28} fill={ORG} stroke={ORG}>
      <T x={86} y={19} size={12} weight={600} fill="#fff" anchor="middle">Супровід після запуску</T>
    </Pill>
    <g transform="translate(206 154)">
      <path d="M26 0l24 8v16c0 14-10 22-24 28C12 46 2 38 2 24V8z" fill="#fff" stroke={LINE} />
      <path d="M14 26l8 8 16-18" fill="none" stroke={ORG} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </Svg>
);

const ART = [Brief, Setup, Fiscal, Docs, Learn, Audit];

export function KeyCrmStepArt({ index }: { index: number }) {
  const C = ART[index];
  return C ? <C /> : null;
}
