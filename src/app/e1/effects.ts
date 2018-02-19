import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { BatchformService, E1Actions, E1ActionTypes, E1ServiceModule, BatchformRequest } from 'e1-service';
import { of as OfObservable } from 'rxjs/observable/of';
import { empty as EmptyObservable } from 'rxjs/observable/empty';
import { tap, map, filter, withLatestFrom, switchMap } from 'rxjs/operators';

import { E1HelperService } from '../e1/helper';
import { IState, IQuantity } from '../store/state';
import { AppActions, ActionTypes } from '../store/actions';
import { IItemSSResponse, W40ITM1A } from '../e1/item-ss';
import { WWItemAvailabilityRequest, W41202A, IWWItemAvailabilityForm } from '../e1/ww-item-availability';

/**
 * E1 Effects Service
 */

@Injectable()
export class E1EffectsService {
    @Effect()
    reset$ = this.actions$.ofType<AppActions.ResetAction>(ActionTypes.RESET)
        .pipe(
            switchMap(() => OfObservable(new E1Actions.ResetAction('sign-out')))
        );
    @Effect()
    items$ = this.actions$.ofType<E1Actions.FormResponseAction>(E1ActionTypes.FORM_RESPONSE)
        .pipe(
            map(action => action.payload.formResponse),
            filter(formResponse => formResponse[W40ITM1A]),
            withLatestFrom(this.store),
            switchMap(([form, store]) => {
                const existing = store.app.available.map(r => r.item);
                return OfObservable(new AppActions.ItemsAction(
                    (<IItemSSResponse>form).fs_P40ITM1_W40ITM1A.data.gridData.rowset.map(r => {
                        const select = existing.includes(r.sItemNumber_50.value);
                        return {
                            select,
                            existing: select,
                            text: r.sItemMasterSearchText_56.value,
                            item: r.sItemNumber_50.value,
                            desc: r.sItemMasterDescription_28.value,
                            desc2: r.sItemMasterDescriptionLine2_30.value,
                            short: r.mnShortItemNo_23.internalValue
                        }
                    })
                ));
            })
        );
    @Effect()
    addAvailable$ = this.actions$.ofType<AppActions.AddAvailableAction>(ActionTypes.ADD_AVAILABLE)
        .pipe(
            map(action => action.items),
            switchMap(items => OfObservable(new AppActions.UpdateAvailableAction(items)))
        );
    @Effect({ dispatch: false })
    updateAvailable$ = this.actions$.ofType<AppActions.UpdateAvailableAction>(ActionTypes.UPDATE_AVAILABLE)
        .pipe(
            map(action => action.available),
            tap(available => {
                if (available.length > 0) {
                    const request = new BatchformRequest();
                    request.formRequests = available.map(r => new WWItemAvailabilityRequest(r.item));
                    this.batch.request = request;
                    this.e1.call(this.batch);
                }
            })
        );
    @Effect()
    itemAvailability$ = this.actions$.ofType<E1Actions.BatchformResponseAction>(E1ActionTypes.BATCHFORM_RESPONSE)
        .pipe(
            map(action => action.payload.batchformResponse),
            withLatestFrom(this.store),
            switchMap(([bf, store]) => {
                const qt: IQuantity[] = [];
                for (let i = 0; bf[`fs_${i}_${W41202A}`]; i++) {
                    const form: IWWItemAvailabilityForm = bf[`fs_${i}_${W41202A}`];
                    const total:IQuantity = {
                        item: form.data.txtItemNumber_17.value,
                        branch: 'TOTAL',
                        uom: form.data.txtUnitOfMeasure_19.value,
                        available: 0,
                        commited: 0,
                        onReceipt: 0
                    };
                    qt.push(...form.data.gridData.rowset.map<IQuantity>(r => {
                        total.available += r.mnAvailable_47.internalValue;
                        total.commited += r.mnCommitted_48.internalValue;
                        total.onReceipt += r.mnOnReceipt_49.internalValue;
                        return {
                            item: form.data.txtItemNumber_17.value,
                            branch: r.sBranchPlant_9.value,
                            uom: form.data.txtUnitOfMeasure_19.value,
                            available: r.mnAvailable_47.internalValue,
                            commited: r.mnCommitted_48.internalValue,
                            onReceipt: r.mnOnReceipt_49.internalValue
                        }
                    }));
                    qt.push(total);
                };
                const existing = qt.map(ar => ar.item);
                qt.push(...store.app.quantities.filter(sr => !existing.includes(sr.item)));
                return qt.length > 0 ? OfObservable(new AppActions.AvailableAction(qt)) : EmptyObservable();
            })
        );
    constructor(
        private actions$: Actions,
        private store: Store<IState>,
        private batch: BatchformService,
        private e1: E1HelperService
    ) { }
}
