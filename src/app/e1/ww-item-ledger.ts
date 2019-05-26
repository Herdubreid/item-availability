import { FormRequest, IFormResponse, IForm, IFormData, IRow, IValue, INumber } from 'e1-service';

export const W4111A = 'P4111_W4111A';

export interface IWWItemLedgerRow extends IRow {
    mnDocumentNumber_6: INumber;
    sDocType_7: IValue;
    dtTransactionDate_8: IValue;
    sBranchPlant_9: IValue;
    mnQuantity_10: INumber;
    sTransUoM_11: IValue;
    mnUnitCost_12: INumber;
    mnExtendedCost_13: INumber;
    mnSupplier_155: INumber;
}

export interface IWWItemLedgerFormData extends IFormData<IWWItemLedgerRow> {
    txtItemNumber_17: IValue;
    txtUOMPrimaryUnitOfMeasure_67: IValue;
    txtBranchPlant_21: IValue;
    txtQuantityonHand_39: INumber;
}

export type IWWItemLedgerForm = IForm<IWWItemLedgerFormData>;

export interface IWWItemLedgerResponse extends IFormResponse {
    fs_P4111_W4111A: IWWItemLedgerForm;
}

export class WWItemLedgerRequest extends FormRequest {
    constructor(branch: string, item: string) {
        super();
        this.formName = 'P4111_W4111A';
        this.formServiceAction = 'R';
        this.maxPageSize = '1000';
        this.returnControlIDs = '17|67|21|39|1[6,7,8,9,10,11,12,13,155]';
        this.formInputs = [
            {
                id: '2',
                value: branch.padStart(12, ' ')
            },
            {
                id: '5',
                value: item
            }
        ]
    }
}
