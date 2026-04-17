import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  Menu,
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
}


const familyMembers = [
  {
    name: "Mihajlo",
    role: "Otac & Glavni Pčelar",
    description: "Stub našeg gazdinstva. Mihajlo je zadužen za sve na pčelinjaku - od brige o zdravlju pčela do vrcanja meda. Njegovo znanje i iskustvo su temelj svega što radimo.",
    icon: <BeeIcon className="w-6 h-6 text-amber-600" />
  },
  {
    name: "Tanja",
    role: "Majka & Kreativni Centar",
    description: "Tanja pretvara naše pčelinje darove u prelepe aranžmane. Zadužena je za planiranje festivala, prodaju, dostavu i osmeh koji dočekuje svakog kupca.",
    icon: <ShoppingBasket className="w-6 h-6 text-amber-600" />
  },
  {
    name: "Ivan",
    role: "Deda & Desna ruka",
    description: "Iskustvo koje se ne kupuje. Ivan pomaže Mihajlu na pčelinjaku, uvek je tu kada je potrebna dodatna ruka i mudrost u radu sa košnicama.",
    icon: <Users className="w-6 h-6 text-amber-600" />
  },
  {
    name: "Nađa",
    role: "Ćerka & Mlada nada",
    description: "Nađa je mamin glavni asistent na festivalima. Svojom energijom i ljubaznošću pomaže u prezentaciji proizvoda i komunikaciji sa našim dragim kupcima.",
    icon: <CheckCircle2 className="w-6 h-6 text-amber-600" />
  },
  {
    name: "Nikola",
    role: "Sin & Dostava",
    description: "Nikola je naš pouzdani glasnik. Uvek spreman da pomogne - bilo da je u pitanju dostava meda na kućnu adresu ili pakovanje porudžbina.",
    icon: <Truck className="w-6 h-6 text-amber-600" />
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
    image: "images/livadski_novi.jpeg"
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
    image: "images/bagrem_novi.jpeg"
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
    image: "images/uljana_repica_novi.jpeg"
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
    image: "images/propolis_novi.jpeg"
  },
  {
    id: 6,
    name: "Pčelinji Polen",
    description: "Super-hrana direktno iz cveta. Bomba vitamina i minerala.",
    longDescription: "Polen sakupljen od strane naših pčela je izvor svih esencijalnih amino-kiselina. Preporučuje se sportistima, đacima i svima koji su pod pojačanim fizičkim i mentalnim naporom.",
    prices: [
      { size: "100g", price: "200 RSD" },
      { size: "200g", price: "400 RSD" }
    ],
    image: "images/polen_novi.jpeg"
  },
  {
    id: 7,
    name: "Pčelinji Vosak",
    description: "Potpuno prirodan vosak za izradu sveća ili kozmetike.",
    longDescription: "Čist pčelinji vosak iz naših košnica. Bez ikakvih dodataka, miriše na med i pčele. Idealan za izradu prirodnih melema ili mirisnih sveća.",
    prices: [
      { size: "komad", price: "200 RSD" }
    ],    
    image: "images/vosak_novi.jpeg"
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
    image: "images/medovaca_nova.jpeg"
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
    image: "images/miks_med_polen_propolis.jpg"
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
    image: "images/miks_kopriva.jpg"
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
    image: "images/miks_med_polen_propolis_golica.jpg"
  },
  {
    id: 12,
    name: "Mix: Limun-đumbir-med",
    description: "Osvežavajući mix protiv prehlade i virusa.",
    longDescription: "Kombinacija limuna, đumbira, meda, polena i propolisa. Ljuti đumbir i kiselkasti limun u medu stvaraju moćan eliksir za grlo i disajne puteve.",
    prices: [
      { size: "400g", price: "700 RSD" },
      { size: "1kg", price: "1500 RSD" }
    ],    
    image: "images/med_limun_djumbir_miks.webp"
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
    items: products.filter(p => [1,2,3,4].includes(p.id))
  },
  miks: {
    label: "Miksevi",
    items: products.filter(p => [9,10,11,12].includes(p.id))
  },
  aranzman: {
    label: "Aranžmani",
    items: products.filter(p => [13].includes(p.id))
  },
  ostalo: {
    label: "Ostalo",
    items: products.filter(p => [5,6,7,8].includes(p.id))
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
    text: "Predstavljamo vam naše mikseve - savršenu kombinaciju meda, oraha i sušenog voća za svakodnevno uživanje.",
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
    title: "Pčele obišle voćnjake u Tornjošu i Deronjama",
    date: "2026-04-05",
    text: "Naše pčele su obišle voćnjake u Tornjošu i Deronjama. Veselo zuje među rascvetanim stablima i marljivo skupljaju nektar za novu sezonu meda.",
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
  }
];

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const navHeight = 80; // približna visina fiksnog navbara
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
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-amber-500/30 rounded-full shadow-md flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition"
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
                className="p-8 rounded-3xl bg-white/5 border border-amber-500/20 text-center hover:bg-white/10 hover:border-amber-500/40 transition-colors group h-80 flex flex-col"
              >
                <div className="w-16 h-16 shrink-0 bg-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-amber-400">{member.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-amber-400 text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{member.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => paginate(1)}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-amber-500/30 rounded-full shadow-md flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-amber-500 w-6' : 'bg-amber-500/30 hover:bg-amber-500/50'
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
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-amber-200 rounded-full shadow-md flex items-center justify-center text-amber-600 hover:bg-amber-50 transition"
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
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-amber-200 rounded-full shadow-md flex items-center justify-center text-amber-600 hover:bg-amber-50 transition"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-amber-500 w-6' : 'bg-amber-200 hover:bg-amber-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => scrollToId(sectionId), 50);
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 h-20 overflow-hidden">
            <img
              src="images/logo.svg"
              alt="Letvenčuk logo"
              className="h-80 w-auto transition hover:scale-105 -translate-y-2"
            />
          </div>

          {/* Hamburger dugme - mobilni */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-amber-600 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* desktop linkovi */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavClick('porodica')}
              className="text-gray-700 hover:text-amber-600 transition font-medium"
            >
              O Nama
            </button>
            <button
              onClick={() => handleNavClick('proizvodi')}
              className="text-gray-700 hover:text-amber-600 transition font-medium"
            >
              Proizvodi
            </button>
            <button
              onClick={() => handleNavClick('galerija')}
              className="text-gray-700 hover:text-amber-600 transition font-medium"
            >
              Galerija
            </button>
            <button
              onClick={() => handleNavClick('kontakt')}
              className="text-gray-700 hover:text-amber-600 transition font-medium"
            >
              Kontakt
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-amber-50"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button onClick={() => handleNavClick('porodica')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">O Nama</button>
              <button onClick={() => handleNavClick('proizvodi')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">Proizvodi</button>
              <button onClick={() => handleNavClick('galerija')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">Galerija</button>
              <button onClick={() => handleNavClick('kontakt')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition">Kontakt</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: (p: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const tilt = use3DTilt();
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      onClick={() => onClick(product)}
      style={{ transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d' }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-50 flex flex-col h-full mb-4 hover:shadow-2xl hover:shadow-amber-200/50 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {product.prices.length > 1
            ? `od ${product.prices[0].price}`
            : product.prices[0].price
          }
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <button
          onClick={() => onClick(product)}
          className="mt-auto flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition group"
        >
          Saznajte više <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6 py-4 sm:py-6"
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
    >
      <button
        onClick={onClose}
        aria-label="Zatvori"
        className="absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-white rounded-full transition shadow-md ring-1 ring-black/5"
      >
        <X className="w-5 h-5 text-gray-800" />
      </button>
      <div className="overflow-y-auto overscroll-contain">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-56 sm:h-64 md:h-auto flex-shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover object-[35%_center]" />
          </div>
          <div className="md:w-1/2 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 pr-10">{product.name}</h2>
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Dostupne opcije:</p>
              <div className="flex flex-wrap gap-2">
                {[...product.prices].map((priceOption, index) => (
                  <div
                    key={index}
                    className="bg-amber-50 border-2 border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2"
                  >
                    <span className="text-amber-800 font-bold">{priceOption.size}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-amber-600 font-bold">{priceOption.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.longDescription}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/381607262539?text=Zdravo, zainteresovan sam za ${product.name}`}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-200"
              >
                Naruči preko WhatsApp-a
              </a>
              <a
                href="#kontakt"
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-amber-200"
              >
                Pošalji upit
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const NewsModal = ({ post, onClose }: { post: NewsPost; onClose: () => void }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const swipe = useSwipe(
    () => setImgIndex((p) => (p + 1) % post.images.length),
    () => setImgIndex((p) => (p - 1 + post.images.length) % post.images.length)
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition">
          <X size={18} />
        </button>
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl bg-black/90" {...swipe}>
          {isVideo(post.images[imgIndex]) ? (
            <video
              src={post.images[imgIndex]}
              controls
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img src={post.images[imgIndex]} alt={post.title} className="w-full h-full object-contain" />
          )}
          {post.images.length > 1 && (
            <>
              <button onClick={() => setImgIndex((p) => (p - 1 + post.images.length) % post.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setImgIndex((p) => (p + 1) % post.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition">
                <ChevronRight size={16} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {post.images.map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-6">
          <p className="text-sm text-amber-600 font-semibold mb-2">{new Date(post.date).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
          <p className="text-gray-600 leading-relaxed">{post.text}</p>
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
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 opacity-90 group-hover:opacity-95 transition duration-300" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[28%] px-4 text-center">
        <h3 className="text-white text-sm md:text-lg font-bold leading-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' }}>{post.title}</h3>
        <p className="text-amber-400 text-xs md:text-sm mt-1 font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.9)' }}>{new Date(post.date).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
          className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-amber-500/30 rounded-full shadow-md flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition"
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
          className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 border border-amber-500/30 rounded-full shadow-md flex items-center justify-center text-amber-400 hover:bg-amber-500/20 hover:border-amber-400 transition"
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
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === page ? 'bg-amber-500 w-6' : 'bg-amber-500/30 hover:bg-amber-500/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 3D tilt card hook
const use3DTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Hero section with video
const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      // Reset to beginning and play every time we scroll into view
      video.currentTime = 0;
      video.play().catch(() => {});
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  }, [isInView]);

  const handleVideoEnd = () => {
    setVideoPlaying(false);
  };

  // Video actual resolution: 1920x1080 (16:9)
  return (
    <section ref={sectionRef} className="relative w-full pt-20 md:pt-20 max-md:aspect-[4/3] md:aspect-video" >
      <div className="absolute inset-x-0 bottom-0 top-20 md:top-0 overflow-hidden">
        {/* First frame as default (shown when video not playing) */}
        <img
          src="images/prvi_frame_nova_slika.png"
          alt="Pčelarsko gazdinstvo Letvenčuk"
          className={`absolute inset-0 w-full h-full object-cover scale-x-[1.02] -translate-x-[0.2%] transition-opacity duration-500 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src="images/video_pozadina_novi.mp4"
          muted
          playsInline
          onEnded={handleVideoEnd}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </section>
  );
};

export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [activeContactTab, setActiveContactTab] = useState<'forma' | 'mapa' | 'kontakt'>('forma');

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
    <div id="top" className="min-h-screen bg-amber-50/30 selection:bg-amber-200">
      <Navbar />

      <HeroSection />

      {/* Porodica Section */}
      <Section3D id="porodica" className="py-24 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden -mt-1">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Upoznajte našu porodicu</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-8"></div>
            <div className="text-gray-300 max-w-3xl mx-auto space-y-4 text-justify md:text-center leading-relaxed">
              <p>
                Sve je počelo od <span className="text-amber-400 font-semibold">Ivana</span>.
                Već decenijama se bavi pčelama, a kroz sve te godine naučio je koliko ovaj zanat
                traži strpljenja i tihe ljubavi. Ono što je on gradio dan za danom, danas je srce
                svega što radimo.
              </p>
              <p>
                Njegov sin <span className="text-amber-400 font-semibold">Mihajlo</span> nasledio
                je očevu ljubav prema pčelama i dodao joj nešto svoje. Nova znanja, drugačiji
                pristup i želju da ovaj posao gurne još korak dalje.
              </p>
              <p>
                Danas Ivan pomaže Mihajlu koliko može, a zajedno brinemo o <span className="text-amber-400 font-semibold">oko 70 košnica</span> i
                svaku pazimo kao da nam je prva. Svaka tegla meda koja izađe iz naše kuće nosi deo
                te priče. Priču o radu, o porodici i o onome što se ne kupuje, nego prenosi s
                kolena na koleno.
              </p>
            </div>
          </div>

         <FamilyCarousel />
        </div>
      </Section3D>

      {/* Proizvodi Section */}
      <Section3D id="proizvodi" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Naši proizvodi</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Od čistog meda do specijalnih prirodnih mikseva za vaš imunitet.
              Svi naši proizvodi su 100% prirodni i bez aditiva.
            </p>
          </div>

          <div className="space-y-20">
            {Object.values(productCategories).map((category) => (
              <div key={category.label}>
                <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  {category.label}
                  <div className="flex-1 h-px bg-amber-100 ml-2"></div>
                </h3>
                <ProductCarousel items={category.items} onClick={setSelectedProduct} />
              </div>
            ))}
          </div>
        </div>
      </Section3D>

      {/* Galerija / Vesti Section - Honeycomb */}
      <Section3D id="galerija" className="py-24 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Život na pčelinjaku</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deo naše atmosfere sa pčelinjaka, festivala i mesta gde naš med pronalazi svoj novi dom.
            </p>
          </div>

          <HoneycombCarousel posts={[...newsPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())} onSelect={setSelectedPost} />
        </div>
      </Section3D>

      <AnimatePresence>
        {selectedPost && <NewsModal post={selectedPost} onClose={closePost} />}
      </AnimatePresence>

      {/* Kontakt Section */}
      <Section3D id="kontakt" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-amber-100">
            {/* Header */}
            <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-300/20 blur-2xl pointer-events-none" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2 relative">Kontaktirajte nas</h2>
              <p className="text-amber-100 text-base md:text-lg relative">Tu smo za vas svakog dana.</p>
            </div>

            {/* Tab bar */}
            <div className="flex bg-amber-50/60 border-b border-amber-100">
              {[
                { key: 'forma' as const, label: 'Poruka', icon: Send },
                { key: 'mapa' as const, label: 'Lokacija', icon: MapPin },
                { key: 'kontakt' as const, label: 'Kontakt', icon: Phone },
              ].map(({ key, label, icon: Icon }) => {
                const active = activeContactTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveContactTab(key)}
                    className={`flex-1 py-4 px-2 font-bold text-xs sm:text-sm uppercase tracking-wider transition relative ${
                      active ? 'text-amber-700' : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{label}</span>
                    </span>
                    {active && (
                      <motion.div
                        layoutId="contactTabUnderline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="p-6 sm:p-10 md:p-12 min-h-[600px] sm:min-h-[660px] md:min-h-[680px]">
              <AnimatePresence mode="wait">
                {activeContactTab === 'forma' && (
                  <motion.div
                    key="forma"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pošaljite nam poruku</h3>
                    <p className="text-gray-500 mb-8 text-sm">Odgovaramo u najkraćem roku na vaš email.</p>
                    <form
                      action="https://formspree.io/f/xykdqznv"
                      method="POST"
                      className="space-y-5"
                      onSubmit={(e) => {
                        const form = e.currentTarget;
                        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
                        const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
                        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
                        if (!name || !email || !message) {
                          e.preventDefault();
                          alert('Molimo popunite sva polja pre slanja.');
                          return;
                        }
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                          e.preventDefault();
                          alert('Molimo unesite ispravnu email adresu.');
                          return;
                        }
                      }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ime i Prezime</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Petar Petrović"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Adresa</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="petar@gmail.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Vaša Poruka</label>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          placeholder="Kako vam možemo pomoći?"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-amber-100"
                      >
                        <Send size={20} /> Pošalji pitanje
                      </button>
                      <p className="text-xs text-gray-400 text-center">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Gde smo</h3>
                    <p className="text-gray-500 mb-6 text-sm">Kliknite na mapu da otvorite pravac u Google Maps.</p>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kulska+9%2F1%2C+Kula%2C+Vojvodina%2C+Srbija"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100 hover:border-amber-300 hover:shadow-lg transition mb-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 shadow-md shadow-amber-200/50">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Adresa</p>
                        <p className="text-lg font-bold text-gray-900">Kulska 9/1, Kula</p>
                        <p className="text-sm text-amber-600">Vojvodina, Srbija</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition shrink-0" />
                    </a>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Kulska+9%2F1%2C+Kula%2C+Vojvodina%2C+Srbija"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-2xl overflow-hidden shadow-lg ring-1 ring-amber-100 hover:ring-amber-300 transition"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Direktan kontakt</h3>
                    <p className="text-gray-500 mb-6 text-sm">Pozovite nas, pišite preko WhatsApp-a ili nam pošaljite DM.</p>

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
                          className="group bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:shadow-amber-200/40 hover:-translate-y-0.5 hover:border-amber-300 transition-all duration-300"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shrink-0 shadow-md shadow-amber-200/50 ring-1 ring-amber-200/60 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</p>
                            <p className="text-base font-bold text-gray-900 truncate">{value}</p>
                            <p className="text-xs text-amber-600">{sub}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition shrink-0" />
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

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img
              src="images/logo.svg"
              alt="Pčelarsko gazdinstvo Letvenčuk"
              className="h-64 md:h-80 w-auto mx-auto -mt-40 md:-mt-40"
              style={{
                clipPath: 'inset(45% 0 30% 0)'
              }}
            />
          </div>
          <p className="text-gray-500 text-sm -mt-30 md:-mt-30">
            © {new Date().getFullYear()} Pčelarsko gazdinstvo Letvenčuk. Sva prava zadržana.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={() => scrollToId('top')} // ako dodaš id na vrh (npr. na body wrapper) ili samo window.scrollTo(0,..)
              className="text-gray-400 hover:text-amber-600 transition"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToId('proizvodi')}
              className="text-gray-400 hover:text-amber-600 transition"
            >
              Proizvodi
            </button>
            <button
              onClick={() => scrollToId('kontakt')}
              className="text-gray-400 hover:text-amber-600 transition"
            >
              Kontakt
            </button>
          </div>
          <div className="flex justify-center gap-5 mt-8">
  
    <a href="https://www.instagram.com/med.letvencuk/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition"
    aria-label="Instagram"
  >
    <Instagram size={18} />
  </a>
  
  <a href="https://wa.me/381607262539"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 text-amber-600 hover:bg-green-500 hover:text-white transition"
    aria-label="WhatsApp"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
  
  <a href="tel:+381600726253"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition"
    aria-label="Pozovi"
  >
    <Phone size={18} />
  </a>
</div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeProduct}
          />
        )}
      </AnimatePresence>

      <Analytics />
      <SpeedInsights />
    </div>
  );
}
