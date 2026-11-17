// Kontakt podaci gazdinstva — jedan izvor za sajt (App.tsx) i chatbot (api/_lib/systemPrompt.ts).
// Bez React/JSX/browser importa — ovaj fajl se ucitava i u Node serverless funkciji.

export interface PhoneContact {
  name: string;
  /** Kako se broj prikazuje na sajtu. */
  display: string;
  /** Link za poziv (tel:). */
  href: string;
}

export const contact = {
  farmName: 'Pčelarsko gazdinstvo Letvenčuk',
  phones: {
    mihajlo: { name: 'Mihajlo', display: '060 0726 253', href: 'tel:+381600726253' },
    tanja: { name: 'Tanja', display: '060 726 2530', href: 'tel:+381607262530' },
  } satisfies Record<string, PhoneContact>,
  whatsapp: {
    display: '060 726 2539',
    url: 'https://wa.me/381607262539',
  },
  instagram: {
    handle: '@med.letvencuk',
    url: 'https://www.instagram.com/med.letvencuk/',
  },
  address: {
    street: 'Kulska 9/1',
    city: 'Kula',
    short: 'Kulska 9/1, Kula',
    full: 'Kulska 9/1, Kula, Vojvodina, Srbija',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kulska+9%2F1%2C+Kula%2C+Vojvodina%2C+Srbija',
    mapsEmbedUrl: 'https://www.google.com/maps?q=Kulska%209%2F1%2C%20Kula%2C%20Srbija&output=embed',
  },
  /** Kontakt forma na sajtu (Formspree) — odgovor stize na email. */
  contactFormAction: 'https://formspree.io/f/xykdqznv',
  delivery: 'Dostavljamo na kućnu adresu. Dostava je BESPLATNA na teritoriji opštine Kula i u Novom Sadu. Za dostavu u ostala mesta uslovi i cena se dogovaraju — kupac treba da nas kontaktira telefonom ili WhatsApp-om. Porudžbine se dogovaraju telefonom, WhatsApp-om, Instagram porukom ili preko kontakt forme na sajtu. Možete nas naći i na festivalima meda.',
  /** Poreklo meda — ide u Lolino znanje (api/_lib/systemPrompt.ts). */
  honeyOrigin: 'Svaku vrstu našeg meda sakupljaju naše pčele na teritoriji i u okolini opštine Kula.',
} as const;
