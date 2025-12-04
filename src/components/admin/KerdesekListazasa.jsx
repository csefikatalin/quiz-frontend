import React from "react";
import { KerdesekContext } from "../../contexts/KerdesekContext";
import { useContext } from "react";
import { useState } from "react";
import { useMemo } from "react";
import KerdesSor from "./KerdesSor";

export default function KerdesekListazasa() {
  const [difficulty, setDifficulty] = useState("all");
  const { kerdesekLista, loading } = useContext(KerdesekContext);
  const szurtLista = useMemo(() => {
    if (difficulty === "all") {
      return [...kerdesekLista];
    } else {
      return kerdesekLista.filter((k) => k.difficulty === difficulty);
    }
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
          <option value="all">Összes</option>
          <option value="easy">Könnyű</option>
          <option value="medium">Közepes</option>
          <option value="hard">Nehéz</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Kérdés</th>
                <th>Nehézség</th>
                <th>Válasz</th>
                <th>Válasz</th>
                <th>Válasz</th>
                <th>Válasz</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
          {szurtLista.map((kerdes) => (
            <KerdesSor key={kerdes.id} kerdes={kerdes} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
