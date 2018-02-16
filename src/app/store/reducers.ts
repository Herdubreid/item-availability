import { e1Reducer } from 'e1-service';

import { IAppState, initialAppState } from './state';
import { AppActions, ActionTypes } from './actions';
/**
 * Application Reducer
 */
export function appReducer(state = initialAppState, action: AppActions.AllActions): IAppState {
  switch (action.type) {
    /* TODO: Implement Actions */
    case ActionTypes.RESET:
      return initialAppState;
    default:
      return state;
  }
}
export const reducer = { app: appReducer, e1: e1Reducer };
