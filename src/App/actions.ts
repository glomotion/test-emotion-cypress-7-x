import { action } from "typesafe-actions";

export enum ActionTypes {
  INIT = "app/App/INIT",
  INIT_SUCCESS = "app/App/INIT_SUCCESS",
  INIT_FAILED = "app/App/INIT_FAILED",
  LOAD_SOME_DATA = "app/App/LOAD_SOME_DATA",
  LOAD_SOME_DATA_SUCCESS = "app/App/LOAD_SOME_DATA_SUCCESS",
}

export const init = () => action(ActionTypes.INIT);

export const initSuccess = (data: any) =>
  action(ActionTypes.INIT_SUCCESS, data);

export const initFailed = (error: object) =>
  action(ActionTypes.INIT_FAILED, error);

export const loadSomeData = () => action(ActionTypes.LOAD_SOME_DATA);

export const loadSomeDataSuccess = (data: any) =>
  action(ActionTypes.LOAD_SOME_DATA_SUCCESS, data);
