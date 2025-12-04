# Context használata

A feladat, hogy a végpontról kérjük le a quiz kérdéseit és jelenítsük meg esztétikus formában, majd ha a válaszokra kattintunk a válasz színe változzon meg: helyes válasz esetén zöldre, helytelen válasz esetén pirosra. 

Helyes válasz esetén növeljük meg a pontszám értékét is. 

## Adatok lekérdezése a végpontról

1. KerdesekContext.jsx létrehozása az alapszerkezettel
 ```javascript
import axios from "axios";
import { createContext, useState, useEffect } from "react";

// 1. Context létrehozása
export const KerdesekContext = createContext();

// 2. Provider komponens
export function KerdesekProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [kerdesekLista, setKerdesekLista] = useState([])
  const [pont, setPont] = useState(0);
  return (
    <KerdesekContext.Provider value={kerdesekLista, loding, pont}>
      {children}
    </KerdesekContext.Provider>
  );
}
```

2. aszinkron hívás indítása axios-szal

 ```javascript

    function getKerdesek() {
        axios.get('http://127.0.0.1:8000/api/questions')
            .then(function (response) {
                // handle success
                console.log(response.data);
                setKerdesekLista(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }
 
```

3. App.jsx-ben ölelgetés

```javascript
function App() {
  return (
    <KerdesekProvider>
      <RouterProvider router={router} />
    </KerdesekProvider>
  );
}
```

4. context felhasználása a komponensekben ( Kerdesek,jsx)

  1. A PublicPage komponensben elhelyezzük a Kerdesek komponenst.
  2. A **Kerdesek** componentsben használjuk a **listát** a **contextből**.
  3. Itt fogunk végigiterálni a listán és megjelenítünk egyetlen kérdést. (Kerdes komponens)
```javascript
      import React, { useContext } from "react";
      import Kerdes from "./Kerdes";
      import { KerdesekContext } from "../../contexts/KerdesekContext";

      export default function Kerdesek() {
        const { kerdesekLista,loading, pont } = useContext(KerdesekContext); //a context adatainak használata
        if (loading) {
          // Betöltés alatt ezt jeleníti meg
          return <div>Betöltés folyamatban...</div>;
        }
        if (!kerdesekLista || kerdesekLista.length === 0) {
          // Ha nincs adat
          return <div>Nincsenek kérdések.</div>;
        }
      return (
          <div className="">
            <h2>Kérdések</h2> 
            <p>Elért pontszám: {pont}</p>
            <div className="card">
            {kerdesekLista.map((kerdes) => (
              <Kerdes key={kerdes.id} kerdes={kerdes} />
            ))}
            </div>
          </div>
        );
      }
```

  4. A Kérdés komponensben 4 válasz komponenst kell legenerálni. 
```javascript
      import React from "react";
      import Valasz from "./Valasz";

      export default function Kerdes({ kerdes }) {
      
        return (
          <div className="card  m-2">
              <div className="card-body">
            <h5 className="card-title">{kerdes.question_text}</h5>

            <ul className="row g-2 p-0">
              {kerdes.answers.map((valasz) => (
                <Valasz key={valasz.id} valasz={valasz} />
              ))}
            </ul>
            </div>
          </div>
        );
      }
  ```
  5. Valasz komponens
  Helyes válasz esetén növeli a pontszámot. 
  ```javascript
      import React, { useContext, useState } from "react";
      import { KerdesekContext } from "../../contexts/KerdesekContext";

      export default function Valasz({ valasz, valaszolt, valszKezeles }) {
        const [helyes, setHelyes] = useState(null);
        const { setPont } = useContext(KerdesekContext);
        function kivalaszt() {          
          if (valasz.right_answer) {
            setPont(prev => prev + 1); 
          }         
        }
        const bgColor = helyes === null ? "white" : helyes ? "lightgreen" : "salmon";
        return (
          <div
            className="col-6 p-2 border"
            onClick={kivalaszt}
            style={{ backgroundColor: bgColor, cursor: "pointer" }}
          >
            {valasz.answer_text}
          </div>
        );
      }
  ```
  5. Ha már rákattintottunk egy válaszra, akkor ne lehessen másik választ megjelölni az adott kérdsénél. 

  A feladat megoldásának lépései: 

- state létrehozása a **Kerdes** komponensben: const [valaszolt,setValaszolt]=useState(false)
- itt kell majd egy függvény is, ami beállítja a state értékét, ha kattintottunk a válaszra. 
- a valaszolt és a valaszKezelo függvényt a props-on keresztl átadjuk a **Valasz** komponensnek.
- a **Valasz** komponensben a megkapott state értékétől függően kattinthatóak még a válaszok. 
- a **Valasz** komponensre be kell állítani egy eseménykezelőt, amikor is meghívjuk a a szülőkomponens függvényét, ami majd beállítja a state értékét. 




## Hibakezelés



