import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import AboutPage from "../Pages/AboutPage";
import OptionsPage from "../Pages/OptionsPage";
import MainPage from "../Pages/MainPage";
import Navbar from "./Navbar";
import { Container, Card } from "react-bootstrap";

export default function DataHandler() {
  const [cards, setCards] = useState([]);
  const [completedCards, setCompletedCards] = useState([]);
  const [id, setId] = useState(0);

  const updCards = (newTitle, newText, newTag) => {
    const thisCreateDate = new Date();

    setId(id + 1);
    var data = {
      id: id,
      dragId: id.toString(),
      key: id.toString(),
      title: newTitle,
      text: newText,
      tag: newTag,
      curDate: thisCreateDate,
      removeCard: deleteCards,
    };
    setCards((prevArray) => [data, ...prevArray]);
  };

  const deleteCards = (id) => {
    setCards((prevArray) => prevArray.filter((cards) => cards.id !== id));
  };
  const compDelete = (id) => {
    setCompletedCards((prevArray) =>
      prevArray.filter((cards) => cards.id !== id)
    );
  };

  const setCompleted = (id) => {
    var completed = cards.find((card) => card.id === id);
    setCards((prevArray) => prevArray.filter((cards) => cards.id !== id));
    setCompletedCards((prevArray) => [completed, ...prevArray]);
  };

  const updCard = (newTitle, newText, id, newTag, newDate) => {
    setCards((prevArray) => {
      var index = prevArray.findIndex((card) => card.id === id);

      if (index !== -1) {
        prevArray[index].title = newTitle;
        prevArray[index].text = newText;
        prevArray[index].tag = newTag;
        prevArray[index].curDate = newDate;
      }
      return prevArray;
    });
  };

  const mainProps = {
    upData: updCards,
    CurCards: cards,
    CurCompletedCards: completedCards,
    delete: deleteCards,
    updCard: updCard,
    setCards: setCards,
    setCompleted: setCompleted,
    compDelete: compDelete,
  };

  const optionProps = {
    CurCards: cards,
    delete: deleteCards,
    updCard: updCard,
    setCards: setCards,
    setCompleted: setCompleted,
  };

  return (
    <div>
      <Container>
        <Card>
          <>
            <HashRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<MainPage {...mainProps} />} />
                <Route path="/About" element={<AboutPage />} />
                <Route
                  exact
                  path="/Options"
                  element={<OptionsPage {...optionProps} />}
                />
                <Route
                  path="/Options/:tag"
                  element={<OptionsPage {...optionProps} />}
                />
              </Routes>
            </HashRouter>
          </>
        </Card>
      </Container>
    </div>
  );
}
