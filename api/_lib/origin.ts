// Provera Origin zaglavlja: endpoint prihvata zahteve samo sa našeg sajta (i localhost-a u razvoju).
//
// Browser UVEK šalje Origin na POST fetch zahteve, pa sajt prolazi. Zahtevi BEZ Origin-a
// (curl, skripte) se odbijaju — to sprečava da neko lako ugradi naš chat na svoj sajt.
// Odlučan napadač može da lažira zaglavlje, zato je ovo samo prvi sloj (vidi rateLimit.ts).
//
// ALLOWED_ORIGINS = lista odvojena zarezom, npr. "https://med.rs,https://www.med.rs".
// Preview deploy-evi (*.vercel.app) se dozvoljavaju preko VERCEL_URL koji Vercel sam postavlja.

const isLocalhost = (origin: string) => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (isLocalhost(origin)) return true;

  const allowed = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map(s => s.trim().replace(/\/$/, ''))
    .filter(Boolean);

  // Domen tekućeg deploy-a (npr. projekat-abc123.vercel.app) i produkcijski vercel.app domen.
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL, process.env.VERCEL_BRANCH_URL]) {
    if (host) allowed.push(`https://${host}`);
  }

  if (allowed.includes(origin)) return true;

  // Isti host kao zahtev (sajt i API su uvek na istom domenu) — pokriva i lokalnu
  // mrežu u razvoju (npr. http://192.168.1.5:5174 sa telefona).
  const host = request.headers.get('host');
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}
