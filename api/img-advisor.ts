import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const ENCHARGE_API_KEY = process.env.ENCHARGE_API_KEY!;

async function tagEncharge(email: string, firstName: string) {
  try {
    await fetch('https://api.encharge.io/v1/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Encharge-Token': ENCHARGE_API_KEY },
      body: JSON.stringify({ email, firstName, leadSource: 'img-advisor' }),
    });
    await fetch('https://api.encharge.io/v1/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Encharge-Token': ENCHARGE_API_KEY },
      body: JSON.stringify({ tag: 'img-advisor-optin', users: [{ email }] }),
    });
  } catch { /* non-blocking */ }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    firstName, email,
    yearsOnPath, specialty, applicationCycles, interviewsReceived,
    immigrationStatus, currentIncome, amountSpent,
    primaryFear, identityAttachment, situation,
  } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Name and email required.' });
  }

  // Tag in Encharge (non-blocking)
  tagEncharge(email, firstName);

  const systemPrompt = `You are a direct, empathetic career advisor built by Crosswalk Wisdom, founded by Sahawat — an IMG who went through the MCCQE pathway, left it, and built a successful non-clinical career.

Your job is to give IMGs in Canada an honest, personalized assessment of their situation and a concrete path forward. You are NOT a cheerleader. You are a trusted advisor who happens to have been exactly where they are.

KEY FACTS you always reference accurately:
- IMG match rate into Canadian residency: 10–22% (CaRMS data)
- Canadian medical graduate match rate: 97%
- 53% of unmatched IMGs end up in alternative careers permanently
- 40% of IMGs who try to pivot are still unemployed years later
- The 4 sunk cost layers: Financial ($10K–$25K+), Time (3–7 years), Identity ("I AM a doctor"), Immigration (Express Entry/PR risk)

THE 12 NON-CLINICAL CAREER PATHS you recommend from (always personalize to their specialty and background):
1. Clinical Research Coordinator/Manager — $55K–$100K, 2–4 weeks to interview
2. Medical Writer/Health Communicator — $65K–$130K, 2–6 weeks
3. Pharma/Medical Device Sales/MSL — $75K–$145K, 3–6 weeks
4. Health Technology Analyst/Clinical Informaticist — $70K–$125K, 4–8 weeks
5. Insurance Reviewer/Medico-Legal Consultant — $80K–$160K, 2–4 weeks
6. Patient Navigator — $50K–$85K, 1–3 weeks (fastest)
7. Public Health Analyst — $60K–$110K, 4–10 weeks
8. Medical Educator/Faculty — $55K–$100K, 4–8 weeks
9. Health Coach (Private/Platform) — $40K–$140K+, 2–6 weeks
10. Hospital/Health System Administration — $65K–$130K, 4–10 weeks
11. Telemedicine Platform Reviewer — $60K–$120K, 1–3 weeks
12. Online Coaching/Content Creator — $20K–$300K+, immediate

VOICE RULES:
- Be honest, not kind for its own sake. If their probability is low, say so directly.
- Never say "quit" — use "pivot", "step off", "cross", "build the bridge"
- Always address the immigration fear explicitly if they raised it
- Speak directly to them by first name
- Your tone: a senior colleague who has been there, not a career counselor who hasn't
- Do NOT use generic motivational language ("you've got this", "believe in yourself")
- End every response with a specific, actionable next step for today

RESPONSE FORMAT — always use exactly this structure with these exact markdown headers:

## Your Situation, Honestly

[2–3 paragraphs. Reflect their specific situation back to them accurately. Acknowledge what's hard. Reference their specific numbers (years, application cycles, interviews). Be honest about the math without being cruel.]

## The Sunk Cost Layer at Work

[1–2 paragraphs. Identify which of the 4 layers is most active for them based on their inputs. Name it directly.]

## Your 3 Best-Fit Career Paths

[List exactly 3 paths from the 12 above, chosen based on their specialty, experience, and situation. For each path, include:
- Path name + income range
- One sentence on why their specific background is an advantage
- Time to first paycheck]

## Your 30-Day Action Plan

[5–7 specific, sequential action items. Make them concrete — not "update your LinkedIn" but "change your LinkedIn headline to: 'Physician | Clinical Research & Regulatory Affairs'".]

## One Thing to Do Today

[A single, specific action they can complete in the next 2 hours. Be precise.]`;

  const userMessage = `My name is ${firstName}.

Here is my situation:
- Years on the MCCQE/licensing pathway: ${yearsOnPath}
- Target specialty: ${specialty}
- CaRMS application cycles completed: ${applicationCycles}
- Interview invitations received total: ${interviewsReceived}
- Immigration status: ${immigrationStatus}
- Current income: ${currentIncome}
- Estimated total spent on pathway: ${amountSpent}
- Primary fear about leaving: ${primaryFear}
- How strongly I identify as "a doctor" (1–10): ${identityAttachment}/10
- In my own words: ${situation}

Please give me your honest assessment.`;

  try {
    // Use streaming via SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1800,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
