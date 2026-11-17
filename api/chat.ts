// POST /api/chat — backend za chatbot "Pčelica".
//
// Ugovor:
//   zahtev:  { messages: { role: 'user' | 'model'; text: string }[] }   (cela istorija, poslednja je 'user')
//   odgovor: 200 { reply: string }  |  4xx/5xx { error: string }
//
// API ključ (GEMINI_API_KEY) postoji SAMO ovde, na serveru. Nikad ga ne stavljati u src/ niti u VITE_* promenljivu.

import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './_lib/systemPrompt.js';

/** Podrazumevani model ako GEMINI_MODEL nije postavljen u okruženju. */
const DEFAULT_MODEL = 'gemini-3.8-flash';

const MAX_MESSAGES = 20;
const MAX_TEXT_LENGTH = 1000;
const FALLBACK_ERROR = 'Pčelica trenutno ne može da odgovori, pokušajte ponovo ili nas pozovite.';

type Role = 'user' | 'model';
interface ChatMessage {
  role: Role;
  text: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

/** Vraća očišćenu istoriju ili poruku o grešci (string). */
function parseMessages(body: unknown): ChatMessage[] | string {
  if (!body || typeof body !== 'object' || !Array.isArray((body as { messages?: unknown }).messages)) {
    return 'Neispravan zahtev.';
  }
  const raw = (body as { messages: unknown[] }).messages;
  if (raw.length === 0) return 'Poruka je prazna.';

  const messages: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== 'object') return 'Neispravna poruka.';
    const { role, text } = m as { role?: unknown; text?: unknown };
    if (role !== 'user' && role !== 'model') return 'Neispravna uloga poruke.';
    if (typeof text !== 'string' || text.trim() === '') return 'Poruka je prazna.';
    if (text.length > MAX_TEXT_LENGTH) return `Poruka je predugačka (najviše ${MAX_TEXT_LENGTH} karaktera).`;
    messages.push({ role, text: text.trim() });
  }
  // Gemini očekuje da istorija počne porukom korisnika.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return 'Poslednja poruka mora biti od korisnika.';
  }
  return messages;
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Neispravan zahtev.' }, 400);
  }

  const messages = parseMessages(body);
  if (typeof messages === 'string') return json({ error: messages }, 400);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[chat] GEMINI_API_KEY nije postavljen');
    return json({ error: FALLBACK_ERROR }, 500);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
      contents: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
      config: {
        systemInstruction: buildSystemPrompt(),
        temperature: 0.4,
        maxOutputTokens: 500,
      },
    });
    return json({ reply: response.text?.trim() ?? '' });
  } catch (err) {
    console.error('[chat] Gemini greška:', err);
    return json({ error: FALLBACK_ERROR }, 502);
  }
}

// Sve ostale metode → 405.
const methodNotAllowed = () =>
  new Response(JSON.stringify({ error: 'Dozvoljen je samo POST.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json; charset=utf-8', Allow: 'POST' },
  });

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
