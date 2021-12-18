import React, { useEffect, useState } from "react";
import { Form, FormControl, FloatingLabel } from "react-bootstrap";
import { getColumns } from "./DataHandler";

/*FORM ELEMENTTI. TÄTÄ KÄYTETÄÄN UUDEN KORTIN LUOMISEEN JA VANHAN KORTIN MUOKKAAMISEEN
TÄHÄN EI TALLENNETA DATAA, VAAN NE LÄHETETÄÄN KAIKKI MODALIIN, JOKA TALLENTAA NE SITTEN ETEENPÄIN*/

export default function InForm(props) {
  //Laitetaan uusimmat kolumnit stateen, jotta voidaan valita mihinkä kolumniin halutaan pistää kortti.
  const [columns, setColumns] = useState([]);

  //Tällä haetaan kolumnit, tyhjä dependancy array tarkoittaa, että ne haetaan vain kerran.
  useEffect(() => {
    async function fetchCols() {
      setColumns(await getColumns());
    }
    fetchCols();
  }, []);

  //Kun kolumnivalikosta valitaan uusi kolumni, joudutaan hakemaan kolumnit arraysta halutun kolumnin id. Lähetetään se sitten modalin stateen tallennettavaksi myöhempää varten.
  const changeColumnId = (findName) => {
    const id = columns.find((column) => column.name === findName);
    props.onChangeColumnid(id.id);
  };

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
              aria-describedby="titleReq"
              value={props.title}
              type="text"
              as="textarea"
              placeholder="Otsikko"
              aria-label="With textarea"
              onChange={(e) => {
                //Tässä muokataan otsikkoa
                props.onChangeTitle(e.target.value);
              }}
            />
            <Form.Text id="titleReq" muted>
              Tehtävällä on pakko olla otsikko
            </Form.Text>
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
                //Tässä muokataan lisätietoja.
                props.onChangeText(e.target.value);
              }}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group>
          <Form.Control //Täällä taas tagit
            value={props.tag}
            type="tags"
            placeholder="Tagi"
            size="sm"
            onChange={(e) => props.onChangeTags(e.target.value)}
          />
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>Valitse Kolumni</Form.Label>
          <Form.Select //Tässä renderöidään valikko ja sen sisälle kasataan kaikki muut vaihtoehdot paitsi valmiit, koska sinne mennään vain jos on merkattu valmiiksi.
            value={columns.length > 0 ? columns[props.columnid].name : " "}
            onChange={(e) => changeColumnId(e.target.value)}
          >
            {columns.map((name, index) => {
              if (name.name !== "VALMIIT") {
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
      </Form>
    </>
  );
}
