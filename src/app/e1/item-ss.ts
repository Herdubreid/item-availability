import { FormRequest, IFormResponse, IForm, IFormData, IRow, IValue } from 'e1-service';

import { INumber } from './number';

export const W40ITM1A = 'fs_P40ITM1_W40ITM1A';

export interface IItemSSRow extends IRow {
    sItemMasterSearchText_56: IValue;
    sItemNumber_50: IValue;
    sItemMasterDescription_28: IValue;
    sItemMasterDescriptionLine2_30: IValue;
    mnShortItemNo_23: INumber;
}

export interface IItemSSFormData extends IFormData<IItemSSRow> {
}

export type IItemSSForm = IForm<IItemSSFormData>;

export interface IItemSSResponse extends IFormResponse {
    fs_P40ITM1_W40ITM1A: IItemSSForm;
}

export class ItemSSRequest extends FormRequest {
    constructor(text: string, item: string) {
        super();
        this.formName = 'P40ITM1_W40ITM1A';
        this.formServiceAction = 'R';
        this.maxPageSize = '1000';
        this.returnControlIDs = '1[56,50,28,30,23]';
        this.formActions = [
            {
                controlID: '13',
                command: 'DoAction'
            }
        ];
        if (text || item) {
            this.query = {
                condition: [],
                autoFind: true,
                matchType: 'MATCH_ALL',
                autoClear: true,
            };
            if (text) {
                this.query.condition.push({
                    value: [
                        {
                            content: text,
                            specialValueId: 'LITERAL'
                        }
                    ],
                    controlId: '1[56]',
                    operator: 'STR_START_WITH'
                });
            }
            if (item) {
                this.query.condition.push({
                    value: [
                        {
                            content: item,
                            specialValueId: 'LITERAL'
                        }
                    ],
                    controlId: '1[50]',
                    operator: 'STR_START_WITH'
                });
            }
        }
    }
}
