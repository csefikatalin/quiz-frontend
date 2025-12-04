# Quiz készítő -  Frontend

## Feladat

Készíts olyan programot, mely segítségével egy quizt készíthetünk. 

1. A quizhez kérdések és kérdésenként max 4 válasz tartozik, mely közül pontosan egy a helyes.
2. Az új  kérdéseket és válaszokat egy erre kialakított felületen tudjuk megadni.  
3. A kérdések háromféle nehézségi szinthez tartozhatnak: könnyű, közepes, nehéz. 
4. Ha a felhasználó meg akar oldani egy quizt, akkor a rendszer véletlenszerűen ad neki 10 különböző kérdést a feladatbankból. 
5. A válaszra kattintva:
    - helyes válasz esetén zöldre változik a háttérszín.
    - helytelen válasz esetén pirosra. 
6. A rendszer számolja a pontokat, melyet a quiz végén el is lehet menteni. Ekkor meg kell adni egy nevet, a rendszer a névhez elmenti a quiz nehézségi szintjét (könnyű, közepes, nehéz, vegyes), és a pontszámot. 
7. Az elmentett pontszámok alapján lehet toplistát megjeleníteni. 
8. Lehet választani a nehézségi szintek között.

### Egyszerűsítések: 

- Jelen programban az összes quiz kérdés egyetlen quizhez fog tartozni.
- Minden kérdéshez max 4 választ lehet megadni, és abból pontosan egy a helyes.
- A programban nincs bejelentkezés, felhasználókezelés, de elmenthetjük a quiz eredményét.
- Első körben nyilvános (nem védett) API végpontokat kell készíteni. 

## Elméleti áttekintés

### Mi az a REST API?

A **REST** (Representational State Transfer) egy architekturális stílus web szolgáltatások készítésére. A REST API-k HTTP protokollon keresztül kommunikálnak, és szabványos HTTP metódusokat használnak:

- **GET**: Adatok lekérése (olvasás)
- **POST**: Új adat létrehozása
- **PUT**: Meglévő adat teljes frissítése
- **PATCH**: Meglévő adat részleges frissítése
- **DELETE**: Adat törlése

#### Példa REST API végpontok

```
GET    /api/questions           # összes kérdés lekérdezése
POST   /api/question            # Új kérdés hozzáadása az adatbázishoz     
```

### HTTP státuszkódok

A szerver válaszai státuszkódokkal jelzik a kérés eredményét:

#### 2xx - Sikeres válaszok

- **200 OK**: Sikeres GET, PUT, PATCH kérés
- **201 Created**: Sikeres POST kérés, új erőforrás létrehozva
- **204 No Content**: Sikeres kérés, de nincs visszaadandó adat

#### 4xx - Kliens oldali hibák

- **400 Bad Request**: Hibás kérés formátum (pl. hiányos vagy helytelen adatok)
- **401 Unauthorized**: Hiányzó vagy érvénytelen hitelesítés (token)
- **403 Forbidden**: Nincs jogosultság a művelethez (pl. már beiratkozott kurzus)
- **404 Not Found**: A kért erőforrás nem található
- **422 Unprocessable Entity**: Validációs hiba (pl. nem elég kredit)

#### 5xx - Szerver oldali hibák

- **500 Internal Server Error**: Általános szerver hiba
- **502 Bad Gateway**: Gateway hiba
- **503 Service Unavailable**: A szolgáltatás átmenetileg nem elérhető

## React telepítése Vite-vel

### Vite és NPX create-re

| Tulajdonság                  | Vite                                        | npx create-react-app (CRA)               |
|-------------------------------|--------------------------------------------|----------------------------------------|
| Telepítés parancs             | `npm create vite@latest projekt-név`       | `npx create-react-app projekt-név`     |
| Alapértelmezett build eszköz  | Vite (Rollup alapokkal, gyors HMR)        | Webpack                                |
| HMR (Hot Module Replacement)  | Gyors, natív ES modulok                    | Lassabb, Webpack-alapú                 |
| Projekt mérete                | Minimalista, kevesebb csomag               | Nagyobb, sok előre telepített csomag  |
| TypeScript támogatás          | Beépített, könnyen választható             | Beépített, de telepítéskor kell választani |
| Fejlesztői szerver port       | Alapértelmezett: 5173, könnyen módosítható | Alapértelmezett: 3000                   |
| Indulási idő (cold start)     | Rendkívül gyors                            | Lassabb                                 |
| Config testreszabás           | Könnyen konfigurálható `vite.config.js`-ben | Bonyolultabb, `react-scripts` használat miatt |
| Modern frontend integráció    | Könnyen integrálható Laravel, Rails, stb.  | Lehetséges, de lassabb integráció       |
| Community & dokumentáció      | Növekvő, gyorsan terjed                    | Nagy, stabil, régi projektekhez megfelelő |


### Telepítés lépései

```
npm create vite@latest quiz-frontend
cd mappanev
```

#### Port átállítása 3000-re (A duális docker miatt)
A projekt gyökerében nyisd meg a vite.config.js fájlt, és add hozzá a server.port beállítást:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});
```

#### Függőségek telepítése

```
npm install bootstrap
npm install axios
```

#### Indítás

```
npm run dev
```

## Alapkomponensek létrehozása

```
src/
├─ pages/
│ ├─ Layout.jsx
│ ├─ Navigation.jsx
│ ├─ AdminPage.jsx
│ └─ PublicPage.jsx
├─ components/
│ ├─ admin/
│ │ └─ UjKerdes.jsx
│ └─public/
│   ├─ TopLista.jsx
│   ├─ Kerdes.jsx
│   ├─ Kerdesek.jsx
│   └─ Valasz.jsx
├─ contexts/
├─ App.css
├─ App.jsx
├─ index.css
└─ main.jsx
```

## <a href="Router.md">React router használata</a>

A React Router a React leggyakrabban használt routing könyvtára, amely lehetővé teszi, hogy egy SPA (Single Page Application) többoldalasnak tűnjön.
Valójában nem töltődik újra az oldal, csak komponenseket cserélünk a cím alapján.


## <a href="Context.md">Context használata</a>

A React Context arra való, hogy adatokat vagy függvényeket globálisan megosszunk több komponens között, anélkül hogy props-on keresztül kellene őket minden szinten továbbadni.

A Context egy globális állapot vagy globális adattár, amit a fa bármelyik komponense közvetlenül elérhet, ha feliratkozik rá.

1. Context létrehozása
2. A provider value objektumában megadjuk azokat a változókat és függvényeket, melyek használatát engedélyezzük a gyerek komponensekben.
3. Provider körbeöleli a komponenseket 
4. useContext segítségével a gyerekkomponensben elérhetjük a value-ban megadott változókat és függvényeket. 

## Űrlap - kontrollált komponensek

## Navigáció paraméter alapján