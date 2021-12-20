import React from "react";
import { Form } from "react-bootstrap";

export default function ColumnChooser(props) {
  /*TÄLLÄ FUNKTIOLLA LUODAAN KOLUMNIEN HEADERISSÄ OLEVAT AVATTAVAT KOLUMNIN VALINTA-VALIKOT.
  RENDERÖIDÄÄN FORM.CONTROLLILLA KOLUMNIT ARRAY MAP FUNKTIOTA KÄYTTÄEN. VASTAAN OTETAAN MYÖS KUMMANKIN KOLUMNIN ID, JOTTA _EI_ VOIDA VALITA SAMAA KOLUMNIA KUMMALLEKIN PUOLELLE (NÄKYY HARMAANA LISTASSA).*/
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        //Kun valitaan eri kolumni, asetetaan sen id kyseisen columnin id:ksi, jotta tiedetään mitä renderöidään.
        let newId = props.columns.find(
          (column) => column.name === e.target.value
        );
        props.setColumn(newId.id);
      }}
      aria-label="Column"
      value={props.columns.find((col) => col.id === props.columnid).name}
    >
      {props.columns.map((name, index) => {
        //Mapataan vaihtoehdot, jos vaihtoehto on toisessa kolumnissa käytössä, on se harmaana ja sitä ei voi valita
        if (name.id !== props.otherColumn) {
          return (
            <option value={name.name} key={index}>
              {name.name}
            </option>
          );
        }
        return (
          <option disabled={true} value={name.name} key={index} id={name.id}>
            {name.name}
          </option>
        );
      })}
    </Form.Control>
  );
}
