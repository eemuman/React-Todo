import { DragDropContext } from "react-beautiful-dnd";
import ThisModal from "../Objects/Modal";
import Column from "../Objects/Column";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { updCards } from "../Objects/DataHandler";

export default function MainPage(props) {
  var createT = "Lisää tehtävä";
  const [updated, setUpdated] = useState("");
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

  const newCards = async (title, text, tags) => {
    let data = await updCards(title, text, tags);
    setUpdated(data);
  };

  return (
    <div>
      <div>
        <ThisModal upData={newCards} createT={createT} />
      </div>
      <Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Col>
            <Column
              setUpdated={setUpdated}
              updated={updated}
              columnid={firstColumn}
              setColumn={setFirstColumn}
              {...props}
            />
          </Col>
          <Col>
            <Column
              setUpdated={setUpdated}
              updated={updated}
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
