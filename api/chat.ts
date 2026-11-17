// POST /api/chat — backend za chatbot "Pčelica".
//
// Ugovor:
//   zahtev:  { messages: { role: 'user' | 'model'; text: string }[] }   (cela istorija, poslednja je 'user')
//   odgovor: 200 text/plain stream (tekst stiže u delovima)  |  4xx/5xx JSON { error: string }
//            sa ?stream=0: 200 JSON { reply: string }
//
// API ključ (GEMINI_API_KEY) postoji SAMO ovde, na serveru. Nikad ga ne stavljati u src/ niti u VITE_* promenljivu.

import { GoogleGenAI, ThinkingLevel, type GenerateContentConfig } from '@google/genai';
import { buildSystemPrompt } from './_lib/systemPrompt.js';
import { checkRateLimit, getClientIp } from './_lib/rateLimit.js';
import { isAllowedOrigin } from './_lib/origin.js';
import { contact } from '../src/data/contact.js';
import { splitAtLastSentence, trimToLastSentence } from './_lib/sentences.js';

/** Podrazumevani model ako GEMINI_MODEL nije postavljen u okruženju. */
const DEFAULT_MODEL = 'gemini-3.8-flash';

const MAX_MESSAGES = 20;
const MAX_TEXT_LENGTH = 1000;
const MAX_BODY_BYTES = 30_000;
const GEMINI_TIMEOUT_MS = 25_000;
/**
 * Gornja granica tokena po odgovoru. Gemini 3 modeli "razmišljaju" pre odgovora i to troši
 * ISTI limit (merili smo i do ~1500 tokena razmišljanja), pa limit mora biti velik.
 * Dužinu samog odgovora drži sistemski prompt (2–5 rečenica).
 */
const MAX_OUTPUT_TOKENS = 4096;
const RATE_LIMIT_ERROR = 'Previše poruka, sačekajte malo ili nas pozovite.';
/** Kad Gemini vrati prazan odgovor (npr. blokiran sigurnosnim filterom). */
const EMPTY_REPLY =
  `Izvinite, na to ne mogu da odgovorim. Mogu da vam pomognem oko našeg meda, cena i poručivanja — ili nas pozovite na ${contact.phones.mihajlo.display}.`;
const FALLBACK_ERROR = 'Pčelica trenutno ne može da odgovori, pokušajte ponovo ili nas pozovite.';
const MID_STREAM_ERROR = 'Odgovor je prekinut — pokušajte ponovo ili nas pozovite.';

/**
 * Zajednička podešavanja generisanja. Za Gemini 3 modele smanjujemo razmišljanje na LOW:
 * ~2x manje tokena razmišljanja, brži odgovori, a za pitanja o medu je sasvim dovoljno.
 * (Stariji modeli, npr. 2.5, ne podržavaju thinkingLevel, pa im ga ne šaljemo.)
 */
const generationConfig = (model: string): GenerateContentConfig => ({
  systemInstruction: buildSystemPrompt(),
  temperature: 0.4,
  maxOutputTokens: MAX_OUTPUT_TOKENS,
  abortSignal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
  ...(/^gemini-3/.test(model) ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } } : {}),
});

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
  if (!isAllowedOrigin(request)) return json({ error: 'Zabranjen pristup.' }, 403);

  if (!checkRateLimit(getClientIp(request))) return json({ error: RATE_LIMIT_ERROR }, 429);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ error: 'Zahtev je prevelik.' }, 413);

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: 'Zahtev je prevelik.' }, 413);
    body = JSON.parse(raw);
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

  // v1beta: tu su dostupni i preview modeli (v1 ima samo stabilne).
  const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1beta' });
  const contents = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  // Ne-streaming varijanta (?stream=0) — zgodna za testiranje curl-om i kao rezervna opcija.
  if (new URL(request.url, 'http://localhost').searchParams.get('stream') === '0') {
    return replyOnce(ai, model, contents);
  }

  // Streaming: greške pre prvog dela odgovora vraćamo kao JSON sa statusom,
  // a posle toga tekst stiže u delovima (text/plain).
  type Chunk = { text?: string; candidates?: { finishReason?: string }[] };
  let iterator: AsyncIterator<Chunk>;
  try {
    const stream = await ai.models.generateContentStream({ model, contents, config: generationConfig(model) });
    iterator = stream[Symbol.asyncIterator]();
  } catch (err) {
    console.error('[chat] Gemini greška:', err);
    return json({ error: FALLBACK_ERROR }, 502);
  }

  const encoder = new TextEncoder();
  const streamBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Šaljemo samo cele rečenice; nedovršeni deo čeka u `pending` (vidi _lib/sentences.ts).
      let pending = '';
      let sentAny = false;
      let finishReason: string | undefined;
      const send = (text: string) => {
        if (!text) return;
        sentAny = true;
        controller.enqueue(encoder.encode(text));
      };
      try {
        for (;;) {
          const { value, done } = await iterator.next();
          if (done) break;
          finishReason = value?.candidates?.[0]?.finishReason ?? finishReason;
          if (!value?.text) continue;
          const [complete, rest] = splitAtLastSentence(pending + value.text);
          send(complete);
          pending = rest;
        }
        if (finishReason === 'MAX_TOKENS') {
          // Odsečeno limitom: nedovršenu rečenicu odbacujemo (osim ako nismo poslali ništa).
          console.warn('[chat] odgovor odsečen limitom tokena');
          if (!sentAny) send(trimToLastSentence(pending));
        } else {
          send(pending);
        }
        if (!sentAny) {
          console.warn('[chat] prazan odgovor (stream)', finishReason);
          send(EMPTY_REPLY);
        }
      } catch (err) {
        console.error('[chat] Gemini greška usred odgovora:', err);
        // Nedovršenu rečenicu ne prikazujemo; kratka napomena umesto nje.
        send(sentAny ? `\n\n(${MID_STREAM_ERROR})` : FALLBACK_ERROR);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(streamBody, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

type Contents = { role: Role; parts: { text: string }[] }[];

async function replyOnce(ai: GoogleGenAI, model: string, contents: Contents): Promise<Response> {
  try {
    const response = await ai.models.generateContent({ model, contents, config: generationConfig(model) });
    const finishReason = response.candidates?.[0]?.finishReason;
    let reply = response.text?.trim();
    if (reply && finishReason === 'MAX_TOKENS') reply = trimToLastSentence(reply);
    if (!reply) {
      console.warn('[chat] prazan odgovor', response.candidates?.[0]?.finishReason, response.promptFeedback?.blockReason);
    }
    return json({ reply: reply || EMPTY_REPLY });
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
