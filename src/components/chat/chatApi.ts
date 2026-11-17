// Klijent za POST /api/chat. Jedino mesto gde widget razgovara sa serverom.

export type ChatRole = 'user' | 'model';

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

/** Koliko poslednjih poruka šaljemo serveru (server ionako odseca na 20). */
export const MAX_HISTORY = 20;
/** Najduža poruka koju korisnik može da pošalje (isto ograničenje kao na serveru). */
export const MAX_INPUT_LENGTH = 1000;

const TIMEOUT_MS = 30_000;
const GENERIC_ERROR = 'Pčelica trenutno ne može da odgovori. Pokušajte ponovo ili nas pozovite.';

export class ChatError extends Error {}

export async function sendChat(messages: ChatMessage[]): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.slice(-MAX_HISTORY) }),
      signal: controller.signal,
    });

    const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;

    if (!res.ok) throw new ChatError(data?.error || GENERIC_ERROR);
    if (!data?.reply) throw new ChatError(GENERIC_ERROR);
    return data.reply;
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
