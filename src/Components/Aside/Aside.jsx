// Aside.jsx
import React from "react";
import style from "./Aside.module.css";

const Aside = () => {
  return (
    <div>
      <aside className={style.aside}>
        <h1>Filtrar por:</h1>

        <div>
          <h2>Materiales</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Nailon</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>ABS</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Resina</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>PLA</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
        </div>

        <div>
          <h2>Tecnicas de impresion</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Chorro de aglomerante</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Chorro de material</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Extrusión de materiales</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Polimerización en tina</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
