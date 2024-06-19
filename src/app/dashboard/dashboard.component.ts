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
    public dialog: MatDialog = inject(MatDialog);
    public isBalanceVisible: boolean = true;
    public name?: string;
    public balance?: number;
    public transactions?: Transaction[];

    toggleBalanceVisibility(): void {
        this.isBalanceVisible = !this.isBalanceVisible;
    }

    constructor() { }

    ngOnInit(): void {
        this.name = localStorage.getItem('name') || '';
        const amountLocalStorage: string = localStorage.getItem('amount') || '';
        let amount: number = parseFloat(amountLocalStorage);
        this.balance = amount;
        this.transactions = [
            { description: 'Compra ML', date: new Date(), amount: -15000.00 },
            { description: 'Pago Servicio', date: new Date(), amount: 1200.00 },
            { description: 'Recarga móvil', date: new Date(), amount: -2000.00 },
        ]; // cambiar
    }

    openDialog() {
        this.dialog.open(DashboardDialogCvuComponent);
    }
}

@Component({
    selector: 'dashboard-dialog-cvu',
    templateUrl: './dashboard-dialog-cvu.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DashboardDialogCvuComponent {
    public cvu: string = localStorage.getItem('cvu') || '';
    public alias: string = localStorage.getItem('alias') || '';
}