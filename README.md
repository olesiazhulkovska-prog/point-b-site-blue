# Point B Group — сайт (синя версія)

Статичний сайт + одна серверна функція для заявок.

- `index.html`, `assets/`, `fonts/`, `vortex.js`, іконки — готова збірка сайту (дизайн = синій артефакт).
- `api/lead.js` — Vercel-функція: приймає заявку з форми й створює картку в keyCRM.
- `vercel.json` — кеш для `assets/`.

Маршрути працюють через `#/…` (`#/keycrm`, `#/ai-bots`, `#/analytics`, `#/cases`, `#/about`, `#/contact`), серверних rewrite не потрібно.

## Публікація
1. GitHub: новий репозиторій → Add file → Upload files → перетягнути ВМІСТ папки (не сам зіп).
2. Vercel: Add New → Project → імпорт репозиторію. Framework Preset — **Other**, Build Command і Output Directory залишити порожніми.
3. Змінні середовища (Settings → Environment Variables): `KEYCRM_API_KEY` (обов'язково); `KEYCRM_PIPELINE_ID`, `KEYCRM_STATUS_ID`, `KEYCRM_SOURCE_ID` мають значення за замовчуванням 4 / 56 / 50. Після додавання — Redeploy.
4. Домен: Settings → Domains → Add, далі прописати DNS-записи, які покаже Vercel.

## Обмеження
Це зібраний сайт, а не вихідний React-проєкт: вручну правити `index.html` незручно. Дизайн-правки робляться в чаті й додаються новою збіркою.
