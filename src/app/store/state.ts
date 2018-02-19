import { IServerState, initialServerState } from 'e1-service';

/**
 * Application State
 */
export interface IItem {
  select: boolean;
  existing: boolean;
  text: string;
  item: string;
  desc: string;
  desc2: string;
  short: number;
}
export interface IQuantity {
  item: string;
  branch: string;
  uom: string;
  available: number;
  commited: number;
  onReceipt: number;
}
export interface IAppState {
  items: IItem[];
  available: IItem[];
  quantities: IQuantity[];
}
export interface IState {
  app: IAppState;
  e1: IServerState;
}
export const initialAppState: IAppState = {
  items: [],
  available: [],
  quantities: []
};
export const initialState: IState = {
  app: initialAppState,
  e1: initialServerState
};
