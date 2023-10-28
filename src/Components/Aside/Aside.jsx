// Aside.jsx
import React from "react";
import style from "./Aside.module.css";

const Aside = ({ onMaterialChange }) => {
  return (
    <div>
      <aside className={style.aside}>
        <h1 className={style.asideh1}>Filtrar por:</h1>
        <div>
          <h2>Materiales</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>ABS</p>
              <input
                className={style.AsideInput}
                type="checkbox"
                value="ABS"
                onChange={() => onMaterialChange("3")}
              />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>PLA</p>
              <input
                className={style.AsideInput}
                type="checkbox"
                value="PLA"
                onChange={() => onMaterialChange("2")}
              />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>TPU</p>
              <input
                className={style.AsideInput}
                type="checkbox"
                value="TPU"
                onChange={() => onMaterialChange("1")}
              />
              <span className={style.span}></span>
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
