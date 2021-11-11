import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import AboutPage from "./AboutPage";
import OptionsPage from "./OptionsPage";
import MainPage from "./MainPage";
import { Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Todo-app
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Koti
              </Nav.Link>
              <Nav.Link as={Link} to="/Options">
                Asetukset
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/About">
                Tietoja
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Options" element={<OptionsPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
