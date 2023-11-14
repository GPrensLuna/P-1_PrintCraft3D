import React from "react";
import style from "./Aside.module.css";
import "./Aside.css";
import FiltersAccordion from "../FiltersAccordion/FiltersAccordion";

const Aside = ({
  onMaterialChange,
  onCategoryChange,
  onSizeChange,
  allProducts,
  resetAllFilters,
}) => {
  return (
    <div>
      <aside className={style.aside}>
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="filter-results">
              Filter results
              <span className="result-desc"> ({allProducts.length})</span>
            </div>
            <button className="reset-button" onClick={resetAllFilters}>
              Reset All
            </button>
          </div>
          <FiltersAccordion
            onMaterialChange={onMaterialChange}
            onCategoryChange={onCategoryChange}
            onSizeChange={onSizeChange}
            allProducts={allProducts}
          />
        </div>
      </aside>
    </div>
  );
};

export default Aside;
//X
