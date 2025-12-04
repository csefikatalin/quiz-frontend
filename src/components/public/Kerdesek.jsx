import React, { useContext } from "react";
import Kerdes from "./Kerdes";
import { KerdesekContext } from "../../contexts/KerdesekContext";
import { useState } from "react";
import { useMemo } from "react";

export default function Kerdesek() {
  const [difficulty, setDifficulty] = useState("medium");
  const { kerdesekLista, loading, pont } = useContext(KerdesekContext);
  const szurtLista = useMemo(() => {
    return kerdesekLista.filter((k) => k.difficulty === difficulty).slice(0,10);
  }, [kerdesekLista, difficulty]);

  if (loading) {
    // Betöltés alatt ezt jeleníti meg
    return <div>Betöltés folyamatban...</div>;
  }
  if (!szurtLista || szurtLista.length === 0) {
    // Ha nincs adat
    return <div>Nincsenek kérdések.</div>;
  }

  function handleChange(e) {
    setDifficulty(e.target.value);
  }
  return (
    <div className="">
      <h2>Kérdések</h2>
      <div className="mb-3">
        <label htmlFor="difficulty" className="form-label">
          Válassz nehézségi szintet!
        </label>
        <select
          id="difficulty"
          className="form-select"
          value={difficulty}
          onChange={handleChange}
        >
          <option value="easy">Könnyű</option>
          <option value="medium">Közepes</option>
          <option value="hard">Nehéz</option>
        </select>
      </div>

      <p>Elért pontszám: {pont}</p>
      <div className="card">
        {szurtLista.map((kerdes) => (
          <Kerdes key={kerdes.id} kerdes={kerdes} />
        ))}
      </div>
    </div>
  );
}
