import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutPage() {
  return (
    <Container>
      <Card style={{ "margin-top": "5px", "background-color": "#fafafa" }}>
        <Card.Body>
          <Card.Text>
            <h5>Käyttöohjeet tulossa... </h5>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <hr></hr>
            <h5>Sivuston tekijä: </h5> <p>Eemil Väänänen</p>
            <hr></hr>
            <h5>Sivustolla käytetyt kirjastot:</h5>
            <p>React, React-Router, React-Bootstrap</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
