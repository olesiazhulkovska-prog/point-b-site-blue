import React from "react";

const INK = "#111144";
const BLUE = "#F98A1B";
const SOFT = "#E8EDFF";
const LINE = "#DCE3F8";
const MID = "#B9C4F0";
const ACC = "#C9D3FF";

const Svg = ({ vb, children }: { vb: string; children: React.ReactNode }) => (
  <svg
    viewBox={vb}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

const Check = ({ x, y, on = true }: { x: number; y: number; on?: boolean }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="22" height="22" rx="7" fill={on ? BLUE : "#fff"} stroke={on ? BLUE : MID} strokeWidth="1.5" strokeDasharray={on ? "0" : "3 3"} />
    {on && <path d="M6 11.5l3.4 3.4L16 8" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
  </g>
);

/* 01 Аналіз і брифінг: чекліст + схема процесу */
const Brief = () => (
  <Svg vb="0 0 560 190">
    <rect x="0" y="6" width="250" height="178" rx="18" fill={SOFT} stroke={LINE} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <Check x={22} y={26 + i * 50} on={i < 2} />
        <rect x="54" y={31 + i * 50} width={[150, 120, 96][i]} height="8" rx="4" fill={i < 2 ? INK : MID} opacity={i < 2 ? 0.85 : 1} />
        <rect x="54" y={45 + i * 50} width={[100, 140, 70][i]} height="6" rx="3" fill={MID} opacity=".7" />
      </g>
    ))}
    <g fill="none" stroke={MID} strokeWidth="2" strokeLinecap="round">
      <path d="M290 54h34M290 54l-6-5M290 54l-6 5" opacity="0" />
      <path d="M392 56v28M392 126v-16" strokeDasharray="4 5" />
      <path d="M338 96h-0M452 96h30" strokeDasharray="4 5" />
    </g>
    <rect x="300" y="24" width="92" height="42" rx="12" fill="#fff" stroke={LINE} />
    <rect x="316" y="40" width="44" height="8" rx="4" fill={BLUE} />
    <rect x="300" y="126" width="92" height="42" rx="12" fill="#fff" stroke={LINE} />
    <rect x="316" y="142" width="58" height="8" rx="4" fill={MID} />
    <rect x="426" y="75" width="120" height="42" rx="12" fill={BLUE} />
    <rect x="442" y="91" width="64" height="8" rx="4" fill="#fff" />
    <circle cx="526" cy="96" r="5" fill={ACC} />
    <path d="M392 45h18q16 0 16 20v10M392 147h18q16 0 16-20v-10" fill="none" stroke={MID} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

/* 02 Налаштування системи: воронка зі стадіями */
const Setup = () => (
  <Svg vb="0 0 240 190">
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={i * 82} y="6" width="72" height="22" rx="8" fill={i === 1 ? BLUE : SOFT} stroke={i === 1 ? BLUE : LINE} />
        <rect x={i * 82 + 14} y="14" width="40" height="6" rx="3" fill={i === 1 ? "#fff" : MID} />
        {[0, 1, 2].slice(0, 3 - i).map((j) => (
          <g key={j}>
            <rect x={i * 82} y={38 + j * 46} width="72" height="38" rx="10" fill="#fff" stroke={LINE} />
            <rect x={i * 82 + 10} y={48 + j * 46} width="38" height="6" rx="3" fill={INK} opacity=".8" />
            <rect x={i * 82 + 10} y={60 + j * 46} width="24" height="5" rx="2.5" fill={j === 0 && i === 1 ? ACC : MID} />
          </g>
        ))}
      </g>
    ))}
    <g transform="translate(150 140)">
      <rect width="84" height="42" rx="21" fill="#fff" stroke={LINE} />
      <rect x="10" y="12" width="40" height="18" rx="9" fill={BLUE} />
      <circle cx="41" cy="21" r="6" fill="#fff" />
      <circle cx="66" cy="21" r="5" fill={MID} />
    </g>
  </Svg>
);

/* 03 Фіскалізація: чек + QR + статус */
const Fiscal = () => (
  <Svg vb="0 0 240 190">
    <path d="M30 4h110v170l-11-8-11 8-11-8-11 8-11-8-11 8-11-8-11 8-11-8z" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="48" y="22" width="58" height="8" rx="4" fill={INK} opacity=".85" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="48" y={44 + i * 16} width={[64, 50, 58][i]} height="5" rx="2.5" fill={MID} />
        <rect x="116" y={44 + i * 16} width="12" height="5" rx="2.5" fill={MID} />
      </g>
    ))}
    <g fill={INK}>
      {[[0,0],[1,0],[2,0],[4,0],[0,1],[2,1],[3,1],[0,2],[1,2],[2,2],[4,2],[1,3],[3,3],[4,3],[0,4],[2,4],[3,4]].map(([a, b], k) => (
        <rect key={k} x={50 + a * 9} y={100 + b * 9} width="7" height="7" rx="1.5" />
      ))}
    </g>
    <g transform="translate(150 104)">
      <rect width="86" height="48" rx="14" fill={SOFT} stroke={LINE} />
      <circle cx="24" cy="24" r="12" fill="#2BB673" />
      <path d="M18 24.5l4.5 4.5 8-9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="42" y="16" width="34" height="6" rx="3" fill={INK} opacity=".8" />
      <rect x="42" y="28" width="24" height="5" rx="2.5" fill={MID} />
    </g>
  </Svg>
);

