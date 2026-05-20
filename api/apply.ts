import type { VercelRequest, VercelResponse } from '@vercel/node';

const ENCHARGE_API_KEY = process.env.ENCHARGE_API_KEY!;
const ENCHARGE_BASE = 'https://api.encharge.io/v1';

async function enchargeRequest(path: string, body: object) {
  const res = await fetch(`${ENCHARGE_BASE}${path}`, {
    method: 'POST',
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

  const {
    email,
    firstName,
    profession,
    stuckReason,
    sixMonthVision,
    fearAuditResult,
    readyToInvest,
    story,
  } = req.body;

  if (!email || !firstName || !profession || !stuckReason || !sixMonthVision || !fearAuditResult || !readyToInvest || !story) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    // 1. Upsert applicant with all fields as custom properties
    await enchargeRequest('/people', {
      email,
      firstName,
      applicationProfession: profession,
      applicationStuckReason: stuckReason,
      applicationSixMonthVision: sixMonthVision,
      applicationFearAuditResult: fearAuditResult,
      applicationReadyToInvest: readyToInvest,
      applicationStory: story,
    });

    // 2. Apply tag to trigger applicant confirmation email
    await enchargeRequest('/tags', {
      tag: 'coaching-applicant',
      users: [{ email }],
    });

    // 3. Upsert Sahawat's record with latest applicant details for notification
    await enchargeRequest('/people', {
      email: 'sahawat@crosswalkwisdom.com',
      firstName: 'Sahawat',
      notifyApplicantName: firstName,
      notifyApplicantEmail: email,
      notifyApplicantProfession: profession,
      notifyApplicantReadyToInvest: readyToInvest,
    });

    // 4. Apply tag to trigger notification email to Sahawat
    await enchargeRequest('/tags', {
      tag: 'notify-new-application',
      users: [{ email: 'sahawat@crosswalkwisdom.com' }],
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Encharge API error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
