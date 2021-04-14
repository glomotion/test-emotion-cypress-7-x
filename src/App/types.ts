import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

interface AppState {
  readonly default: any;
  readonly loading: boolean;
  readonly initialized: boolean;
  readonly config: AppConfig;
}

/* --- STATE --- */
export interface AppConfig {
  apiUrl: string;
  apiVersion: string;
  linkUrl: string;
  flags: object;
}

/* --- EXPORTS --- */
export type ContainerState = AppState;
export type ContainerActions = AppActions;
