import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Truck,
  Flower2
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
    description: "Stub našeg gazdinstva. Mihajlo je zadužen za sve na pčelinjaku – od brige o zdravlju pčela do vrcanja meda. Njegovo znanje i iskustvo su temelj svega što radimo.",
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
    description: "Nikola je naš pouzdani glasnik. Uvek spreman da pomogne — bilo da je u pitanju dostava meda na kućnu adresu, pakovanje porudžbina ili jednostavno da bude tu kada je potrebna još jedna ruka.",
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
    image: "images/suncokretov_med.webp"
  },
  {
    id: 2,
    name: "Bagremov med",
    description: "Svetla boja i blag, prijatan ukus. Najtraženiji med zbog svoje nežne arome.",
    longDescription: "Bagremov med je poznat po svojoj prozirnosti i činjenici da ostaje u tečnom stanju veoma dugo. Zbog svog blagog ukusa, omiljen je deci. Deluje umirujuće na organizam i preporučuje se kod nesanice i stresa.",
    prices: [
      { size: "400g", price: "600 RSD" },      
      { size: "1kg", price: "1200 RSD" }
    ],    
    image: "images/bagremov_med.webp"
  },
  {
    id: 3,
    name: "Suncokretov med",
    description: "Prepoznatljive žute boje, brzo se kristališe u prelepe sitne kristale.",
    longDescription: "Suncokretov med je izuzetno zdrav zbog visokog sadržaja polena i minerala. Ima specifičan ukus i brzo se kristališe, što je siguran znak njegove čistoće i kvaliteta. Odličan je za srce i disajne puteve.",
    prices: [
      { size: "400g", price: "400 RSD" },
      { size: "1kg", price: "800 RSD" }
    ],    
    image: "images/suncokretov_med.webp"
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
    image: "images/med_od_uljane_repice.webp"
  },
  {
    id: 5,
    name: "Propolis kapi",
    description: "Prirodni antibiotik iz pčelinje košnice. Jaka zaštita za vaš organizam.",
    longDescription: "Naš propolis je 30% rastvor čistog pčelinjeg propolisa u alkoholu. Deluje protiv virusa, bakterija i gljivica. Nezaobilazan u kućnoj apoteci za dezinfekciju grla i jačanje odbrambene moći organizma.",
    prices: [
      { size: "kapi 10ml", price: "200 RSD" },
      { size: "kapi 20ml", price: "400 RSD" },
      { size: "sprej 50ml", price: "450 RSD" }
    ],
    image: "images/propolisi.webp"
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
    image: "images/polen.jpeg"
  },
  {
    id: 7,
    name: "Pčelinji Vosak",
    description: "Potpuno prirodan vosak za izradu sveća ili kozmetike.",
    longDescription: "Čist pčelinji vosak iz naših košnica. Bez ikakvih dodataka, miriše na med i pčele. Idealan za izradu prirodnih melema ili mirisnih sveća.",
    prices: [
      { size: "komad", price: "200 RSD" }
    ],    
    image: "images/vosak.jpeg"
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
    image: "images/medovaca.jpeg"
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
    name: "Mix: Med-polen-propolis-kopriva",
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
    longDescription: "Pravimo aranžmane po vašoj želji! Bilo da je u pitanju Slava, rođendan, Božić ili Uskrs, mi spajamo naše proizvode u prelepe dekorisane korpice sa natpisima po vašoj želji.",
    prices: [
      { size: "", price: "po dogovoru" }
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

const galleryImages = [
  { url: "images/tezga_med.webp", caption: "Naša tezga na festivalu" },
  { url: "images/kontejner2.webp", caption: "Vredne pčele na paši" },
  { url: "images/sva_tri_miksa_mali_veliki.jpg", caption: "Miksevi za zdraviji život" },
  { url: "images/med_u_dubaiju.jpg", caption: "Pogled sa terase u Dubaiju - naš med putuje svetom!" },
  { url: "images/nadja_ivana_za_tezgom.webp", caption: "Nadja i Ivana u akciji" },
  { url: "images/gajbice_lepa_slika.jpg", caption: "Gajbice spremne za isporuku" }
];

// --- Components ---
const FamilyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = familyMembers.length;
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 768 ? 1 : 4
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 4);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + total) % total);
  };

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
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-amber-200 rounded-full shadow-md flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="overflow-hidden px-2 pb-6">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`grid gap-8 ${visibleCount === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}
          >
            {getVisible().map((member) => (
              <div
                key={member.name}
                className="h-[340px] overflow-y-hidden p-8 rounded-3xl bg-amber-50/50 border border-amber-100 text-center hover:bg-white hover:shadow-xl transition group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition">
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-amber-600 text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => paginate(1)}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-amber-200 rounded-full shadow-md flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-8">
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

      <div className="overflow-hidden px-2 pb-6">
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

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <BeeIcon className="text-amber-600 w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              LETVENČUK
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#proizvodi" className="text-gray-700 hover:text-amber-600 transition font-medium">Proizvodi</a>
            <a href="#porodica" className="text-gray-700 hover:text-amber-600 transition font-medium">O Nama</a>
            <a href="#galerija" className="text-gray-700 hover:text-amber-600 transition font-medium">Galerija</a>
            <a href="#kontakt" className="text-gray-700 hover:text-amber-600 transition font-medium">Kontakt</a>
          </div>
          <button className="md:hidden text-amber-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <div className="flex flex-col gap-1.5"><div className="w-8 h-0.5 bg-amber-600"></div><div className="w-8 h-0.5 bg-amber-600"></div><div className="w-8 h-0.5 bg-amber-600"></div></div>}
          </button>
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
              <a href="#proizvodi" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700">Proizvodi</a>
              <a href="#porodica" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700">O Nama</a>
              <a href="#galerija" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700">Galerija</a>
              <a href="#kontakt" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700">Kontakt</a>
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

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-50 flex flex-col h-full mb-4"
  >
    <div className="relative h-48 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-110 transition duration-500" />
      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        {product.prices.length > 1 
          ? `od ${product.prices[0].price}` 
          : product.prices[0].price
        }
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
      <button 
        onClick={() => onClick(product)}
        className="mt-auto flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition group"
      >
        Saznajte više <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
      </button>
    </div>
  </motion.div>
);

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => (
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
      className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full"
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition">
        <X className="w-6 h-6 text-gray-800" />
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
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
          </div>          <p className="text-gray-600 mb-6 leading-relaxed">
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
    </motion.div>
  </motion.div>
);

export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-amber-50/30 selection:bg-amber-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="images/kontejner1.webp" 
            alt="Pčelinjak" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/50 to-amber-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-amber-700 uppercase bg-amber-100 rounded-full">
              Tradicija od poverenja
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Pčelarsko gazdinstvo <br />
              <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
                Letvenčuk
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Donosimo vam najčistije darove prirode direktno iz naših košnica. 
              Od klasičnog meda do moćnih imuno-mikseva, sve pravimo sa puno ljubavi i pažnje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#proizvodi" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-bold transition transform hover:scale-105 shadow-xl shadow-amber-200"
              >
                Istraži proizvode
              </a>
              <a 
                href="#kontakt" 
                className="bg-white border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full text-lg font-bold transition hover:bg-amber-50 transform hover:scale-105"
              >
                Kontaktiraj nas
              </a>
            </div>
          </motion.div>
        </div>        
      </section>

      {/* Porodica Section */}
      <section id="porodica" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upoznajte našu porodicu</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Naše pčelarenje je porodični posao u kojem svako ima svoju ulogu. 
              Zajedničkim snagama stvaramo najbolje za vas.
            </p>
          </div>
          
         <FamilyCarousel />
        </div>
      </section>

      {/* Proizvodi Section */}
      <section id="proizvodi" className="py-24 px-4">
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
      </section>

      {/* Galerija Section */}
      <section id="galerija" className="py-24 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Život na pčelinjaku</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deo naše atmosfere sa pčelinjaka, festivala i mesta gde naš med pronalazi svoj novi dom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                  <p className="text-sm font-medium">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-amber-100">
            {/* Kontakt Informacije */}
            <div className="lg:w-2/5 bg-amber-600 p-12 text-white">
              <h2 className="text-4xl font-bold mb-8">Kontaktirajte nas</h2>
              <p className="text-amber-100 mb-12 text-lg">
                Imate pitanja ili želite da naručite naše proizvode? 
                Tu smo za vas svakog dana.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-amber-200 text-sm font-bold uppercase tracking-wider">Mihajlo</p>
                    <a href="tel:+381600726253" className="text-xl font-bold hover:text-amber-200 transition">060 0726 253</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-amber-200 text-sm font-bold uppercase tracking-wider">Tanja</p>
                    <a href="tel:+381607262530" className="text-xl font-bold hover:text-amber-200 transition">060 726 2530</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-amber-200 text-sm font-bold uppercase tracking-wider">Instagram</p>
                    <a href="https://www.instagram.com/med.letvencuk/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-amber-200 transition">@med.letvencuk</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-amber-200 text-sm font-bold uppercase tracking-wider">Lokacija</p>
                    <p className="text-xl font-bold">Kula, Srbija</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontakt Forma */}
            <div className="lg:w-3/5 p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Pošaljite nam poruku</h3>
              <form 
                action="https://formspree.io/f/xykdqznv"
                method="POST"
                className="space-y-6"
              >
                {/* Podesili smo Formspree ID koji je vezan za nik.letvencuk@gmail.com */}
                {/* Napomena: Prvi put kada pošaljete poruku, proverite mejl za potvrdu od Formspree-a */}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ime i Prezime</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Petar Petrović"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Adresa</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="petar@gmail.com"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Vaša Poruka</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    placeholder="Kako vam možemo pomoći?"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-5 rounded-xl transition transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-xl shadow-amber-100"
                >
                  <Send size={20} /> Pošalji pitanje
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Vaša poruka će biti poslata na: nik.letvencuk@gmail.com
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BeeIcon className="text-amber-600 w-6 h-6" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
              LETVENČUK
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pčelarsko gazdinstvo Letvenčuk. Sva prava zadržana.
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="#" className="text-gray-400 hover:text-amber-600 transition">Početna</a>
            <a href="#proizvodi" className="text-gray-400 hover:text-amber-600 transition">Proizvodi</a>
            <a href="#kontakt" className="text-gray-400 hover:text-amber-600 transition">Kontakt</a>
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
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
