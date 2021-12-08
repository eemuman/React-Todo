import { DragDropContext } from "react-beautiful-dnd";
import ThisModal from "../Objects/Modal";
import Column from "../Objects/Column";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function MainPage(props) {
  var createT = "Lisää tehtävä";
  const [firstColumn, setFirstColumn] = useState(0);
  const [secondColumn, setSecondColumn] = useState(1);

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
        <ThisModal upData={props.upData} createT={createT} />
      </div>
      <Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Col>
            <Column
              columnid={firstColumn}
              setColumn={setFirstColumn}
              {...props}
            />
          </Col>
          <Col>
            <Column
              columnid={secondColumn}
              setColumn={setSecondColumn}
              {...props}
            />
          </Col>
        </DragDropContext>
      </Row>
    </div>
  );
}
