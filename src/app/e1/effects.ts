import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { E1Actions, E1ActionTypes } from 'e1-service';
import { of as ObservableOf } from 'rxjs/observable/of';
import { tap, map, filter, switchMap } from 'rxjs/operators';

import { AppActions, ActionTypes } from '../store/actions';
import { IItemSSResponse, W40ITM1A } from '../e1/item-ss';

/**
 * E1 Effects Service
 */

@Injectable()
export class E1EffectsService {
    @Effect()
    reset$ = this.actions$.ofType<AppActions.ResetAction>(ActionTypes.RESET)
        .pipe(
            switchMap(() => ObservableOf(new E1Actions.ResetAction('sign-out')))
        );
    @Effect()
    items$ = this.actions$.ofType<E1Actions.FormResponseAction>(E1ActionTypes.FORM_RESPONSE)
        .pipe(
            map(action => action.payload.formResponse),
            filter(formResponse => formResponse[W40ITM1A]),
            switchMap((form: IItemSSResponse) => ObservableOf(new AppActions.ItemsAction(
                form.fs_P40ITM1_W40ITM1A.data.gridData.rowset.map(r => {
                    return {
                        select: false,
                        text: r.sItemMasterSearchText_56.value,
                        item: r.sItemNumber_50.value,
                        desc: r.sItemMasterDescription_28.value,
                        desc2: r.sItemMasterDescriptionLine2_30.value,
                        short: r.mnShortItemNo_23.internalValue
                    }
                })
            )))
        );
    constructor(
        private actions$: Actions
    ) { }
}
