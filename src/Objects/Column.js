import React from "react";
import { Card } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import CardCompleted from "./CardCompleted";
import ColumnChooser from "./ColumnChooser";
import { deleteCards, setCompleted, updCard } from "./DataHandler";

/*TÄLLÄ FUNKTIOLLA LUODAAN KOLUMNIT, JOTA RENDERÖIDÄÄN 2 KAPPALETTA PÄÄSIVUN NÄKYMÄSSÄ */

export default function Column(props) {
  /* Tämän avustusfunktion avulla, kun poistetaan kortti poista-näppäimella tullaan tänne.
  Eli, ensiksi poistetaan se 'databasesta' ja lähetetään crdUpdateen sen id, jotta saadaan triggeröityä korttien uudelleenhaku päänäkymässä. */
  const deleteCard = async (id) => {
    await deleteCards(id);
    console.log("HERE + " + id);
    props.setUpdated(id);
  };

  /* Tämän avustusfunktion avulla, kun merkataan kortti valmiiksi kortin Tehtävä valmis-näppäimella tullaan tänne.
  Eli, ensiksi Merkataan se valmiiksi  'databaseen' ja lähetetään crdUpdateen sen id, jotta saadaan triggeröityä korttien uudelleenhaku päänäkymässä. */
  const setCardCompleted = async (id) => {
    await setCompleted(id);
    props.setUpdated(id);
  };

  /* Tämän avustusfunktion avulla, kun korttia on muokattu ja painettu tallennusnäppäintä kortissa tullaan tänne.
  Eli, ensiksi tallennetaan muutettu data 'databaseen' ja lähetetään crdUpdateen sen id, jotta saadaan triggeröityä korttien uudelleenhaku päänäkymässä. */
  const updateCard = async (id, ...newData) => {
    await updCard(id, ...newData);
    props.setUpdated(id);
  };

  /*Jos käytetään VALMIIT Kolumnia, niin renderöidään tämä lista, jossa käytetään cardcompletedeja ja ollaan ilman DND funktionaalisuutta
  Kolumnin yläreunassa on headerina valintavalikko, josta voidaan vaihtaa kätevästi haluttua kolumnia (columnchooser) elementti. Sen jälkeen bodyn sisällä renderöidään halutun kolumnin kortit */
  if (props.columnid === 0) {
    return (
      <Card style={{ textAlign: "center" }}>
        <Card.Header as="h4">
          <ColumnChooser //Luodaan kolumninvalinta elemenetti
            otherColumn={props.otherColumn}
            columnid={props.columnid}
            setColumn={props.setColumn}
            columns={props.columns}
          />
        </Card.Header>
        <Card.Body>
          {
            props.curCards.length === 0 && (
              <h2>TEHTÄVÄLISTA ON TYHJÄ!</h2>
            ) /*Tehtävälista on tyhjä, näytetään tämä */
          }
          {props.curCards.map(
            (
              kortti //Mapataan kortit kolumnin sisälle
            ) => (
              <CardCompleted
                key={kortti.id.toString()}
                {...kortti}
                delete={deleteCard}
              />
            )
          )}
        </Card.Body>
      </Card>
    );
  }

  /*Muut, nimestä tai muista muuttujista riippumatta renderöidään tällä. Sisällöltään täysin sama kuin yllä oleva*/
  return (
    <Droppable droppableId={props.columnid.toString()}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Card style={{ textAlign: "center" }}>
            <Card.Header as="h4">
              <ColumnChooser //Luodaan kolumninvalinta elemenetti
                otherColumn={props.otherColumn}
                columnid={props.columnid}
                setColumn={props.setColumn}
                columns={props.columns}
              />
            </Card.Header>
            <Card.Body>
              {props.curCards.length === 0 && <h2>TEHTÄVÄLISTA ON TYHJÄ!</h2>}
              {props.curCards.map((kortti, index) => (
                <Cards
                  key={kortti.id.toString()}
                  index={index}
                  {...kortti}
                  delete={deleteCard}
                  setCompleted={setCardCompleted}
                  upCard={updateCard}
                />
              ))}

              {provided.placeholder}
            </Card.Body>
          </Card>
        </div>
      )}
    </Droppable>
  );
}
