import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import ThisModal from "./Modal";
import { Draggable } from "react-beautiful-dnd";

export default function Cards(props) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [id] = useState(props.id);
  const [dragId] = useState(props.dragId);

  var upData = (newTitle, newText) => {
    setTitle(newTitle);
    setText(newText);
  };

  useEffect(() => {
    props.upCard(title, text, id);
  });

  return (
    <div>
      <Draggable draggableId={dragId} index={props.index}>
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
              <Card.Header as="h5">{title}</Card.Header>
              <Card.Body>
                <Card.Text>{text}</Card.Text>
              </Card.Body>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ThisModal
                  BtnStyle="outline-primary"
                  title={title}
                  text={text}
                  upData={upData}
                  createT={"Muokkaa"}
                />
                <Button
                  style={{ margin: "5px" }}
                  variant="outline-danger"
                  onClick={() => {
                    props.delete(id);
                  }}
                >
                  Poista Kortti
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    </div>
  );
}
