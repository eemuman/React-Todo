import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { setColumn, deleteColumn } from "./DataHandler";

/*TÄÄLLÄ HALLITAAN KOLUMNEJA, TÄMÄN AVULLA VOI LUODA UUSIA JA POISTAA VANHOJA KOLUMNEJA*/

export default function ColumnHandler(props) {
  /*Muutama state, käytetään modalia, joten on nappi jolla toggletaan se näkyvyys, uuden kolumnin nimi newColumnissa, nappien disablointi riippuen siitä, onko tietyt asiat kunnossa, poistettavan kolumnin ID*/
  const [show, setShow] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [deleteID, setDeleteID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    /*Kun luodaan uutta kolumnia, niin tällä useEffectillä laitetaan luontinäppäin aktiiviseksi, JOS uuden kolumnin nimi ei ole tyhjä. Tänne tullaan kun newColumni muuttuu*/
    newColumn.length > 0
      ? setAddButtonDisabled(false)
      : setAddButtonDisabled(true);
  }, [newColumn]);

  /*Tällä funktiolla haetaan poistettavan kolumnin ID*/
  const findDeleteId = (findName) => {
    const id = props.columns.find((column) => column.name === findName);
    setDeleteID(id.id);
  };
  /*Jos deleteID ei ole tyhjä, muutetaan poistonäppäin aktiiviseksi. Tänne tullaan kun deleteID muuttuu*/
  useEffect(() => {
    deleteID !== null
      ? setDeleteButtonDisabled(false)
      : setAddButtonDisabled(true);
  }, [deleteID]);

  /*Returnissa luodaan modal ja formi sen sisälle, jossa on tekstipalkki johon voi kirjoittaa uuden kolumnin nimi. Sen alla nappi, jolla luodaan uusi kolumni käyttäen datahandlerin luontikomentoa. Lista jossa on kolumnit (poislukien valmiit ja uudet kolumnit.)
   Käytössä olevat kolumnit ovat harmaalla, eikä niitä voi poistaa*/
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Hallitse Kolumneja
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hallitse Kolumneja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Lisää uusi Kolumni</Form.Label>
              <Form.Control //Uuden kolummnin tekstipalkki
                value={newColumn}
                onChange={(e) => setNewColumn(e.target.value)}
                type="text"
                placeholder="Uusi Kolumni"
              />
            </Form.Group>

            <Button
              variant="primary"
              disabled={addButtonDisabled}
              type="submit"
              onClick={async () => {
                /* NAPPIA PAINAMALLA TALLENNETAAN  DATABASEEN UUSI KOLUMNI JA LÄHETETÄÄN propsiin dataa, jotta forcetaan kolumnilistojen uudelleenrenderöinti. Nollataan myös kolumniteksti palkki*/
                await setColumn(newColumn);
                props.updated(newColumn);
                setNewColumn("");
              }}
            >
              Lisää
            </Button>
            <Form.Group className="mb-3">
              <Form.Label>Poista Kolumni</Form.Label>
              <Form.Select onChange={(e) => findDeleteId(e.target.value)}>
                <option> </option>
                {props.columns.map((name, index) => {
                  //Mapataan kolumnit valikkoon. Valmiit ja Uudet puuttuvat lsitalta kokonaan, valitut kolumnit ovat harmaana ja niitä ei voi valita
                  if (name.id !== 0 && name.id !== 1) {
                    if (name.id === props.first || name.id === props.second) {
                      return (
                        <option
                          disabled={true}
                          value={name.name}
                          key={index}
                          id={name.id}
                        >
                          {name.name}
                        </option>
                      );
                    }
                    return (
                      <option value={name.name} key={index} id={name.id}>
                        {name.name}
                      </option>
                    );
                  }
                  return null;
                })}
              </Form.Select>
            </Form.Group>
            <Button
              variant="danger"
              disabled={deleteButtonDisabled}
              type="submit"
              onClick={async () => {
                //Poistetaan nappia painamalla kolumni delete IDllä, sen jälkee laitetaan propsit jotta saadaan uudelleen renderöinti.
                await deleteColumn(deleteID);
                props.updated(deleteID);
              }}
            >
              Poista
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sulje
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
