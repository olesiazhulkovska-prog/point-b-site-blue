// Vercel Serverless Function: приймає заявку з сайту і створює картку в keyCRM.
// Ключ API зберігається ТІЛЬКИ у змінних середовища Vercel (Project → Settings → Environment Variables):
//   KEYCRM_API_KEY      — API-ключ keyCRM (обов'язково)
//   KEYCRM_PIPELINE_ID  — ID воронки (за замовчуванням 4, «Продажі»)
//   KEYCRM_STATUS_ID    — ID статусу (за замовчуванням 56, «До контакту»)
//   KEYCRM_SOURCE_ID    — ID джерела (за замовчуванням 50, «Сайт»)
// Документація keyCRM OpenAPI: https://docs.keycrm.app/

const clean = (v, max = 500) => String(v ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);

// Поля форми → кастомні поля картки в CRM (вільний текст, значення передаємо як у формі)
const CUSTOM_FIELDS = [
  ['LD_1068', 'role'],
  ['LD_1114', 'telegram'],
  ['LD_1115', 'service'],
  ['LD_1071', 'industry'],
  ['LD_1070', 'employeesCount'],
  ['LD_1072', 'ordersCount'],
  ['LD_1113', 'budget'],
  ['LD_1073', 'primaryTask'],
  ['LD_1116', 'heardFrom'],
];
// Людська назва сторінки, з якої надійшла заявка (sourcePage: modal-<page>, service-<id>, case-<slug>, contact…)
const PAGE_NAMES = {
  index: 'Головна', home: 'Головна', keycrm: 'Послуга: keyCRM', 'ai-bots': 'Послуга: AI-боти', analytics: 'Послуга: Аналітика',
  cases: 'Кейси', about: 'Про компанію', contact: 'Контакти', 'contact.html': 'Контакти', privacy: 'Політика конфіденційності',
};
const pageLabel = (raw) => {
  const v = clean(raw, 200);
  if (!v) return '';
  const m = v.match(/^(modal|service|case)-(.+)$/);
  const key = m ? m[2] : v;
  if (m && m[1] === 'case') return `Кейс: ${key}`;
  if (m && m[1] === 'service') return PAGE_NAMES[key] || `Послуга: ${key}`;
  return PAGE_NAMES[key] || key;
};
const REF_RE = /^[A-Za-z0-9_-]{2,40}$/;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid_json' });
  }

  // Без імені й телефону заявку не приймаємо
  const name = clean(body.name, 120);
  const phone = clean(body.contact, 30);
  if (!name || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ ok: false, error: 'invalid_payload' });
  }

  const apiKey = process.env.KEYCRM_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'crm_not_configured' });
  }

  // Реферальний код партнера (?ref=код) — пишемо в LD_1116 («Звідки дізналися / промокод») і в utm_campaign
  const ref = REF_RE.test(String(body.ref ?? '')) ? String(body.ref) : '';
  const discN = Number(body.disc);
  const disc = ref && Number.isInteger(discN) && discN > 0 && discN <= 100 ? discN : 0;
  const heard = [ref ? `Реферал: ${ref}` : '', disc ? `Знижка: ${disc}%` : '', clean(body.heardFrom, 600)].filter(Boolean).join(' | ');

  const custom_fields = CUSTOM_FIELDS
    .map(([uuid, key]) => ({ uuid, value: key === 'heardFrom' ? heard : clean(body[key], 800) }))
    .filter(f => f.value);

  const page = pageLabel(body.sourcePage);
  const payload = {
    title: page ? `Заявка з сайту — ${page}` : 'Заявка з сайту',
    pipeline_id: Number(process.env.KEYCRM_PIPELINE_ID) || 4,
    status_id: Number(process.env.KEYCRM_STATUS_ID) || 56,
    source_id: Number(process.env.KEYCRM_SOURCE_ID) || 50,
    contact: { full_name: name, phone },
    custom_fields,
  };

  // UTM — окремими полями верхнього рівня
  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};
  UTM_KEYS.forEach(k => {
    const v = clean(utm[k], 200);
    if (v) payload[k] = v;
  });
  if (ref) {
    // Код партнера — у utm_campaign (для аналітики); решту UTM не затираємо
    payload.utm_campaign = payload.utm_campaign ? `${ref} (${payload.utm_campaign})` : ref;
    if (!payload.utm_source) payload.utm_source = 'partner';
    if (!payload.utm_medium) payload.utm_medium = 'referral';
  }

  try {
    const r = await fetch('https://openapi.keycrm.app/v1/pipelines/cards', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const text = await r.text();
      console.error('keyCRM error', r.status, text.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'crm_error', status: r.status });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('keyCRM request failed', e);
    return res.status(502).json({ ok: false, error: 'crm_unreachable' });
  }
}
