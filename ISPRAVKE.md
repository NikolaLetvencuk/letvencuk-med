# Spisak ispravki

## ~~1. Video pozadina - crna linija~~ [DONE]
- ~~Za odredjene dimenzije ekrana video pozadina ne pokriva ceo prostor i vidi se crna linija na dnu.~~
- Reseno: ispravljeni aspect ratio, zamenjeni novi fajlovi, uklonjeni svi hakovi, full responsive.

## ~~2. Logo u navbaru~~ [DONE]
- ~~Logo je mnogo visi nego sto treba - hoveruje se od dole mnogo vise nego sto je potrebno. Smanjiti visinu ili podesiti pozicioniranje.~~
- Reseno: wrapper cropuje logo na visinu navbara sa overflow-hidden.

## ~~3. Navbar - mobilni prikaz (hamburger meni)~~ [DONE]
- ~~Dodati hamburger meni za mobilni prikaz.~~
- ~~Dodati sve potrebne elemente u navbar i za mobilnu verziju.~~
- Reseno: dodat hamburger dugme (Menu/X ikona), linkovi koriste smooth scroll, hover efekti na mobilnim linkovima.

## ~~5. Kartice clanova porodice - fiksna velicina~~ [DONE]
- ~~Kartice za clanove porodice menjaju velicinu kad se listaju (npr. Nikola ima duzi tekst pa se kartice povecaju).~~
- Reseno: fiksna visina kartica (h-72) sa overflow-hidden na tekstu.

## ~~4. Kartice proizvoda - klik na celu karticu + swipe~~ [DONE]
- ~~Kartice za produkte treba da se otvaraju klikom na celu karticu, a ne samo klikom na dugme "Saznaj vise".~~
- ~~Dodati swipe podrsku na sve carousele (porodica i proizvodi).~~
- Reseno: dodat onClick i cursor-pointer na celu karticu, dodat useSwipe hook za oba carousela.

## ~~6. Kontakt forma - validacija~~ [DONE]
- ~~Forma za "Kontaktirajte nas" prihvata slanje i kada su polja prazna. Dodati validaciju da sva obavezna polja moraju biti popunjena.~~
- Reseno: JS validacija na submit - proverava da su sva polja popunjena i da je email ispravan format.
