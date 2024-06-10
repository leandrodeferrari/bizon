/* import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const TRANSACTIONS = [
    { position: 1, description: 'Compra ML', date: new Date(), amount: -15000.00 },
    { position: 2, description: 'Pago Servicio', date: new Date(), amount: 1200.00 },
    { position: 3, description: 'Recarga móvil', date: new Date(), amount: -2000.00 },
];

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [FooterComponent, MatIconModule, RouterModule, MatButtonModule, NavbarDashboardActionComponent, MatTableModule]
})
export class TransactionsComponent {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
}
 */

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatTableModule } from '@angular/material/table';

export interface Transaction {
    description: string;
    position: number;
    date: number;
    amount: string;
}

const TRANSACTIONS = [
    { position: 1, description: 'Compra ML', date: new Date(), amount: -15000.00 },
    { position: 2, description: 'Pago Servicio', date: new Date(), amount: 1200.00 },
    { position: 3, description: 'Recarga móvil', date: new Date(), amount: -2000.00 },
];

@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [FooterComponent, MatIconModule, RouterModule, MatButtonModule, NavbarDashboardActionComponent, MatTableModule]
})
export class TransactionsComponent {
    displayedColumns: string[] = ['position', 'description', 'date', 'amount'];
    dataSource = TRANSACTIONS;
}