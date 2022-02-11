import React from "react";
// import reactDom from "react-dom";
import { ReactDOM } from "react-dom";

import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  document.getElementById("root")
);
