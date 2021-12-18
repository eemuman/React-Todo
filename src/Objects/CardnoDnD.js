import React, { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ThisModal from "./Modal";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

/*TÄMÄ KORTTI ON TÄYSIN SAMA KUIN NORMAALI KORTTI, MUTTA ILMAN DND FUNKTIONAALISUUTTA, KÄYTETÄÄN SEARCHPAGELLA*/

export default function Cards(props) {
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);
  const [tags, setTags] = useState(props.tags);
  const [id] = useState(props.id);
  const [curDate, setCurDate] = useState(props.curDate);

  var upData = async (newTitle, newText, newTag, newColumnId) => {
    const newDate = new Date().toLocaleString();
    setTitle(newTitle);
    setText(newText);
    setTags(newTag);
    setCurDate(newDate);
    /*Kortin data päivitetty, lähetetään se 'databaseen'*/
    await props.upCard(id, newTitle, newText, newTag, newDate, newColumnId);
  };

  useEffect(() => {
    setTitle(props.title);
    setText(props.text);
    setTags(props.tags);
    setCurDate(props.curDate);
  }, [props.title, props.text, props.tags, props.curDate]);
  return (
    <div>
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
          <ReactTimeAgo date={Date.parse(curDate)} timeStyle="round" />{" "}
          {curDate}
        </Card.Footer>
      </Card>
    </div>
  );
}
