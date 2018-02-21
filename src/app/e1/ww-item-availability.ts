import { FormRequest, IFormResponse, IForm, IFormData, IRow, IValue, INumber } from 'e1-service';

export const W41202A = 'P41202_W41202A';

export interface IWWItemAvailabilityRow extends IRow {
    chPS_12: IValue;
    sLocation_62: IValue;
    sBranchPlant_9: IValue;
    mnOnHand_13: INumber;
    mnCommitted_48: INumber
    mnAvailable_47: INumber;
    mnOnReceipt_49: INumber;
    chLotStatusCode_32: IValue;
    dtLastRcptDate_276: IValue;
    sLotSerial_11: IValue;
}

export interface IWWItemAvailabilityFormData extends IFormData<IWWItemAvailabilityRow> {
    txtItemNumber_17: IValue;
    txtUnitOfMeasure_19: IValue;
    lblDL01_162: IValue;
    chkSummaryOnly_30: IValue;
}

export type IWWItemAvailabilityForm = IForm<IWWItemAvailabilityFormData>;

export interface IWWItemAvailabilityResponse extends IFormResponse {
    fs_P41202_W41202A: IWWItemAvailabilityForm;
}

export class WWItemAvailabilityRequest extends FormRequest {
    constructor(item: string) {
        super();
        this.formName = 'P41202_W41202A';
        this.formServiceAction = 'R';
        this.maxPageSize = '1000';
        this.returnControlIDs = '17|19|162|30|319[12,62,9,13,48,47,49,32,276,11]';
        this.formActions = [
            {
                controlID: '30',
                command: 'SetCheckboxValue',
                value: 'on'
            },
            {
                controlID: '17',
                command: 'SetControlValue',
                value: item
            },
            {
                controlID: '14',
                command: 'DoAction'
            }
        ];
    }
}
