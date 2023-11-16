import React from "react";
import "./Paginado.css";

const Paginado = ({ currentPage, totalPages, handleLimitChange, loadPage }) => {
  return (
    <div>
      <button
        className="anterior-button Pbtn"
        onClick={() => loadPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>
        {currentPage} de {totalPages}
      </span>
      <button
        className="siguiente-button Pbtn"
        onClick={() => loadPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      <hr></hr>

      <p>Items por pagina: </p>
      <select onChange={handleLimitChange} id="limit" defaultValue={12}>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </div>
  );
};

export default Paginado;
