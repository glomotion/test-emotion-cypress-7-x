import { put, takeLatest, call, spawn } from "redux-saga/effects";
import {
  initSuccess,
  initFailed,
  ActionTypes,
  loadSomeDataSuccess,
} from "./actions";
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

export function* loadSomeDataSaga() {
  try {
    const response = yield call(
      axios.get,
      "https://api.dev.x.immutable.com/v1/collections"
    );
    yield put(loadSomeDataSuccess(response.data.result));
  } catch (err) {
    console.error(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(ActionTypes.INIT, initSaga);
  yield takeLatest(ActionTypes.INIT_SUCCESS, initSuccessSaga);
  yield takeLatest(ActionTypes.LOAD_SOME_DATA, loadSomeDataSaga);
}
