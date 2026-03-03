import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

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

const products: Product[] = [
  { id: 1, name: "Livadski med", description: "Bogat ukus prolećnih i letnjih livada.", longDescription: "Naš livadski med je prava riznica zdravlja. Sakupljan na čistim pašnjacima, on predstavlja mešavinu nektara desetina različitih cvetova, što mu daje jedinstvenu aromu i visoku nutritivnu vrednost. Idealan je za jačanje imuniteta i svakodnevnu upotrebu.", prices: [{ size: "400g", price: "400 RSD" }, { size: "1kg", price: "800 RSD" }], image: "images/suncokretov_med.webp" },
  { id: 2, name: "Bagremov med", description: "Svetla boja i blag, prijatan ukus.", longDescription: "Bagremov med je poznat po svojoj prozirnosti i činjenici da ostaje u tečnom stanju veoma dugo. Zbog svog blagog ukusa, omiljen je deci. Deluje umirujuće na organizam i preporučuje se kod nesanice i stresa.", prices: [{ size: "400g", price: "600 RSD" }, { size: "1kg", price: "1200 RSD" }], image: "images/bagremov_med.webp" },
  { id: 3, name: "Suncokretov med", description: "Prepoznatljive žute boje, sitni kristali.", longDescription: "Suncokretov med je izuzetno zdrav zbog visokog sadržaja polena i minerala. Ima specifičan ukus i brzo se kristališe, što je siguran znak njegove čistoće i kvaliteta. Odličan je za srce i disajne puteve.", prices: [{ size: "400g", price: "400 RSD" }, { size: "1kg", price: "800 RSD" }], image: "images/suncokretov_med.webp" },
  { id: 4, name: "Med od uljane repice", description: "Kremast med bele boje, bogat polenom.", longDescription: "Med od uljane repice je prvi prolećni med. Zbog svoje sitnozrnaste kristalizacije, tekstura mu je poput putera. Izuzetno je blagotvoran za čišćenje jetre i regulisanje holesterola.", prices: [{ size: "400g", price: "400 RSD" }, { size: "1kg", price: "800 RSD" }], image: "images/med_od_uljane_repice.webp" },
  { id: 5, name: "Propolis kapi", description: "Prirodni antibiotik iz košnice.", longDescription: "Naš propolis je 30% rastvor čistog pčelinjeg propolisa u alkoholu. Deluje protiv virusa, bakterija i gljivica. Nezaobilazan u kućnoj apoteci za dezinfekciju grla i jačanje odbrambene moći organizma.", prices: [{ size: "10ml", price: "200 RSD" }, { size: "20ml", price: "400 RSD" }, { size: "sprej 50ml", price: "450 RSD" }], image: "images/propolisi.webp" },
  { id: 6, name: "Pčelinji Polen", description: "Super-hrana direktno iz cveta.", longDescription: "Polen sakupljen od strane naših pčela je izvor svih esencijalnih amino-kiselina. Preporučuje se sportistima, đacima i svima koji su pod pojačanim fizičkim i mentalnim naporom.", prices: [{ size: "100g", price: "200 RSD" }, { size: "200g", price: "400 RSD" }], image: "images/polen.jpeg" },
  { id: 7, name: "Pčelinji Vosak", description: "Prirodan vosak za sveće i kozmetiku.", longDescription: "Čist pčelinji vosak iz naših košnica. Bez ikakvih dodataka, miriše na med i pčele. Idealan za izradu prirodnih melema ili mirisnih sveća.", prices: [{ size: "komad", price: "200 RSD" }], image: "images/vosak.jpeg" },
  { id: 8, name: "Medovača", description: "Domaća rakija sa našim medom.", longDescription: "Naša medovača se pravi po starom porodičnom receptu. Spoj vrhunske voćne rakije i meda daje piće koje klizi niz grlo i ostavlja topao trag zdravlja.", prices: [{ size: "0.2l", price: "400 RSD" }, { size: "0.5l", price: "800 RSD" }], image: "images/medovaca.jpeg" },
  { id: 9, name: "Mix: Polen-propolis-med", description: "Klasičan imuno-mix za svaki dan.", longDescription: "Savršeno izbalansiran odnos meda, polena i propolisa. Jedna kašika ujutru je sve što vam treba za energičan početak dana i jak imunitet.", prices: [{ size: "400g", price: "700 RSD" }, { size: "1kg", price: "1500 RSD" }], image: "images/miks_med_polen_propolis.jpg" },
  { id: 10, name: "Mix: Med-kopriva", description: "Idealan za krvnu sliku i gvožđe.", longDescription: "Ovaj miks smo obogatili semenom koprive, što ga čini izuzetnim saveznikom u borbi protiv anemije. Pomaže kod umora i vraća vitalnost organizmu.", prices: [{ size: "400g", price: "700 RSD" }, { size: "1kg", price: "1500 RSD" }], image: "images/miks_kopriva.jpg" },
  { id: 11, name: "Mix: Med-golica", description: "Podrška za prostatu i muško zdravlje.", longDescription: "Dodatak mlevenog semena golice čini ovaj miks specifičnim. Bogat je cinkom i mineralima važnim za zdravlje prostate i opšte muško zdravlje.", prices: [{ size: "400g", price: "700 RSD" }, { size: "1kg", price: "1500 RSD" }], image: "images/miks_med_polen_propolis_golica.jpg" },
  { id: 12, name: "Mix: Limun-đumbir-med", description: "Moćan eliksir protiv virusa.", longDescription: "Kombinacija limuna, đumbira, meda, polena i propolisa. Ljuti đumbir i kiselkasti limun u medu stvaraju moćan eliksir za grlo i disajne puteve.", prices: [{ size: "400g", price: "700 RSD" }, { size: "1kg", price: "1500 RSD" }], image: "images/med_limun_djumbir_miks.webp" },
  { id: 13, name: "Poklon aranžmani", description: "Personalizovane korpice za sve prilike.", longDescription: "Pravimo aranžmane po vašoj želji! Bilo da je u pitanju Slava, rođendan, Božić ili Uskrs, mi spajamo naše proizvode u prelepe dekorisane korpice sa natpisima po vašoj želji.", prices: [{ size: "", price: "po dogovoru" }], image: "images/aranzman.jpg" },
];

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const GOLD = "#f5c518";
const GOLD_DARK = "#c9a000";

