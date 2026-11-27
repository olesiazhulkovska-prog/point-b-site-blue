// Мобільна перевірка верстки. Запуск: npm run build && npx vite preview --port 4173 &  node scripts/mobile-check.mjs
// (потрібен playwright: NODE_PATH=$(npm root -g) node scripts/mobile-check.mjs)
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const URL = process.env.URL || "http://localhost:4173/#/";
const WIDTHS = [360, 390, 412];
let fails = 0;
const b = await chromium.launch();
for (const w of WIDTHS) {
  const p = await b.newPage({ viewport: { width: w, height: 780 } });
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  // прокручуємо секції, щоб відпрацювали reveal-анімації (до цього елементи зсунуті)
  for (const sel of [".pb-diagram", ".sv3-card"]) {
    const els = await p.$$(sel);
    for (const e of els) { await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(350); }
  }
  await p.waitForTimeout(1000);
  const res = await p.evaluate(() => {
    const out = [];
    const de = document.documentElement;
    if (de.scrollWidth > de.clientWidth + 1) out.push(`горизонтальний скрол сторінки: ${de.scrollWidth} > ${de.clientWidth}`);
    // 1. діаграми «Чому обирають»: нічого не виходить за контейнер
    document.querySelectorAll(".pb-diagram").forEach((d, i) => {
      const c = d.querySelector(".\\@container"); if (!c) return; const cb = c.getBoundingClientRect();
      c.querySelectorAll("*").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.width && (r.right > cb.right + 1 || r.left < cb.left - 1)) out.push(`діаграма #${i}: «${(e.textContent || "").trim().slice(0, 24)}» виходить за контейнер на ${Math.round(r.right - cb.right)}px`);
      });
    });
    // 2. картки послуг: лінії Стало торкаються плашок, нічого не виходить за картку
    document.querySelectorAll(".sv3-card").forEach((card, i) => {
      const cb = card.getBoundingClientRect();
      card.querySelectorAll(".sv3-viz *").forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.width && (r.right > cb.right + 1 || r.left < cb.left - 1)) out.push(`картка послуг #${i}: «${(e.textContent || "").trim().slice(0, 24)}» виходить за картку`);
      });
      if (cb.height > 1300) out.push(`картка послуг #${i} задовга: ${Math.round(cb.height)}px`);
    });
    return out;
  });
  console.log(`\n${w}px: ${res.length ? "❌" : "✅"}`);
  res.slice(0, 20).forEach((m) => console.log("  - " + m));
  fails += res.length;
  await p.close();
}
await b.close();
process.exit(fails ? 1 : 0);
