import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";
import DataHandler from "./Objects/DataHandler";

export default function App() {
  return <DataHandler />;
}

/*
export default class App extends Component {
  constructor(props) {
    super(props);
    this.mainCardArray = [];
    this.state = {
      id: this.mainCardArray.length,
    };
  }

  updMainCardArray = (updtCards, curId) => {
    if (updtCards != null) this.mainCardArray = updtCards;
    this.setState({ id: curId });
  };

  render() {
    return (

    );
  }
}
*/
