import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export type Rate = {
  currency: string;
  code: string;
  mid: number;
};

export type Table = {
  table: string;
  no: string;
  effectiveDate: string;
  rates: Rate[];
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyExchangeService {
  private baseUrl = 'https://api.nbp.pl/api/';

  constructor(private http: HttpClient) {}

  getExchangeTable(date: Date = new Date()): Observable<Table> {
    return this.http
      .get<Table[]>(
        `${this.baseUrl}exchangerates/tables/a/${formatDate(
          date,
          'yyyy-MM-dd',
          'en'
        )}`
      )
      .pipe(map((result) => result[0]));
  }

  getExchangeRates(): Observable<Rate[]> {
    return this.getExchangeTable().pipe(map((t) => t.rates));
  }
}
