import { Action } from '@ngrx/store';

import { IItem } from './state';

/**
 * Application Action
 */
export enum ActionTypes {
  ITEMS = 'ITEMS',
  RESET = 'APP_RESET'
}
export namespace AppActions {
  export class ResetAction implements Action {
    readonly type = ActionTypes.RESET;
  }
  export class ItemsAction implements Action {
    readonly type = ActionTypes.ITEMS;
    constructor(public items: IItem[]) { }
  }
  export type AllActions =
    ResetAction |
    ItemsAction;
}
