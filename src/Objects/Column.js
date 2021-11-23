import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
export default class column extends Component {
  render() {
    return (
      <Droppable droppableId={"TEST"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Container>
              {
                this.props.cards.map((kortti, index) => (
                  <Cards
                    index={index}
                    id={kortti.id}
                    key={kortti.key}
                    dragId={kortti.dragId}
                    title={kortti.title}
                    text={kortti.text}
                    removeCard={this.props.delete}
                  />
                ))
                // .reverse()
              }
            </Container>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
