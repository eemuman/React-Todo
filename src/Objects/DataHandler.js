import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ThisModal from "../Objects/Modal";
import Column from "./Column";

export default class DataHandler extends Component {
  constructor(props) {
    super(props);
    this.createT = "Lisää tehtävä";
    this.Btn2 = "Tallenna";
    this.btn3 = "Peru";
    if (this.props.cards != null) {
      this.cards = this.props.cards;
    } else {
      this.cards = [];
    }
    this.id = this.props.curId;
  }

  deleteCard = (key) => {
    // eslint-disable-next-line eqeqeq
    var cardsDel = this.cards.filter((cards) => cards.key != key);
    this.cards = cardsDel;
    this.props.updCards(this.cards, this.id);
    this.forceUpdate();
  };

  createCard = (data) => {
    ++this.id;
    this.cards.push({
      id: this.id,
      dragId: this.id.toString(),
      key: this.id.toString(),
      title: data.title,
      text: data.text,
      removeCard: this.deleteCard,
    });
    this.props.updCards(this.cards, this.id);
    this.forceUpdate();
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOrder = Array.from(this.cards);
    newOrder.splice(source.index, 1);
    newOrder.splice(
      destination.index,
      0,
      this.cards.find((ele) => ele.dragId === draggableId)
    );
    newOrder.forEach((element) => {
      console.log(element);
    });
    this.cards = newOrder;
    this.props.updCards(this.cards, this.id);
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <div>
          <ThisModal
            data={this.state}
            upData={this.createCard}
            createT={this.createT}
            BtnStyle="primary"
            BtnSize="lg"
          />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Column cards={this.cards} delete={this.deleteCard} />
        </DragDropContext>
      </div>
    );
  }
}
