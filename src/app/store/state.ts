import { IServerState, initialServerState } from 'e1-service';

/**
 * Application State
 */
export interface IItem {
  select: boolean,
  text: string;
  item: string;
  desc: string;
  desc2: string;
  short: number | string;
}
export interface IAppState {
  items: IItem[];
}
export interface IState {
  app: IAppState;
  e1: IServerState;
}
export const initialAppState: IAppState = {
  items: []
};
export const initialState: IState = {
  app: initialAppState,
  e1: initialServerState
};
