import React from "react";
import style from "./Aside.module.css";

const Aside = ({ onMaterialChange, onCategoryChange, onSizeChange }) => {

  return (
    <div>
      <aside className={style.aside}>
        <h1 className={style.asideh1}>Filtrar por:</h1>
        <div className={style.ContentMaterial}>
          <h2>Materiales</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              ABS
              <input
                className={style.AsideInput}
                type="checkbox"
                value="3"
                onChange={() => onMaterialChange("3")}
              />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              PLA
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
              TPU
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

        <div className={style.ContentCategori}>
          <h2>Categori</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              Accesorio
              <input
                className={style.AsideInput}
                type="checkbox"
                value="accesorio"
                onChange={() => onCategoryChange("1")}
              />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              figura
              <input
                className={style.AsideInput}
                type="checkbox"
                value="figura"
                onChange={() => onCategoryChange("2")}
              />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              Decoracion
              <input
                className={style.AsideInput}
                type="checkbox"
                value="decoracion"
                onChange={() => onCategoryChange("3")}
              />
              <span className={style.span}></span>
            </label>
          </div>
        </div>

        <div className={style.ContentSize}>
          <h2>Tamaño</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              M
              <input
                className={style.AsideInput}
                type="checkbox"
                value="M"
                onChange={() => onSizeChange("1")}
              />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              S
              <input
                className={style.AsideInput}
                type="checkbox"
                value="S"
                onChange={() => onSizeChange("2")}
              />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              L
              <input
                className={style.AsideInput}
                type="checkbox"
                value="L"
                onChange={() => onSizeChange("3")}
              />
              <span className={style.span}></span>
            </label>
          </div>{" "}
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              X
              <input
                className={style.AsideInput}
                type="checkbox"
                value="X"
                onChange={() => onSizeChange("4")}
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
