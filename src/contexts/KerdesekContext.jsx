import axios from "axios";
import { createContext, useState, useEffect } from "react";

// 1. Context létrehozása
export const KerdesekContext = createContext();

// 2. Provider komponens
export function KerdesekProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [kerdesekLista, setKerdesekLista] = useState([]);
  const [pont, setPont] = useState(0);

  function valaszokKeverese(lista) {
    const kevertLista = lista.map((kerdes) => {
      return {
        ...kerdes,
        answers: [...kerdes.answers].sort(() => Math.random() - 0.5),
      };
    });

    setKerdesekLista(kevertLista);
  }
  function postPontom(formAdat){
    console.log(formAdat)
  }
  function getKerdesek() {
    axios
      .get("http://127.0.0.1:8000/api/questions")
      .then(function (response) {
        //setKerdesekLista(response.data);
        setLoading(false);
        valaszokKeverese(response.data) 
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  useEffect(() => {
    getKerdesek();
  }, []);

  return (
    <KerdesekContext.Provider value={{ kerdesekLista, loading, pont, setPont, postPontom }}>
      {children}
    </KerdesekContext.Provider>
  );
}
