import React, { useContext, useState } from "react";
import { KerdesekContext } from "../../contexts/KerdesekContext";

export default function Pontom() {
    const {pont, postPontom}=useContext(KerdesekContext)
    const [name, setName]=useState("")

    function kuld(){
        console.log("küldés")
    }
  return (
    <div className="border mt-3 p-3">
      <form onSubmit={kuld}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Add meg a neved!
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            aria-describedby="nameHelp"
            required
          />
          <div id="nameHelp" className="form-text">
            A név megadása kötelező!
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Beküldöm az eredményem
        </button>
      </form>
    </div>
  );
}
