import React from "react";
import { UserContext } from "../../contexts/UsersContext";
import { useContext } from "react";
import { useEffect } from "react";

export default function TopLista() {
  const { loading, userLista, getUser } = useContext(UserContext);
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    // Betöltés alatt ezt jeleníti meg
    return <div>Betöltés folyamatban...</div>;
  }
  if (!userLista || userLista.length === 0) {
    // Ha nincs adat
    return <div>Még senki nem töltötte ki a quizt.</div>;
  }
  const top10 = [...userLista]
    .sort((a, b) => b.point - a.point) // csökkenő sorrend pont szerint
    .slice(0, 10); // első 10 elem
  return (
    <>
      <h2>Toplista</h2>
      <ul className="list-group">
        {top10.map((user, index) => {
          return (
            <li key={user.id} className="list-group-item row">
              <span className="col-2 ">
                {index + 1}. <strong>{user.name}</strong>
              </span>
              <span className="col-2">{user.point} pont</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
