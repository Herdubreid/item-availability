import { Action } from '@ngrx/store';
/**
 * Application Action
 */
export enum ActionTypes {
  RESET = 'APP_RESET'
}
export namespace AppActions {
  export class ResetAction implements Action {
    readonly type = ActionTypes.RESET;
  }
  /* TODO: Application Actions */
  export type AllActions =
    ResetAction;
}
