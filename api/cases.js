// Vercel Serverless Function: спільне сховище кейсів сайту.
//   GET  /api/cases  — публічно: {cases, industries} для всіх відвідувачів
//   POST /api/cases  — лише з паролем адмінки: {action:"check"|"save", login, password, cases, industries}
// Змінні середовища Vercel (Project → Settings → Environment Variables):
//   ADMIN_PASSWORD        — пароль адмінки (обов'язково)
//   ADMIN_LOGINS          — дозволені email через кому (за замовчуванням: point.b.here@gmail.com,olesiazhulkovska@gmail.com)
//   BLOB_READ_WRITE_TOKEN — з'являється автоматично, коли до проєкту підключено Vercel Blob (Storage → Create → Blob → Connect Project)
import { put, list, del } from '@vercel/blob';
import { createHash, timingSafeEqual } from 'node:crypto';

const FILE = 'site/cases.json';
const BACKUP_DIR = 'site/backups/';
const KEEP_BACKUPS = 30;
const sha = (v) => createHash('sha256').update(String(v ?? '')).digest();
const same = (a, b) => timingSafeEqual(sha(a), sha(b));
const strOk = (v, max) => typeof v === 'string' && v.length <= max;

// Читає поточний збережений набір (або null, якщо його ще немає).
async function readCurrent() {
  const { blobs } = await list({ prefix: FILE, limit: 1 });
  if (!blobs.length) return null;
  const r = await fetch(`${blobs[0].url}?t=${Date.now()}`, { cache: 'no-store' });
  return await r.text();
}

// Зберігає попередню версію набору перед записом і лишає останні KEEP_BACKUPS копій.
async function backupCurrent(prevText) {
  if (!prevText) return null;
  const name = `${BACKUP_DIR}cases-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  await put(name, prevText, { access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: false });
  try {
    const { blobs } = await list({ prefix: BACKUP_DIR, limit: 1000 });
    const old = blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1)).slice(KEEP_BACKUPS);
    if (old.length) await del(old.map((b) => b.url));
  } catch { /* чистка не критична */ }
  return name;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

  if (req.method === 'GET') {
    if (!hasBlob) return res.status(200).json({ ok: true, configured: false, cases: null });
    try {
      const { blobs } = await list({ prefix: FILE, limit: 1 });
      if (!blobs.length) return res.status(200).json({ ok: true, configured: true, cases: null });
      const r = await fetch(`${blobs[0].url}?t=${Date.now()}`, { cache: 'no-store' });
      const data = await r.json();
      return res.status(200).json({
        ok: true, configured: true,
        cases: Array.isArray(data.cases) ? data.cases : null,
        industries: Array.isArray(data.industries) ? data.industries : null,
        updatedAt: data.updatedAt || null,
      });
    } catch (e) {
      return res.status(200).json({ ok: false, configured: true, cases: null });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch {
    return res.status(400).json({ ok: false, error: 'invalid_json' });
  }

  const adminPw = process.env.ADMIN_PASSWORD;
  if (!adminPw) return res.status(503).json({ ok: false, error: 'not_configured', missing: ['ADMIN_PASSWORD'] });

  const logins = (process.env.ADMIN_LOGINS || 'point.b.here@gmail.com,olesiazhulkovska@gmail.com')
    .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const loginOk = body.login === undefined || logins.includes(String(body.login).trim().toLowerCase());
  if (!loginOk || !same(body.password, adminPw)) {
    await new Promise((r) => setTimeout(r, 600));
    return res.status(401).json({ ok: false, error: 'unauthorized' });
  }

  if (body.action === 'check') return res.status(200).json({ ok: true, storage: hasBlob });

  if (body.action !== 'save' && body.action !== 'saveOne') return res.status(400).json({ ok: false, error: 'bad_action' });
  if (!hasBlob) return res.status(503).json({ ok: false, error: 'not_configured', missing: ['BLOB_READ_WRITE_TOKEN'] });

  const caseOk = (c) => c && strOk(c.slug, 120) && /^[a-z0-9_-]+$/i.test(c.slug) && strOk(c.companyName, 300);

  // Оновлення одного кейсу за slug: решта набору й галузі не змінюються.
  if (body.action === 'saveOne') {
    const slug = String(body.slug ?? '');
    const incoming = body.case;
    if (!slug || !caseOk(incoming)) return res.status(400).json({ ok: false, error: 'invalid_case' });
    if (incoming.slug !== slug) return res.status(400).json({ ok: false, error: 'slug_mismatch' });
    try {
      const prevText = await readCurrent();
      if (!prevText) return res.status(409).json({ ok: false, error: 'no_stored_set' });
      const data = JSON.parse(prevText);
      const list0 = Array.isArray(data.cases) ? data.cases : null;
      if (!list0) return res.status(409).json({ ok: false, error: 'no_stored_set' });
      const idx = list0.findIndex((c) => c && c.slug === slug);
      if (idx < 0 && !body.create) return res.status(404).json({ ok: false, error: 'case_not_found' });
      const nextCases = [...list0];
      if (idx < 0) nextCases.push(incoming); else nextCases[idx] = incoming;
      const payload = JSON.stringify({ ...data, cases: nextCases, updatedAt: new Date().toISOString() });
      if (payload.length > 3_000_000) return res.status(413).json({ ok: false, error: 'too_large' });
      const backup = await backupCurrent(prevText);
      await put(FILE, payload, {
        access: 'public', contentType: 'application/json',
        addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60,
      });
      return res.status(200).json({ ok: true, created: idx < 0, case: incoming, backup });
    } catch (e) {
      return res.status(500).json({ ok: false, error: 'storage_failed' });
    }
  }

  // Повне збереження (перестановка кейсів, галузі).
  if (body.action !== 'save') return res.status(400).json({ ok: false, error: 'bad_action' });

  const { cases, industries } = body;
  if (!Array.isArray(cases) || cases.length > 200 || !cases.every(caseOk)) {
    return res.status(400).json({ ok: false, error: 'invalid_cases' });
  }
  const payload = JSON.stringify({
    cases,
    industries: Array.isArray(industries) ? industries : null,
    updatedAt: new Date().toISOString(),
  });
  if (payload.length > 3_000_000) return res.status(413).json({ ok: false, error: 'too_large' });

  try {
    const backup = await backupCurrent(await readCurrent());
    await put(FILE, payload, {
      access: 'public', contentType: 'application/json',
      addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60,
    });
    return res.status(200).json({ ok: true, count: cases.length, backup });
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'storage_failed' });
  }
}
