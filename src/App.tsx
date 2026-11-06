import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  CheckCircle2, 
  ShoppingBasket, 
  Users, 
  X,
  Send,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck  
} from 'lucide-react';

const BeeIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
    <path d="M12 3V21" />
    <path d="M4 7.5L20 16.5" />
    <path d="M20 7.5L4 16.5" />
  </svg>
);

interface PriceOption {
  size: string;      
  price: string;     
}

interface Product {
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


const familyMembers = [
  {
    name: "Mihajlo",
    role: "Otac & Glavni Pčelar",
    description: "Stub našeg gazdinstva. Mihajlo je zadužen za sve na pčelinjaku - od brige o zdravlju pčela do vrcanja meda. Njegovo znanje i iskustvo su temelj svega što radimo.",
    icon: <BeeIcon className="w-6 h-6" />
  },
  {
    name: "Tanja",
    role: "Majka & Kreativni Centar",
    description: "Tanja pretvara naše pčelinje darove u prelepe aranžmane. Zadužena je za planiranje festivala, prodaju, dostavu i osmeh koji dočekuje svakog kupca.",
    icon: <ShoppingBasket className="w-6 h-6" />
  },
  {
    name: "Ivan",
    role: "Deda & Desna ruka",
    description: "Iskustvo koje se ne kupuje. Ivan pomaže Mihajlu na pčelinjaku, uvek je tu kada je potrebna dodatna ruka i mudrost u radu sa košnicama.",
    icon: <Users className="w-6 h-6" />
  },
  {
    name: "Nađa",
    role: "Ćerka & Mlada nada",
    description: "Nađa je mamin glavni asistent na festivalima. Svojom energijom i ljubaznošću pomaže u prezentaciji proizvoda i komunikaciji sa našim dragim kupcima.",
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    name: "Nikola",
    role: "Sin & Dostava",
    description: "Nikola je naš pouzdani glasnik. Uvek spreman da pomogne - bilo da je u pitanju dostava meda na kućnu adresu ili pakovanje porudžbina.",
    icon: <Truck className="w-6 h-6" />
  }
];

const products: Product[] = [
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
  {
    id: 13,
    name: "Poklon aranžmani",
    description: "Personalizovane korpice za sve prilike.",
    longDescription: "Pravimo aranžmane po vašoj želji! Bilo da je u pitanju slava, rođendan, Božić ili Uskrs, mi spajamo naše proizvode u prelepe dekorisane korpice sa natpisima po vašoj želji.",
    prices: [
      { size: "", price: "cena po dogovoru" }
    ],    
    image: "images/aranzman.jpg"
  }
];

const productCategories = {
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
    items: products.filter(p => [13].includes(p.id))
  },
  ostalo: {
    label: "Ostalo",
    items: products.filter(p => [5, 6, 7, 8, 15, 18, 19].includes(p.id))
  }
};

interface NewsPost {
  title: string;
  date: string;
  text: string;
  images: string[];
}

