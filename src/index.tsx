import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "./configureStore";
import App from "./App";
import { init } from "./App/actions";

const MOUNT_NODE = document.getElementById("app") as HTMLElement;
const store = configureStore({});

const render = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE
  );
};

render();
store.dispatch(init());
