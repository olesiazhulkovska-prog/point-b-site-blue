/* .pb-rv стартує з opacity:0 і показується класом .pb-rv-in.
   Цей клас ставили лише головна (WhyChoosePointB) і DeferMount, тому на внутрішніх сторінках
   (Про компанію, Послуги, Кейси…) блоки з .pb-rv лишалися невидимими там, де немає
   scroll-driven animations (усі iPhone/Safari) — зокрема заголовок «Що кажуть клієнти».
   Тут — одна спільна підписка на всіх маршрутах, включно з елементами, що з'являються пізніше. */

const IN = "pb-rv-in";

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const seen = new WeakSet<Element>();
  let io: IntersectionObserver | null = null;

  const show = (e: Element) => {
    e.classList.add(IN);
    io && io.unobserve(e);
  };

  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver(
      (es) =>
        es.forEach((x) => {
          // top < 0 — елемент уже проскролили (швидкий скрол, перехід за якорем)
          if (x.isIntersecting || x.boundingClientRect.top < 0) show(x.target);
        }),
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
  }

  const scan = () => {
    document.querySelectorAll(".pb-rv:not(." + IN + ")").forEach((e) => {
      if (seen.has(e)) return;
      seen.add(e);
      if (io) io.observe(e);
      else e.classList.add(IN);
    });
  };

  let q = 0;
  const schedule = () => {
    if (q) return;
    q = requestAnimationFrame(() => {
      q = 0;
      scan();
    });
  };

  const start = () => {
    scan();
    new MutationObserver(schedule).observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
}
