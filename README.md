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
│ └─ public/

│ ├─ Kerdes.jsx
│ ├─ Kerdesek.jsx
│ └─ Valasz.jsx
├─ contexts/
├─ App.css
├─ App.jsx
├─ index.css
└─ main.jsx
```

## Navigáció és rootolás

1. Telepítsd a react routert!

```
npm install react-router
```

2. Hozd létre a pages mappát és benne a Public.jsx és az Admin.jsx komponenseket. 
3. Szükség lesz egy Layout.jsx komponensre és egy Navigation.jsx komponensre. 
4. A Navigation.jsx-ben alakítjuk ki a menüt a NavLink segítségével. 
5. A Layoutban alakítjuk aki az oldal szerkezetét. 
6. Az App.jsx csak a routingot fogja tartalmazni, azaz az oldallinkek és a page-ek összerendezését. 

### Navigation.jsx

A navigáció elkészítése **a** tag helyett NavLink segítségével. 

```javascript
import { NavLink } from "react-router";

function Navigation() {
  return (
    <nav className="">
      <ul className="nav">
        <li class="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link  active" : "nav-link "
            }
          >
            Összes Quiz
          </NavLink>
        </li>
        <li class="nav-item">
          <NavLink
            to="/ujquiz"
            className={({ isActive }) =>
              isActive ? "nav-link  active" : "nav-link "
            }
          >
            Új kérdés
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

### Layout.jsx

Itt alakítom ki az oldal szerkezetét

```javascript
import { Outlet } from "react-router";
import Navigation from "./Navigation";

function Layout() {
  return (
    <main className="container">
      <header>
        <Navigation />
      </header>

      <article className="">
        <Outlet />
      </article>

      <footer >
        <p>Készítette: Cséfalvay Katalin</p>
      </footer>
    </main>
  );
}

export default Layout;
```

### Router dom használata az App.jsx-ben

```javascript
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import './App.css'
import PublicPage from './pages/PublicPage';
import AdminPage from './pages/AdminPage';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  
  //route-ok Layout-tal
  {
    path: "/",
    element: <Layout />,   
    children: [
      {
        index: true, // Főoldal átirányítás dashboard-ra
        element: <Navigate to="/kezdolap" replace />,
      },
      {
        path: "kezdolap",
        element: <PublicPage />,
      },
      {
        path: "ujquiz",
        children: [
          {
            index: true,
            element: <AdminPage />,
          }
        ],
      }
    ],
  },

  // 404 - Not Found
  {
    path: "*",
    element: (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Az oldal nem található</h1>
        <a href="/login">Vissza a főoldalra</a>
      </div>
    ),
  },
]);


function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;

```
