import React from "react";
import "./ShoppingHistory.css";
import placeholder from "../../imagenes/Placeholder.png";

const ShoppingHistory = () => {
  return (
    <div className="root-wrapper">
      <div id="app-root-wrapper" className="page-wrapper__content">
        <div id="hub-reviews.desktop" className="ui-hub-reviews">
          <section className="ui-hub-reviews--content">
            <h1
              className="ui-reviews-label ui-reviews-ui-hub-reviews--title ui-reviews-background-color--andes-green-500 ui-reviews-color--handes-green-500 ui-reviews-font-size--12px ui-reviews-weight--REGULAR"
              aria-hidden="false"
            >
              Opiniones
            </h1>
            <div className="ui-hub-reviews">
              <div className="ui-list-items">
                {/* aca van todos los items comprados  */}
                <div className="ui-list-items--item">
                  <div className="andes-card ui-card-pending-card andes-card--flat andes-card--padding-16">
                    <div className="andes-card__content ui-card-pending">
                      <div className="ui-card-pending-container">
                        <div className="ui-card-pending-product"></div>
                        <div className="ui-card-pending--review--info">
                          <div className="ui-card-pending__image-container">
                            <img
                              className="ui-card-pending__image ui-card-pending-product-img"
                              src={placeholder}
                            ></img>
                            <div className="ui-card-pending--review--info">
                              <div className="ui-card-pending-product-title">
                                <h4
                                  className="ui-reviews-label ui-reviews-color--handes-green-500 ui-reviews-font-size--12px ui-reviews-weight--REGULAR"
                                  aria-hidden="false"
                                >
                                  {"Nombre del producto"}
                                </h4>
                                <div className="ui-review--rating-select"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShoppingHistory;
