import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import CardnoDnD from "../Objects/CardnoDnD";
import {
  fetchSearchFilter,
  updCard,
  fetchTagFilter,
  deleteCards,
  setCompleted,
} from "../Objects/DataHandler";

/*HAKUSIVUSTO, KOHTALAISEN YKSINKERTAINEN TOTEUTUS, SISÄLTÄÄ HAKUPALKIN JA HAKUNÄPPÄIMEN, TÄNNE TULLAAN MYÖS JOS PAINAA TAGIA PÄÄSIVULLA*/

export default function OptionsPage() {
  const location = useLocation();
  const [curCards, setCards] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  /*Jos klikataan tagia, niin käytetään routterin useLocationia, jonka sisällä on filterValue. Haetaan tällä valuella kortteja, jossa on sama tagi.*/
  useEffect(() => {
    const initFilteredResults = async () => {
      if (location.state != null) {
        const newCards = await fetchTagFilter(location.state.filterValue);
        setCards([...newCards]);
      } else {
        setCards([]);
      }
    };
    initFilteredResults();
  }, [location.state]);

  /*Jos päivitetään kortteja haun kautta, käytetään tätä funktiota*/
  const updateCard = async (id, ...newData) => {
    await updCard(id, ...newData);
  };

  /*Haetaan 'databasesta' searchFilter staten tuloksella, laitetaan sitten saadut kortit setCards arrayhyn */
  const filterResults = async () => {
    const newCards = await fetchSearchFilter(searchFilter);
    setCards([...newCards]);
  };

  /*Jos poistetaan kortteja haun kautta, käytetään tätä funktiota Poistetaan se myös paikallisesta arraysta, jotta ei tarvitse ladata kortteja uudestaan.*/
  const deleteCard = async (id) => {
    await deleteCards(id);
    setCards((prevArray) => prevArray.filter((card) => card.id !== id));
  };

  /*Jos merkataan kortteja valmiiksi haun kautta, käytetään tätä funktiota Poistetaan se myös paikallisesta arraysta, jotta ei tarvitse ladata kortteja uudestaan.*/

  const setCompletedFiltered = async (id) => {
    await setCompleted(id);
    setCards((prevArray) => prevArray.filter((card) => card.id !== id));
  };

  /*Renderöinään hakupalkki, jota muutettaeassa tallennetaan filtteri searchFilter stateen. Sen vieressä on nappi joka kutsuu filterResults funktiota, joka hakee kortit kyseisellä hakusanalla. Renderöidään sen jälkeen kortit alle, jos niitä on. (Muuten renderöidään ei hakutuloksia) */
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
          {curCards.map((kortti) => (
            <CardnoDnD
              key={kortti.id.toString()}
              {...kortti}
              delete={deleteCard}
              upCard={updateCard}
              setCompleted={setCompletedFiltered}
            />
          ))}
        </Card>{" "}
        {curCards.length === 0 && (
          <h1 style={{ textAlign: "center" }}>EI HAKUTULOKSIA</h1>
        )}
      </Row>
    </div>
  );
}
