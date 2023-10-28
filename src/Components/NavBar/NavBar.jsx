import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "../../imagenes/logo.png";

function NavBar() {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            className="d-inline-block align-top"
            src={logo}
            alt="logo"
            width="40"
            height="40"
          />{" "}
          PrintCraft3D
        </Navbar.Brand>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Registrarse">Login up</Nav.Link>
          <Nav.Link href="/Inventario">Inventario</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
        </Nav>
      </Container>

      <Container>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
