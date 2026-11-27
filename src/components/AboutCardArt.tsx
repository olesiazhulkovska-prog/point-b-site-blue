import "./AboutCardArt.css";

/** Анімовані ілюстрації для карток «Три напрямки роботи» (чистий SVG + CSS). */
const Kanban = () => (
  <svg viewBox="0 0 320 150" className="aca aca--kanban" role="img" aria-label="Воронка замовлень у CRM">
    {[16, 117, 218].map((x, i) => (
      <g key={x}>
        <rect x={x} y="14" width="86" height="8" rx="4" className="aca-bar" />
        <rect x={x} y="30" width="86" height="104" rx="8" className="aca-col" />
        {(i === 1 ? [38] : [38, 70]).map((y) => (
          <g key={y}>
            <rect x={x + 6} y={y} width="74" height="26" rx="6" className="aca-card" />
            <rect x={x + 13} y={y + 7} width="36" height="4" rx="2" className="aca-ln" />
            <rect x={x + 13} y={y + 15} width="22" height="4" rx="2" className="aca-ln aca-ln--s" />
          </g>
        ))}
      </g>
    ))}
    <g className="aca-mv">
      <rect x="0" y="0" width="74" height="26" rx="6" className="aca-card aca-card--hot" />
      <rect x="7" y="7" width="40" height="4" rx="2" className="aca-hot" />
      <rect x="7" y="15" width="24" height="4" rx="2" className="aca-ln aca-ln--s" />
    </g>
  </svg>
);

const Chat = () => (
  <svg viewBox="0 0 320 150" className="aca aca--chat" role="img" aria-label="Діалог клієнта з AI-агентом">
    <g className="aca-c1">
      <rect x="16" y="14" width="150" height="28" rx="10" className="aca-b-in" />
      <rect x="28" y="23" width="96" height="4" rx="2" className="aca-ln" />
      <rect x="28" y="31" width="60" height="4" rx="2" className="aca-ln aca-ln--s" />
    </g>
    <g className="aca-c2">
      <rect x="150" y="52" width="154" height="30" rx="10" className="aca-b-out" />
      <circle cx="172" cy="67" r="3.2" className="aca-d d1" />
      <circle cx="184" cy="67" r="3.2" className="aca-d d2" />
      <circle cx="196" cy="67" r="3.2" className="aca-d d3" />
    </g>
    <g className="aca-c3">
      <rect x="150" y="52" width="154" height="38" rx="10" className="aca-b-out" />
      <rect x="164" y="63" width="112" height="4" rx="2" className="aca-w" />
      <rect x="164" y="72" width="76" height="4" rx="2" className="aca-w aca-w--s" />
    </g>
    <g className="aca-c4">
      <rect x="16" y="104" width="176" height="30" rx="15" className="aca-pill" />
      <circle cx="33" cy="119" r="8" className="aca-hot" />
      <path d="m29 119 3 3 5-6" className="aca-ck" />
      <rect x="49" y="116" width="120" height="5" rx="2.5" className="aca-ln" />
    </g>
  </svg>
);

const Code = () => (
  <svg viewBox="0 0 320 150" className="aca aca--code" role="img" aria-label="Розробка власної CRM-системи">
    <rect x="16" y="14" width="156" height="120" rx="10" className="aca-win" />
    <circle cx="30" cy="27" r="3" className="aca-hot" />
    <circle cx="41" cy="27" r="3" className="aca-ln" />
    <circle cx="52" cy="27" r="3" className="aca-ln" />
    {[[30, 100], [30, 70], [44, 110], [44, 56], [44, 90], [30, 84]].map(([dx, w], i) => (
      <rect key={i} x={16 + dx - 4} y={44 + i * 14} width={w} height="5" rx="2.5" className={"aca-code k" + (i + 1)} />
    ))}
    <path d="M172 74 H204" className="aca-wire" />
    {[28, 62, 96].map((y, i) => (
      <g key={y} className={"aca-mod m" + (i + 1)}>
        <rect x="204" y={y} width="100" height="26" rx="8" className="aca-card" />
        <rect x="214" y={y + 8} width="10" height="10" rx="3" className={i === 2 ? "aca-hot" : "aca-ico"} />
        <rect x="232" y={y + 11} width="54" height="4" rx="2" className="aca-ln" />
      </g>
    ))}
  </svg>
);

export const AboutCardArt = ({ kind }: { kind: number }) => (
  <div className="aca-wrap">{kind === 0 ? <Kanban /> : kind === 1 ? <Chat /> : <Code />}</div>
);
