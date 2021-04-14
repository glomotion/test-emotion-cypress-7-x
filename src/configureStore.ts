/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { merge } from "lodash";

import { createRootReducer } from "./rootReducer";
import rootSaga from "./App/saga";

export default function configureStore(withState: any = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers = composeWithDevTools({
    shouldHotReload: false,
  });

  let enhancer;
  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  // TODO: Re-add the removal of redux devTools here
  if (process.env.NODE_ENV !== "productionxxx" && typeof window === "object") {
    enhancer = composeEnhancers(...enhancers);
    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
  } else {
    enhancer = compose(...enhancers);
  }

  const initialState = {} as any;
  const startingState = merge(initialState, withState);
  const store = createStore(createRootReducer(), startingState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