const newsPosts: NewsPost[] = [
  {
    title: "Naša tezga na festivalu",
    date: "2026-03-15",
    text: "Učestvovali smo na festivalu meda gde smo predstavili naše najnovije proizvode. Bilo je divno videti koliko ljudi uživa u našem medu!",
    images: ["images/tezga_med.webp"]
  },
  {
    title: "Vredne pčele na paši",
    date: "2025-05-20",
    text: "Naše pčele su na paši i rade punom parom. Ove sezone očekujemo odličan prinos meda.",
    images: ["images/kontejner2.webp"]
  },
  {
    title: "Miksevi za zdraviji život",
    date: "2026-01-10",
    text: `Predstavljamo vam naše mikseve. Svaki kreće od našeg meda, a onda dobija ono što mu daje namenu.

• Med, polen i propolis. Klasičan imuno-miks za svaki dan.
• Med i kopriva. Za krvnu sliku i gvožđe.
• Med, polen, propolis i golica. Mleveno seme bundeve, za mušku snagu.
• Med, limun i đumbir. Za grlo i disajne puteve.

Jedna kašika ujutru je dovoljna. Nema dodatog šećera ni konzervansa.`,
    images: ["images/sva_tri_miksa_mali_veliki.jpg"]
  },
  {
    title: "Naš med putuje svetom!",
    date: "2025-12-05",
    text: "Pogled sa terase u Dubaiju - naš med je stigao i do Bliskog istoka. Ponosni smo što naš ukus prelazi granice.",
    images: ["images/med_u_dubaiju.jpg"]
  },
  {
    title: "Nađa i Ivana u akciji",
    date: "2025-11-18",
    text: "Naše devojke su uvek spremne da dočekaju kupce sa osmehom i pomognu im da izaberu pravi proizvod.",
    images: ["images/nadja_ivana_za_tezgom.webp"]
  },
  {
    title: "Gajbice spremne za isporuku",
    date: "2025-10-30",
    text: "Nova tura pakovanja je spremna za naše verne kupce. Svaka gajbica je pažljivo pripremljena sa ljubavlju.",
    images: ["images/gajbice_lepa_slika.jpg", "images/gajbice1.jpg", "images/gajbice2.jpg", "images/gajbice3.jpg", "images/gajbice4.jpg", "images/gajbice5.jpg"]
  },
  {
    title: "Pčele obišle voćnjake Čelareva i Tornjoša",
    date: "2026-04-05",
    text: "Naše pčele su ove sezone obišle voćnjak u Čelarevu, a zatim i voćnjak jabuka u Tornjošu. Među rascvetanim stablima marljivo su skupljale nektar za novu sezonu meda.",
    images: [
      "images/pcele_na_vocnjaku.jpeg",
      "images/pcele_na_vocnjaku2.jpeg",
      "images/pcele_na_vocnjaku3.jpeg",
      "images/kontejner_na_pasi.jpeg",
      "images/kontejner_na_pasi2.jpeg",
      "images/kontejner_na_pasi3.jpeg"
    ]
  },
  {
    title: "Naš novi prepoznatljivi kombi",
    date: "2026-03-27",
    text: "Imamo nov kombi sa novom nalepnicom Letvenčuk Med koja ga čini lako prepoznatljivim i olakšava nam i ubrzava isporuku do naših vernih kupaca.",
    images: ["images/kombi_sa_nalepnicom_letvencukmed.jpeg"]
  },
  {
    title: "Pčele stigle u Bačku Topolu",
    date: "2026-04-16",
    text: "Naše pčele su stigle u Bačku Topolu. Kontejner sa košnicama je postavljen i pčele kreću da istražuju nove pašnjake.",
    images: ["images/video_backa_topola_kontejner_sa_kosnicama.mp4"]
  },
  {
    title: "Krem med sada ima šest ukusa",
    date: "2026-11-01",
    text: `Krem med je kod nas počeo sa tri ukusa: malina, limun i đumbir, i menta. Od danas ih ima šest.

Pridružila su im se tri nova:

• Borovnica, tamna i zrela, sa blago kiselkastim završetkom koji seče slatkoću.
• Čokolada i lešnik, gust namaz za decu i odrasle, bez palminog ulja.
• Bela čokolada, najblaži i najslađi iz linije. Obično prvi nestane kod dece.

Svi se prave isto, od našeg meda umućenog do glatke, mazive teksture. Teglica od 120g košta 300 dinara, a tri ukusa po izboru u drvenoj kutijici 1400 dinara.`,
    images: [
      "images/v2/krem-kutija-1440.webp",
      "images/v2/krem-borovnica-1440.webp",
      "images/v2/krem-cokolada-lesnik-1440.webp",
      "images/v2/krem-bela-cokolada-1440.webp",
      "images/v2/kat-krem-med-1280.webp"
    ]
  },
  {
    title: "Novo u ponudi: krem med u tri ukusa",
    date: "2026-09-12",
    text: `Predstavljamo vam nešto novo iz našeg pčelinjaka — krem med u tri ukusa. Nastao je od našeg meda, umućenog do glatke, mazive teksture, uz prirodne dodatke koji mu daju karakter.

• Krem med sa limunom i đumbirom — osvežavajuće i blago pikantno, savršeno za jutarnji tost ili čaj.
• Krem med sa malinom — voćno i puno, sa prepoznatljivom aromom prave maline.
• Krem med sa mentom — svež i neočekivan, odličan uz palačinke, jogurt ili sam sa kašikom.

Gde da probate?
Danas nas možete pronaći na festivalima u Vrbasu i na Paliću — svratite i probajte sva tri ukusa.

Kako do njega?
Od sutra vas čeka i kod nas kući, a možete ga poručiti i direktno preko sajta. Donosimo na vašu adresu.`,
    images: [
      "images/krem_med5.jpeg",
      "images/krem_med2.jpeg",
      "images/krem_med3.jpeg",
      "images/krem_med6.jpeg",
      "images/krem_med7.jpeg",
      "images/krem_med1.jpeg",
      "images/krem_med4.jpeg"
    ]
  },
  {
    title: "Prolećni festival cveća",
    date: "2026-04-18",
    text: "Izašli smo na Prolećni festival cveća i lepo se družili sa našim starim i novim prijateljima. Na slikama možete videti naše tezge i atmosferu sa festivala.",
    images: [
      "images/prolecni_festiva_cveca1.jpeg",
      "images/prolecni_festiva_cveca2.jpeg",
      "images/prolecni_festiva_cveca3.jpeg",
      "images/prolecni_festiva_cveca4.jpeg",
      "images/prolecni_festiva_cveca5.jpeg"
    ]
  }
];

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const navHeight = 104; // visina plivajućeg navbara plus odmak od vrha
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};

const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) { diff > 0 ? onSwipeRight() : onSwipeLeft(); }
    touchStart.current = null;
  };
  return { onTouchStart, onTouchEnd };
};


/* --- Responzivne slike iz nove serije --------------------------------- */

/** Sirine koje postoje u images/v2 po odnosu stranica. */
const V2 = {
  card: { widths: [480, 960, 1440], w: 960, h: 1200 },   // 4:5
  wide: { widths: [640, 1280, 1920], w: 1280, h: 853 },  // 3:2
  hero: { widths: [800, 1440, 2200], w: 1440, h: 1080 }, // 4:3
} as const;

const v2SrcSet = (slug: string, kind: keyof typeof V2) =>
  V2[kind].widths.map((w) => `images/v2/${slug}-${w}.webp ${w}w`).join(', ');

/* --- Deljene primitive -------------------------------------------------- */

