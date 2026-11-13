// @ts-nocheck
/* Відновлено з прод-збірки; імена та типи доводяться вручну. */
import * as l from "react/jsx-runtime";
import { Mail, Phone, Send, ShieldCheck } from "lucide-react";
import { useSite } from "../context/SiteContext";
import { Logo } from "./Logo";

export const Xk = "./assets/dfb6afa590.png";

export const Bk = "./assets/e96477fed3.png";

export const Ik = [
  {
    src: Xk,
    key: "keycrm",
    alt: "keyCRM",
    cls: "h-6 sm:h-7",
    href: "https://ua.keycrm.app?join=VVAUGXJA",
  },
  {
    src: Bk,
    key: "bimp",
    alt: "Bimp",
    cls: "h-8 sm:h-10",
  },
];

export const Footer = () => {
  const { navigateTo: n, contactInfo: s } = useSite();
  return (
    <footer
      id="site-footer"
      className="theme-dark relative text-[color:var(--ink)] border-t border-dotted border-[color:var(--card-border)] overflow-hidden z-40 max-md:pb-[calc(92px+env(safe-area-inset-bottom))]"
    >
      <div className="absolute left-[34%] top-0 bottom-0 w-px border-r border-dotted border-[color:var(--card-border)] pointer-events-none hidden lg:block" />
      <div className="absolute left-[68%] top-0 bottom-0 w-px border-r border-dotted border-[color:var(--card-border)] pointer-events-none hidden lg:block" />
      <div className="relative z-10 border-b border-dotted border-[color:var(--card-border)] py-5 sm:py-6 flex items-center flex-wrap gap-y-3">
        <div className="shrink-0 pl-5 sm:pl-6 lg:pl-8 xl:pl-12 pr-4 sm:pr-6 flex items-center gap-2 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)]">
          <span className="w-2 h-2 rounded-full bg-[color:var(--lime)] shrink-0" />
          <span>Партнери</span>
        </div>
        <div className="flex items-center flex-wrap gap-y-3">
          {Ik.map((o) => {
            const i = (
              <img
                src={o.src}
                alt={o.alt}
                className={`${o.cls} w-auto object-contain [filter:var(--partner-filter)] group-hover:opacity-100 transition-opacity mx-6 sm:mx-10 shrink-0`}
              />
            );
            return o.href ? (
              <a
                key={o.key}
                id={`footer-partner-${o.key}`}
                href={o.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={o.alt}
                className="group inline-flex items-center min-h-11"
              >
                {i}
              </a>
            ) : (
              <span
                key={o.key}
                className="group inline-flex items-center min-h-11"
              >
                {i}
              </span>
            );
          })}
        </div>
      </div>
      <div className="relative z-10 max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-14 sm:pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-dotted border-[color:var(--card-border)]">
          <div className="md:col-span-5 space-y-4">
            <button
              id="footer-logo-btn"
              onClick={() => n("index")}
              className="flex items-center text-left focus:outline-none group cursor-pointer min-h-11"
            >
              <Logo className="text-[color:var(--ink)]" />
            </button>
            <p className="text-[color:var(--ink)]/80 text-base max-w-md leading-relaxed font-manrope">
              Систематизуємо продажі, комунікації та процеси бізнесу за
              допомогою CRM, AI та автоматизації.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
              <span>
                {"Офіційний партнер "}
                <span className="normal-case">keyCRM</span>
              </span>
            </div>
          </div>
          <div className="md:col-span-3 space-y-3.5">
            <div className="text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)]">
              НАВІГАЦІЯ
            </div>
            <ul className="space-y-2 text-sm font-manrope">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => n("index")}
                  className="text-[color:var(--ink)]/75 hover:text-[color:var(--ink)] transition-colors cursor-pointer text-left max-md:py-3 max-md:block"
                >
                  Головна
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => n("keycrm")}
                  className="text-[color:var(--ink)]/75 hover:text-[color:var(--ink)] transition-colors cursor-pointer text-left max-md:py-3 max-md:block"
                >
                  Послуги
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-cases"
                  onClick={() => n("cases")}
                  className="text-[color:var(--ink)]/75 hover:text-[color:var(--ink)] transition-colors cursor-pointer text-left max-md:py-3 max-md:block"
                >
                  Кейси
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => n("about")}
                  className="text-[color:var(--ink)]/75 hover:text-[color:var(--ink)] transition-colors cursor-pointer text-left max-md:py-3 max-md:block"
                >
                  Про компанію
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => n("contact")}
                  className="text-[color:var(--ink)]/75 hover:text-[color:var(--ink)] transition-colors cursor-pointer text-left max-md:py-3 max-md:block"
                >
                  Контакти
                </button>
              </li>
            </ul>
          </div>
          <div className="md:col-span-4 space-y-4">
            <div className="text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--accent-green)]">
              Давайте систематизуємо ваш бізнес?
            </div>
            <div className="pt-2 space-y-2 text-[14px] font-mono font-normal tracking-wider">
              {[
                s.telegram && (
                  <div>
                    <a
                      id="footer-contact-telegram"
                      href={`https://t.me/${s.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 max-md:py-3 text-[color:var(--ink)]/70 hover:text-[color:var(--ink)] transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
                      <span>{s.telegram}</span>
                    </a>
                  </div>
                ),
                s.email && (
                  <div>
                    <a
                      id="footer-contact-email"
                      href={`mailto:${s.email}`}
                      className="inline-flex items-center gap-2 max-md:py-3 text-[color:var(--ink)]/70 hover:text-[color:var(--ink)] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
                      <span>{s.email}</span>
                    </a>
                  </div>
                ),
                s.phone && (
                  <div>
                    <a
                      id="footer-contact-phone"
                      href={`tel:${s.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-flex items-center gap-2 max-md:py-3 text-[color:var(--ink)]/70 hover:text-[color:var(--ink)] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[color:var(--accent-green)]" />
                      <span>{s.phone}</span>
                    </a>
                  </div>
                ),
                ...[
                  [
                    "footer-contact-tg-channel",
                    "https://t.me/+DoP8DDW5BhxkMDYy",
                    "Telegram-канал",
                    [
                      ["path", "m3 11 18-5v12L3 14v-3z"],
                      ["path", "M11.6 16.8a3 3 0 1 1-5.8-1.6"],
                    ],
                  ],
                  [
                    "footer-contact-instagram",
                    "https://www.instagram.com/point.b.group",
                    "Instagram",
                    [
                      [
                        "rect",
                        {
                          x: 2,
                          y: 2,
                          width: 20,
                          height: 20,
                          rx: 5,
                        },
                      ],
                      [
                        "path",
                        "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
                      ],
                      ["path", "M17.5 6.5h.01"],
                    ],
                  ],
                  [
                    "footer-contact-tiktok",
                    "https://www.tiktok.com/@pointbgroup",
                    "TikTok",
                    [["path", "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"]],
                  ],
                  [
                    "footer-contact-threads",
                    "https://www.threads.com/@point.b.group",
                    "Threads",
                    [
                      [
                        "circle",
                        {
                          cx: 12,
                          cy: 12,
                          r: 4,
                        },
                      ],
                      ["path", "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"],
                    ],
                  ],
                ].map(([id, h, t, ic]) => (
                  <div key={id}>
                    <a
                      id={id}
                      href={h}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 max-md:py-3 text-[color:var(--ink)]/70 hover:text-[color:var(--ink)] transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[color:var(--accent-green)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        {ic.map((e, i) =>
                          typeof e[1] == "string"
                            ? l.jsx(
                                e[0],
                                {
                                  d: e[1],
                                },
                                i,
                              )
                            : l.jsx(e[0], e[1], i),
                        )}
                      </svg>
                      <span>{t}</span>
                    </a>
                  </div>
                )),
              ]}
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] font-mono font-normal uppercase tracking-wider text-[color:var(--ink)]/60">
          <div>
            {"© "}
            {new Date().getFullYear()}
            {" Point B · Всі права захищені"}
          </div>
          <div className="flex items-center gap-6">
            <button
              id="footer-privacy-link"
              onClick={() => n("privacy")}
              className="max-md:py-3 hover:text-[color:var(--ink)] transition-colors cursor-pointer"
            >
              Політика конфіденційності
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
