import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { SignonService, IServiceCallback } from 'e1-service';

import { SignonPromptComponent } from './signon-prompt.component';

export interface IServiceCall {
    call(callback: IServiceCallback);
}

@Injectable()
export class E1HelperService {
    promptSignon(service: IServiceCall = null, callback: IServiceCallback = {}) {
        this.dlg.open(SignonPromptComponent, {
            disableClose: true,
            width: '250px'
        }).afterClosed().subscribe(() => {
            if (service) { service.call(callback); }
        });
    }
    autoSignon(service: IServiceCall, callback: IServiceCallback = {}) {
        if (this.signon.inCall) {
            return;
        }
        this.signon.authenticate({
            success: () => { service.call(callback); },
            error: () => { this.promptSignon(service, callback); }
        });
    }
    call(service: IServiceCall, callback: IServiceCallback = {}, cancel = {}) {
        const cb = Object.assign({}, callback, {
            error: msg => {
                console.log('Error:', msg);
                if (msg.status === 444) {
                    this.autoSignon(service, callback);
                } else {
                    if (callback.error) { callback.error(msg); }
                }
            }
        });
        if (this.signon.hasToken) {
            service.call(cb);
        } else {
            this.promptSignon(service, callback);
        }
    }
    constructor(
        public dlg: MatDialog,
        public store: Store<any>,
        public signon: SignonService,
    ) {
    }
}
