/** Phone only: stacking cards (.pbs-grid) get one common height, so the whole stack releases at the same moment when the block ends. */
export function equalizeStackCards(root: ParentNode = document): () => void {
  const mq = window.matchMedia("(max-width:767px)");
  const run = () => {
    root.querySelectorAll<HTMLElement>(".pbs-grid").forEach((g) => {
      const cards = Array.from(g.querySelectorAll<HTMLElement>(":scope > .pbs-card"));
      cards.forEach((c) => (c.style.minHeight = ""));
      if (!mq.matches) return;
      const h = Math.max(0, ...cards.map((c) => c.offsetHeight));
      cards.forEach((c) => (c.style.minHeight = `${h}px`));
    });
  };
  run();
  const t = window.setTimeout(run, 600);
  window.addEventListener("resize", run);
  return () => {
    window.clearTimeout(t);
    window.removeEventListener("resize", run);
  };
}
