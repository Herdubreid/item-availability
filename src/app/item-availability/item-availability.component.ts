import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { IState, IItem, IQuantity } from '../store/state';
import { AppActions } from '../store/actions';

@Component({
  selector: 'app-item-availability',
  templateUrl: './item-availability.component.html',
  styleUrls: ['./item-availability.component.scss']
})
export class ItemAvailabilityComponent implements OnInit {
  available: Observable<IItem[]>;
  quantaties: Observable<IQuantity[]>;
  add() {
    this.router.navigate(['item-search']);
  }
  refresh(item: string) {
    this.store.dispatch(new AppActions.UpdateAvailableAction([item]));
   }
  remove(item: string) {
    this.store.dispatch(new AppActions.RemoveAction(item))
  }
  ngOnInit() {
  }
  constructor(
    private router: Router,
    private store: Store<IState>
  ) {
    this.available = store.select<IItem[]>(s => s.app.available);
    this.quantaties = store.select<IQuantity[]>(s => s.app.quantities);
  }
}
