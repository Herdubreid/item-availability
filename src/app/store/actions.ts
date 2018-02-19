import { Action } from '@ngrx/store';

import { IItem, IQuantity } from './state';

/**
 * Application Action
 */
export enum ActionTypes {
  AVAILABLE = 'AVAILABLE',
  UPDATE_AVAILABLE = 'UPDATE_AVAILABLE',
  ADD_AVAILABLE = 'ADD_AVAILABLE',
  ITEMS = 'ITEMS',
  RESET = 'APP_RESET'
}
export namespace AppActions {
  export class AvailableAction implements Action {
    readonly type = ActionTypes.AVAILABLE;
    constructor(public quantities: IQuantity[]) { }
  }
  export class UpdateAvailableAction implements Action {
    readonly type = ActionTypes.UPDATE_AVAILABLE;
    constructor(public available: IItem[]) { }
  }
  export class AddAvailableAction implements Action {
    readonly type = ActionTypes.ADD_AVAILABLE;
    constructor(public items: IItem[]) { }
  }
  export class ItemsAction implements Action {
    readonly type = ActionTypes.ITEMS;
    constructor(public items: IItem[]) { }
  }
  export class ResetAction implements Action {
    readonly type = ActionTypes.RESET;
  }
  export type AllActions =
    AvailableAction |
    UpdateAvailableAction |
    AddAvailableAction |
    ItemsAction |
    ResetAction;
}
