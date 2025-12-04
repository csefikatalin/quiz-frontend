import React from "react";
import { KerdesekContext } from "../../contexts/KerdesekContext";
import { useContext } from "react";

export default function KerdesSor({ kerdes }) {
  const { deleteKerdes } = useContext(KerdesekContext);
  function torol() {
    deleteKerdes(kerdes.id);
  }
  function kivalaszt() {
    
  }

  return (
    <tr>
      <td>{kerdes.id}</td>
      <td>{kerdes.difficulty}</td>
      <td>{kerdes.question_text}</td>
      {kerdes.answers.map((a, idx) => (
        <td
          key={idx}
          style={a.right_answer ? { backgroundColor: "lightgreen" } : {}}
        >
          {a.answer_text}
        </td>
      ))}
      <td>
        <button className="btn" onClick={torol}>
          🗑️
        </button>
        <button className="btn" onClick={kivalaszt}>
          ✅
        </button>
      </td>
    </tr>
  );
}
