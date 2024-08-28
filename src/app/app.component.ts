import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, mergeMap, Observable } from 'rxjs';
import { CurrencyCalculatorComponent } from './components/currency-calculator/currency-calculator.component';
import { CurrencyTableComponent } from './components/currency-table/currency-table.component';
import {
  CurrencyExchangeService,
  Table,
} from './services/currency-exchange.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyCalculatorComponent,
    CurrencyTableComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  date$ = new BehaviorSubject(new Date());
  table$: Observable<Table> = this.date$
    .asObservable()
    .pipe(mergeMap((d) => this.currencyExchangeService.getExchangeTable(d)));

  constructor(private currencyExchangeService: CurrencyExchangeService) {}
}
