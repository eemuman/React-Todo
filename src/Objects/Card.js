import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ThisModal from "./Modal";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export default function Cards(props) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [tags, setTags] = useState(props.tags);
  const [id] = useState(props.id);
  const [curDate, setCurDate] = useState(props.curDate);

  var upData = (newTitle, newText, newTag) => {
    setTitle(newTitle);
    setText(newText);
    setTags(newTag);
    setCurDate(new Date());
  };

  useEffect(() => {
    props.upCard(id, title, text, tags, curDate);
  }, [curDate, tags, title, text, id]);

  useEffect(() => {
    console.log(props.title + " " + props.text + " " + props.tags);
    setTitle(props.title);
    setText(props.text);
    setTags(props.tags);
    setCurDate(props.curDate);
  }, [props.title, props.text, props.tags, props.curDate]);

  return (
    <div>
      <Draggable draggableId={id.toString()} index={props.index}>
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
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              <Card.Header as="h5">{title}</Card.Header>
              <Card.Body>
                <Card.Text>{text}</Card.Text>
                <Link to={`/Options/${tags}`} state={{ filterValue: tags }}>
                  <Badge pill bg="secondary">
                    #{tags}
                  </Badge>
                </Link>
              </Card.Body>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ThisModal
                  BtnStyle="outline-primary"
                  title={title}
                  text={text}
                  tag={tags}
                  upData={upData}
                  createT={"Muokkaa"}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    props.setCompleted(id);
                  }}
                  style={{ margin: "5px" }}
                  variant="outline-success"
                >
                  Tehtävä valmis!
                </Button>
                <Button
                  size="sm"
                  style={{ margin: "5px" }}
                  variant="outline-danger"
                  onClick={() => {
                    props.delete(id);
                  }}
                >
                  Poista Kortti
                </Button>
              </div>
              <Card.Footer className="text-muted">
                Muokattu: <ReactTimeAgo date={curDate} timeStyle="round" />
              </Card.Footer>
            </Card>
          </div>
        )}
      </Draggable>
    </div>
  );
}
