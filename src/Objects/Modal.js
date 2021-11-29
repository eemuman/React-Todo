import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import InForm from "./Form";

export default function ThisModal(props) {
  var createT = props.createT;
  var Btn2 = "Tallenna";
  var Btn3 = "Peru";
  var ThtLS = "Tehtävän lisätiedot";
  var ThtOS = "Tehtävän otsikko";

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(props.title != null ? props.title : "");
  const [text, setText] = useState(props.text != null ? props.text : "");

  const flushState = (newTitle, newText) => {
    setTitle(newTitle != null ? newTitle : "");
    setText(newText != null ? newText : "");
  };

  return (
    <>
      <Button
        variant={props.BtnStyle}
        size={props.BtnSize}
        onClick={() => {
          setShow(true);
          flushState(props.title, props.text);
        }}
        style={{ margin: "5px" }}
      >
        {createT}
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{createT}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InForm
            ThtOS={ThtOS}
            ThtLS={ThtLS}
            title={title}
            text={text}
            onChangeTitle={setTitle}
            onChangeText={setText}
          ></InForm>
        </Modal.Body>
        <Modal.Footer justify-content-between={+true}>
          <Button
            variant="primary"
            onClick={() => {
              props.upData(title, text);
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
