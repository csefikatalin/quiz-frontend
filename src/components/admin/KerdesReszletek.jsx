import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function KerdesReszletek() {
  const location = useLocation();
  const navigate = useNavigate();

  // A kérdést a location state-ből vesszük
  const kerdes = location.state?.kerdes;

  if (!kerdes) {
    return (
      <div>
        <p>Nem található a kérdés.</p>
        <button onClick={() => navigate(-1)}>Vissza</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Kérdés részletei</h2>
      <p><strong>ID:</strong> {kerdes.id}</p>
      <p><strong>Nehézség:</strong> {kerdes.difficulty}</p>
      <p  className="border rounded p-3  bg-light "><strong>Kérdés:</strong> {kerdes.question_text}</p>
      <ul className="list-group">
        {kerdes.answers.map((a, idx) => (
          <li className="list-group-item row" key={idx} style={a.right_answer ? { fontWeight: "bold", color: "green" } : {}}>
            {a.answer_text} {a.right_answer && "(Helyes)"}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Vissza</button>
    </div>
  );
}
