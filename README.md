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

### Egyszerűsítések: 

- Jelen programban az összes quiz kérdés egyetlen quizhez fog tartozni.
- Minden kérdéshez max 4 választ lehet megadni, és abból pontosan egy a helyes.
- A programban nincs bejelentkezés, felhasználókezelés, de elmenthetjük a quiz eredményét.
- Első körben nyilvános (nem védett) API végpontokat kell készíteni. 


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

## Alap mappaszerkezet

## Routing - menü kialakítása

## Context használata, kérdések megjelenítése

## Pont beküldése
