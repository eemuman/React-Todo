import { Container, Card } from "react-bootstrap";

import React, { Component } from "react";
import DataHandler from "../Objects/DataHandler";

export default class MainPage extends Component {
  render() {
    return (
      <>
        <Container>
          <Card>
            <div>
              <DataHandler
                cards={this.props.cards}
                updCards={this.props.updCards}
                curId={this.props.curId}
              />
            </div>
          </Card>
        </Container>
      </>
    );
  }
}
