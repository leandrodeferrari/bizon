import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [
        FooterComponent,
        MatIconModule,
        MatButtonModule,
        NavbarDashboardActionComponent,
        MatTableModule
    ]
})
export class TransactionsComponent implements OnInit {
    public displayedColumns?: string[];
    public transactions: any;

    ngOnInit(): void {
        this.transactions = TRANSACTIONS;
        this.displayedColumns = ['position', 'description', 'date', 'amount'];
    }
}

const TRANSACTIONS = [
    { position: 1, description: 'Compra ML', date: new Date(), amount: -15000.00 },
    { position: 2, description: 'Pago Servicio', date: new Date(), amount: 1200.00 },
    { position: 3, description: 'Recarga móvil', date: new Date(), amount: -2000.00 },
];