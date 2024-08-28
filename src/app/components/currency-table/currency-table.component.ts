import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Table } from '../../services/currency-exchange.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-currency-table',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DecimalPipe],
  templateUrl: './currency-table.component.html',
  styleUrl: './currency-table.component.scss',
})
export class CurrencyTableComponent {
  @Input({ required: true }) table!: Table | null;

  displayedColumns: string[] = ['name', 'code', 'rate'];
}
