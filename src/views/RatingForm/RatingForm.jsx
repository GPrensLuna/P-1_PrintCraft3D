import React from "react";
import "./RatingForm.css";
import placeholder from "../../imagenes/Placeholder.png";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleReset = () => {
    setRating(0);
  };
  const handleTextAreaChange = ({ target }) => {
    setComment(target.value);
  };
  return (
    <div className="rating-form-container">
      <form className="ui-review-form" action="">
        <div className="ui-review-form--steps">
          <div
            id="RATING"
            className="ui-review-step ui-review-step--RATING ui-review-step--input-rating"
          >
            <div className="andes-thumbnail-container">
              <div className="andes-thumbnail andes-thumbnail--circle andes-thumbnail--48 ui-review--image--thumbnail-130-130">
                <img
                  alt="foto del producto a calificar"
                  src={placeholder}
                  style={{ width: "130", height: "130" }}
                  aria-hidden="false"
                />
              </div>
            </div>
            <h2 class="ui-review-label ui-review-label--RATING-SUBTITLE">
              Nombre del producto
            </h2>
            <h1 className="ui-review-label ui-review-label--REVIEW-TITLE">
              ¿Qué te pareció tu producto?
            </h1>
            <div className="ui-review--rating-select">
              <div className="stars">
                <Rating onClick={handleRating} initialValue={rating} />
              </div>
            </div>
          </div>
          <div
            id="DESCRIPTION"
            className="ui-review-step ui-review-step--DESCRIPTION ui-review-step--input-description"
          >
            <h1 className="ui-review-label ui-review-label--DESCRIPTION-TITLE">
              Cuéntanos más acerca de tu producto
            </h1>
            <h2 className="ui-review-label ui-review-label--DESCRIPTION-SUBTITLE">
              {"(Opcional)"}
            </h2>
            <div className="andes-form-control andes-form-control--textfield ui-review-text-area andes-form-control--multiline andes-form-control--countdown">
              <div className="andes-form-control__control">
                <textarea
                  id=":Rlon8"
                  className="andes-form-control__field andes-form-control__field--multiline"
                  name="description"
                  rows="1"
                  maxlength="1500"
                  style={{
                    "overflow-x": "hidden",
                    "overflow-wrap": "break-word",
                    height: "88px",
                  }}
                  placeholder="Mi producto me pareció..."
                  aria-describedby=":R1on8:-countdown-progress"
                  onChange={handleTextAreaChange}
                ></textarea>
              </div>
              <div className="andes-form-control__bottom">
                <span
                  id=":R1on8:-countdown-progress"
                  className="andes-form-control__countdown"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="1500"
                  aria-label="Máximo 1500 caracteres"
                >
                  {comment.length} / 1500
                </span>
                <span
                  id=":R1on8:-count"
                  className="andes-visually-hidden"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  1500 caracteres restantes
                </span>
              </div>
            </div>
          </div>
        </div>
        <input
          className="submit-button-rating-form"
          type="submit"
          value={"Guardar"}
        />
      </form>
    </div>
  );
};

export default RatingForm;