/* 04 Документи і регламенти: аркуші + матриця прав */
const Docs = () => (
  <Svg vb="0 0 560 190">
    <g transform="rotate(-6 70 100)">
      <rect x="22" y="22" width="120" height="152" rx="12" fill="#fff" stroke={LINE} />
    </g>
    <rect x="52" y="14" width="128" height="160" rx="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
    <rect x="70" y="34" width="60" height="9" rx="4.5" fill={BLUE} />
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x="70" y={58 + i * 17} width={[92, 80, 90, 62, 76][i]} height="6" rx="3" fill={MID} opacity={i % 2 ? 0.7 : 1} />
    ))}
    <circle cx="152" cy="146" r="10" fill={ACC} />
    <path d="M147 146l3.4 3.4L157 142" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <g transform="translate(236 14)">
      <rect width="310" height="160" rx="16" fill={SOFT} stroke={LINE} />
      {["Перегляд", "Редагування", "Звіти", "Оплати"].map((t, c) => (
        <rect key={t} x={118 + c * 46} y="16" width="34" height="6" rx="3" fill={INK} opacity=".7" />
      ))}
      {["Власник", "Менеджер", "Бухгалтер"].map((r, i) => (
        <g key={r}>
          <circle cx="26" cy={58 + i * 40} r="12" fill={i === 0 ? BLUE : "#fff"} stroke={i === 0 ? BLUE : MID} />
          <rect x="46" y={54 + i * 40} width="46" height="7" rx="3.5" fill={INK} opacity=".8" />
          {[0, 1, 2, 3].map((c) => {
            const on = [[1,1,1,1],[1,1,0,0],[1,0,1,1]][i][c] === 1;
            return <Check key={c} x={124 + c * 46} y={47 + i * 40} on={on} />;
          })}
        </g>
      ))}
    </g>
  </Svg>
);

/* 05 Навчання та супровід: відео + чат + прогрес */
const Learn = () => (
  <Svg vb="0 0 240 190">
    <rect x="0" y="4" width="150" height="92" rx="14" fill={BLUE} />
    <circle cx="75" cy="50" r="22" fill="#fff" />
    <path d="M68 38l20 12-20 12z" fill={BLUE} />
    <rect x="14" y="80" width="90" height="5" rx="2.5" fill="#fff" opacity=".35" />
    <rect x="14" y="80" width="54" height="5" rx="2.5" fill={ACC} />
    <g transform="translate(96 74)">
      <path d="M12 0h112a12 12 0 0112 12v38a12 12 0 01-12 12H44l-14 14v-14H12A12 12 0 010 50V12A12 12 0 0112 0z" fill="#fff" stroke={LINE} />
      <rect x="16" y="16" width="86" height="7" rx="3.5" fill={INK} opacity=".8" />
      <rect x="16" y="32" width="60" height="6" rx="3" fill={MID} />
    </g>
    <g transform="translate(0 150)">
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={i * 46} y="0" width="40" height="8" rx="4" fill={i < 3 ? BLUE : LINE} />
      ))}
      <rect x="0" y="18" width="70" height="6" rx="3" fill={MID} />
    </g>
  </Svg>
);

/* 06 Аудит і підтримка: графік + щит */
const Audit = () => (
  <Svg vb="0 0 240 190">
    <rect x="0" y="6" width="170" height="122" rx="16" fill={SOFT} stroke={LINE} />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M16 ${40 + i * 30}H154`} stroke={LINE} strokeWidth="1.5" />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={20 + i * 27} y={104 - [24, 40, 34, 62, 78][i]} width="16" height={[24, 40, 34, 62, 78][i]} rx="5" fill={i === 4 ? BLUE : MID} />
    ))}
    <path d="M20 84 L58 62 L85 70 L112 40 L140 24" fill="none" stroke="#1B2E8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="140" cy="24" r="5" fill="#fff" stroke="#1B2E8C" strokeWidth="3" />
    <g transform="translate(150 96)">
      <path d="M44 0l38 14v30c0 24-16 40-38 48C22 84 6 68 6 44V14z" fill="#fff" stroke={LINE} strokeWidth="1.5" transform="scale(.9)" />
      <path d="M26 46l11 11 20-22" fill="none" stroke={BLUE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <rect x="0" y="146" width="70" height="26" rx="13" fill={BLUE} />
    <rect x="14" y="156" width="42" height="6" rx="3" fill="#fff" />
  </Svg>
);

const ART = [Brief, Setup, Fiscal, Docs, Learn, Audit];

export function KeyCrmStepArt({ index }: { index: number }) {
  const C = ART[index];
  return C ? <C /> : null;
}