interface HexCellProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

const HexCell = ({ product, index, onClick }: HexCellProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 240, damping: 22 }}
      style={{ width: 178, height: 205, position: "relative", flexShrink: 0 }}
    >
      {/* Glow */}
      <motion.div
        animate={hovered ? { opacity: 1, scale: 1.12 } : { opacity: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", inset: -10,
          clipPath: HEX_CLIP,
          background: `radial-gradient(ellipse at center, ${GOLD}44 0%, transparent 70%)`,
          filter: "blur(10px)",
          zIndex: 0, pointerEvents: "none",
        }}
      />

      {/* Border */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0.3 }}
        style={{
          position: "absolute", inset: 0,
          clipPath: HEX_CLIP,
          background: hovered
            ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK} 60%, #7a5c00)`
            : `linear-gradient(135deg, #2a2200, #1a1400)`,
          zIndex: 0, transition: "background 0.3s",
        }}
      />

      {/* Inner */}
      <motion.div
        onClick={() => onClick(product)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.95 }}
        style={{ position: "absolute", inset: 3, clipPath: HEX_CLIP, cursor: "pointer", overflow: "hidden", zIndex: 1 }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          animate={hovered
            ? { scale: 1.18, filter: "brightness(0.18) saturate(0.3)" }
            : { scale: 1.06, filter: "brightness(0.35) saturate(0.5)" }}
          transition={{ duration: 0.45 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Hex pattern overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='23' viewBox='0 0 20 23'%3E%3Cpolygon points='10,1 19,6 19,17 10,22 1,17 1,6' fill='none' stroke='%23f5c518' stroke-width='0.3' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 23px", pointerEvents: "none",
        }} />

        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "20px 14px", textAlign: "center",
        }}>
          <motion.div
            animate={hovered ? { y: -6, opacity: 1 } : { y: 0, opacity: 0.9 }}
            style={{
              background: GOLD, color: "#0a0800",
              fontSize: 11, fontWeight: 900,
              padding: "3px 11px", borderRadius: 20,
              marginBottom: 7, letterSpacing: "0.04em",
              boxShadow: `0 2px 12px ${GOLD}88`,
            }}
          >
            {product.prices.length > 1 ? `od ${product.prices[0].price}` : product.prices[0].price}
          </motion.div>

          <motion.h3
            animate={hovered ? { y: -3 } : { y: 0 }}
            style={{ color: "white", fontSize: 13, fontWeight: 800, lineHeight: 1.3, textShadow: "0 1px 8px rgba(0,0,0,0.9)", margin: 0 }}
          >
            {product.name}
          </motion.h3>

          <motion.div
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: 9,
              border: `1px solid ${GOLD}77`,
              color: GOLD, fontSize: 10, fontWeight: 800,
              padding: "3px 11px", borderRadius: 20,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              background: "rgba(0,0,0,0.6)",
            }}
          >
            Otvori →
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface HexModalProps {
  product: Product;
  onClose: () => void;
}

