import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-withdraw',
    standalone: true,
    templateUrl: './withdraw.component.html',
    styleUrl: './withdraw.component.scss',
    imports: [
        CommonModule,
        FooterComponent,
        MatIconModule,
        RouterModule,
        NavbarDashboardActionComponent,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class WithdrawComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    public dialog: MatDialog = inject(MatDialog);
    public stepFormGroup: FormGroup;
    public isEditable = true;
    public types = ['Efectivo', 'Tarjeta'];

    constructor() {
        this.stepFormGroup = this.formBuilder.group({
            amount: [1000, [Validators.required, Validators.min(1000)]],
        });
    }

    openDialog() {
        this.dialog.open(DashboardDialogWithdraw);
    }
}

@Component({
    selector: 'dashboard-dialog-withdraw',
    templateUrl: './dashboard-dialog-withdraw.component.html',
    standalone: true,
    imports: [
        RouterModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatChipsModule
    ],
})
export class DashboardDialogWithdraw implements OnInit {
    private router: Router = inject(Router);
    public code1: string;
    public code2: string;
    public isWithdrawn: boolean = false;

    constructor() {
        this.code1 = this.generateRandomCode();
        this.code2 = this.generateRandomCode();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.isWithdrawn = true;
            // TODO: API REST
            this.router.navigate(['dashboard']);
        }, 10_000);
    }

    generateRandomCode(): string {
        const min = 10_000;
        const max = 99_999;
        return Math.floor(min + Math.random() * (max - min + 1)).toString();
    }
}