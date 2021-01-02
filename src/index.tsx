// Imports
import React         from "react";
import ReactDOM      from "react-dom";
import {Provider}    from "react-redux";
import {createStore} from "redux";

import {App}         from "./components/App";
import {reducers}    from "./redux/reducers";

import "./index.css";

// Store
const store = createStore(reducers);

// Chess Root
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
