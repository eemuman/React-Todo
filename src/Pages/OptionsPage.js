import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import CardnoDnD from "../Objects/CardnoDnD";

export default function OptionsPage(props) {
  const location = useLocation();
  const initFilteredResults = () => {
    if (props.CurCards.filter != null) {
      const res = props.CurCards.filter(
        (card) => card.tag === location.state.filterValue
      );
      return res;
    }
    return [];
  };

  const deleteCards = (id) => {
    setFilteredResults((prevArray) =>
      prevArray.filter((cards) => cards.id !== id)
    );
    props.delete(id);
  };
  const [filteredResults, setFilteredResults] = useState(initFilteredResults);

  const setCompletedFiltered = (id) => {
    props.setCompleted(id);
    setFilteredResults((prevArray) =>
      prevArray.filter((cards) => cards.id !== id)
    );
  };

  return (
    <>
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
    </>
  );
}
