// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { ShieldCheck } from "lucide-react";
import { splitColumns } from "./splitColumns";
import { crmStageRows } from "./crmStageRows";
import { manualToolByStage } from "./manualToolByStage";
import { diagramPalette } from "./diagramPalette";
import { crmTemplateRows } from "./crmTemplateRows";
import { COLUMN_GAP } from "./COLUMN_GAP";
export const CustomCrmCompareDiagram = ({ svc: SV }) => {
  const n = React.useRef(null),
    [s, o] = React.useState(false),
    [i, d] = React.useState(5);
  (React.useEffect(() => {
    const k = n.current;
    if (!k || typeof IntersectionObserver > "u") {
      o(true);
      return;
    }
    const R = new IntersectionObserver(
      (H) => o(H.some((F) => F.isIntersecting)),
      {
        threshold: 0.5,
      },
    );
    return (R.observe(k), () => R.disconnect());
  }, []),
    React.useEffect(() => {
      var R;
      if (
        (R = window.matchMedia) != null &&
        R.call(window, "(prefers-reduced-motion: reduce)").matches
      ) {
        d(5);
        return;
      }
      if (!s) return;
      d(0);
      const k = window.setInterval(() => d((H) => (H >= 7 ? 0 : H + 1)), 1100);
      return () => window.clearInterval(k);
    }, [s]));
  const x = [100 / 6, 50, 500 / 6],
    [p, f] = splitColumns(crmStageRows[0].fr),
    [b] = splitColumns(crmStageRows[1].fr),
    [y, j] = splitColumns(crmStageRows[2].fr),
    h = [
      `M${p},${x[0]} L${f},${x[0]}`,
      `M${f},${x[0]} L${f},${x[1]} L${b},${x[1]}`,
      `M${b},${x[1]} L${b},${x[2]} L${j},${x[2]}`,
    ],
    A = splitColumns([1, 1]),
    U = `M${A[0]},${x[0]} L${A[1]},${x[0]} L${A[1]},${x[1]}`,
    v = `M${A[1] - 24},${x[1]} L${A[1] - 36},${x[1]}`,
    w = (k, R, H, F) => {
      const C = manualToolByStage[k],
        ee = R
          ? "none"
          : H === 1
            ? "translate(-4px,3px) rotate(-1.5deg)"
            : F === 0
              ? "translate(4px,0px) rotate(1.5deg)"
              : "translate(-3px,3px) rotate(-1.5deg)";
      return (
        <div
          key={k}
          className="relative flex items-center justify-center px-2"
          style={{
            transform: ee,
          }}
        >
          <div
            className="w-full min-h-[44px] flex flex-col items-center justify-center rounded-lg px-2 py-1.5 text-center"
            style={
              R
                ? {
                    background: "rgba(255,255,255,0.75)",
                    border: "1px solid var(--card-border)",
                    color: "var(--ink-soft)",
                  }
                : {
                    background: "rgba(255,255,255,0.75)",
                    border: "1px dashed rgba(var(--bar-rgb),0.95)",
                    color: "var(--ink)",
                  }
            }
          >
            <span className="font-manrope text-[14px] font-bold leading-tight">
              {k}
            </span>
            {C && (
              <span
                className="mt-0.5 font-mono text-[14px] leading-tight"
                style={{
                  color: diagramPalette.amber,
                }}
              >
                {C}
              </span>
            )}
          </div>
        </div>
      );
    };
  return (
    <div
      ref={n}
      className="flex h-full w-full flex-col justify-center gap-5 p-1 sm:p-3 min-h-[400px]"
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span
              className="font-mono text-[14px] uppercase tracking-wider"
              style={{
                color: "var(--ink)",
              }}
            >
              Типова CRM
            </span>
            <span
              className="font-mono text-[14px]"
              style={{
                color: "#A84300",
              }}
            >
              процес рветься
            </span>
          </div>
          <div className="relative">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d={U}
                fill="none"
                stroke="rgba(17,17,68,0.4)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={v}
                fill="none"
                stroke="rgba(var(--bar-rgb),0.95)"
                strokeWidth="1.5"
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div
              className="relative grid grid-rows-3"
              style={{
                gridAutoRows: "1fr",
              }}
            >
              {crmTemplateRows.map((k, R) => (
                <div
                  key={R}
                  className="grid grid-cols-2 py-2"
                  style={{
                    columnGap: `${COLUMN_GAP}%`,
                  }}
                >
                  {k.cells.map((H, F) => w(H, k.std[F], R, F))}
                </div>
              ))}
            </div>
          </div>
          <p
            className="mt-2 font-manrope text-[14px] leading-snug"
            style={{
              color: "var(--ink-soft)",
            }}
          >
            {SV
              ? "Нестандартні кроки живуть поза системою — в таблицях і чатах."
              : "Кроки поза системою"}
          </p>
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <span
              className="font-mono text-[14px] uppercase tracking-wider"
              style={{
                color: diagramPalette.gold,
              }}
            >
              Ваша CRM
            </span>
            <span
              className="font-mono text-[14px]"
              style={{
                color: diagramPalette.patina,
              }}
            >
              процес цілісний
            </span>
          </div>
          <div
            className="relative rounded-2xl p-2 transition-all duration-700"
            style={{
              border: `1.5px solid ${(i >= 4, "rgba(var(--bar-rgb),0.85)")}`,
              boxShadow: i >= 4 ? "0 0 28px rgba(var(--bar-rgb),0.2)" : "none",
              background: "rgba(255,255,255,0.45)",
            }}
          >
            <div className="relative">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {h.map((k, R) => (
                  <path
                    key={R}
                    d={k}
                    fill="none"
                    stroke={diagramPalette.bar}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      opacity: i > R ? 0.9 : 0,
                      transition: "opacity 0.6s",
                    }}
                  />
                ))}
              </svg>
              <div
                className="relative grid grid-rows-3"
                style={{
                  gridAutoRows: "1fr",
                }}
              >
                {crmStageRows.map((k, R) => (
                  <div
                    key={R}
                    className="grid py-2"
                    style={{
                      gridTemplateColumns: `${k.fr[0]}fr ${k.fr[1]}fr`,
                      columnGap: `${COLUMN_GAP}%`,
                    }}
                  >
                    {k.cells.map((H, F) => {
                      const C = i > R,
                        ee =
                          F === 0
                            ? "translate(-34px,8px) rotate(-3deg)"
                            : "translate(34px,-8px) rotate(3deg)";
                      return (
                        <div
                          key={H}
                          className="flex min-h-[44px] items-center justify-center rounded-lg px-2 py-1.5 text-center"
                          style={{
                            background: "var(--btn-dark)",
                            border: "1.5px solid rgba(var(--bar-rgb),0.95)",
                            color: "var(--on-dark)",
                            opacity: C ? 1 : 0.22,
                            transform: C ? "none" : ee,
                            transition: `transform 0.7s cubic-bezier(.2,.9,.3,1.2) ${F * 0.12}s, opacity 0.5s ${F * 0.12}s`,
                          }}
                        >
                          <span className="font-manrope text-[14px] font-bold leading-tight">
                            {H}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p
            className="mt-2 font-manrope text-[14px] font-semibold leading-snug"
            style={{
              color: diagramPalette.cream,
            }}
          >
            Система за формою вашого процесу
          </p>
          <div
            className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-manrope text-[14px] font-semibold transition-all duration-700"
            style={{
              border: "1.5px solid rgba(var(--bar-rgb),0.95)",
              color: diagramPalette.gold,
              background:
                i >= 4
                  ? "rgba(var(--lime-rgb),0.8)"
                  : "rgba(var(--lime-rgb),0.4)",
            }}
          >
            <ShieldCheck size={15} />
            {" 100% власність на систему і код"}
          </div>
        </div>
      </div>
    </div>
  );
};
