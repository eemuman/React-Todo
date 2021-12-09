import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import OptionsPage from "./Pages/OptionsPage";
import MainPage from "./Pages/MainPage";
import Navbar from "./Objects/Navbar";
import { Container, Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";

export default function App() {
  return (
    <div>
      <Container>
        <Card>
          <>
            <HashRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/About" element={<AboutPage />} />
                <Route exact path="/Options" element={<OptionsPage />} />
                <Route path="/Options/:tag" element={<OptionsPage />} />
              </Routes>
            </HashRouter>
          </>
        </Card>
      </Container>
    </div>
  );
}
