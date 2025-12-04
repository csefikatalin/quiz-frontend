import axios from "axios";
import { createContext, useState, useEffect } from "react";

// 1. Context létrehozása
export const UserContext = createContext();

// 2. Provider komponens
export function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [userLista, setUserLista] = useState([]);
 
  
  function getUser() {
    axios
      .get("http://localhost:8000/api/users")
      .then(function (response) {
        setUserLista(response.data);
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false)
      });
  }


  return (
    <UserContext.Provider value={{ userLista, loading, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
