import type { VercelRequest, VercelResponse } from '@vercel/node';

const ENCHARGE_API_KEY = process.env.ENCHARGE_API_KEY!;
const ENCHARGE_BASE = 'https://api.encharge.io/v1';

// Only these tags may be applied through this public endpoint.
const ALLOWED_TAGS = new Set([
  'lead-magnet-pivot-map',
  'lead-magnet-inner-voices',
  'lead-magnet-train-like-a-clinician',
  'lead-magnet-marginal-decade',
  'lead-magnet-clinic-to-coaching',
]);

async function enchargeRequest(path: string, method: string, body: object) {
  return fetch(`${ENCHARGE_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Encharge-Token': ENCHARGE_API_KEY },
    body: JSON.stringify(body),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName, tag } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'First name and email are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!tag || !ALLOWED_TAGS.has(tag)) {
    return res.status(400).json({ error: 'Unknown lead magnet.' });
  }

  try {
    await enchargeRequest('/people', 'POST', { email, firstName });
    await enchargeRequest('/tags', 'POST', { tag, users: [{ email }] });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Encharge API error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
