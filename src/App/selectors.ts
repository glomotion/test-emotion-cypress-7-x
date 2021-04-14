import { createSelector } from "reselect";
import { initialState } from "./reducer";

export const selectApp = (state: any) => state.app || initialState;

export const makeSelectInitialized = () =>
  createSelector(selectApp, (globalState) => globalState.initialized);

export const makeSelectConfig = () =>
  createSelector(selectApp, (globalState) => globalState.config);

export const makeSelectFlags = () =>
  createSelector(selectApp, (globalState) => globalState.config.flags);

export const makeSelectCollections = () =>
  createSelector(selectApp, (globalState) => globalState.collections);
