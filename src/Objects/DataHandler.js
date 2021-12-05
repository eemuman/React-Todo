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

  const setCompleted = (id) => {
    var completed = cards.find((card) => card.id === id);
    setCards((prevArray) => prevArray.filter((cards) => cards.id !== id));
    setCompletedCards((prevArray) => [completed, ...prevArray]);
  };

  const updCard = (newTitle, newText, id, newTag, newDate) => {
    setCards((prevArray) => {
      var index = prevArray.findIndex((card) => card.id === id);
      console.log(index);
      if (index !== -1) {
        prevArray[index].title = newTitle;
        prevArray[index].text = newText;
        prevArray[index].tag = newTag;
        prevArray[index].curDate = newDate;
      }
      return prevArray;
    });
  };

  return (
    <div>
      <Container>
        <Card>
          <>
            <HashRouter>
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainPage
                      upData={updCards}
                      CurCards={cards}
                      CurCompletedCards={completedCards}
                      delete={deleteCards}
                      upCard={updCard}
                      setCards={setCards}
                      setCompleted={setCompleted}
                    />
                  }
                />
                <Route path="/About" element={<AboutPage />} />
                <Route
                  exact
                  path="/Options"
                  element={
                    <OptionsPage
                      cards={cards}
                      delete={deleteCards}
                      upCard={updCard}
                      setCards={setCards}
                      setCompleted={setCompleted}
                    />
                  }
                />
                <Route
                  path="/Options/:tag"
                  element={
                    <OptionsPage
                      cards={cards}
                      delete={deleteCards}
                      upCard={updCard}
                      setCards={setCards}
                    />
                  }
                />
              </Routes>
            </HashRouter>
          </>
        </Card>
      </Container>
    </div>
  );
}
