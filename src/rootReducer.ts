import { combineReducers } from "redux";
import appReducer from "./App/reducer";

export function createRootReducer() {
  return combineReducers({
    app: appReducer,
  });
}
