import React from "react";
import ReactDOM from "react-dom";

import NotFoundPage from "./NotFoundPage";

const MOUNT_NODE = document.getElementById("app") as HTMLElement;

const render = async () => {
  ReactDOM.render(<NotFoundPage />, MOUNT_NODE);
};

render();