const HexModal = ({ product, onClose }: HexModalProps) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.2, opacity: 0, rotate: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "min(92vw, 540px)", aspectRatio: "1 / 1.155" }}
      >
        {/* Spinning border */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", inset: -5, clipPath: HEX_CLIP,
            background: `conic-gradient(${GOLD}, #2a1c00, ${GOLD_DARK}, #0f0a00, ${GOLD}, #4a3500, ${GOLD})`,
            zIndex: 0,
          }}
        />
        <div style={{ position: "absolute", inset: 1, clipPath: HEX_CLIP, background: "#060400", zIndex: 1 }} />

        {/* Content */}
        <div style={{
          position: "absolute", inset: 5, clipPath: HEX_CLIP,
          background: "linear-gradient(160deg, #0f0c00 0%, #080600 100%)",
          zIndex: 2, overflow: "hidden", display: "flex", flexDirection: "column",
        }}>
          {/* Image */}
          <div style={{ position: "relative", height: "44%", flexShrink: 0 }}>
            <img src={product.image} alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(0.7)" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, #080600 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
          </div>

          {/* Body */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "10px 17% 18px", textAlign: "center", gap: 10, overflowY: "auto",
          }}>
            <h2 style={{
              fontSize: "clamp(15px, 2.5vw, 21px)", fontWeight: 900,
              margin: 0, lineHeight: 1.2,
              background: `linear-gradient(135deg, ${GOLD}, #fff8dc 50%, ${GOLD_DARK})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {product.name}
            </h2>

            <p style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#9a7f35", margin: 0, lineHeight: 1.6 }}>
              {product.longDescription}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              {product.prices.map((p, i) => (
                <div key={i} style={{
                  background: "#120e00", border: `1.5px solid ${GOLD_DARK}66`,
                  borderRadius: 20, padding: "4px 12px",
                  fontSize: "clamp(10px, 1.2vw, 12px)", fontWeight: 800,
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {p.size && <span style={{ color: "#7a6020" }}>{p.size}</span>}
                  {p.size && <span style={{ color: "#2a2000" }}>•</span>}
                  <span style={{ color: GOLD }}>{p.price}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 7, width: "100%" }}>
              <a
                href={`https://wa.me/381607262539?text=Zdravo, zainteresovan/a sam za ${product.name}`}
                style={{
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  color: "white", padding: "10px 0", borderRadius: 12,
                  fontWeight: 800, fontSize: "clamp(10px, 1.4vw, 12px)",
                  textDecoration: "none", textAlign: "center" as const,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: "0 4px 16px #16a34a44",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Naruči WhatsApp
              </a>
              <a
                href="#kontakt"
                onClick={onClose}
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
                  color: "#0a0800", padding: "10px 0", borderRadius: 12,
                  fontWeight: 900, fontSize: "clamp(10px, 1.4vw, 12px)",
                  textDecoration: "none", textAlign: "center" as const,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: `0 4px 16px ${GOLD}44`,
                }}
              >
                <ShoppingBag size={13} /> Pošalji upit
              </a>
            </div>
          </div>
        </div>

        <button onClick={onClose} style={{
          position: "absolute", top: "8%", right: "5%", zIndex: 10,
          width: 34, height: 34, borderRadius: "50%",
          background: "#100d00", border: `1px solid ${GOLD_DARK}`,
          color: GOLD, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 12px ${GOLD}33`,
        }}>
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
};

interface Row {
  items: Product[];
  offset: boolean;
}

const buildRows = (items: Product[]): Row[] => {
  const rows: Row[] = [];
  let i = 0, ri = 0;
  const sizes = [4, 3, 4, 3, 4, 3, 4];
  while (i < items.length) {
    const s = sizes[ri % sizes.length];
    rows.push({ items: items.slice(i, i + s), offset: ri % 2 === 1 });
    i += s; ri++;
  }
  return rows;
};

export default function HoneycombProducts() {
  const [selected, setSelected] = useState<Product | null>(null);
  const rows = buildRows(products);

  return (
    <section style={{
      background: "linear-gradient(160deg, #080600 0%, #0f0c00 40%, #140e00 100%)",
      minHeight: "100vh",
      padding: "64px 20px 80px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>

      {/* Background hex pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='46' viewBox='0 0 40 46'%3E%3Cpolygon points='20,2 38,12 38,34 20,44 2,34 2,12' fill='none' stroke='%23f5c518' stroke-width='0.4' opacity='0.06'/%3E%3C/svg%3E")`,
        backgroundSize: "40px 46px",
      }} />

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "5%", left: "25%", width: 500, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}09 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "8%", right: "20%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}07 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: `1px solid ${GOLD_DARK}55`, padding: "6px 20px", borderRadius: 30,
            marginBottom: 14, background: "#120e00",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" style={{ width: 16, height: 16 }}>
            <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
            <path d="M12 3V21" /><path d="M4 7.5L20 16.5" /><path d="M20 7.5L4 16.5" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Naši proizvodi
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, margin: "0 0 14px",
            background: `linear-gradient(135deg, ${GOLD} 0%, #fff8dc 50%, ${GOLD_DARK} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}
        >
          Darovi iz košnice
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: "#6a5518", maxWidth: 420, margin: "0 auto", lineHeight: 1.6, fontSize: 14 }}
        >
          Kliknite na šestougao — otkrijte proizvod i odmah ga naručite.
        </motion.p>

        <div style={{ margin: "20px auto 0", width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{
            display: "flex", flexDirection: "row",
            marginTop: ri === 0 ? 0 : -52,
            paddingLeft: row.offset ? 89 : 0,
            justifyContent: "center",
          }}>
            {row.items.map((product, pi) => (
              <HexCell key={product.id} product={product} index={ri * 4 + pi} onClick={setSelected} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer hex row */}
      <div style={{ textAlign: "center", marginTop: 52, opacity: 0.2 }}>
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              width: 8, height: 9, clipPath: HEX_CLIP,
              background: GOLD, opacity: 0.3 + (i < 4 ? i : 6 - i) * 0.15,
            }} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <HexModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}