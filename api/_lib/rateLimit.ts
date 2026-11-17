// Jednostavan rate limiter po IP adresi, u memoriji.
//
// VAŽNO: ovo je "best effort". Vercel pokreće više instanci funkcije i svaka ima svoju
// memoriju, a instance se gase i pale. Zato limit nije globalno tačan — služi da uspori
// lenjo zloupotrebljavanje. Prava zaštita je Vercel Firewall pravilo + budžet u Google Cloud-u.

const LIMITS = [
  { windowMs: 60_000, max: 15 }, // 15 poruka u minuti
  { windowMs: 24 * 60 * 60_000, max: 100 }, // 100 poruka dnevno
];

const hits = new Map<string, number[]>();
const LONGEST_WINDOW = Math.max(...LIMITS.map(l => l.windowMs));

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/** Vraća true ako je zahtev dozvoljen (i beleži ga), false ako je limit prekoračen. */
export function checkRateLimit(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter(t => now - t < LONGEST_WINDOW);
  const blocked = LIMITS.some(({ windowMs, max }) => recent.filter(t => now - t < windowMs).length >= max);
  if (!blocked) recent.push(now);
  hits.set(ip, recent);

  // Povremeno čišćenje da mapa ne raste beskonačno.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some(t => now - t < LONGEST_WINDOW)) hits.delete(key);
    }
  }
  return !blocked;
}
