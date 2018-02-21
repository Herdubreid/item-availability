import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IState, ILedger } from '../store/state';

@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.component.html',
  styleUrls: ['./item-ledger.component.scss']
})
export class ItemLedgerComponent implements OnInit {
  @Input() item: string;
  ledger: Observable<ILedger[]>
  ngOnInit() {
  }
  constructor(
    store: Store<IState>
  ) {
    this.ledger = store.select<ILedger[]>(s => s.app.ledger);
  }
}
