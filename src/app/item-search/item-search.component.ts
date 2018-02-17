import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormService } from 'e1-service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { E1HelperService } from '../e1/helper';
import { IState, IItem } from '../store/state';
import { ItemSSRequest } from '../e1/item-ss';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  subscr: Subscription;
  status: Observable<string>;
  item: string;
  text: string;
  items: Observable<IItem[]>;
  itemList = new MatTableDataSource();
  displayColumns = [
    'select',
    'text',
    'item',
    'desc',
    'desc2',
    'short'
  ];
  search() {
    this.form.request = new ItemSSRequest(this.text, this.item);
    this.e1.call(this.form);
  }
  done() {/* TODO: Item availability request for selected items */}
  ngOnInit() {
    this.itemList.sort = this.sort;
    this.subscr = this.items.subscribe(items => this.itemList.data = items);
  }
  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
  constructor(
    store: Store<IState>,
    private form: FormService,
    private e1: E1HelperService
  ) {
    this.status = store.select<string>(s => s.e1.status);
    this.items = store.select<IItem[]>(s => s.app.items);
  }
}
