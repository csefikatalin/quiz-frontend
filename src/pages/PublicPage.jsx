import React, { useContext } from "react";
import Kerdesek from "../components/public/Kerdesek";
import { KerdesekContext } from "../contexts/KerdesekContext";
import Pontom from "../components/public/Pontom";

export default function PublicPage() {
  const { kerdesekLista } = useContext(KerdesekContext);
  
  return (
    <div>
      <Kerdesek />
      <Pontom />
    </div>
  );
}
