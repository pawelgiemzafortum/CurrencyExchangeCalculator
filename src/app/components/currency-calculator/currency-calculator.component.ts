import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, map, Observable, startWith } from 'rxjs';
import { Rate } from '../../services/currency-exchange.service';

@Component({
  selector: 'app-currency-calculator',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.scss'],
})
export class CurrencyCalculatorComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  @Input({ required: true }) rates!: Rate[];
  @Output() onDateChange = new EventEmitter<Date>();

  calcForm!: FormGroup;

  filteredFromOptions!: Observable<Rate[]>;

  filteredToOptions!: Observable<Rate[]>;

  result: number | null = null;

  private _filter(value: string = ''): Rate[] {
    const filterValue = value?.toLowerCase();

    return this.rates.filter((option) =>
      this.displayFn(option).toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.calcForm = this._fb.group({
      amount: [2],
      fromCurrency: [''],
      toCurrency: [''],
      date: [new Date()],
    });

    this.filteredFromOptions = this.calcForm.controls[
      'fromCurrency'
    ].valueChanges.pipe(
      startWith(''),
      filter((v) => typeof v === 'string'),
      map((value) => this._filter(value || ''))
    );

    this.filteredToOptions = this.calcForm.controls[
      'toCurrency'
    ].valueChanges.pipe(
      startWith(''),
      filter((v) => typeof v === 'string'),
      map((value) => this._filter(value || ''))
    );

    this.calcForm.valueChanges.subscribe(() => this.reset());
  }

  reset() {
    this.result = null;
  }

  displayFn(rate: Rate): string {
    return rate ? `${rate.code} - ${rate.currency}` : '';
  }

  convertCurrency(): void {
    this.result =
      (this.calcForm.controls['amount'].value *
        this.calcForm.controls['fromCurrency'].value!.mid) /
      this.calcForm.controls['toCurrency'].value!.mid;
  }
}
