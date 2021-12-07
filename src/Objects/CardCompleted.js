import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

export default function Cards(props) {
  const [title] = useState(props.title);
  const [text] = useState(props.text);
  const [tags] = useState(props.tag);
  const [id] = useState(props.id);
  const [curDate] = useState(props.curDate);

  return (
    <div>
      <Card
        bg="light"
        border="success"
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
        <div>
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
        <Card.Footer className="text-muted">
          Muokattu: <ReactTimeAgo date={curDate} timeStyle="round" />
        </Card.Footer>
      </Card>
    </div>
  );
}
