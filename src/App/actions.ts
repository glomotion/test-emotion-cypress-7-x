import { action } from 'typesafe-actions';

export enum ActionTypes {
  INIT = 'app/App/INIT',
  INIT_SUCCESS = 'app/App/INIT_SUCCESS',
  INIT_FAILED = 'app/App/INIT_FAILED',
}

export const init = () => action(ActionTypes.INIT);

export const initSuccess = (data: any) =>
  action(ActionTypes.INIT_SUCCESS, data);

export const initFailed = (error: object) =>
  action(ActionTypes.INIT_FAILED, error);
