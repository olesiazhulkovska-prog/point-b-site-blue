// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import React from "react";
import { Bot, Check, UserRound } from "lucide-react";
import { aiChatScenarios } from "./aiChatScenarios";
import { aiAgentParts } from "./aiAgentParts";
import { chatPalette } from "./chatPalette";
export const AiAgentFlowDiagram = ({ svc: SV }) => {
  const n = React.useRef(null),
    [s, o] = React.useState(false),
    [i, d] = React.useState(0),
    [x, p] = React.useState(0),
    [f, b] = React.useState(false),
    y = React.useRef([]),
    j = React.useRef([]),
    h = (B) => {
      B && !j.current.includes(B) && j.current.push(B);
    },
    A = () => {
      (y.current.forEach((B) => window.clearTimeout(B)), (y.current = []));
    },
    U = React.useCallback((B) => {
      var te;
      (A(), d(B), p(0), b(false));
      const D = aiChatScenarios[B].msgs;
      if (
        (te = window.matchMedia) == null
          ? undefined
          : te.call(window, "(prefers-reduced-motion: reduce)").matches
      ) {
        p(D.length);
        return;
      }
      let $ = 400;
      D.forEach((ae, re) => {
        (ae.kind === "agent" &&
          (y.current.push(window.setTimeout(() => b(true), $)), ($ += 900)),
          y.current.push(
            window.setTimeout(() => {
              (b(false), p(re + 1));
            }, $),
          ),
          ($ += ae.kind === "system" ? (ae.step === 2 ? 1500 : 1600) : 1800));
      });
    }, []);
  (React.useEffect(() => {
    const B = n.current;
    if (!B || typeof IntersectionObserver > "u") {
      o(true);
      return;
    }
    const D = new IntersectionObserver(
      (L) => {
        L.some(($) => $.isIntersecting) && (o(true), D.disconnect());
      },
      {
        threshold: 0.5,
      },
    );
    return (D.observe(B), () => D.disconnect());
  }, []),
    React.useEffect(() => (s && U(0), A), [s, U]),
    React.useEffect(() => {
      j.current.forEach((B) =>
        B.scrollTo({
          top: B.scrollHeight,
          behavior: "smooth",
        }),
      );
    }, [x, f]));
  const v = aiChatScenarios[i].msgs,
    w = v.slice(0, x),
    k = w[w.length - 1],
    R = k ? (k.kind === "system" ? k.step : 0) : -1,
    H = x >= v.length,
    F = {
      background: "var(--card)",
      border: "1px solid var(--card-border)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
    },
    C = (B) => (
      <div
        className={
          B ? "grid grid-cols-3 gap-2" : "flex flex-col justify-center gap-3"
        }
      >
        {aiAgentParts.map(({ title: D, sub: L0, Icon: $ }, te) => {
          const L = SV
              ? [
                  "Розуміє запити та відповідає",
                  "Зберігає дані клієнтів і замовлень",
                  "Підключається до складних діалогів",
                ][te]
              : L0,
            ae = R >= te && R !== -1,
            re = R === te;
          return (
            <div
              key={D}
              className={`relative rounded-2xl ${B ? "px-2 py-2 flex flex-col items-center text-center gap-1" : "px-3.5 py-3 flex items-center gap-3"} transition-all duration-500`}
              style={{
                border: `1.5px solid ${ae ? "rgba(var(--bar-rgb),0.9)" : "rgba(var(--bar-rgb),0.85)"}`,
                background: ae
                  ? "linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.85)), rgba(var(--lime-rgb),0.6)"
                  : "rgba(255,255,255,0.7)",
                boxShadow: re
                  ? "0 0 0 3px rgba(var(--accent-rgb),0.18)"
                  : "none",
                opacity: ae ? 1 : 0.95,
              }}
            >
              <span
                className="shrink-0 grid place-items-center rounded-xl w-9 h-9"
                style={{
                  background: "rgba(var(--peach-deep-rgb),0.16)",
                  color: "var(--peach-deep)",
                  border: "1px solid rgba(var(--peach-deep-rgb),0.55)",
                }}
              >
                <$ className="w-4 h-4" />
              </span>
              <span className="min-w-0 flex flex-col leading-snug">
                <span
                  className="text-[14px] sm:text-[14px] font-manrope font-bold"
                  style={{
                    color: chatPalette.cream,
                  }}
                >
                  {B ? null : (
                    <span
                      className="font-mono text-[14px] mr-1.5"
                      style={{
                        color: chatPalette.gold,
                      }}
                    >
                      0{te + 1}
                    </span>
                  )}
                  {D}
                </span>
                {!B && (
                  <span
                    className="text-[14px] font-manrope"
                    style={{
                      color: chatPalette.sand,
                    }}
                  >
                    {L}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    ),
    ee = (
      <div
        className="flex flex-col rounded-3xl overflow-hidden h-full"
        style={F}
      >
        <div
          className="flex items-center gap-2.5 px-4 py-3"
          style={{
            borderBottom: "1px solid var(--card-border)",
          }}
        >
          <span
            className="grid place-items-center w-9 h-9 rounded-full"
            style={{
              background: "var(--lime)",
              color: "var(--ink)",
            }}
          >
            <Bot className="w-[18px] h-[18px]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className="text-[14px] font-manrope font-bold"
              style={{
                color: chatPalette.cream,
              }}
            >
              AI-агент
            </span>
            <span
              className="flex items-center gap-1.5 text-[14px] font-manrope"
              style={{
                color: chatPalette.sand,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{
                  background: "#F98513",
                }}
              />
              {" на зв’язку 24/7"}
            </span>
          </span>
        </div>
        <div
          ref={h}
          className={
            "flex-1 min-h-0 overflow-y-auto px-3.5 py-3 flex flex-col gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {w.map((B, D) =>
            B.kind === "system" ? (
              <div
                key={D}
                className="self-center flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-manrope font-semibold text-center"
                style={{
                  background:
                    B.step === 1
                      ? "rgba(var(--lime-rgb),0.5)"
                      : "rgba(var(--lime-rgb),0.32)",
                  border: `1.5px solid ${B.step === 1 ? "rgba(var(--bar-rgb),0.85)" : "rgba(var(--bar-rgb),0.4)"}`,
                  color: chatPalette.cream,
                }}
              >
                {B.step === 1 ? (
                  <Check
                    className="w-3.5 h-3.5 shrink-0"
                    style={{
                      color: chatPalette.gold,
                    }}
                  />
                ) : (
                  <UserRound
                    className="w-3.5 h-3.5 shrink-0"
                    style={{
                      color: chatPalette.gold,
                    }}
                  />
                )}
                <span
                  className="font-mono text-[14px]"
                  style={{
                    color: chatPalette.gold,
                  }}
                >
                  {B.time}
                </span>
                {B.text}
              </div>
            ) : (
              <div
                key={D}
                className={`max-w-[86%] rounded-2xl px-3 py-2 ${B.kind === "client" ? "self-end rounded-br-md" : "self-start rounded-bl-md"}`}
                style={
                  B.kind === "client"
                    ? {
                        background: "var(--chat-client)",
                        border: "1px solid var(--card-border)",
                        color: "var(--ink)",
                      }
                    : {
                        background: "var(--chat-bot)",
                        border: "1.5px solid rgba(var(--bar-rgb),0.35)",
                        color: "var(--ink)",
                      }
                }
              >
                <div className="text-[13.5px] sm:text-[14px] font-manrope leading-snug">
                  {B.text}
                </div>
                <div className="text-[14px] font-mono mt-0.5 opacity-70 text-right">
                  {B.time}
                </div>
              </div>
            ),
          )}
          {f && (
            <div
              className="self-start flex items-center gap-1 rounded-2xl rounded-bl-md px-3 py-2.5"
              style={{
                background: "var(--chat-bot)",
                border: "1.5px solid rgba(var(--bar-rgb),0.35)",
              }}
            >
              {[0, 1, 2].map((B) => (
                <span
                  key={B}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{
                    background: chatPalette.sand,
                    animationDelay: `${B * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className="px-3 pb-3 pt-2 flex flex-col gap-1.5"
          style={{
            borderTop: "1px solid var(--card-border)",
          }}
        >
          <span
            className="text-[14px] font-mono uppercase tracking-wider"
            style={{
              color: chatPalette.sand,
              opacity: 0.8,
            }}
          >
            {H ? "Спробуйте інше запитання" : "Типові запитання клієнта"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {aiChatScenarios.map((B, D) => (
              <button
                key={B.id}
                type="button"
                onClick={() => U(D)}
                className="cursor-pointer rounded-full px-3.5 py-3 text-[14px] font-manrope font-medium text-left transition-colors"
                style={{
                  background:
                    D === i
                      ? "rgba(var(--lime-rgb),0.85)"
                      : "rgba(255,255,255,0.7)",
                  border: `1.5px solid ${D === i ? "rgba(var(--bar-rgb),0.95)" : "var(--card-border)"}`,
                  color: chatPalette.cream,
                }}
              >
                {B.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div ref={n} className="w-full select-none">
      <div
        className="hidden md:grid gap-4 items-stretch"
        style={{
          gridTemplateColumns: "1.55fr 1fr",
          height: 490,
        }}
      >
        {ee}
        {C(false)}
      </div>
      <div className="md:hidden flex flex-col gap-3 px-3 py-4">
        {C(true)}
        <div
          style={{
            height: 440,
          }}
        >
          {ee}
        </div>
      </div>
    </div>
  );
};
