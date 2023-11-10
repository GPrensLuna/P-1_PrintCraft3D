import Accordion from "react-bootstrap/Accordion";
import "./FiltersAccordion.css";

const FiltersAccordion = (props) => {
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
              <div className="count">62</div>
            </div>
            <div className="list-item false">
              <div className="value">PLA</div>
              <div className="count">13</div>
            </div>
            <div className="list-item false">
              <div className="value">TPU</div>
              <div className="count">13</div>
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
              <div className="count">30</div>
            </div>
            <div className="list-item false">
              <div className="value">Figura</div>
              <div className="count">10</div>
            </div>
            <div className="list-item false">
              <div className="value">Decoracion</div>
              <div className="count">5</div>
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
              <div className="count">30</div>
            </div>
            <div className="list-item false">
              <div className="value">Size S</div>
              <div className="count">10</div>
            </div>
            <div className="list-item false">
              <div className="value">Size L</div>
              <div className="count">5</div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default FiltersAccordion;
