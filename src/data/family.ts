export type FamilyIcon = 'bee' | 'basket' | 'users' | 'check' | 'truck';

export interface FamilyMember {
  name: string;
  role: string;
  description: string;
  icon: FamilyIcon;
}

export const familyMembers: FamilyMember[] = [
  {
    name: "Mihajlo",
    role: "Otac & Glavni Pčelar",
    description: "Stub našeg gazdinstva. Mihajlo je zadužen za sve na pčelinjaku - od brige o zdravlju pčela do vrcanja meda. Njegovo znanje i iskustvo su temelj svega što radimo.",
    icon: 'bee'
  },
  {
    name: "Tanja",
    role: "Majka & Kreativni Centar",
    description: "Tanja pretvara naše pčelinje darove u prelepe aranžmane. Zadužena je za planiranje festivala, prodaju, dostavu i osmeh koji dočekuje svakog kupca.",
    icon: 'basket'
  },
  {
    name: "Ivan",
    role: "Deda & Desna ruka",
    description: "Iskustvo koje se ne kupuje. Ivan pomaže Mihajlu na pčelinjaku, uvek je tu kada je potrebna dodatna ruka i mudrost u radu sa košnicama.",
    icon: 'users'
  },
  {
    name: "Nađa",
    role: "Ćerka & Mlada nada",
    description: "Nađa je mamin glavni asistent na festivalima. Svojom energijom i ljubaznošću pomaže u prezentaciji proizvoda i komunikaciji sa našim dragim kupcima.",
    icon: 'check'
  },
  {
    name: "Nikola",
    role: "Sin & Dostava",
    description: "Nikola je naš pouzdani glasnik. Uvek spreman da pomogne - bilo da je u pitanju dostava meda na kućnu adresu ili pakovanje porudžbina.",
    icon: 'truck'
  }
];

/**
 * Kratke, činjenične informacije o porodici za chatbota (api/_lib/systemPrompt.ts).
 * Namerno jednostavnije od opisa na sajtu — bez preuveličavanja zasluga.
 */
export const familyFactsForChatbot: string[] = [
  'Mihajlo — otac porodice i GLAVNI pčelar; on danas vodi pčelinjak.',
  'Tanja — majka porodice (Mihajlova supruga); pravi poklon aranžmane.',
  'Ivan — Mihajlov otac, deda Nađe i Nikole. On je započeo pčelarstvo u porodici; danas POMAŽE Mihajlu oko pčela (Mihajlo je glavni, Ivan pomaže).',
  'Nađa — ćerka Mihajla i Tanje; pomaže roditeljima.',
  'Nikola — sin Mihajla i Tanje; pomaže roditeljima.',
];
