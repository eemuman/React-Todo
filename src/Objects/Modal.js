import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import InForm from "./Form";

export default class ThisModal extends Component {
  constructor(props) {
    super(props);
    this.createT = props.createT;
    this.Btn2 = "Tallenna";
    this.Btn3 = "Peru";
    this.ThtLS = "Tehtävän lisätiedot";
    this.ThtOS = "Tehtävän Otsikko";

    this.state = {
      setShow: false,
      title: "",
      text: "",
    };
  }

  handleClose = () => this.setState({ setShow: false });
  handleShow = () => {
    this.flushState();
    this.setState({ setShow: true });
  };
  flushState = () => {
    this.props.data !== null
      ? this.setState({
          title: this.props.data.title,
          text: this.props.data.text,
        })
      : this.setState({
          title: "",
          text: "",
        });
  };
  handleTitle = (data) => this.setState({ title: data });
  handleText = (data) => this.setState({ text: data });

  render() {
    return (
      <>
        <Button
          variant={this.props.BtnStyle}
          size={this.props.BtnSize}
          onClick={this.handleShow}
          style={{ margin: "5px" }}
        >
          {this.createT}
        </Button>
        <Modal
          show={this.state.setShow}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.createT}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InForm
              ThtOS={this.ThtOS}
              ThtLS={this.ThtLS}
              title={this.state.title}
              text={this.state.text}
              onChangeTitle={this.handleTitle}
              onChangeText={this.handleText}
            ></InForm>
          </Modal.Body>
          <Modal.Footer justify-content-between={+true}>
            <Button
              variant="primary"
              onClick={() => {
                this.props.upData(this.state);
                this.handleClose();
              }}
            >
              {this.Btn2}
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              {this.Btn3}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
