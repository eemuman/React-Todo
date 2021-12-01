import React, { useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import AboutPage from "../Pages/AboutPage";
import OptionsPage from "../Pages/OptionsPage";
import MainPage from "../Pages/MainPage";
import Navbar from "./Navbar";
import { Container, Card } from "react-bootstrap";

export default function DataHandler() {
  const [cards, setCards] = useState([]);
  const [id, setId] = useState(0);

  const updCards = (newTitle, newText) => {
    setId(id + 1);
    var data = {
      id: id,
      dragId: id.toString(),
      key: id.toString(),
      title: newTitle,
      text: newText,
      removeCard: deleteCards,
    };
    setCards((prevArray) => [data, ...prevArray]);
  };

  const deleteCards = (id) => {
    setCards((prevArray) => prevArray.filter((cards) => cards.id !== id));
  };

  const updCard = (newTitle, newText, id) => {
    setCards((prevArray) => {
      var index = prevArray.findIndex((card) => card.id === id);
      prevArray[index].title = newTitle;
      prevArray[index].text = newText;

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
                      delete={deleteCards}
                      upCard={updCard}
                      setCards={setCards}
                    />
                  }
                />
                <Route path="/About" element={<AboutPage />} />
                <Route path="/Options" element={<OptionsPage />} />
              </Routes>
            </HashRouter>
          </>
        </Card>
      </Container>
    </div>
  );
}
