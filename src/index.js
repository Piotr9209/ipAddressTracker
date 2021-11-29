import React from "react";
import ReactDOM from "react-dom";
import { LogicAddressTracker } from "./components/logicAddressTracker/LogicAddressTracker";
import { Provider } from "react-redux";
import store from "./features/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LogicAddressTracker />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
