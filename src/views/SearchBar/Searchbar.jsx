import React, { useState, useEffect } from "react";
import Card from "../../Components/Card/Card.jsx";
import { URL } from "../../config.js"; // Import URL from your config fileimport PagoPaypal from "./Components/PagoPaypal/PagoPaypal.jsx";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Esta función se ejecutará cada vez que searchTerm cambie
    const searchProducts = async () => {
      const url = `${URL}Search/${searchTerm}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        setResults(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Llamar a la función de búsqueda después de un pequeño retraso para evitar llamadas excesivas mientras se escribe
    const timeoutId = setTimeout(searchProducts, 300);

    // Limpiar el temporizador en cada cambio de término de búsqueda para reiniciar el temporizador
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div>
      <h1>Product Search</h1>
      <label htmlFor="searchTerm">Search:</label>
      <input
        type="text"
        id="searchTerm"
        placeholder="Enter product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div id="results">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {results.map((e) => (
              <Card key={e.id} id={e.id} name={e.name} image={e.image} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
