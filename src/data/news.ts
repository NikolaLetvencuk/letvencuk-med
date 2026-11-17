export interface NewsPost {
  title: string;
  date: string;
  text: string;
  images: string[];
}

export const newsPosts: NewsPost[] = [
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
