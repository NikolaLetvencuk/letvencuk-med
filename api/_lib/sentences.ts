// Pomoćne funkcije da odgovor bota nikad ne završi usred rečenice.
//
// Server šalje tekst samo do kraja poslednje CELE rečenice, a nedovršeni ostatak čuva.
// Ako Gemini normalno završi, ostatak se pošalje. Ako odgovor bude prekinut (limit
// tokena, timeout, greška), ostatak se odbacuje — poruka se završava celom rečenicom.

/**
 * Kraj rečenice: . ! ? … (uz moguće zatvorene navodnike/zagrade) iza kog ide razmak,
 * ili prelazak u novi red. "1.5" i "060 0726 253." u sredini teksta se ne seku
 * pogrešno jer posle tačke mora doći razmak.
 */
const SENTENCE_END = /[.!?…]+["'”’)\]]*(?=\s)|\n/g;

/** Deli tekst na [sve do kraja poslednje cele rečenice, nedovršeni ostatak]. */
export function splitAtLastSentence(text: string): [complete: string, rest: string] {
  let cut = -1;
  for (const m of text.matchAll(SENTENCE_END)) cut = (m.index ?? 0) + m[0].length;
  if (cut <= 0) return ['', text];
  return [text.slice(0, cut), text.slice(cut)];
}

/** Za prekinut odgovor: vraća tekst do poslednje cele rečenice (ili ceo tekst + "…" ako je nema). */
export function trimToLastSentence(text: string): string {
  const trimmed = text.trimEnd();
  if (/[.!?…]["'”’)\]]*$/.test(trimmed)) return trimmed;
  const [complete] = splitAtLastSentence(trimmed);
  return complete.trim() ? complete.trimEnd() : `${trimmed}…`;
}
