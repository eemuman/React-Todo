import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";
import Cards from "./Card";
import CardCompleted from "./CardCompleted";
import ColumnChooser from "./ColumnChooser";
import {
  fetchCards,
  getColumns,
  deleteCards,
  setCompleted,
  updCard,
} from "./DataHandler";

export default function Column(props) {
  const [columns, setColumns] = useState([]);
  const [curCards, setCards] = useState([]);

  const deleteCard = async (id) => {
    await deleteCards(id);
    props.setUpdated(id);
  };

  const setCardCompleted = async (id) => {
    await setCompleted(id);
    props.setUpdated(id);
  };

  const updateCard = async (id, ...newData) => {
    await updCard(id, ...newData);
    props.setUpdated(newData);
  };

  useEffect(() => {
    async function fetchColCards() {
      try {
        setColumns(await getColumns());
        let curCards = await fetchCards(props.columnid);
        setCards([...curCards]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchColCards();
  }, [props.columnid, props.updated]);

  if (props.columnid === 1) {
    return (
      <Card style={{ textAlign: "center" }}>
        <Card.Header as="h4">
          <ColumnChooser
            columnid={props.columnid}
            setColumn={props.setColumn}
            columns={columns}
          />
        </Card.Header>
        <Card.Body>
          {curCards.map((kortti) => (
            <CardCompleted
              key={kortti.id.toString()}
              {...kortti}
              delete={deleteCard}
              updated={props.updated}
            />
          ))}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Droppable droppableId={columns[props.columnid]}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <Card style={{ textAlign: "center" }}>
            <Card.Header as="h4">
              <ColumnChooser
                columnid={props.columnid}
                setColumn={props.setColumn}
                columns={columns}
              />
            </Card.Header>
            <Card.Body>
              {curCards.map((kortti, index) => (
                <Cards
                  key={kortti.id.toString()}
                  index={index}
                  {...kortti}
                  delete={deleteCard}
                  setCompleted={setCardCompleted}
                  upCard={updateCard}
                  updated={props.updated}
                />
              ))}

              {provided.placeholder}
            </Card.Body>
          </Card>
        </div>
      )}
    </Droppable>
  );
}
