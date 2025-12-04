# Navigáció és rooting kialakítása

A React Router a React leggyakrabban használt routing könyvtára, amely lehetővé teszi, hogy egy SPA (Single Page Application) többoldalasnak tűnjön.
Valójában nem töltődik újra az oldal, csak komponenseket cserélünk a cím alapján.
1. Telepítsd a react routert!

```
npm install react-router
```

2. Hozd létre a pages mappát és benne a Public.jsx és az Admin.jsx komponenseket. 
3. Szükség lesz egy Layout.jsx komponensre és egy Navigation.jsx komponensre. 
4. A Navigation.jsx-ben alakítjuk ki a menüt a NavLink segítségével. 
5. A Layoutban alakítjuk aki az oldal szerkezetét. 
6. Az App.jsx csak a routingot fogja tartalmazni, azaz az oldallinkek és a page-ek összerendezését. 

## Navigation.jsx

A navigáció elkészítése **a** tag helyett NavLink segítségével. 

```javascript
import { NavLink } from "react-router";

function Navigation() {
  return (
    <nav className="">
      <ul className="nav">
        <li class="nav-item">
          <NavLink  to="/" >
            Összes Quiz
          </NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/ujquiz" >
            Új kérdés
          </NavLink>
             <li class="nav-item">
          <NavLink
            to="/toplista" >
            Toplista
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
```

## Layout.jsx

Itt alakítom ki az oldal szerkezetét. 
Az Outlet fontos, oda  renderelődik a  route komponens.

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

## Router dom használata az App.jsx-ben

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
        path: "toplista",
        element: <UserPage />,
      },
      {
        path: "ujquiz",
        element: <AdminPage />,
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


## További információk a react routerről

### useNavigate

Programozott navigáció (gomb, esemény, sikeres mentés után).

```javascript
const navigate = useNavigate();
navigate("/admin");
```

### Dinamikus útvonalak

Paraméterek használata:

```javascript
{ path: "kerdes/:id", element: <KerdesDetail /> }
```

Állapot is küldhető:

```javascript
navigate("/kerdes/5", { state: { kerdesAdat: kerdes } });
```

paraméter lekérdezése

```javascript
const { id } = useParams();
```
