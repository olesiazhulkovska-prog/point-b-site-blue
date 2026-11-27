/* Футер на iPhone/Safari: у <ul> лишається системний відступ списку (32px) і навігаційні лінки
   зсуваються вправо, хоч у CSS padding:0 !important. Надійно перебиваємо inline-стилем з !important
   (inline !important сильніший за будь-який CSS) і повторюємо після рендеру/навігації. */
if (typeof window !== "undefined" && typeof document !== "undefined") {
  const fix = () => {
    document
      .querySelectorAll<HTMLElement>("#site-footer ul, #site-footer ol, #site-footer li")
      .forEach((e) => {
        const cs = getComputedStyle(e);
        if (parseFloat(cs.paddingLeft) !== 0 || parseFloat(cs.paddingInlineStart) !== 0) {
          e.style.setProperty("padding-left", "0", "important");
          e.style.setProperty("padding-inline-start", "0", "important");
        }
      });
  };
  let t = 0;
  const sched = () => {
    clearTimeout(t);
    t = window.setTimeout(fix, 60);
  };
  const start = () => {
    fix();
    setTimeout(fix, 400);
    setTimeout(fix, 1600);
    new MutationObserver(sched).observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", sched);
  };
  if (document.body) start();
  else document.addEventListener("DOMContentLoaded", start, { once: true });
}
