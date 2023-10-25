import React from "react";
import styles from "./Carousel.module.css";

function BotonAnterior({ onClick }) {
  return (
    <button className={styles.anterior} onClick={onClick}>
      {"<"}
    </button>
  );
}

function BotonSiguiente({ onClick }) {
  return (
    <button className={styles.siguiente} onClick={onClick}>
      {">"}
    </button>
  );
}

export { BotonAnterior, BotonSiguiente };
