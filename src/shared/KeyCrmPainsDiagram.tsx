// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { Check } from "lucide-react";
import { ownerPains } from "./ownerPains";
import { painsPalette } from "./painsPalette";
import { aiOrderFlowSteps } from "./aiOrderFlowSteps";
export const KeyCrmPainsDiagram = () => {
  const n = React.useRef(null),
    [s, o] = React.useState(false),
    [i, d] = React.useState(0);
  (React.useEffect(() => {
    const h = n.current;
    if (!h || typeof IntersectionObserver > "u") {
      o(true);
      return;
    }
    const A = new IntersectionObserver(
      (U) => o(U.some((v) => v.isIntersecting)),
      {
        threshold: 0.5,
      },
    );
    return (A.observe(h), () => A.disconnect());
  }, []),
    React.useEffect(() => {
      var U;
      if (
        (U = window.matchMedia) == null
          ? undefined
          : U.call(window, "(prefers-reduced-motion: reduce)").matches
      ) {
        d(5);
        return;
      }
      if (!s) return;
      const A = window.setInterval(() => d((v) => (v >= 6 ? 0 : v + 1)), 1250);
      return () => window.clearInterval(A);
    }, [s]));
  const x = (h) => i >= h + 1,
    p = (h) => i >= ownerPains[h].step + 1,
    f = (h) => ((h + 0.5) / 4) * 100,
    b = (h, A = false) => {
      const U = p(h);
      return (
        <div
          key={h}
          className={`relative h-full rounded-2xl ${A ? "px-3 py-2.5" : "px-[1.9cqw] py-[1.3cqw]"} flex flex-col justify-center transition-all duration-700`}
          style={{
            border: U
              ? "1.5px solid rgba(var(--bar-rgb),0.85)"
              : "1px dashed rgba(17,17,68,0.6)",
            background: U
              ? "linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7)), rgba(var(--lime-rgb),0.35)"
              : "rgba(255,255,255,0.55)",
            opacity: U ? 1 : 0.96,
          }}
        >
          <div className="flex items-start gap-2">
            <span
              className={`${A ? "text-[14px]" : "text-[max(14px,2.3cqw)]"} font-manrope font-semibold leading-snug flex-1`}
              style={{
                color: U ? painsPalette.cream : painsPalette.sand,
              }}
            >
              {ownerPains[h].title}
            </span>
            <span
              className="shrink-0 grid place-items-center rounded-full w-5 h-5 transition-all duration-700"
              style={{
                background: U ? painsPalette.patina : "transparent",
                opacity: U ? 1 : 0,
                color: "#FFFFFF",
              }}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
            </span>
          </div>
          <span
            className={`${A ? "text-[14px]" : "text-[max(14px,1.9cqw)]"} font-manrope leading-snug mt-1`}
            style={{
              color: painsPalette.sand,
              opacity: 0.85,
            }}
          >
            {ownerPains[h].sub}
          </span>
        </div>
      );
    },
    y = (h, A = false) => {
      const U = x(h),
        { Icon: C_v } = aiOrderFlowSteps[h];
      return (
        <div
          key={h}
          className={`relative h-full rounded-2xl ${A ? "px-3 py-2.5" : "px-[1.9cqw] py-[1.3cqw]"} flex items-center gap-3 transition-all duration-700`}
          style={{
            border: `1.5px solid ${U ? "rgba(var(--bar-rgb),0.95)" : "rgba(var(--bar-rgb),0.85)"}`,
            background: U
              ? "linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), rgba(var(--lime-rgb),0.6)"
              : "rgba(255,255,255,0.7)",
            boxShadow: U ? "0 0 0 3px rgba(var(--accent-rgb),0.18)" : "none",
            opacity: U ? 1 : 0.95,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className={`shrink-0 grid place-items-center rounded-xl ${A ? "w-8 h-8" : "w-[4.6cqw] h-[4.6cqw] min-w-8 min-h-8"}`}
            style={{
              background: "rgba(var(--peach-deep-rgb),0.16)",
              color: "var(--peach-deep)",
              border: "1px solid rgba(var(--peach-deep-rgb),0.55)",
            }}
          >
            <C_v className={A ? "w-4 h-4" : "w-[55%] h-[55%]"} />
          </span>
          <span className="min-w-0 flex flex-col leading-snug">
            <span
              className={`${A ? "text-[14px]" : "text-[max(14px,2.3cqw)]"} font-manrope font-bold`}
              style={{
                color: painsPalette.cream,
              }}
            >
              {aiOrderFlowSteps[h].title}
            </span>
            <span
              className={`${A ? "text-[14px]" : "text-[max(14px,1.9cqw)]"} font-manrope`}
              style={{
                color: painsPalette.sand,
                opacity: 0.9,
              }}
            >
              {aiOrderFlowSteps[h].sub}
            </span>
          </span>
          {h === i - 1 && i <= 4 && (
            <span
              className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-ping"
              style={{
                background: painsPalette.bar,
              }}
            />
          )}
        </div>
      );
    },
    j = (h, A) => (
      <div
        className="h-7 flex items-center text-[14px] font-mono uppercase tracking-wider"
        style={{
          color: A ? painsPalette.gold : painsPalette.sand,
          opacity: A ? 1 : 0.8,
        }}
      >
        {h}
      </div>
    );
  return (
    <div ref={n} className="w-full select-none">
      <div
        className="hidden md:block w-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "1fr 13% 1fr",
          }}
        >
          <div className="flex flex-col">
            {j("До: що болить")}
            <div className="grid grid-rows-4 flex-1 min-h-[400px]">
              {ownerPains.map((h, A) => (
                <div key={A} className="py-[5px]">
                  {b(A)}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-7" />
            <div className="relative w-full flex-1">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {ownerPains.map((h, A) => {
                  const U = f(A),
                    v = f(Math.min(h.step, 3)),
                    w = p(A),
                    k = `M0 ${U} C55 ${U} 45 ${v} 100 ${v}`;
                  return (
                    <path
                      key={A}
                      d={k}
                      fill="none"
                      stroke={w ? painsPalette.patina : "rgba(17,17,68,0.6)"}
                      strokeWidth={w ? 2 : 1.2}
                      strokeDasharray={w ? undefined : "3 4"}
                      vectorEffect="non-scaling-stroke"
                      style={{
                        transition: "all .7s",
                      }}
                    />
                  );
                })}
              </svg>
              <div
                className="absolute left-[42%] right-0 flex flex-col items-center"
                style={{
                  top: `${f(0)}%`,
                  transform: "translateY(-50%)",
                }}
              >
                <span
                  className="text-[14px] font-mono uppercase tracking-wider mb-1"
                  style={{
                    color: painsPalette.gold,
                  }}
                >
                  {""}
                </span>
                <div
                  className="relative w-full h-px"
                  style={{
                    background:
                      i >= 1 ? painsPalette.bar : "rgba(var(--bar-rgb),0.85)",
                    transition: "background .7s",
                  }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse-orange-dot"
                    style={{
                      background: "var(--peach-deep)",
                    }}
                  />
                  <span
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
                    style={{
                      borderTop: "4px solid transparent",
                      borderBottom: "4px solid transparent",
                      borderLeft: `6px solid ${painsPalette.bar}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {j("Після: шлях замовлення", true)}
            <div className="grid grid-rows-4 flex-1 min-h-[400px]">
              {aiOrderFlowSteps.map((h, A) => (
                <div key={A} className="py-[5px]">
                  {y(A)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden w-full flex flex-col px-3 py-3">
        {j("Було")}
        <div className="flex flex-col gap-1.5">
          {ownerPains.map((h, A) => (
            <div key={A} className="min-h-[40px]">
              {b(A, true)}
            </div>
          ))}
        </div>
        <div className="mx-auto flex flex-col items-center my-2">
          <div
            className="w-px h-3"
            style={{
              background: painsPalette.patina,
            }}
          />
          <span
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `7px solid ${painsPalette.patina}`,
            }}
          />
        </div>
        {j("Стало", true)}
        <div className="flex flex-col">
          {aiOrderFlowSteps.map((h, A) => (
            <div key={A} className="flex flex-col">
              {A > 0 && (
                <div
                  className="mx-auto w-px h-3 my-0.5"
                  style={{
                    background: x(A)
                      ? painsPalette.bar
                      : "rgba(var(--bar-rgb),0.85)",
                    transition: "background .7s",
                  }}
                />
              )}
              {y(A, true)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
