import { DragDropContext } from "react-beautiful-dnd";
import ThisModal from "../Objects/Modal";
import Column from "../Objects/Column";
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  updCards,
  fetchCards,
  getColumns,
  updOrder,
  updColumnId,
  fetchColState,
  udpColState,
} from "../Objects/DataHandler";
import ColumnHandler from "../Objects/ColumnHandler";
import { useRef } from "react";

/* OHJELMAN PÄÄSIVU, SISÄLTÄÄ AIKA PALJON KAIKKEA, MYÖS TURHAA KOODIA. AJAN PUUTTEEN TAKIA TEKNINEN TOTEUTUS ON KOHTUULLISEN TÖNKKÖ, MUTTA FUNKTIONAALISUUDEN KANNALTA OLLAAN IHAN OK TILASSA */

export default function MainPage(props) {
  /* Tehdään eri statet, updatedia käytetään kun luodaan / poistetaan kolumneja
    firstcolumnid, firstcolumn, secondcolumnid ja secondcolumn määrittelee mitkä kolumnit ovat näkyvissä missäkin kohtaa
    CardUpd käytetään kun päivitetään / merkataan valmiiksi / poistetaan kortteja
    Refejä käytetään, jotta vältytään useEffectissä järjestyksen pilaamisesta*/
  var createT = "Lisää tehtävä";
  const [updated, setUpdated] = useState("");
  const [columns, setColumns] = useState([]);
  const [firstColumnid, setFirstColumnid] = useState();
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumnid, setSecondColumnid] = useState();
  const [secondColumn, setSecondColumn] = useState([]);
  const [cardUpd, setCardUpd] = useState("");
  const firstIdRef = useRef("");
  const secondIdRef = useRef("");

  /*Haetaan uudet kolumnit, kun niitä on päivitetty käyttäen columnhandleria*/
  useEffect(() => {
    async function getNewColumns() {
      setColumns(await getColumns());
    }

    getNewColumns();
  }, [updated]);

  //LADATAAN SIVUN AVAUTUESSA VIIMEKSI AUKI OLLEIDEN KOLUMNIEN TIEDOT
  useEffect(() => {
    async function initColumns() {
      let idNmr1 = await fetchColState(0);
      let idNmr2 = await fetchColState(1);

      setFirstColumnid(idNmr1);
      setSecondColumnid(idNmr2);
    }
    initColumns();
  }, []);

  /*Ladataan ensimmäisen kolumnin kortit kun A) vaihdetaan kolumnia, tai B) kun päivitetään kortteja*/
  useEffect(() => {
    async function getFirst() {
      if (firstColumnid !== undefined) {
        const firstData = await fetchCards(firstColumnid);
        setFirstColumn([...firstData]);
      }
    }
    getFirst();
  }, [firstColumnid, cardUpd]);

  /*Ladataan toisen kolumnin kortit kun A) vaihdetaan kolumnia, tai B) kun päivitetään kortteja*/
  useEffect(() => {
    async function getSecond() {
      if (secondColumnid !== undefined) {
        const secondData = await fetchCards(secondColumnid);
        setSecondColumn([...secondData]);
      }
    }
    getSecond();
  }, [secondColumnid, cardUpd]);

  /*Jos käytetään DnDtä järjestyksen vaihtamiseen, tässä tallennetaan (ensimmäisen kolumnin) uusi järjestys 'databaseen'. Käytetään referenssiä,
  koska muuten tehtäisiin ylimääräinen patsaus. Tallennetaan uusi järjestys kun järjestys muuttuu (firstColumn) tai vaihdetaan columnia (muuten eslint valittaa).*/
  useEffect(() => {
    async function updDate() {
      let firstId = [];
      firstColumn.forEach((card) => {
        firstId.push(card.id);
      });
      if (firstIdRef.current !== firstColumn && firstColumnid !== undefined) {
        await updOrder(firstColumnid, firstId);
        firstIdRef.current = firstColumn;
      }
    }
    updDate();
  }, [firstColumn, firstColumnid]);

  /*Jos käytetään DnDtä järjestyksen vaihtamiseen, tässä tallennetaan (toisen kolumnin) uusi järjestys 'databaseen'. Käytetään referenssiä,
  koska muuten tehtäisiin ylimääräinen patsaus. Tallennetaan uusi järjestys kun järjestys muuttuu (secondColumn) tai vaihdetaan columnia (muuten eslint valittaa columnid dependencyn puuttumisesta).*/
  useEffect(() => {
    async function updDate() {
      let secondId = [];
      secondColumn.forEach((card) => {
        secondId.push(card.id);
      });
      if (
        secondIdRef.current !== secondColumn &&
        secondColumnid !== undefined
      ) {
        await updOrder(secondColumnid, secondId);
        secondIdRef.current = secondColumn;
      }
    }
    updDate();
  }, [secondColumn, secondColumnid]);

  /*Beatiful DnD onDragEnd kutsu Järjestellään haluttu kolumni uudestaan, joka triggeröi ylläolevan useEffectin, joka taas tallentaa kyseisen järjestyksen 'databaseen'*/
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    //Haetaan haluttu kortti
    let dragged = findDragged(start.id, draggableId);

    if (start === finish) {
      if (start.id === firstColumnid) {
        //jos eka kolumni, tallennetaan sen kolumnin arrayhyn
        setFirstColumn((prevArray) => {
          prevArray.splice(source.index, 1);
          prevArray.splice(destination.index, 0, dragged);
          return [...prevArray];
        });
      } else {
        //Muuten tallennetaan toisen
        setSecondColumn((prevArray) => {
          prevArray.splice(source.index, 1);
          prevArray.splice(destination.index, 0, dragged);
          return [...prevArray];
        });
      }
    } else {
      //Jos siirretään kolumnista toiseen
      if (start.id === firstColumnid) {
        //EKASTA TOISEEN
        setFirstColumn((prevArray) => {
          prevArray.splice(source.index, 1);
          return prevArray;
        });
        setSecondColumn((prevArray) => {
          prevArray.splice(destination.index, 0, dragged);

          return prevArray;
        });
      } else {
        //TOISESTA EKAAN
        setSecondColumn((prevArray) => {
          prevArray.splice(source.index, 1);
          return prevArray;
        });
        setFirstColumn((prevArray) => {
          prevArray.splice(destination.index, 0, dragged);
          return prevArray;
        });
      }
      updColumnId(Number(destination.droppableId), dragged.id);
    }
  };

  /*Kortin hakemiseen tehty apufunktio (Käytetään DnD kanssa) */
  const findDragged = (id, draggableId) => {
    if (id === firstColumnid) {
      return firstColumn.find((card) => card.id.toString() === draggableId);
    }
    return secondColumn.find((card) => card.id.toString() === draggableId);
  };

  /* Luodaan uusi kortti ja tallennetaan se 'databaseen, sen jälkeen muutetaan cardUpd statea, jotta saadaan ladattua uusi kortti näkyviin */
  const newCards = async (title, text, tags, columnid) => {
    let data = await updCards(title, text, tags, columnid);
    setCardUpd(data);
  };

  const setFirstCol = async (newId) => {
    setFirstColumnid(newId);
    await udpColState(0, newId);
  };
  const setSecondCol = async (newId) => {
    setSecondColumnid(newId);
    await udpColState(1, newId);
  };

  /*Renderissä luodaan Modal, columnhandler ja kolumni elementit*/

  if (firstColumnid === undefined || secondColumnid === undefined) {
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );
  }
  return (
    <div>
      <div>
        <ThisModal upData={newCards} createT={createT} />
        <ColumnHandler //Luodaan kolumnihandleri, tulee uuden kortin luontinäppäimen viereen
          first={firstColumnid}
          second={secondColumnid}
          columns={columns}
          setColumns={setColumns}
          updated={setUpdated}
        />
      </div>
      <Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Col>
            <Column //Vasemmanpuoleinen kolumni
              curCards={firstColumn}
              setUpdated={setCardUpd}
              columnid={firstColumnid}
              otherColumn={secondColumnid}
              setColumn={setFirstCol}
              columns={columns}
              updated={cardUpd}
              {...props}
            />
          </Col>
          <Col>
            <Column //Oikeanpuoleinen kolumni
              curCards={secondColumn}
              setUpdated={setCardUpd}
              updated={cardUpd}
              columnid={secondColumnid}
              otherColumn={firstColumnid}
              setColumn={setSecondCol}
              columns={columns}
              {...props}
            />
          </Col>
        </DragDropContext>
      </Row>
    </div>
  );
}
