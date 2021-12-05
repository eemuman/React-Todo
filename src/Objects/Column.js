import React from "react";
import { Container } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";

export default function Column(props) {
  return (
    <Droppable droppableId={props.draggableid}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Container>
            <h2>{props.draggableid}</h2>
            {props.cards.map((kortti, index) => (
              <Cards
                index={index}
                id={kortti.id}
                key={kortti.key}
                dragId={kortti.dragId}
                title={kortti.title}
                text={kortti.text}
                tag={kortti.tag}
                curDate={kortti.curDate}
                setCompleted={props.setCompleted}
                upCard={props.upCard}
                delete={props.delete}
              />
            ))}
          </Container>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
