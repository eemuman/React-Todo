import React from "react";
import { Form, FormControl, FloatingLabel } from "react-bootstrap";

export default function InForm(props) {
  return (
    <>
      <Form>
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label={props.ThtOS}
            className="mb-3"
          >
            <FormControl
              value={props.title}
              type="text"
              as="textarea"
              placeholder="Otsikko"
              aria-label="With textarea"
              onChange={(e) => {
                props.onChangeTitle(e.target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>
        <br></br>{" "}
        <Form.Group>
          <FloatingLabel
            controlId="floatingInput"
            label={props.ThtLS}
            className="mb-3"
          >
            <FormControl
              value={props.text}
              type="text"
              as="textarea"
              style={{ height: "100px" }}
              placeholder="Lisätiedot"
              aria-label="With textarea"
              onChange={(e) => {
                props.onChangeText(e.target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.Control
            value={props.tag}
            type="tags"
            placeholder="Tagi"
            size="sm"
            onChange={(e) => props.onChangeTags(e.target.value)}
          />
        </Form.Group>
      </Form>
    </>
  );
}
