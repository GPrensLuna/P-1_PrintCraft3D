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
  const [reset, setReset] = useState(false);

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
            <div className="list-item false">
              <div className="value">ABS</div>
              <div className="count">{ABSCount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">PLA</div>
              <div className="count">{PLACount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">TPU</div>
              <div className="count">{TPUCount.length}</div>
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
            <div className="list-item active">
              <div className="value">Accesorio</div>
              <div className="count">{AccesorioCount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">Figura</div>
              <div className="count">{FiguraCount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">Decoracion</div>
              <div className="count">{DecoracionCount.length}</div>
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
            <div className="list-item active">
              <div className="value">Size M</div>
              <div className="count">{SizeMCount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">Size S</div>
              <div className="count">{SizeSCount.length}</div>
            </div>
            <div className="list-item false">
              <div className="value">Size L</div>
              <div className="count">{SizeLCount.length}</div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FiltersAccordion;
