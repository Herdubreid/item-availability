import { e1Reducer } from 'e1-service';

import { IAppState, initialAppState } from './state';
import { AppActions, ActionTypes } from './actions';
/**
 * Application Reducer
 */
export function appReducer(state = initialAppState, action: AppActions.AllActions): IAppState {
  switch (action.type) {
    case ActionTypes.REMOVE:
      return {
        ...state, ...{
          available: state.available.filter(r => r.item !== action.item),
          quantities: state.quantities.filter(r => r.item !== action.item)
        }
      }
    case ActionTypes.LEDGER:
      return {
        ...state, ...{
          ledger: [...action.ledger]
        }
      };
    case ActionTypes.AVAILABLE:
      return {
        ...state, ...{
          quantities: [...action.quantities]
        }
      };
    case ActionTypes.ADD_AVAILABLE:
      return {
        ...state, ...{
          available: [...state.available, ...action.items]
        }
      };
    case ActionTypes.ITEMS:
      return {
        ...state, ...{
          items: [...action.items]
        }
      };
    case ActionTypes.RESET:
      return initialAppState;
    default:
      return state;
  }
}
export const reducer = { app: appReducer, e1: e1Reducer };
