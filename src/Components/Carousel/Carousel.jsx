import React, { useState } from "react";
import styles from "./Carousel.module.css";
import { BotonAnterior, BotonSiguiente } from "./button.jsx";
function Carousel({ imagenes }) {
  // Estados y variables
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes?.length;

  // Manejo de errores
  if (!imagenes || cantidad === 0) return null; // Cambié el return para que sea válido

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  return (
    <div className={styles.ContenCarusel}>
      <div className={styles.Carusel}>
        {imagenes.map((imagen, index) => {
          return (
            <div
              key={index}
              className={
                imagenActual === index
                  ? `${styles.slide} ${styles.active}`
                  : styles.slide
              }
            >
              <BotonAnterior onClick={anteriorImagen} />
              {imagenActual === index && (
                <img
                  className={styles.imagen}
                  key={index}
                  src={imagen}
                  alt="imagen"
                />
              )}
              <BotonSiguiente onClick={siguienteImagen} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
