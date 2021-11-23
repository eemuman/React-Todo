import { Routes, Route, HashRouter } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import OptionsPage from "./Pages/OptionsPage";
import MainPage from "./Pages/MainPage";
import Navbar from "./Objects/Navbar";
import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/custom.css";

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
      <>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  cards={this.mainCardArray}
                  updCards={this.updMainCardArray}
                  curId={this.state.id}
                />
              }
            />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Options" element={<OptionsPage />} />
          </Routes>
        </HashRouter>
      </>
    );
  }
}
