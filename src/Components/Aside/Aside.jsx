import React from "react";
import style from "./Aside.module.css";
import "./Aside.css";
import FiltersAccordion from "../FiltersAccordion/FiltersAccordion";

const Aside = ({ onMaterialChange, onCategoryChange, onSizeChange, count }) => {
  return (
    <div>
      <aside className={style.aside}>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="filter-results">
              Filter results  
              <span className="result-desc">  {count}</span>
            </div>
            <button className="reset-button">Reset All  </button>
          </div>
          <FiltersAccordion />
        </div>
        <h1 className={style.asideh1}>Filtrar por:</h1>
        <div className={style.ContentMaterial}>
          <h2>Materiales</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              ABS
              <input
                className={style.AsideInput}
                type="checkbox"
                value="ABS"
                onChange={() => onMaterialChange("ABS")}
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
                onChange={() => onMaterialChange("PLA")}
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
                onChange={() => onMaterialChange("TPU")}
              />
              <span className={style.span}></span>
            </label>
          </div>
        </div>

        <div className={style.ContentCategori}>
          <h2>Categoria</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              Accesorio
              <input
                className={style.AsideInput}
                type="checkbox"
                value="accesorio"
                onChange={() => onCategoryChange("accesorio")}
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
                onChange={() => onCategoryChange("figura")}
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
                onChange={() => onCategoryChange("decoracion")}
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
                onChange={() => onSizeChange("M")}
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
                onChange={() => onSizeChange("S")}
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
                onChange={() => onSizeChange("L")}
              />
              <span className={style.span}></span>
            </label>
          </div>{" "}
        </div>
      </aside>
    </div>
  );
};

export default Aside;
//X
