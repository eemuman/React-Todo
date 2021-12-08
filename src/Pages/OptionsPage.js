import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import CardnoDnD from "../Objects/CardnoDnD";

export default function OptionsPage(props) {
  const initFilteredResults = () => {
    if (location.state != null) {
      const res = props.CurCards.filter(
        (card) => card.tag === location.state.filterValue
      );
      return res;
    }
    return [];
  };

  const location = useLocation();
  const [filteredResults, setFilteredResults] = useState(initFilteredResults());
  const [searchFilter, setSearchFilter] = useState("");

  const filterResults = () => {
    setFilteredResults(
      props.CurCards.filter(
        (card) =>
          card.title.includes(searchFilter) || card.text.includes(searchFilter)
      )
    );
  };

  const deleteCards = (id) => {
    setFilteredResults((prevArray) =>
      prevArray.filter((cards) => cards.id !== id)
    );
    props.delete(id);
  };

  const setCompletedFiltered = (id) => {
    props.setCompleted(id);
    setFilteredResults((prevArray) =>
      prevArray.filter((cards) => cards.id !== id)
    );
  };

  return (
    <div>
      <Row>
        <Col></Col>
        <Col sm={9}>
          <Form.Control
            size="lg"
            style={{ margin: "10px auto" }}
            type="text"
            placeholder="Hae.."
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </Col>
        <Col sm={2}>
          <Button
            size="lg"
            style={{ margin: "10px", width: "75%" }}
            variant="primary"
            type="submit"
            onClick={() => filterResults()}
          >
            Hae
          </Button>
        </Col>
      </Row>
      <Row>
        <Card border="light" style={{ width: "50%", margin: "0 auto" }}>
          {filteredResults.map((kortti) => (
            <CardnoDnD
              {...kortti}
              delete={deleteCards}
              upCard={props.updCard}
              setCompleted={setCompletedFiltered}
            />
          ))}
        </Card>{" "}
        {filteredResults.length === 0 && (
          <h1 style={{ textAlign: "center" }}>EI HAKUTULOKSIA</h1>
        )}
      </Row>
    </div>
  );
}
