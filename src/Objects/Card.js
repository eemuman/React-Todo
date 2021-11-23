import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import ThisModal from "./Modal";
import { Draggable } from "react-beautiful-dnd";

export default class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
      id: this.props.id,
      dragId: this.props.dragId,
    };
  }

  upData = (data) => {
    this.setState({ title: data.title, text: data.text });
    this.forceUpdate();
  };

  render() {
    return (
      <Draggable draggableId={this.state.dragId} index={this.props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card
              bg="light"
              border="dark"
              style={{
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              <Card.Header as="h5">{this.state.title}</Card.Header>
              <Card.Body>
                <Card.Text>{this.state.text}</Card.Text>
              </Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ThisModal
                  BtnStyle="outline-primary"
                  data={this.state}
                  upData={this.upData}
                  createT={"Muokkaa"}
                />
                <Button
                  style={{ margin: "5px" }}
                  variant="outline-danger"
                  onClick={() => {
                    this.props.removeCard(this.state.id);
                  }}
                >
                  Poista Kortti
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}
