import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../home/component/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { NavbarDashboardComponent } from "./component/navbar-dashboard/navbar-dashboard.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';
import { Transaction } from '../domain/transaction';
import { User } from '../domain/user';
import { UserService } from '../service/user.service';
import { TransactionService } from '../service/transaction.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent,
        NavbarDashboardComponent,
        MatCardModule,
        MatListModule
    ]
})
export class DashboardComponent implements OnInit {
    private userService: UserService = inject(UserService);
    private transactionService: TransactionService = inject(TransactionService);
    public dialog: MatDialog = inject(MatDialog);
    public isBalanceVisible: boolean = true;
    public name?: string;
    public balance: number = 0.00;
    public transactions?: Transaction[];
    public user?: User | undefined;

    toggleBalanceVisibility(): void {
        this.isBalanceVisible = !this.isBalanceVisible;
    }

    constructor() { }

    ngOnInit(): void {
        let email: string = localStorage.getItem('email') || '';

        this.userService.findByEmail(email).subscribe({
            next: response => {
                this.user = response;
                this.balance = this.user?.saldo || 0.00;
            },
            error: error => {
                console.log(error);
            }
        });

        this.transactionService.findAllByUserId().subscribe({
            next: response => {
                this.transactions = response;

                this.transactions.sort((a, b) => {
                    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
                });

                this.transactions = this.transactions.slice(0, 3);
            },
            error: error => {
                console.log(error);
            }
        });
    }

    openDialog() {
        this.dialog.open(DashboardDialogCvuComponent);
    }
}

@Component({
    selector: 'dashboard-dialog-cvu',
    templateUrl: './dashboard-dialog-cvu.component.html',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule
    ]
})
export class DashboardDialogCvuComponent {
    public cvu: string = localStorage.getItem('cvu') || '';
    public alias: string = localStorage.getItem('alias') || '';
}