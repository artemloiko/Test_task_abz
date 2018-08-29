import style from "../scss/index.scss";
import React from "react";
import ReactDOM from "react-dom";

import clampAll from "./clamping";
import ServiceList from "./servises";
clampAll();

ReactDOM.render(<ServiceList />, document.getElementById("services"));
