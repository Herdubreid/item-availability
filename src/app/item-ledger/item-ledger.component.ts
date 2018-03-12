import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter, combineLatest } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import * as d3 from 'd3';
import * as moment from 'moment-mini-ts';

import { IState, ILedger } from '../store/state';

@Component({
  selector: 'app-item-ledger',
  templateUrl: './item-ledger.component.html',
  styleUrls: ['./item-ledger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemLedgerComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() item: string;
  @Input() tab: Subject<any>;
  ledger: Observable<ILedger[]>;
  subscr: Subscription[] = [];
  ngOnInit() {
  }
  ngAfterViewInit() {
    const margin = { top: 10, right: 0, bottom: 5, left: 50 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    this.subscr.push(this.ledger
      .pipe(
        combineLatest(this.tab),
        filter(([l ,i]) => i.page === 1 && i.item === this.item)
      )
      .subscribe(([l, i]) => {
        const data = l
          .filter(r => r.item === this.item)
          .sort((a, b) => new Date(a.transaction).getTime() > new Date(b.transaction).getTime() ? -1 : 1)
          .reduce((ac, next) => {
            const days = Math.abs(moment(next.transaction).diff(moment.now(), 'days'));
            const i = ac.find(r => r.days === days);
            i ? i.delta += next.quantity : ac.push({ days, delta: next.quantity });
            return ac;
          }, []);
        data.reduce((bal, next) => {
          next.balance = bal;
          return bal += next.delta;
        }, 0);

        d3.select(`.chart-${this.item} svg`).remove();

        const svg = d3.select(`.chart-${this.item}`)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

        const x = d3.scaleLinear()
          .domain(d3.extent(data, d => d.days))
          .rangeRound([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain(d3.extent(data, d => d.balance))
          .range([height - margin.bottom, margin.top]);

        const line = d3.line<{ days; balance }>()
          .curve(d3.curveStepAfter)
          .x(d => x(d.days))
          .y(d => y(d.balance));

        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 2)
          .attr('d', line);

        svg.append('g')
          .attr('transform', `translate(0,${y(0)})`)
          .call(d3.axisBottom(x));

        svg.append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y));
      }));
  }
  ngOnDestroy() {
    this.subscr.forEach(s => s.unsubscribe());
  }
  constructor(
    store: Store<IState>
  ) {
    this.ledger = store.select<ILedger[]>(s => s.app.ledger)
      .pipe(
        filter(l => l.filter(r => r.item === this.item).length > 0)
      );
  }
}
