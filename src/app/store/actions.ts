import { Action } from '@ngrx/store';

import { IItem, IQuantity, ILedger } from './state';

/**
 * Application Action
 */
export enum ActionTypes {
  REMOVE = 'REMOVE',
  LEDGER = 'LEDGER',
  AVAILABLE = 'AVAILABLE',
  UPDATE_AVAILABLE = 'UPDATE_AVAILABLE',
  ADD_AVAILABLE = 'ADD_AVAILABLE',
  ITEMS = 'ITEMS',
  RESET = 'APP_RESET'
}
export namespace AppActions {
  export class RemoveAction implements Action {
    readonly type = ActionTypes.REMOVE;
    constructor(public item: string) { }
  }
  export class LedgerAction implements Action {
    readonly type = ActionTypes.LEDGER;
    constructor(public ledger: ILedger[]) { }
  }
  export class AvailableAction implements Action {
    readonly type = ActionTypes.AVAILABLE;
    constructor(public quantities: IQuantity[]) { }
  }
  export class UpdateAvailableAction implements Action {
    readonly type = ActionTypes.UPDATE_AVAILABLE;
    constructor(public available: string[]) { }
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
    RemoveAction |
    LedgerAction |
    AvailableAction |
    UpdateAvailableAction |
    AddAvailableAction |
    ItemsAction |
    ResetAction;
}
