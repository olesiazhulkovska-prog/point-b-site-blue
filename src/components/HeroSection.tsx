// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { motion } from "motion/react";
// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import { ArrowUpRight, Bot, CodeXml, Layers } from "lucide-react";
import { useSite } from "../context/SiteContext";
export const Dp = (n) => ({
  initial: {
    opacity: 0,
    y: 36,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 1.1,
    delay: 0.15 + n * 2,
    ease: [0.22, 1, 0.36, 1],
  },
});
export const HeroSection = ({ onScrollToCases: n, onScrollToServices: s }) => {
  const { navigateTo: o } = useSite();
  return (
    <section
      id="hero-dark"
      className="theme-dark relative w-full min-h-[100svh] overflow-hidden flex flex-col justify-end bg-[#111144] text-[#F4F7FF]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(17,17,68,0.62) 0%, rgba(17,17,68,0.2) 55%, rgba(17,17,68,0.28) 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-5 sm:px-8 lg:px-[3vw] pt-28 lg:pt-32 pb-28 sm:pb-12 lg:pb-[4.5vw] flex flex-col flex-1 justify-between gap-12">
        <motion.nav {...Dp(0)} aria-label="Послуги" className="hero-fan">
          {[
            {
              p: "keycrm",
              t: "Впровадження keyCRM",
              I: Layers,
            },
            {
              p: "ai-bots",
              t: "Боти та AI-автоматизація",
              I: Bot,
            },
            {
              p: "analytics",
              t: "Власна CRM-система",
              I: CodeXml,
            },
          ].map((x, k) => (
            <button
              key={x.p}
              type="button"
              onClick={() => o(x.p)}
              className="hero-fan-card"
              style={{
                "--k": k,
              }}
            >
              <span className="hero-fan-ic">
                <x.I className="w-5 h-5" />
              </span>
              <span className="hero-fan-t">{x.t}</span>
              <ArrowUpRight className="hero-fan-ar" />
            </button>
          ))}
        </motion.nav>
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-[3.4vw]">
          <div className="pb-partner-badge">
            {"Офіційний партнер "}
            <b>keyCRM</b>
          </div>
          <motion.h1
            {...Dp(0.08)}
            data-hero-title
            className="font-manrope uppercase font-normal text-[#FFFFFF] [--h1:clamp(30px,8.2vw,52px)] sm:[--h1:clamp(40px,5.2vw,64px)] lg:[--h1:clamp(42px,3.1vw,68px)]"
            style={{
              fontSize: "var(--h1)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            <span className="block text-center">
              Впорядковуємо продажі, фінанси та рекламу — щоб ви
            </span>
            <span className="block text-center">
              <span key={"p"} className="hero-portal-slot" aria-hidden="true" />
              <span
                key={"t"}
                className="inline bg-[color:var(--accent)] text-[#FFFFFF] rounded-[10px] px-[0.18em] pb-[0.04em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] leading-[1.25]"
              >
                керовано зростали
              </span>
            </span>
          </motion.h1>
          <motion.div
            {...Dp(0.24)}
            className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-5"
          >
            <button
              id="hero-services-btn"
              data-cursor-label="До послуг ↓"
              onClick={s}
              className="group flex items-center justify-between gap-6 sm:gap-8 rounded-[10px] bg-[color:var(--accent)] hover:brightness-105 transition pl-5 sm:pl-8 pr-2 py-2 min-h-[64px] lg:min-h-[80px] cursor-pointer text-[#FFFFFF] font-manrope font-medium lowercase text-[20px] lg:text-[26px]"
            >
              <span>послуги</span>
              <span className="grid place-items-center rounded-[8px] bg-[#1111a1] w-12 h-12 lg:w-16 lg:h-16 transition-transform group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFFFFF]" />
              </span>
            </button>
            <button
              id="hero-cases-btn"
              data-cursor-label="До кейсів ↓"
              onClick={n}
              className="group flex items-center justify-between gap-6 sm:gap-8 rounded-[10px] bg-[#FFFFFF] hover:bg-[#F4F7FF] transition pl-5 sm:pl-8 pr-2 py-2 min-h-[64px] lg:min-h-[80px] cursor-pointer text-[#1111a1] font-manrope font-medium lowercase text-[20px] lg:text-[26px]"
            >
              <span>кейси впроваджень</span>
              <span className="grid place-items-center rounded-[8px] bg-[color:var(--accent)] w-12 h-12 lg:w-16 lg:h-16 transition-transform group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#FFFFFF]" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
