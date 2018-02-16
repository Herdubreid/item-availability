import { IServerState, initialServerState } from 'e1-service';
/**
 * Application State
 */
export interface IAppState {
  /* TODO: Application State */
}
export interface IState {
  app: IAppState;
  e1: IServerState;
}
export const initialAppState: IAppState = {
  /* TODO: Initial Setting */
};
export const initialState: IState = {
  app: initialAppState,
  e1: initialServerState
};
