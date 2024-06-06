import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../home/component/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { AuthService } from '../service/auth.service';
import { NavbarDashboardComponent } from "./component/navbar-dashboard/navbar-dashboard.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  } from '@angular/material/dialog';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent,
        NavbarDashboardComponent,
        MatCardModule,
        MatListModule
    ]
})
export class DashboardComponent {
    public name: string = 'Usuario';
    public balance: number = 1200.00;
    public isBalanceVisible: boolean = true;
    public transactions = [
        { description: 'Compra en Amazon', date: new Date(), amount: -150.00 },
        { description: 'Pago de nómina', date: new Date(), amount: 1200.00 },
        { description: 'Recarga móvil', date: new Date(), amount: -20.00 },
    ];

    toggleBalanceVisibility(): void {
        this.isBalanceVisible = !this.isBalanceVisible;
    }

    constructor(public dialog: MatDialog) {}

    openDialog() {
      this.dialog.open(DialogElementsExampleDialog);
    }
}

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: './dashborad-dialog.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  })
  export class DialogElementsExampleDialog {}