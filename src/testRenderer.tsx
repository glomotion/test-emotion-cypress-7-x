import React from "react";
import { cy } from "local-cypress";
import { mount } from "@cypress/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { init } from "./App/actions";
import configureStore from "./configureStore";

type RenderCyComponentProps = {
  withState: any;
  children: JSX.Element;
  initRootSaga?: boolean;
};

export const renderCyComponent = ({
  withState,
  children,
  initRootSaga,
}: RenderCyComponentProps) => {
  const store = configureStore(withState);
  cy.spy(store, "dispatch").as("dispatch");
  if (initRootSaga) {
    store.dispatch(init());
  }
  mount(
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return { store };
};
