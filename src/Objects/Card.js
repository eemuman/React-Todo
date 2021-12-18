import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ThisModal from "./Modal";
import { Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

/* KORTTI OBJEKTI, TÄSSÄ NÄYTETÄÄN KAIKKI KORTIN SISÄINEN DATA HIENOSSA KORTTINÄKYMÄSSÄ*/

export default function Cards(props) {
  /*Asetaan data stateen..*/
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [tags, setTags] = useState(props.tags);
  const [id] = useState(props.id);
  const [curDate, setCurDate] = useState(props.curDate);
  const [columnId, setColumnId] = useState(props.columnid);

  /*Kun päivitetään modalin kautta kortin dataa, päivitetään statet tämän avulla*/
  var upData = async (newTitle, newText, newTag, newColumnId) => {
    const newDate = new Date().toLocaleString();
    setTitle(newTitle);
    setText(newText);
    setTags(newTag);
    setColumnId(newColumnId);
    setCurDate(newDate);
    /*Kortin data päivitetty, lähetetään se 'databaseen'*/
    await props.upCard(id, newTitle, newText, newTag, newDate, newColumnId);
  };

  /*Renderöidään kortti, löytyy myös napit muokkaamiselle, valmiiksi merkkaamiselle ja poistamiselle*/
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
                  //Luodaan kortin sisälle myös modal elementti, jolla sitä voidaan muokata
                  BtnStyle="outline-primary"
                  title={title}
                  text={text}
                  tag={tags}
                  columnid={columnId}
                  upData={upData}
                  createT={"Muokkaa"}
                />
                <Button
                  //Valmiiksi merkkaus nappi
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
                  //Poistamiseen tehty nappi
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
                Muokattu:{" "}
                <ReactTimeAgo date={Date.parse(curDate)} timeStyle="round" />{" "}
                <br />
                {curDate}
              </Card.Footer>
            </Card>
          </div>
        )}
      </Draggable>
    </div>
  );
}
