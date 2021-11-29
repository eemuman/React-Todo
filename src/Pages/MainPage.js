import { DragDropContext } from "react-beautiful-dnd";
import ThisModal from "../Objects/Modal";
import Column from "../Objects/Column";
import React from "react";
import { Card } from "react-bootstrap";

export default function MainPage(props) {
  var createT = "Lisää tehtävä";

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    var dragged = props.CurCards.find((card) => card.dragId === draggableId);

    props.setCards((prevArray) => {
      prevArray.splice(source.index, 1);
      prevArray.splice(destination.index, 0, dragged);
      return prevArray;
    });
  };

  return (
    <div>
      <div>
        <ThisModal
          upData={props.upData}
          createT={createT}
          BtnStyle="primary"
          BtnSize="lg"
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column
          cards={props.CurCards}
          delete={props.delete}
          upCard={props.upCard}
        />
      </DragDropContext>
      {props.CurCards.length === 0 && (
        <h1 style={{ textAlign: "center" }}>TEHTÄVÄLISTA ON TYHJÄ!</h1>
      )}
    </div>
  );
}
