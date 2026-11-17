// Klijent za POST /api/chat. Jedino mesto gde widget razgovara sa serverom.
// Odgovor stiže kao stream običnog teksta; greške pre početka stižu kao JSON { error }.

export type ChatRole = 'user' | 'model';

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

/** Koliko poslednjih poruka šaljemo serveru (server ionako odseca na 20). */
export const MAX_HISTORY = 20;
/** Najduža poruka koju korisnik može da pošalje (isto ograničenje kao na serveru). */
export const MAX_INPUT_LENGTH = 1000;

/** Marker kojim model označava da posetilac želi da poruči (vidi api/_lib/systemPrompt.ts). */
export const ORDER_MARKER = '[ORDER]';

const TIMEOUT_MS = 30_000;
const GENERIC_ERROR = 'Lola trenutno ne može da odgovori. Pokušajte ponovo ili nas pozovite.';

export class ChatError extends Error {}

/** Tekst za prikaz: bez markera, i bez "polu-markera" ("[ORD") na kraju dok stream još traje. */
export function visibleText(text: string, streaming = false): string {
  let out = text.split(ORDER_MARKER).join('');
  if (streaming) {
    for (let n = ORDER_MARKER.length - 1; n > 0; n--) {
      if (out.endsWith(ORDER_MARKER.slice(0, n))) {
        out = out.slice(0, -n);
        break;
      }
    }
  }
  return out.trimEnd();
}

export const hasOrderMarker = (text: string) => text.includes(ORDER_MARKER);

/**
 * Šalje istoriju i čita odgovor deo po deo. `onChunk` dobija ceo dosadašnji tekst.
 * Vraća kompletan odgovor.
 */
export async function streamChat(messages: ChatMessage[], onChunk: (fullText: string) => void): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.slice(-MAX_HISTORY) }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      throw new ChatError(data?.error || GENERIC_ERROR);
    }
    if (!res.body) throw new ChatError(GENERIC_ERROR);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      full += decoder.decode(value, { stream: true });
      onChunk(full);
    }
    full += decoder.decode();
    if (!full.trim()) throw new ChatError(GENERIC_ERROR);
    onChunk(full);
    return full;
  } catch (err) {
    if (err instanceof ChatError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ChatError('Odgovor kasni. Pokušajte ponovo ili nas pozovite.');
    }
    // Mrežna greška (offline i sl.)
    throw new ChatError('Nema veze sa serverom. Proverite internet i pokušajte ponovo.');
  } finally {
    clearTimeout(timer);
  }
}
