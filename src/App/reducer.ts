/*
 *
 * App reducer
 *
 */

import produce, { Draft } from "immer";
import { ContainerState, ContainerActions } from "./types";
import { Reducer } from "react";
import { ActionTypes } from "./actions";

export const initialState: ContainerState = {
  default: null,
  initialized: false,
  loading: false,
  config: {
    apiUrl: "",
    apiVersion: "",
    linkUrl: "",
    flags: {},
  },
};

const appReducer: Reducer<ContainerState, ContainerActions> = (
  state: ContainerState = initialState,
  action: ContainerActions
) =>
  produce(state, (draft: Draft<ContainerState>) => {
    switch (action.type) {
      case ActionTypes.INIT:
        draft.loading = true;
        break;

      case ActionTypes.INIT_SUCCESS:
        draft.loading = false;
        draft.initialized = true;
        draft.config.apiUrl = action.payload.API_URL;
        draft.config.apiVersion = action.payload.API_VERSION;
        draft.config.linkUrl = action.payload.LINK_URL;
        draft.config.flags = action.payload.flags;
        break;

      case ActionTypes.INIT_FAILED:
        draft.loading = false;
        draft.initialized = false;
        draft.config.apiUrl = "INIT FAILED";
        draft.config.apiVersion = "INIT FAILED";
        draft.config.linkUrl = "INIT FAILED";
        break;

      default:
        break;
    }
  });

export default appReducer;
