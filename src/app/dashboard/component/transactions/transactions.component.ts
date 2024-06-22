import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../service/transaction.service';
import { Transaction } from '../../../domain/transaction';

@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [
        CommonModule,
        FooterComponent,
        MatIconModule,
        MatButtonModule,
        NavbarDashboardActionComponent,
        MatTableModule
    ]
})
export class TransactionsComponent implements OnInit {
    private transactionService: TransactionService = inject(TransactionService);
    public displayedColumns?: string[];
    public transactions: Transaction[] = [];

    ngOnInit(): void {
        this.transactionService.findAllByUserId().subscribe({
            next: response => {
                this.transactions = response;

                this.transactions.sort((a, b) => {
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });
            }
        });
        this.displayedColumns = ['description', 'date', 'amount', 'category'];
    }
}