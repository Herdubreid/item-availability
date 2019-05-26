import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { BatchformService, E1Actions, E1ActionTypes, E1ServiceModule, BatchformRequest } from 'e1-service';
import { of as OfObservable } from 'rxjs/observable/of';
import { empty as EmptyObservable } from 'rxjs/observable/empty';
import { tap, map, filter, withLatestFrom, switchMap } from 'rxjs/operators';

import { E1HelperService } from '../e1/helper';
import { IState, IQuantity, ILedger } from '../store/state';
import { AppActions, ActionTypes } from '../store/actions';
import { IItemSSResponse, W40ITM1A } from '../e1/item-ss';
import { WWItemAvailabilityRequest, W41202A, IWWItemAvailabilityForm, IWWItemAvailabilityRow } from '../e1/ww-item-availability';
import { WWItemLedgerRequest, W4111A, IWWItemLedgerForm } from '../e1/ww-item-ledger';

/**
 * E1 Effects Service
 */

@Injectable()
export class E1EffectsService {
    @Effect()
    reset$ = this.actions$.pipe(ofType<AppActions.ResetAction>(ActionTypes.RESET))
        .pipe(
            switchMap(() => OfObservable(new E1Actions.ResetAction('sign-out')))
        );
    @Effect()
    items$ = this.actions$.pipe(ofType<E1Actions.FormResponseAction>(E1ActionTypes.FORM_RESPONSE))
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
    addAvailable$ = this.actions$.pipe(ofType<AppActions.AddAvailableAction>(ActionTypes.ADD_AVAILABLE))
        .pipe(
            map(action => action.items),
            switchMap(items => OfObservable(new AppActions.UpdateAvailableAction(items.map(r => r.item))))
        );
    @Effect({ dispatch: false })
    updateAvailable$ = this.actions$.pipe(ofType<AppActions.UpdateAvailableAction>(ActionTypes.UPDATE_AVAILABLE))
        .pipe(
            map(action => action.available),
            tap(available => {
                if (available.length > 0) {
                    const availableRq = new BatchformRequest();
                    availableRq.formRequests = available.map(r => new WWItemAvailabilityRequest(r));
                    this.batch.request = availableRq;
                    this.e1.call(this.batch);
                }
            })
        );
    @Effect()
    itemAvailability$ = this.actions$.pipe(ofType<E1Actions.BatchformResponseAction>(E1ActionTypes.BATCHFORM_RESPONSE))
        .pipe(
            map(action => action.payload.batchformResponse),
            filter(bf => bf[`fs_0_${W41202A}`]),
            withLatestFrom(this.store),
            switchMap(([bf, store]) => {
                const qt: IQuantity[] = [];
                for (let i = 0; bf[`fs_${i}_${W41202A}`]; i++) {
                    const form: IWWItemAvailabilityForm = bf[`fs_${i}_${W41202A}`];
                    const total: IQuantity = {
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
                const existing = qt.map(r => r.item);
                qt.push(...store.app.quantities.filter(r => !existing.includes(r.item)));
                return qt.length > 0 ? OfObservable(new AppActions.AvailableAction(qt)) : EmptyObservable();
            })
        );
    @Effect({ dispatch: false })
    updateLedger$ = this.actions$.pipe(ofType<AppActions.AvailableAction>(ActionTypes.AVAILABLE))
        .pipe(
            map(action => action.quantities),
            tap(qt => {
                const ledgerRq = new BatchformRequest();
                ledgerRq.formRequests = qt
                    .filter(r => r.branch !== 'TOTAL')
                    .map(r => new WWItemLedgerRequest(r.branch, r.item));
                this.batch.request = ledgerRq;
                this.e1.call(this.batch);
            })
        );
    @Effect()
    itemLedger$ = this.actions$.pipe(ofType<E1Actions.BatchformResponseAction>(E1ActionTypes.BATCHFORM_RESPONSE))
        .pipe(
            map(action => action.payload.batchformResponse),
            filter(bf => bf[`fs_0_${W4111A}`]),
            withLatestFrom(this.store),
            switchMap(([bf, store]) => {
                const ledger: ILedger[] = [];
                for (let i = 0; bf[`fs_${i}_${W4111A}`]; i++) {
                    const form: IWWItemLedgerForm = bf[`fs_${i}_${W4111A}`];
                    ledger.push(...form.data.gridData.rowset.map<ILedger>(r => {
                        return {
                            item: form.data.txtItemNumber_17.value,
                            branch: r.sBranchPlant_9.value,
                            transaction: new Date(parseInt(r.dtTransactionDate_8.internalValue)),
                            quantity: r.mnQuantity_10.internalValue
                        }
                    }));
                }
                const existing = ledger.map(r => r.item);
                ledger.push(...store.app.ledger.filter(r => !existing.includes(r.item)));
                return OfObservable(new AppActions.LedgerAction(ledger));
            })
        );
    constructor(
        private actions$: Actions,
        private store: Store<IState>,
        private batch: BatchformService,
        private e1: E1HelperService
    ) { }
}
