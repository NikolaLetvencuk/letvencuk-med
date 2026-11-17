// Čuvanje razgovora u sessionStorage — briše se kad se zatvori tab (dobar podrazumevani izbor za privatnost).
import type { ChatMessage } from './chatApi';

const KEY = 'lola-chat-v1';

export function loadMessages(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        !!m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string' && m.text.length > 0,
    );
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  try {
    if (messages.length) sessionStorage.setItem(KEY, JSON.stringify(messages));
    else sessionStorage.removeItem(KEY);
  } catch {
    // Privatni režim / blokiran storage — razgovor jednostavno neće biti zapamćen.
  }
}
