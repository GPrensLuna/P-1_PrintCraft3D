import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import "./FiltersAccordion.css";

const FiltersAccordion = ({
  onMaterialChange,
  onCategoryChange,
  onSizeChange,
  allProducts,
}) => {
  // seleccion de los filtros
  const [fMateriales, setFmateriales] = useState(null);
  const [fCategoria, setFcategoria] = useState(null);
  const [fTamano, setFtamano] = useState(null);

  // contadores de elementos para los filtros
  let ABSCount = allProducts.filter((e) => {
    return e.material === "ABS";
  });
  let PLACount = allProducts.filter((e) => {
    return e.material === "PLA";
  });
  let TPUCount = allProducts.filter((e) => {
    return e.material === "TPU";
  });
  let AccesorioCount = allProducts.filter((e) => {
    return e.category === "accesorio";
  });
  let FiguraCount = allProducts.filter((e) => {
    return e.category === "figura";
  });
  let DecoracionCount = allProducts.filter((e) => {
    return e.category === "decoracion";
  });
  let SizeMCount = allProducts.filter((e) => {
    return e.size === "M";
  });
  let SizeLCount = allProducts.filter((e) => {
    return e.size === "L";
  });
  let SizeSCount = allProducts.filter((e) => {
    return e.size === "S";
  });

  // funciones para activar los filtros
  const materialClickHandler = (value) => {
    setFmateriales(value);
    onMaterialChange(value);
  };
  const categoriaClickHandler = (value) => {
    setFcategoria(value);
    onCategoryChange(value);
  };
  const tamanoClickHandler = (value) => {
    setFtamano(value);
    onSizeChange(value);
  };

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="title">
            <strong>Materiales</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item false"
              onClick={() => materialClickHandler("ABS")}
            >
              <div className="value">
                {fMateriales === "ABS" ? (
                  <strong style={{ color: "#3767a2" }}>ABS</strong>
                ) : (
                  "ABS"
                )}
              </div>
              <div className="count">
                {fMateriales === "ABS" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {ABSCount.length}
                  </strong>
                ) : (
                  ABSCount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => materialClickHandler("PLA")}
            >
              <div className="value">
                {fMateriales === "PLA" ? (
                  <strong style={{ color: "#3767a2" }}>PLA</strong>
                ) : (
                  "PLA"
                )}
              </div>
              <div className="count">
                {fMateriales === "PLA" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {PLACount.length}
                  </strong>
                ) : (
                  PLACount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => materialClickHandler("TPU")}
            >
              <div className="value">
                {fMateriales === "TPU" ? (
                  <strong style={{ color: "#3767a2" }}>TPU</strong>
                ) : (
                  "TPU"
                )}
              </div>
              <div className="count">
                {fMateriales === "TPU" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {TPUCount.length}
                  </strong>
                ) : (
                  TPUCount.length
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <div className="title">
            <strong>Categoria</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item active"
              onClick={() => categoriaClickHandler("accesorio")}
            >
              <div className="value">
                {fCategoria === "accesorio" ? (
                  <strong style={{ color: "#3767a2" }}>Accesorio</strong>
                ) : (
                  "Accesorio"
                )}
              </div>
              <div className="count">
                {fCategoria === "accesorio" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {AccesorioCount.length}
                  </strong>
                ) : (
                  AccesorioCount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => categoriaClickHandler("figura")}
            >
              <div className="value">
                {fCategoria === "figura" ? (
                  <strong style={{ color: "#3767a2" }}>Figura</strong>
                ) : (
                  "Figura"
                )}
              </div>
              <div className="count">
                {fCategoria === "figura" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {FiguraCount.length}
                  </strong>
                ) : (
                  FiguraCount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => categoriaClickHandler("decoracion")}
            >
              <div className="value">
                {fCategoria === "decoracion" ? (
                  <strong style={{ color: "#3767a2" }}>Decoracion</strong>
                ) : (
                  "Decoracion"
                )}
              </div>
              <div className="count">
                {fCategoria === "decoracion" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {DecoracionCount.length}
                  </strong>
                ) : (
                  DecoracionCount.length
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <div className="title">
            <strong>Tamaño</strong>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="popup">
            <div
              className="list-item active"
              onClick={() => tamanoClickHandler("M")}
            >
              <div className="value">
                {fTamano === "M" ? (
                  <strong style={{ color: "#3767a2" }}>Size M</strong>
                ) : (
                  "Size M"
                )}
              </div>
              <div className="count">
                {fTamano === "M" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {SizeMCount.length}
                  </strong>
                ) : (
                  SizeMCount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => tamanoClickHandler("S")}
            >
              <div className="value">
                {fTamano === "S" ? (
                  <strong style={{ color: "#3767a2" }}>Size S</strong>
                ) : (
                  "Size S"
                )}
              </div>
              <div className="count">
                {fTamano === "S" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {SizeSCount.length}
                  </strong>
                ) : (
                  SizeSCount.length
                )}
              </div>
            </div>
            <div
              className="list-item false"
              onClick={() => tamanoClickHandler("L")}
            >
              <div className="value">
                {fTamano === "L" ? (
                  <strong style={{ color: "#3767a2" }}>Size L</strong>
                ) : (
                  "Size L"
                )}
              </div>
              <div className="count">
                {fTamano === "L" ? (
                  <strong style={{ color: "#3767a2" }}>
                    {SizeLCount.length}
                  </strong>
                ) : (
                  SizeLCount.length
                )}
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FiltersAccordion;
