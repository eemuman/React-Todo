import React from "react";
import { Card } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import CardCompleted from "./CardCompleted";
import ColumnChooser from "./ColumnChooser";

export default function Column(props) {
  console.log(props.columns[props.columnid]);
  if (props.columnid === 1) {
    return (
      <Card style={{ textAlign: "center" }}>
        <Card.Header as="h4">
          <ColumnChooser
            columnid={props.columnid}
            setColumn={props.setColumn}
            columns={props.columns}
          />
        </Card.Header>
        <Card.Body>
          {props.CurCompletedCards.map((kortti) => (
            <CardCompleted {...kortti} delete={props.compDelete} />
          ))}
          {props.CurCompletedCards.length === 0 && (
            <h1 style={{ textAlign: "center" }}>TEHTÄVÄLISTA ON TYHJÄ!</h1>
          )}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Droppable droppableId={props.columns[props.columnid]}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Card style={{ textAlign: "center" }}>
            <Card.Header as="h4">
              <ColumnChooser
                columnid={props.columnid}
                setColumn={props.setColumn}
                columns={props.columns}
              />
            </Card.Header>
            <Card.Body>
              {props.CurCards.map((kortti, index) => (
                <Cards
                  index={index}
                  {...kortti}
                  setCompleted={props.setCompleted}
                  upCard={props.updCard}
                  delete={props.delete}
                />
              ))}
              {props.CurCards.length === 0 && (
                <h1 style={{ textAlign: "center" }}>TEHTÄVÄLISTA ON TYHJÄ!</h1>
              )}
              {provided.placeholder}
            </Card.Body>
          </Card>
        </div>
      )}
    </Droppable>
  );
}
