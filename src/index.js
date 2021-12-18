import React from "react";
import ReactDOM from "react-dom";
import TimeAgo from "javascript-time-ago";
import App from "./App";
import fi from "javascript-time-ago/locale/fi.json";

TimeAgo.addDefaultLocale(fi);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
