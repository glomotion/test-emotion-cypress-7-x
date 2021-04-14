import { put, takeLatest, call, spawn } from "redux-saga/effects";
import { initSuccess, initFailed, ActionTypes } from "./actions";
import axios from "axios";
import "../config.json";

export function* initSaga() {
  try {
    const response = yield call(axios.get, "/config.json");
    console.log("@@@@@@@@@", response);
    yield put(initSuccess({ ...response.data }));
  } catch (err) {
    yield put(initFailed({ err: "COULD NOT LOAD CONFIG.JSON" }));
    return;
  }
}

export function* initSuccessSaga() {
  // yield spawn(counterSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(ActionTypes.INIT, initSaga);
  yield takeLatest(ActionTypes.INIT_SUCCESS, initSuccessSaga);
}
