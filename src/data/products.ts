// Jedini izvor podataka o proizvodima: koristi ga i sajt (App.tsx) i chatbot (api/_lib/systemPrompt.ts).
// Bez React/JSX/browser importa — ovaj fajl se ucitava i u Node serverless funkciji.

export interface PriceOption {
  size: string;      
  price: string;     
}

export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  prices: PriceOption[];  
  image: string;
  /** Slug nove serije u images/v2 (daje srcset). Bez njega se koristi `image`. */
  imgSlug?: string;
  /** Opciono: dodatne slike za galeriju u modalu (prva je obicno `image`). */
  images?: string[];
  /** Opciono: prikazuje "NOVO" oznaku na kartici. */
  isNew?: boolean;
}


export const products: Product[] = [
  {
    id: 1,
    name: "Livadski med",
    description: "Bogat ukus prolećnih i letnjih livada. Sadrži nektar raznovrsnog lekovitog bilja.",
    longDescription: "Naš livadski med je prava riznica zdravlja. Sakupljan na čistim pašnjacima, on predstavlja mešavinu nektara desetina različitih cvetova, što mu daje jedinstvenu aromu i visoku nutritivnu vrednost. Idealan je za jačanje imuniteta i svakodnevnu upotrebu.",
    prices: [
      { size: "400g", price: "400 RSD" },
      { size: "1kg", price: "800 RSD" }
    ],    
    image: "images/v2/livadski-960.webp",
    imgSlug: "livadski"
  },
  {
    id: 2,
    name: "Bagremov med",
    description: "Svetla boja i blag, prijatan ukus. Najtraženiji med zbog svoje nežne arome.",
    longDescription: "Bagremov med je poznat po svojoj prozirnosti i činjenici da ostaje u tečnom stanju veoma dugo. Zbog svog blagog ukusa, omiljen je deci. Deluje umirujuće na organizam i preporučuje se kod nesanice i stresa.",
    prices: [
      { size: "400g", price: "750 RSD" },
      { size: "1kg", price: "1500 RSD" }
    ],    
    image: "images/v2/bagremov-960.webp",
    imgSlug: "bagremov"
  },
  {
    id: 4,
    name: "Med od uljane repice",
    description: "Kremast med bele boje, izuzetno bogat polenom.",
    longDescription: "Med od uljane repice je prvi prolećni med. Zbog svoje sitnozrnaste kristalizacije, tekstura mu je poput putera. Izuzetno je blagotvoran za čišćenje jetre i regulisanje holesterola.",
    prices: [
      { size: "400g", price: "400 RSD" },
      { size: "1kg", price: "800 RSD" }
    ],
    image: "images/v2/uljana-repica-960.webp",
    imgSlug: "uljana-repica"
  },
  {
    id: 5,
    name: "Propolis kapi",
    description: "Prirodni antibiotik iz pčelinje košnice. Jaka zaštita za vaš organizam.",
    longDescription: "Naš propolis je 30% rastvor čistog pčelinjeg propolisa u alkoholu. Deluje protiv virusa, bakterija i gljivica. Nezaobilazan u kućnoj apoteci za dezinfekciju grla i jačanje odbrambene moći organizma.",
    prices: [
      { size: "kapi 10ml", price: "250 RSD" },
      { size: "kapi 20ml", price: "400 RSD" },
      { size: "sprej 20ml", price: "450 RSD" }
    ],
    image: "images/v2/propolis-960.webp",
    imgSlug: "propolis"
  },
  {
    id: 6,
    name: "Pčelinji Polen",
    description: "Super-hrana direktno iz cveta. Bomba vitamina i minerala.",
    longDescription: "Polen sakupljen od strane naših pčela je izvor svih esencijalnih amino-kiselina. Preporučuje se sportistima, đacima i svima koji su pod pojačanim fizičkim i mentalnim naporom.",
    prices: [
      { size: "100g", price: "200 RSD" },
      { size: "200g", price: "400 RSD" },
      { size: "500g", price: "800 RSD" }
    ],
    image: "images/v2/polen-960.webp",
    imgSlug: "polen"
  },
  {
    id: 7,
    name: "Pčelinji Vosak",
    description: "Potpuno prirodan vosak za izradu sveća ili kozmetike.",
    longDescription: "Čist pčelinji vosak iz naših košnica. Bez ikakvih dodataka, miriše na med i pčele. Idealan za izradu prirodnih melema ili mirisnih sveća.",
    prices: [
      { size: "komad", price: "200 RSD" }
    ],    
    image: "images/v2/vosak-960.webp",
    imgSlug: "vosak"
  },
  {
    id: 8,
    name: "Medovača",
    description: "Domaća rakija oplemenjena našim najboljim medom.",
    longDescription: "Naša medovača se pravi po starom porodičnom receptu. Spoj vrhunske voćne rakije i meda daje piće koje klizi niz grlo i ostavlja topao trag zdravlja.",
    prices: [
      { size: "0.2l", price: "400 RSD" },
      { size: "0.5l", price: "800 RSD" }
    ],    
    image: "images/v2/medovaca-960.webp",
    imgSlug: "medovaca"
  },
  {
    id: 9,
    name: "Mix: Polen-propolis-med",
    description: "Klasičan imuno-mix za svakodnevnu upotrebu.",
    longDescription: "Savršeno izbalansiran odnos meda, polena i propolisa. Jedna kašika ujutru je sve što vam treba za energičan početak dana i jak imunitet.",
    prices: [
      { size: "400g", price: "700 RSD" },
      { size: "1kg", price: "1500 RSD" }
    ],    
    image: "images/v2/mix-polen-propolis-960.webp",
    imgSlug: "mix-polen-propolis"
  },
  {
    id: 10,
    name: "Mix: Med-kopriva",
    description: "Idealan za krvnu sliku i gvožđe.",
    longDescription: "Ovaj miks smo obogatili semenom koprive, što ga čini izuzetnim saveznikom u borbi protiv anemije. Pomaže kod umora i vraća vitalnost organizmu.",
    prices: [
      { size: "400g", price: "700 RSD" },
      { size: "1kg", price: "1500 RSD" }
    ],    
    image: "images/v2/mix-kopriva-960.webp",
    imgSlug: "mix-kopriva"
  },
  {
    id: 11,
    name: "Mix: Med-polen-propolis-golica",
    description: "Podrška za prostatu i muško zdravlje.",
    longDescription: "Dodatak mlevenog semena golice (bundevino seme) čini ovaj miks specifičnim. Bogat je cinkom i mineralima važnim za zdravlje prostate i opšte muško zdravlje.",
    prices: [
      { size: "400g", price: "700 RSD" },
      { size: "1kg", price: "1500 RSD" }
    ],    
    image: "images/v2/mix-golica-960.webp",
    imgSlug: "mix-golica"
  },
  {
    id: 12,
    name: "Mix: Limun-đumbir-med",
    description: "Osvežavajući mix protiv prehlade i virusa.",
    longDescription: "Samo tri sastojka: naš med, limun i đumbir. Ljuti đumbir i kiselkasti limun u medu stvaraju moćan eliksir za grlo i disajne puteve.",
    prices: [
      { size: "400g", price: "700 RSD" }
    ],    
    image: "images/med_limun_djumbir_miks.webp"
  },
  {
    id: 20,
    name: "Krem med sa malinom",
    description: "Voćno i puno, sa prepoznatljivom aromom prave maline.",
    longDescription: "Pravi se od našeg meda umućenog do glatke, mazive teksture, uz pravu malinu. Najtraženiji ukus iz linije. Lepo ide na tost, uz jogurt ili prosto sa kašike.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    image: "images/v2/krem-malina-960.webp",
    imgSlug: "krem-malina",
    images: ["images/v2/krem-malina-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 21,
    name: "Krem med sa borovnicom",
    description: "Tamno i zrelo, sa punim ukusom borovnice.",
    longDescription: "Borovnica meda daje duboku boju i blago kiselkast završetak koji seče slatkoću. Odličan uz palačinke i sveže voće.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    isNew: true,
    image: "images/v2/krem-borovnica-960.webp",
    imgSlug: "krem-borovnica",
    images: ["images/v2/krem-borovnica-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 22,
    name: "Krem med sa limunom i đumbirom",
    description: "Osvežavajuće i blago pikantno, za jutarnji tost ili čaj.",
    longDescription: "Limun daje svežinu, đumbir blagu toplinu u grlu. Naš izbor za hladne dane i za one koji ne vole previše slatko.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    image: "images/v2/krem-limun-djumbir-960.webp",
    imgSlug: "krem-limun-djumbir",
    images: ["images/v2/krem-limun-djumbir-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 23,
    name: "Krem med sa mentom",
    description: "Svež i neočekivan, odličan uz palačinke ili jogurt.",
    longDescription: "Menta u medu iznenadi svakoga ko ga prvi put proba. Hladan je u ustima iako je med topao po ukusu. Lep poklon za nekoga ko misli da je sve već probao.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    image: "images/v2/krem-menta-960.webp",
    imgSlug: "krem-menta",
    images: ["images/v2/krem-menta-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 24,
    name: "Krem med sa čokoladom i lešnikom",
    description: "Med, čokolada i lešnik. Namaz za decu i odrasle.",
    longDescription: "Spoj našeg meda, tamne čokolade i mlevenog lešnika. Gust, mazivi namaz koji stoji rame uz rame sa kupovnim, samo bez palminog ulja.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    isNew: true,
    image: "images/v2/krem-cokolada-lesnik-960.webp",
    imgSlug: "krem-cokolada-lesnik",
    images: ["images/v2/krem-cokolada-lesnik-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 25,
    name: "Krem med sa belom čokoladom",
    description: "Blag i kremast, najslađi iz linije.",
    longDescription: "Bela čokolada medu daje mlečnu zaokruženost i svetlu boju. Najblaži ukus iz linije, obično prvi koji nestane kod dece.",
    prices: [
      { size: "teglica 120g", price: "300 RSD" },
      { size: "teglica u poklon kutiji", price: "500 RSD" }
    ],
    isNew: true,
    image: "images/v2/krem-bela-cokolada-960.webp",
    imgSlug: "krem-bela-cokolada",
    images: ["images/v2/krem-bela-cokolada-1440.webp", "images/v2/kat-krem-med-1280.webp"]
  },
  {
    id: 26,
    name: "Tri krem meda po izboru u kutijici",
    description: "Tri krem meda po izboru u kutijici.",
    longDescription: "Tri krem meda po izboru u kutijici, u drvenoj kutiji sa ugraviranim imenom gazdinstva. Birate koja tri ukusa idu unutra. Najčešći poklon koji pravimo za slave, rođendane i praznike.",
    prices: [
      { size: "3 x 120g u kutijici", price: "1400 RSD" }
    ],
    image: "images/v2/krem-kutija-960.webp",
    imgSlug: "krem-kutija",
    images: ["images/v2/krem-kutija-1440.webp", "images/v2/krem-linija-1440.webp"]
  },
  {
    id: 15,
    name: "Perga",
    description: "Pčelinji hleb. Polen koji su pčele fermentisale u saću.",
    longDescription: "Perga nastaje kada pčele polen utisnu u ćelije saća i prekriju ga medom. Tokom fermentacije polen postaje svarljiviji i bogatiji od sirovog. Uzima se po kašičica dnevno, obično ujutru.",
    prices: [
      { size: "10g", price: "1000 RSD" }
    ],
    image: "images/v2/perga-960.webp",
    imgSlug: "perga"
  },
  {
    id: 16,
    name: "Med u kesicama",
    description: "Jedna kašika meda u kesici. Za put, kancelariju i čaj.",
    longDescription: "Isti med kao iz tegle, samo u kesici od 15g. Stane u džep i u tašnu, ne kaplje i ne traži kašiku. Zgodno za posao, put ili da se ponudi gostima uz čaj.",
    prices: [
      { size: "15g", price: "30 RSD" }
    ],
    image: "images/v2/kesice-960.webp",
    imgSlug: "kesice"
  },
  {
    id: 17,
    name: "Medeni mečići",
    description: "Med u flašici u obliku mede. Deca ga biraju sama.",
    longDescription: "Providna flašica u obliku meda, puni se livadskim ili bagremovim medom. Med se cedi bez kašike, pa je najlakši način da dete samo uzme med. Čest poklon za rođendane.",
    prices: [
      { size: "livadski 400g", price: "400 RSD" },
      { size: "bagremov 400g", price: "750 RSD" }
    ],
    image: "images/v2/medeni-mecici-960.webp",
    imgSlug: "medeni-mecici"
  },
  {
    id: 18,
    name: "Mala medovača sa plutom",
    description: "Flašica od 40ml sa plutenim čepom i drvenom etiketom.",
    longDescription: "Naša medovača u maloj staklenoj flašici sa plutenim čepom i drvenom pločicom sa natpisom. Pravimo je za svadbe, slave i poslovne poklone, kada treba nešto malo ali domaće.",
    prices: [
      { size: "40ml", price: "200 RSD" }
    ],
    image: "images/v2/medovaca-mala-960.webp",
    imgSlug: "medovaca-mala"
  },
  {
    id: 19,
    name: "Medovača u flaši violini",
    description: "Staklena flaša u obliku violine, sa klik čepom.",
    longDescription: "Ista medovača, u staklenoj flaši oblikovanoj kao violina, sa klik čepom koji drži. Poklon koji se ne baca posle, flaša ostaje na polici.",
    prices: [
      { size: "40ml", price: "400 RSD" }
    ],
    image: "images/v2/violina-960.webp",
    imgSlug: "violina"
  },
  // ── Gotovi poklon aranžmani (slike: public/aranzmani → public/images/v2 + public/images/aranzmani) ──
  {
    id: 30,
    name: "Aranžman Veliki",
    description: "Livadski med 1kg, medovača 0.5l, polen, propolis, kašika za med i medenjak.",
    longDescription: "Naš najveći gotov aranžman. U njemu su: livadski med 1kg, medovača 0.5l, polen, propolis, drvena kašika za med i medenjak. Dekorišemo ga mašnom i natpisom po želji (slava, rođendan, praznik…).",
    prices: [{ size: "komplet", price: "3300 RSD" }],
    image: "images/v2/aranzman-3300-960.webp",
    imgSlug: "aranzman-3300",
    images: [1, 2, 3, 4, 5, 6].map(n => `images/aranzmani/aranzman-3300-${n}.webp`)
  },
  {
    id: 31,
    name: "Aranžman sa velikom medovačom",
    description: "Livadski med 400g, medovača 0.5l, polen, propolis kapi i medenjak.",
    longDescription: "U aranžmanu su: livadski med 400g, medovača 0.5l, polen, propolis kapi i medenjak. Dekorišemo ga mašnom i natpisom po želji (slava, rođendan, praznik…).",
    prices: [{ size: "komplet", price: "2800 RSD" }],
    image: "images/v2/aranzman-2800-velika-960.webp",
    imgSlug: "aranzman-2800-velika",
    images: [1, 2, 3].map(n => `images/aranzmani/aranzman-2800-velika-${n}.webp`)
  },
  {
    id: 32,
    name: "Aranžman sa živim cvećem",
    description: "Naši aranžmani sa dodatkom živog cveća.",
    longDescription: "Aranžmani sa našim proizvodima i dodatkom živog cveća — idealni za rođendane, slave, ispraćaje u penziju i čestitke. Sadržaj i cveće prilagođavamo vašoj želji, a cena zavisi od izabranih proizvoda i cveća.",
    prices: [{ size: "zavisno od sadržaja", price: "od 2000 RSD" }],
    image: "images/v2/aranzman-cvece-960.webp",
    imgSlug: "aranzman-cvece",
    images: [1, 2, 3, 4, 5, 6].map(n => `images/aranzmani/aranzman-cvece-${n}.webp`)
  },
  {
    id: 33,
    name: "Aranžman sa malom medovačom i 1kg meda",
    description: "Med 1kg, medovača 0.2l, polen, propolis kapi i medenjak.",
    longDescription: "U aranžmanu su: med 1kg, medovača 0.2l, polen, propolis kapi i medenjak. Dekorišemo ga mašnom i natpisom po želji (slava, rođendan, praznik…).",
    prices: [{ size: "komplet", price: "2800 RSD" }],
    image: "images/v2/aranzman-2800-mala-960.webp",
    imgSlug: "aranzman-2800-mala",
    images: ["images/aranzmani/aranzman-2800-mala-1.webp"]
  },
  {
    id: 34,
    name: "Aranžman sa malom medovačom",
    description: "Livadski med 400g, medovača 0.2l, polen, propolis kapi i medenjak.",
    longDescription: "U aranžmanu su: livadski med 400g, medovača 0.2l, polen, propolis kapi i medenjak. Dekorišemo ga mašnom i natpisom po želji (slava, rođendan, praznik…).",
    prices: [{ size: "komplet", price: "2000 RSD" }],
    image: "images/v2/aranzman-2000-960.webp",
    imgSlug: "aranzman-2000",
    images: [1, 2, 3, 4, 5, 6].map(n => `images/aranzmani/aranzman-2000-${n}.webp`)
  },
  {
    id: 35,
    name: "Aranžman Mali",
    description: "Livadski med 400g, medovača 0.2l i medenjak.",
    longDescription: "Mali aranžman za lepu pažnju. U njemu su: livadski med 400g, medovača 0.2l i medenjak. Dekorišemo ga mašnom i natpisom po želji.",
    prices: [{ size: "komplet", price: "1300 RSD" }],
    image: "images/v2/aranzman-1300-960.webp",
    imgSlug: "aranzman-1300",
    images: ["images/aranzmani/aranzman-1300-1.webp"]
  },
  {
    id: 13,
    name: "Aranžman po vašoj želji",
    description: "Sastavite svoju kombinaciju — napravićemo poseban aranžman za vas.",
    longDescription: "Ne vidite tačno ono što tražite? Recite nam koje proizvode želite i za koju priliku (slava, rođendan, Božić, Uskrs, poslovni poklon…), a mi ćemo napraviti poseban aranžman samo za vas, sa dekoracijom i natpisom po želji. Cena zavisi od izabranih proizvoda.",
    prices: [
      { size: "", price: "cena po dogovoru" }
    ],    
    image: "images/aranzman.jpg"
  }
];

export const productCategories = {
  med: {
    label: "Med",
    items: products.filter(p => [1, 2, 4, 17, 16].includes(p.id))
  },
  kremMed: {
    label: "Krem med",
    items: products.filter(p => [20, 21, 22, 23, 24, 25, 26].includes(p.id))
  },
  miks: {
    label: "Miksevi",
    items: products.filter(p => [9, 10, 11, 12].includes(p.id))
  },
  aranzman: {
    label: "Aranžmani",
    items: products.filter(p => [30, 31, 32, 33, 34, 35, 13].includes(p.id))
  },
  ostalo: {
    label: "Ostalo",
    items: products.filter(p => [5, 6, 7, 8, 15, 18, 19].includes(p.id))
  }
};
