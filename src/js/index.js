import style from "../scss/index.scss";
import React from "react";
import ReactDOM from "react-dom";

import { clampAll } from "./components/modules/clamp";
import Services from "./components/Services";

clampAll();
ReactDOM.render(<Services />, document.getElementById("services"));
