import type { VercelRequest, VercelResponse } from '@vercel/node';

const ENCHARGE_API_KEY = process.env.ENCHARGE_API_KEY!;
const ENCHARGE_BASE = 'https://api.encharge.io/v1';

async function enchargeRequest(path: string, method: string, body: object) {
  const res = await fetch(`${ENCHARGE_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Encharge-Token': ENCHARGE_API_KEY,
    },
    body: JSON.stringify(body),
  });
  return res;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'First name and email are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    // 1. Upsert person in Encharge
    await enchargeRequest('/people', 'POST', { email, firstName });

    // 2. Tag to trigger the Pivot Map flow (and segment the lead)
    await enchargeRequest('/tags', 'POST', {
      tag: 'lead-magnet-pivot-map',
      users: [{ email }],
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Encharge API error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
