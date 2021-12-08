import React from "react";
import { Form } from "react-bootstrap";

export default function ColumnChooser(props) {
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        props.setColumn(
          props.columns.findIndex((column) => column === e.target.value)
        );
      }}
      value={props.columns[props.columnid]}
      aria-label="Column"
    >
      {props.columns.map((name, index) => (
        <option value={name} key={index}>
          {name}
        </option>
      ))}
    </Form.Control>
  );
}
