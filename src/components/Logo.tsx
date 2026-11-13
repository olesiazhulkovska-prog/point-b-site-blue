// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */

export function Logo({
  className: n = "",
  compact: s = false
}) {
  return <span className={`inline-flex items-baseline whitespace-nowrap uppercase leading-none ${n}`} style={{
    fontFamily: "'Inter Variable', Inter, sans-serif",
    fontWeight: 250,
    fontSize: s ? "1.7rem" : "1.6rem",
    letterSpacing: "-0.02em"
  }} aria-label="Point B">{!s && <span aria-hidden="true">{"Point "}</span>}<span aria-hidden="true" style={{
      color: "var(--accent)"
    }}>B</span></span>;
}

