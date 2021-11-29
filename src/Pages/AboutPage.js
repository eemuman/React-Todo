import React from "react";
import { Container, Card } from "react-bootstrap";

export default function AboutPage() {
  return (
    <Container>
      <Card.Body>
        <h5>Käyttöohjeet tulossa... </h5>
        <span>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </span>
        <hr></hr>
        <h5>Sivuston tekijä: </h5> <span>Eemil Väänänen</span>
        <hr></hr>
        <h5>Sivustolla käytetyt kirjastot:</h5>
        <span>React, React-Router, React-Bootstrap</span>
      </Card.Body>
    </Container>
  );
}
