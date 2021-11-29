import { Container, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export default function navbar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Todo-app
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Koti
          </Nav.Link>
          <Nav.Link as={Link} to="/Options">
            Haku
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/About">
            Tietoja
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
