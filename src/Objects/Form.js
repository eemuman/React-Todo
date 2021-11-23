import React from "react";
import { Form, FormControl, FloatingLabel } from "react-bootstrap";

export default function InForm(props) {
  return (
    <>
      <Form>
        <FloatingLabel
          controlId="floatingInput"
          label={props.ThtOS}
          className="mb-3"
        >
          <FormControl
            value={props.title}
            type="text"
            as="textarea"
            placeholder="Lisätiedot"
            aria-label="With textarea"
            onChange={(e) => {
              props.onChangeTitle(e.target.value);
            }}
          />
        </FloatingLabel>
        <br></br>{" "}
        <FloatingLabel
          controlId="floatingInput"
          label={props.ThtLS}
          className="mb-3"
        >
          <FormControl
            value={props.text}
            type="text"
            as="textarea"
            placeholder="Lisätiedot"
            aria-label="With textarea"
            onChange={(e) => {
              props.onChangeText(e.target.value);
            }}
          />
        </FloatingLabel>
      </Form>
    </>
  );
}
