import React from "react";
import { Form } from "react-bootstrap";

export default function ColumnChooser(props) {
  /*TÄLLÄ FUNKTIOLLA LUODAAN KOLUMNIEN HEADERISSÄ OLEVAT AVATTAVAT KOLUMNIN VALINTA-VALIKOT.
  RENDERÖIDÄÄN FORM.CONTROLLILLA KOLUMNIT ARRAY MAP FUNKTIOTA KÄYTTÄEN. VASTAAN OTETAAN MYÖS KUMMANKIN KOLUMNIN ID, JOTTA _EI_ VOIDA VALITA SAMAA KOLUMNIA KUMMALLEKIN PUOLELLE (NÄKYY HARMAANA LISTASSA).*/
  return (
    <Form.Control
      as="select"
      onChange={(e) => {
        props.setColumn(
          //Kun valitaan eri kolumni, asetetaan sen indexi kyseisen columnin id:ksi, jotta tiedetään mitä renderöidään.
          props.columns.findIndex((column) => column.name === e.target.value)
        );
      }}
      value={
        props.columns.length > 0 ? props.columns[props.columnid].name : " " //Laitetaan näkyviin sen hetkisen kolumnin nimi. Ladattaessa " "
      }
      aria-label="Column"
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