/** Saće kao znak. Motiv koji se provlači kroz ceo sajt, umesto generične crtice. */
const HexMark = ({ className = "w-5 h-5", filled = false }: { className?: string; filled?: boolean }) => (
  <svg viewBox="0 0 24 28" aria-hidden="true" className={className}>
    <path
      d="M12 1 L22.4 7 L22.4 21 L12 27 L1.6 21 L1.6 7 Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Jedan naslov sekcije za ceo sajt. Ranije je isti blok (h2 + crtica + tekst)
 * bio iskucan iznova u svakoj sekciji, uvek centriran.
 */
const SectionHeading = ({
  title,
  lead,
  align = "left",
  id,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
}) => (
  <div className={align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-3xl"}>
    <div className={`flex items-center gap-3 mb-6 ${align === "center" ? "justify-center" : ""}`}>
      <HexMark className="w-4 h-4 text-honey" filled />
      <HexMark className="w-3.5 h-3.5 text-honey/45" filled />
      <span className="h-px w-16 bg-line" />
    </div>
    <h2 id={id} className="font-display text-[2rem] leading-[1.08] sm:text-4xl md:text-[2.75rem] font-semibold text-ink">
      {title}
    </h2>
    {lead && (
      <p className={`mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-[62ch] ${align === "center" ? "mx-auto" : ""}`}>
        {lead}
      </p>
    )}
  </div>
);

/**
 * Pilula sa ikonom u sopstvenom krugu. Ikona nikad ne stoji gola uz tekst.
 * Kao <a> ili <button>, zavisno od toga da li je prosledjen href.
 */
const ActionButton = ({
  children,
  href,
  onClick,
  variant = "solid",
  icon: Icon = ArrowRight,
  external = false,
  className = "",
  type,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  icon?: React.ElementType;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
}) => {
  const base =
    "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-semibold text-[0.95rem] whitespace-nowrap transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98]";
  const skin =
    variant === "solid"
      ? "bg-honey text-white shadow-[var(--shadow-soft)] hover:bg-honey-deep hover:shadow-[var(--shadow-lift)]"
      : "bg-raise text-ink border border-line hover:border-honey/50 hover:shadow-[var(--shadow-soft)]";
  const bubble =
    variant === "solid"
      ? "bg-white/20"
      : "bg-honey-tint text-honey";

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-px ${bubble}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${base} ${skin} ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={`${base} ${skin} ${className}`}>
      {inner}
    </button>
  );
};

// --- Components ---
const FamilyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = familyMembers.length;
  const getVisibleCount = () => {
  const w = window.innerWidth;
  if (w < 768) return 1;           
  if (w <= 1200) return 3; 
  return 4;                        
};

const [visibleCount, setVisibleCount] = useState(getVisibleCount);

useEffect(() => {
  const handleResize = () => {
    setVisibleCount(getVisibleCount());
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + total) % total);
  };

  const swipe = useSwipe(() => paginate(1), () => paginate(-1));

  const getVisible = () => {
    return Array.from({ length: visibleCount }, (_, i) =>
      familyMembers[(currentIndex + i) % total]
    );
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative">
      <button
        onClick={() => paginate(-1)}
        aria-label="Prethodni član"
        className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="overflow-hidden px-2 pb-6" {...swipe}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`grid gap-8 ${
              visibleCount === 1
                ? 'grid-cols-1'
                : visibleCount === 3
                ? 'grid-cols-3'
                : 'grid-cols-4'
            }`}
          >
            {getVisible().map((member) => (
              <div
                key={member.name}
                className="group flex h-full min-h-[21rem] flex-col rounded-[var(--radius-card)] border border-line bg-raise p-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-honey/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-inner)] bg-honey-tint text-honey-deep transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105">
                  {member.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-honey-deep">{member.role}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{member.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => paginate(1)}
        aria-label="Sledeći član"
        className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            aria-label={`Idi na člana ${i + 1}`}
            className={`relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-11 before:h-11 before:content-[''] w-2 h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-expo)] ${
              i === currentIndex ? 'bg-honey w-6' : 'bg-line hover:bg-honey/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCarousel = ({ items, onClick }: { items: Product[], onClick: (p: Product) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = items.length;

  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(
        window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + total) % total);
  };

  const swipe = useSwipe(() => paginate(1), () => paginate(-1));

  const getVisible = () =>
    Array.from({ length: Math.min(visibleCount, total) }, (_, i) =>
      items[(currentIndex + i) % total]
    );

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const gridClass =
    visibleCount === 1 ? 'grid-cols-1' :
    visibleCount === 2 ? 'grid-cols-2' :
    'grid-cols-4';

  return (
    <div className="relative">
      {total > visibleCount && (
        <button
          onClick={() => paginate(-1)}
          aria-label="Prethodni proizvod"
          className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div className="overflow-hidden px-2 pb-6" {...swipe}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`grid gap-8 ${gridClass}`}
          >
            {getVisible().map((product) => (
              <ProductCard key={product.id} product={product} onClick={onClick} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {total > visibleCount && (
        <button
          onClick={() => paginate(1)}
          aria-label="Sledeći proizvod"
          className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {total > visibleCount && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              aria-label={`Idi na proizvod ${i + 1}`}
              className={`relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-11 before:h-11 before:content-[''] w-2 h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-expo)] ${
                i === currentIndex ? 'bg-honey w-6' : 'bg-line hover:bg-honey/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NAV_LINKS = [
  { id: "porodica", label: "O nama" },
  { id: "proizvodi", label: "Proizvodi" },
  { id: "galerija", label: "Pčelinjak" },
  { id: "kontakt", label: "Kontakt" },
];

/** Prati koja je sekcija trenutno u kadru, da navbar može da je označi. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => scrollToId(sectionId), 50);
  };

  // Dok je mobilni meni otvoren, strana iza njega ne sme da se skroluje.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Glavna navigacija"
        className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 rounded-full border border-line/80 bg-raise/80 pl-5 pr-3 shadow-[var(--shadow-soft)] backdrop-blur-xl"
      >
        <button
          onClick={() => handleNavClick("top")}
          aria-label="Letvenčuk Med, na vrh strane"
          className="flex shrink-0 items-center transition-transform duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
        >
          <img
            src="images/logo-mark.svg"
            alt="Letvenčuk Med"
            width={2000}
            height={498}
            className="h-8 w-auto -translate-y-[3px] sm:h-9"
          />
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ease-[var(--ease-out-expo)] ${
                  isActive ? "text-honey-deep" : "text-ink-soft hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-honey-tint"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+381600726253"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-honey px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-honey-deep active:scale-[0.98] md:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Pozovite nas
          </a>

          {/* Hamburger koji se pretvara u X, bez skoka */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={isOpen}
            aria-controls="mobilni-meni"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-honey-tint md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                  isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobilni-meni"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[var(--radius-panel)] border border-line/80 bg-raise/95 p-2 shadow-[var(--shadow-lift)] backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavClick(link.id)}
                className={`flex w-full items-center justify-between rounded-[var(--radius-inner)] px-4 py-3.5 text-left text-base font-semibold transition-colors ${
                  active === link.id ? "bg-honey-tint text-honey-deep" : "text-ink hover:bg-sunken"
                }`}
              >
                {link.label}
                <HexMark className={`h-3.5 w-3.5 ${active === link.id ? "text-honey" : "text-line"}`} filled />
              </motion.button>
            ))}
            <a
              href="tel:+381600726253"
              className="mt-2 flex items-center justify-center gap-2 rounded-[var(--radius-inner)] bg-honey px-4 py-3.5 font-semibold text-white"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              060 0726 253
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface MediaGalleryProps {
  items: string[];
  alt: string;
  className?: string;
  mediaClassName?: string;
  autoPlay?: boolean;
}

/** Deljeni galerijski prikaz slika/videa sa strelicama, tackama i swipe-om. */
const MediaGallery = ({
  items,
  alt,
  className = '',
  mediaClassName = 'object-contain',
  autoPlay = true,
}: MediaGalleryProps) => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((p) => (p + 1) % items.length);
  const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);
  const swipe = useSwipe(next, prev);

  return (
    <div className={`relative overflow-hidden ${className}`} {...swipe}>
      {isVideo(items[index]) ? (
        <video
          src={items[index]}
          controls
          autoPlay={autoPlay}
          muted
          playsInline
          className={`w-full h-full ${mediaClassName}`}
        />
      ) : (
        <img
          src={items[index]}
          alt={alt}
          width={512}
          height={320}
          loading="lazy"
          className={`w-full h-full ${mediaClassName}`}
        />
      )}
      {items.length > 1 && (
        <>
          <button onClick={prev} aria-label="Prethodna slika" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-raise/90 text-ink shadow-[var(--shadow-soft)] transition-colors duration-300 hover:bg-raise">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} aria-label="Sledeća slika" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-raise/90 text-ink shadow-[var(--shadow-soft)] transition-colors duration-300 hover:bg-raise">
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/** Zaglavlje jedne kategorije proizvoda. */
const CategoryHeading = ({ label, count }: { label: string; count: number }) => (
  <h3 className="mb-8 flex items-center gap-4 font-display text-xl font-semibold text-ink sm:text-2xl">
    <HexMark className="h-4 w-4 shrink-0 text-honey" filled />
    {label}
    <span className="ml-1 h-px flex-1 bg-line" />
    <span className="tnum shrink-0 text-sm font-medium text-ink-mute">{count}</span>
  </h3>
);

interface ProductCardProps {
  product: Product;
  onClick: (p: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const tilt = use3DTilt<HTMLButtonElement>();
  return (
    <button
      type="button"
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      onClick={() => onClick(product)}
      aria-label={`${product.name}, otvori detalje`}
      style={{ transition: 'transform 0.4s var(--ease-out-expo)', transformStyle: 'preserve-3d' }}
      className="group mb-4 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-raise text-left shadow-[var(--shadow-soft)] transition-[box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:border-honey/40 hover:shadow-[var(--shadow-lift)]"
    >
      {/* Slika je glavni element kartice, zato nosi pun odnos 4:5 */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sunken">
        {product.imgSlug ? (
          <img
            src={`images/v2/${product.imgSlug}-960.webp`}
            srcSet={v2SrcSet(product.imgSlug, 'card')}
            sizes="(max-width: 767px) 88vw, (max-width: 1023px) 44vw, 23vw"
            alt={product.name}
            width={V2.card.w}
            height={V2.card.h}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            width={480}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          />
        )}

        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-page backdrop-blur-sm">
            Novo
          </span>
        )}
      </div>

      <div className="flex flex-grow flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
        <h3 className="font-display text-[1rem] font-semibold leading-snug text-ink sm:text-[1.0625rem]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        {/* Cena nikad ne sme da se lomi. Na uskoj kartici (mreza krem meda na
            telefonu) link jednostavno padne u novi red ispod cene. */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-line pt-4">
          <span className="tnum whitespace-nowrap text-base font-semibold text-ink">
            {product.prices.length > 1
              ? `od ${product.prices[0].price}`
              : product.prices[0].price}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-honey-deep">
            Detaljnije
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </button>
  );
};

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onInquiry: () => void;
}

const ProductModal = ({ product, onClose, onInquiry }: ProductModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6 py-4 sm:py-6"
  >
    <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius-panel)] bg-raise shadow-[var(--shadow-deep)]"
    >
      <button
        onClick={onClose}
        aria-label="Zatvori"
        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-raise/90 text-ink shadow-[var(--shadow-soft)] ring-1 ring-line transition-colors duration-300 hover:bg-sunken"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>
      <div className="overflow-y-auto overscroll-contain">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-72 sm:h-80 md:h-auto flex-shrink-0">
            <MediaGallery
              items={product.images ?? [product.imgSlug ? `images/v2/${product.imgSlug}-1440.webp` : product.image]}
              alt={product.name}
              className="h-full bg-sunken"
              autoPlay={false}
            />
          </div>
          <div className="md:w-1/2 p-6 sm:p-8">
            <h2 className="pr-10 font-display text-2xl font-semibold leading-tight text-ink">{product.name}</h2>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-ink-mute">Dostupne opcije</p>
              <ul className="divide-y divide-line overflow-hidden rounded-[var(--radius-inner)] border border-line">
                {product.prices.map((priceOption, index) => (
                  <li key={index} className="flex items-baseline justify-between gap-3 bg-sunken/50 px-4 py-2.5">
                    <span className="text-sm text-ink-soft">{priceOption.size || 'Po dogovoru'}</span>
                    <span className="tnum text-sm font-semibold text-ink">{priceOption.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 leading-relaxed text-ink-soft">{product.longDescription}</p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={`https://wa.me/381607262539?text=${encodeURIComponent(`Zdravo, zainteresovan/a sam za ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-full bg-honey py-3.5 font-semibold text-white shadow-[var(--shadow-soft)] transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-honey-deep active:scale-[0.98]"
              >
                Naručite preko WhatsApp-a
                <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={onInquiry}
                className="rounded-full border border-line bg-raise py-3.5 font-semibold text-ink transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:border-honey/50 hover:bg-sunken active:scale-[0.98]"
              >
                Pošaljite upit
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const NewsModal = ({ post, onClose }: { post: NewsPost; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative z-10 max-h-[90dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-[var(--radius-panel)] bg-raise shadow-[var(--shadow-deep)]"
      >
        <button onClick={onClose} aria-label="Zatvori" className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-raise/90 text-ink shadow-[var(--shadow-soft)] ring-1 ring-line transition-colors duration-300 hover:bg-sunken">
          <X size={18} />
        </button>
        <MediaGallery
          items={post.images}
          alt={post.title}
          className="h-64 rounded-t-[var(--radius-panel)] bg-ink sm:h-80"
        />
        <div className="p-6">
          <p className="mb-2 text-sm font-semibold text-honey-deep">{new Date(post.date).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <h3 className="mb-4 font-display text-2xl font-semibold leading-tight text-ink">{post.title}</h3>
          <p className="leading-relaxed whitespace-pre-line text-ink-soft">{post.text}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const HexCell = ({ post, onSelect }: { post: NewsPost; onSelect: (p: NewsPost) => void }) => (
  <div
    onClick={() => onSelect(post)}
    className="relative cursor-pointer group"
    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
  >
    <div className="aspect-[1/1.15] overflow-hidden">
      {isVideo(post.images[0]) ? (
        <video
          src={post.images[0]}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      ) : (
        <img
          src={post.images[0]}
          alt={post.title}
          width={300}
          height={345}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 opacity-90 group-hover:opacity-95 transition duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[28%] px-4 text-center">
        <h3 className="text-white text-sm md:text-lg font-bold leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' }}>{post.title}</h3>
        <p className="mt-1 text-xs font-semibold text-honey md:text-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.9)' }}>{new Date(post.date).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>
    </div>
  </div>
);

const HoneycombGrid = ({ posts, onSelect }: { posts: (NewsPost | null)[]; onSelect: (p: NewsPost) => void }) => {
  const [cols, setCols] = useState(window.innerWidth < 640 ? 2 : 3);

  useEffect(() => {
    const handle = () => setCols(window.innerWidth < 640 ? 2 : 3);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

  // Build alternating rows: full row (cols), then offset row (cols-1)
  const rows: { posts: (NewsPost | null)[]; offset: boolean }[] = [];
  let idx = 0;
  let full = true;
  while (idx < posts.length) {
    const count = full ? cols : cols - 1;
    const slice = posts.slice(idx, idx + Math.min(count, posts.length - idx));
    rows.push({ posts: slice, offset: !full });
    idx += slice.length;
    full = !full;
  }

  const hexWidth = 100 / cols;

  return (
    <div className="max-w-4xl mx-auto overflow-hidden px-4">
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center"
          style={{ marginTop: rowIdx > 0 ? `-${hexWidth * 0.24}%` : 0 }}
        >
          {row.posts.map((post, i) => (
            <div
              key={i}
              style={{ width: `${hexWidth}%`, padding: '0 4px' }}
            >
              {post ? (
                <HexCell post={post} onSelect={onSelect} />
              ) : (
                <div className="aspect-[1/1.15] invisible" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const HoneycombCarousel = ({ posts, onSelect }: { posts: NewsPost[]; onSelect: (p: NewsPost) => void }) => {
  const pageSize = 5;
  const totalPages = Math.ceil(posts.length / pageSize);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setPage((prev) => (prev + dir + totalPages) % totalPages);
  };

  const swipe = useSwipe(() => paginate(1), () => paginate(-1));

  const pagePosts: (NewsPost | null)[] = posts.slice(page * pageSize, page * pageSize + pageSize);
  while (pagePosts.length < pageSize) pagePosts.push(null);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative">
      {totalPages > 1 && (
        <button
          onClick={() => paginate(-1)}
          aria-label="Prethodna"
          className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div {...swipe}>
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <HoneycombGrid posts={pagePosts} onSelect={onSelect} />
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <button
          onClick={() => paginate(1)}
          aria-label="Sledeća"
          className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-raise border border-line rounded-full shadow-[var(--shadow-soft)] flex items-center justify-center text-ink-soft hover:text-honey-deep hover:border-honey/50 transition-colors duration-300 ease-[var(--ease-out-expo)]"
        >
          <ChevronRight size={20} />
        </button>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              aria-label={`Stranica ${i + 1}`}
              className={`relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-11 before:h-11 before:content-[''] w-2 h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-expo)] ${
                i === page ? 'bg-honey w-6' : 'bg-line hover:bg-honey/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 3D tilt card hook
const use3DTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  }, []);
  return { ref, handleMouseMove, handleMouseLeave };
};

// Section wrapper with fade-in on scroll
const Section3D = ({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <section id={id} className={className}>{children}</section>;
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Hero: mirna slika, poruka i poziv na akciju preko nje.
// Video je uklonjen namerno, stalno kretanje je odvlacilo paznju sa poruke.
const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-[86dvh] w-full items-end overflow-hidden md:min-h-[90dvh]">
      <div className="absolute inset-0">
        <img
          src="images/v2/hero-med-hleb-1440.webp"
          srcSet={v2SrcSet('hero-med-hleb', 'hero')}
          sizes="100vw"
          alt="Med se sliva sa drvene kašike na krišku hleba"
          width={V2.hero.w}
          height={V2.hero.h}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Zastor: bez njega beli tekst ne prolazi kontrast preko fotografije */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-5 pb-14 pt-32 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.img
            {...fadeUp(0)}
            src="images/logo-mark-light.svg"
            alt="Pčelarsko gazdinstvo Letvenčuk"
            width={2000}
            height={498}
            className="mb-7 h-12 w-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] sm:h-14 lg:h-16"
          />

          <motion.h1
            {...fadeUp(0.05)}
            className="max-w-[16ch] font-display text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            Med koji pravi jedna porodica
          </motion.h1>

          <motion.p
            {...fadeUp(0.18)}
            className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Pčelarsko gazdinstvo Letvenčuk iz Kule. Oko 70 košnica, tri generacije
            i med bez ijednog dodatka.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <ActionButton onClick={() => scrollToId('proizvodi')}>
              Pogledajte proizvode
            </ActionButton>
            <button
              onClick={() => scrollToId('porodica')}
              className="group inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/10 py-2 pl-6 pr-2 text-[0.95rem] font-semibold text-white backdrop-blur-md transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:border-white/60 hover:bg-white/20 active:scale-[0.98]"
            >
              Naša priča
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [activeContactTab, setActiveContactTab] = useState<'forma' | 'mapa' | 'kontakt'>('forma');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  const handleProductInquiry = (product: Product) => {
    setFormMessage(`Zdravo, zainteresovan/a sam za proizvod "${product.name}". Molim vas da mi pošaljete više informacija o dostupnosti i načinu isporuke.`);
    setActiveContactTab('forma');
    setSelectedProduct(null);
    setTimeout(() => scrollToId('kontakt'), 100);
  };

  useEffect(() => {
    if (!formError) return;
    const t = setTimeout(() => setFormError(''), 4000);
    return () => clearTimeout(t);
  }, [formError]);

  // When a modal is open, push a history entry so the phone's back button
  // closes the modal instead of navigating away from the site.
  useEffect(() => {
    const isOpen = selectedProduct !== null || selectedPost !== null;
    if (!isOpen) return;
    window.history.pushState({ modal: true }, '');
    const handlePop = () => {
      setSelectedProduct(null);
      setSelectedPost(null);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [selectedProduct, selectedPost]);

  // Close helpers that also pop the pushed history entry (keeps history clean
  // so subsequent back presses behave normally).
  const closeProduct = () => {
    if (window.history.state?.modal) {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };
  const closePost = () => {
    if (window.history.state?.modal) {
      window.history.back();
    } else {
      setSelectedPost(null);
    }
  };

  return (
    <div id="top" className="min-h-[100dvh] bg-page selection:bg-honey-tint selection:text-ink">
      <a href="#sadrzaj" className="skip-link">Preskoči na sadržaj</a>
      <div className="grain" aria-hidden="true" />
      <Navbar />

      <main id="sadrzaj">
      <HeroSection />

      {/* Porodica Section */}
      <Section3D id="porodica" className="relative overflow-hidden bg-sunken px-5 py-24 sm:px-8 md:py-32">
        <div className="honeycomb-field pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-page to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              title={<>Tri generacije, <br className="hidden sm:block" />jedan pčelinjak</>}
              lead="Ovo nije fabrika. Ovo je kuća u Kuli u kojoj se med vrca, puni i nosi na tezgu."
            />
            <div className="space-y-5 leading-relaxed text-ink-soft lg:pt-4">
              <p>
                Sve je počelo od <span className="font-semibold text-honey-deep">Ivana</span>.
                Već decenijama se bavi pčelama, a kroz sve te godine naučio je koliko ovaj zanat
                traži strpljenja i tihe ljubavi. Ono što je on gradio dan za danom, danas je srce
                svega što radimo.
              </p>
              <p>
                Njegov sin <span className="font-semibold text-honey-deep">Mihajlo</span> nasledio
                je očevu ljubav prema pčelama i dodao joj nešto svoje. Nova znanja, drugačiji
                pristup i želju da ovaj posao gurne još korak dalje.
              </p>
              <p>
                Danas Ivan pomaže Mihajlu koliko može, a zajedno brinemo o <span className="font-semibold text-honey-deep">oko 70 košnica</span> i
                svaku pazimo kao da nam je prva. Svaka tegla meda koja izađe iz naše kuće nosi deo
                te priče. Priču o radu, o porodici i o onome što se ne kupuje, nego prenosi s
                kolena na koleno.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <span className="h-px w-10 bg-line" />
                <img
                  src="images/logo-mark.svg"
                  alt="Pčelarsko gazdinstvo Letvenčuk"
                  width={2000}
                  height={498}
                  loading="lazy"
                  className="h-9 w-auto opacity-75 sm:h-10"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <FamilyCarousel />
          </div>
        </div>
      </Section3D>

      {/* Proizvodi Section */}
      <Section3D id="proizvodi" className="bg-page px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Naši proizvodi"
            lead="Sve što vidite dolazi iz naših košnica. Bez aditiva, bez dodatog šećera, bez kupovnog meda."
          />

          {/* Med: prozračno, karusel */}
          <div className="mt-16 md:mt-20">
            <CategoryHeading label={productCategories.med.label} count={productCategories.med.items.length} />
            <ProductCarousel items={productCategories.med.items} onClick={setSelectedProduct} />
          </div>
        </div>

        {/* Krem med: gusto, izdvojeno, sa slikom cele linije preko pune širine */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[var(--radius-panel)]">
              <img
                src="images/v2/kat-krem-med-1280.webp"
                srcSet={v2SrcSet('kat-krem-med', 'wide')}
                sizes="(max-width: 1200px) 100vw, 1152px"
                alt="Šest ukusa krem meda sa kriškama hleba"
                width={V2.wide.w}
                height={V2.wide.h}
                loading="lazy"
                decoding="async"
                className="h-[260px] w-full object-cover sm:h-[340px] md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 md:p-12">
                <h3 className="font-display text-[1.9375rem] font-semibold leading-tight text-white sm:text-[2.4375rem]">
                  Krem med, šest ukusa
                </h3>
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-white/85 sm:text-base">
                  Naš med umućen do glatke, mazive teksture, pa spojen sa pravim voćem,
                  čokoladom ili mentom. Maže se kao namaz, a ostaje med.
                </p>
              </div>
            </div>

            {/* Mreža umesto karusela: svih sedam se vidi odjednom */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {productCategories.kremMed.items.map((item) => (
                <ProductCard key={item.id} product={item} onClick={setSelectedProduct} />
              ))}
            </div>
          </div>
        </div>

        {/* Miksevi, aranžmani i ostalo: nazad na prozračan ritam */}
        <div className="mx-auto mt-20 max-w-6xl space-y-20 md:mt-28 md:space-y-24">
          {[productCategories.miks, productCategories.aranzman, productCategories.ostalo].map((category) => (
            <div key={category.label}>
              <CategoryHeading label={category.label} count={category.items.length} />
              <ProductCarousel items={category.items} onClick={setSelectedProduct} />
            </div>
          ))}
        </div>
      </Section3D>

      {/* Galerija / Vesti Section - Honeycomb */}
      <Section3D id="galerija" className="relative overflow-hidden bg-sunken px-5 py-24 sm:px-8 md:py-32">
        <div className="honeycomb-field pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-14 md:mb-16">
            <SectionHeading
              align="center"
              title="Život na pčelinjaku"
              lead="Sa paše, sa festivala i iz kuće. Kliknite na saće da otvorite priču."
            />
          </div>

          <HoneycombCarousel posts={[...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())} onSelect={setSelectedPost} />
        </div>
      </Section3D>

      <AnimatePresence>
        {selectedPost && <NewsModal post={selectedPost} onClose={closePost} />}
      </AnimatePresence>

      {/* Kontakt Section */}
      <Section3D id="kontakt" className="bg-page px-5 py-24 sm:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <SectionHeading
              title="Javite nam se"
              lead="Pišite nam, pozovite ili svratite. Odgovaramo isti dan."
            />
          </div>

          <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-raise shadow-[var(--shadow-lift)]">
            {/* Tab bar */}
            <div className="flex border-b border-line bg-sunken/60" role="tablist">
              {[
                { key: 'forma' as const, label: 'Poruka', icon: Send },
                { key: 'mapa' as const, label: 'Lokacija', icon: MapPin },
                { key: 'kontakt' as const, label: 'Kontakt', icon: Phone },
              ].map(({ key, label, icon: Icon }) => {
                const active = activeContactTab === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveContactTab(key)}
                    className={`relative flex-1 px-2 py-4 text-sm font-semibold transition-colors duration-300 ${
                      active ? 'text-honey-deep' : 'text-ink-mute hover:text-ink'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{label}</span>
                    </span>
                    {active && (
                      <motion.div
                        layoutId="contactTabUnderline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-honey"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="p-6 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                {activeContactTab === 'forma' && (
                  <motion.div
                    key="forma"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display text-2xl font-semibold text-ink">Pošaljite nam poruku</h3>
                    <p className="mb-8 mt-1 text-sm text-ink-mute">Odgovaramo u najkraćem roku na vaš email.</p>
                    <form
                      action="https://formspree.io/f/xykdqznv"
                      method="POST"
                      noValidate
                      className="space-y-5"
                      onChange={() => { if (formError) setFormError(''); }}
                      onSubmit={(e) => {
                        const form = e.currentTarget;
                        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
                        const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
                        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
                        if (!name || !email || !message) {
                          e.preventDefault();
                          setFormError('Molimo popunite sva polja pre slanja.');
                          return;
                        }
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                          e.preventDefault();
                          setFormError('Molimo unesite ispravnu email adresu.');
                          return;
                        }
                        setFormError('');
                      }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="polje-ime" className="block text-sm font-medium text-ink">Ime i prezime</label>
                          <input
                            id="polje-ime"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="npr. Petar Petrović"
                            className="w-full rounded-[var(--radius-field)] border border-line bg-page px-4 py-3 text-ink placeholder:text-ink-mute/70 transition-colors duration-200 focus:border-honey focus:bg-raise"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="polje-email" className="block text-sm font-medium text-ink">Email adresa</label>
                          <input
                            id="polje-email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            inputMode="email"
                            spellCheck={false}
                            placeholder="npr. petar@gmail.com"
                            className="w-full rounded-[var(--radius-field)] border border-line bg-page px-4 py-3 text-ink placeholder:text-ink-mute/70 transition-colors duration-200 focus:border-honey focus:bg-raise"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="polje-poruka" className="block text-sm font-medium text-ink">Vaša poruka</label>
                        <textarea
                          id="polje-poruka"
                          name="message"
                          required
                          rows={5}
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Kako vam možemo pomoći?"
                          className="w-full resize-none rounded-[var(--radius-field)] border border-line bg-page px-4 py-3 text-ink placeholder:text-ink-mute/70 transition-colors duration-200 focus:border-honey focus:bg-raise"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-3 rounded-full bg-honey py-4 font-semibold text-white shadow-[var(--shadow-soft)] transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-honey-deep active:scale-[0.98]"
                      >
                        <Send size={18} strokeWidth={2} /> Pošaljite poruku
                      </button>
                      <p className="text-center text-xs text-ink-mute">
                        Vaša poruka stiže na: nik.letvencuk@gmail.com
                      </p>
                    </form>
                  </motion.div>
                )}

                {activeContactTab === 'mapa' && (
                  <motion.div
                    key="mapa"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display text-2xl font-semibold text-ink">Gde smo</h3>
                    <p className="mb-6 mt-1 text-sm text-ink-mute">Kliknite na mapu da otvorite pravac u Google Maps.</p>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kulska+9%2F1%2C+Kula%2C+Vojvodina%2C+Srbija"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mb-6 flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-sunken/50 p-4 transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:border-honey/50 hover:shadow-[var(--shadow-soft)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-field)] bg-honey text-white">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-ink-mute">Adresa</p>
                        <p className="font-display text-lg font-semibold text-ink">Kulska 9/1, Kula</p>
                        <p className="text-sm text-honey-deep">Vojvodina, Srbija</p>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-honey-deep transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" strokeWidth={2} />
                    </a>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kulska+9%2F1%2C+Kula%2C+Vojvodina%2C+Srbija"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line transition-[box-shadow] duration-300 hover:shadow-[var(--shadow-soft)]"
                      aria-label="Otvori lokaciju u Google Maps"
                    >
                      <iframe
                        title="Letvenčuk Med — lokacija"
                        src="https://www.google.com/maps?q=Kulska%209%2F1%2C%20Kula%2C%20Srbija&output=embed"
                        className="w-full h-64 sm:h-80 border-0 pointer-events-none"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </a>
                  </motion.div>
                )}

                {activeContactTab === 'kontakt' && (
                  <motion.div
                    key="kontakt"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display text-2xl font-semibold text-ink">Direktan kontakt</h3>
                    <p className="mb-6 mt-1 text-sm text-ink-mute">Pozovite nas, pišite preko WhatsApp-a ili nam pošaljite DM.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        {
                          href: 'tel:+381600726253',
                          icon: Phone,
                          label: 'Mihajlo',
                          value: '060 0726 253',
                          sub: 'Pozovite direktno',
                        },
                        {
                          href: 'tel:+381607262530',
                          icon: Phone,
                          label: 'Tanja',
                          value: '060 726 2530',
                          sub: 'Pozovite direktno',
                        },
                        {
                          href: 'https://wa.me/381607262539',
                          icon: Send,
                          label: 'WhatsApp',
                          value: 'Chat online',
                          sub: 'Najbrži odgovor',
                          external: true,
                        },
                        {
                          href: 'https://www.instagram.com/med.letvencuk/',
                          icon: Instagram,
                          label: 'Instagram',
                          value: '@med.letvencuk',
                          sub: 'Pišite nam DM',
                          external: true,
                        },
                      ].map(({ href, icon: Icon, label, value, sub, external }, i) => (
                        <a
                          key={i}
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-sunken/50 p-5 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-honey/50 hover:shadow-[var(--shadow-soft)]"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-field)] bg-honey text-white transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-ink-mute">{label}</p>
                            <p className="tnum truncate text-base font-semibold text-ink">{value}</p>
                            <p className="text-xs text-honey-deep">{sub}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 shrink-0 text-honey-deep transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" strokeWidth={2} />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Section3D>

      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-line bg-sunken px-5 pb-10 pt-16 sm:px-8">
        <div className="honeycomb-field pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <img
                src="images/logo-mark.svg"
                alt="Pčelarsko gazdinstvo Letvenčuk"
                width={2000}
                height={498}
                loading="lazy"
                className="h-11 w-auto sm:h-12"
              />
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
                Porodično pčelarsko gazdinstvo iz Kule. Med, polen, propolis i vosak
                iz sopstvenih košnica.
              </p>
            </div>

            <nav aria-label="Podnožje">
              <h2 className="font-display text-sm font-semibold text-ink">Sadržaj</h2>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToId(link.id)}
                      className="text-sm text-ink-soft transition-colors duration-200 hover:text-honey-deep"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-display text-sm font-semibold text-ink">Kontakt</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href="tel:+381600726253" className="tnum text-ink-soft transition-colors duration-200 hover:text-honey-deep">
                    060 0726 253
                  </a>
                </li>
                <li>
                  <a href="tel:+381607262530" className="tnum text-ink-soft transition-colors duration-200 hover:text-honey-deep">
                    060 726 2530
                  </a>
                </li>
                <li className="text-ink-soft">Kulska 9/1, Kula</li>
              </ul>

              <div className="mt-5 flex gap-2.5">
                <a
                  href="https://www.instagram.com/med.letvencuk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-raise text-ink-soft transition-colors duration-300 hover:border-honey/50 hover:text-honey-deep"
                  aria-label="Instagram"
                >
                  <Instagram size={18} strokeWidth={2} />
                </a>
                <a
                  href="https://wa.me/381607262539"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-raise text-ink-soft transition-colors duration-300 hover:border-honey/50 hover:text-honey-deep"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="tel:+381600726253"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-raise text-ink-soft transition-colors duration-300 hover:border-honey/50 hover:text-honey-deep"
                  aria-label="Pozovite nas"
                >
                  <Phone size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
            <p className="text-xs text-ink-mute">
              © {new Date().getFullYear()} Pčelarsko gazdinstvo Letvenčuk. Sva prava zadržana.
            </p>
            <button
              onClick={() => scrollToId('top')}
              className="flex items-center gap-2 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:text-honey-deep"
            >
              <HexMark className="h-3 w-3 text-honey" filled />
              Na vrh
            </button>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeProduct}
            onInquiry={() => handleProductInquiry(selectedProduct)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {formError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-24 z-[70] flex max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-full border border-red-200 bg-raise px-5 py-3 text-sm text-red-700 shadow-[var(--shadow-lift)]"
            role="alert"
            aria-live="assertive"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="font-medium">{formError}</span>
            <button
              onClick={() => setFormError('')}
              aria-label="Zatvori"
              className="ml-2 text-red-400 hover:text-red-600 transition"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
