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

        <div className={style.ContentCategori}>
          <h2>Categori</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Accesorio</p>
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
              <p> figura</p>
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
              <p>Decoracion</p>
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
              <p>M</p>
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
              <p>S</p>
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
              <p>L</p>
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
              <p>X</p>
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
