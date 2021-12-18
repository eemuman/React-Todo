import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import InForm from "./Form";

/*MODAL FUNKTIO, TÄTÄ KÄYTETÄÄN MM. UUDEN KORTIN JA KORTIN MUOKKAAMISEEN.*/

export default function ThisModal(props) {
  var createT = props.createT;
  var Btn2 = "Tallenna";
  var Btn3 = "Peru";
  var ThtLS = "Tehtävän lisätiedot";
  var ThtOS = "Tehtävän otsikko";

  /*Luodaan stateja, titlelle, textille, tageille, jne.. */
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.title != null ? props.title : "");
  const [text, setText] = useState(props.text != null ? props.text : "");
  const [tags, setTags] = useState(props.tag != null ? props.tags : "");
  const [isDisabled, setDisabled] = useState(title.length > 0 ? false : true);
  const [columnId, setColumnId] = useState(
    props.columnid != null ? props.columnid : 1
  );

  /*Jos titlen pituus on 0, ts. tyhjä. otetaan luontinäppäin pois käytöstä. Tänne tullaan aina kun titleä muutetaan. */
  useEffect(() => {
    setDisabled(title.length > 0 ? false : true);
  }, [title]);

  /* Kun painetaan modalin avausnäppäintä, varmistetaan, että on käytössä uusin data asettamalla propsit / "" uudestaan. */
  const flushState = (newTitle, newText, newTags) => {
    setTitle(newTitle != null ? newTitle : "");
    setText(newText != null ? newText : "");
    setTags(newTags != null ? newTags : "");
  };

  return (
    <>
      <Button
        onClick={() => {
          //Modalin avausnäppäin, näkyviin ja nollataan title, teksti ja tagit ylläolevalla funktiolla.
          setShow(true);
          flushState(props.title, props.text, props.tag);
        }}
        style={{ margin: "5px" }}
      >
        {createT}
      </Button>
      <Modal //Modalin omia pikku muuttujia*/
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{createT}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InForm //Luodaan formi-elementti jossa muokataan itse dataa
            ThtOS={ThtOS}
            ThtLS={ThtLS}
            title={title}
            text={text}
            tag={tags}
            columnid={columnId}
            onChangeColumnid={setColumnId}
            onChangeTitle={setTitle}
            onChangeText={setText}
            onChangeTags={setTags}
          ></InForm>
        </Modal.Body>
        <Modal.Footer justify-content-between={+true}>
          <Button //Tallenna näppäin, joko tallennetaan uusi kortti tai muokataan vanhaa, riippuen mitä props.upDatassa on funktiona.
            disabled={isDisabled}
            variant="primary"
            onClick={() => {
              props.upData(title, text, tags, columnId);
              setShow(false);
            }}
          >
            {Btn2}
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {Btn3}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
