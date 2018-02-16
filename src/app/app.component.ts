import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { SignonService, StatusTypes } from 'e1-service';

import { environment } from '../environments/environment';
import { IState } from './store/state';
import { AppActions } from './store/actions';
import { SignonPromptComponent } from './e1/signon-prompt.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: Observable<string>;
  username: Observable<string>;
  environment: Observable<string>;
  signout() {
    this.store.dispatch(new AppActions.ResetAction());
  }
  ngOnInit() { }
  constructor(
    private store: Store<IState>,
    dlg: MatDialog,
    signon: SignonService
  ) {
    signon.baseUrl = environment.aisUrl;
    this.status = store.select<string>(s => s.e1.status);
    this.username = store.select<string>(s => s.e1.authResponse ? s.e1.authResponse.userInfo.alphaName : null);
    this.environment = store.select<string>(s => s.e1.authResponse ? s.e1.authResponse.environment : null);
    this.status
      .pipe(
        filter(status => status === StatusTypes.STATUS_OFF)
      ).subscribe(_ => {
        dlg.open(SignonPromptComponent, {
          disableClose: true,
          width: '250px'
        });
      });
  }
}
