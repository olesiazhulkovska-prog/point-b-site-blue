# Point B Group — сайт

Vite + React 19 + TypeScript. Відновлено з прод-збірки (листопад 2026), тому код працює ідентично продові.

- `src/components`, `src/pages`, `src/context`, `src/data` — застосунок
- `src/shared` — допоміжні шматки, імена яких ще мінфіковані (поступово перейменовуємо)
- `public/legacy.css` і `public/*.js` — старі CSS/JS-латки, які ще треба перенести в компоненти й токени
- `api/` — serverless-функції Vercel (`lead`, `cases`)

```
npm i
npm run dev
npm run build   # → dist
```
