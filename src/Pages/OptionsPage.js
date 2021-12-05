import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ColumnnoDND from "../Objects/ColumnnoDND";

export default function OptionsPage(props) {
  const location = useLocation();
  const initFilteredResults = () => {
    if (props.cards.filter !== null) {
      const res = props.cards.filter(
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

  return (
    <div>
      <ColumnnoDND
        cards={filteredResults}
        delete={deleteCards}
        upCard={props.upCard}
        setCompleted={props.setCompleted}
      />
      {filteredResults.length === 0 && (
        <h1 style={{ textAlign: "center" }}>EI HAKUTULOKSIA</h1>
      )}
    </div>
  );
}
