import { Component, Inject, OnInit, inject } from '@angular/core';
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
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../../service/user.service';
import { User } from '../../../domain/user';

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
        MatSelectModule,
        MatChipsModule
    ]
})
export class WithdrawComponent {
    private userService: UserService = inject(UserService);
    private formBuilder: FormBuilder = inject(FormBuilder);
    public dialog: MatDialog = inject(MatDialog);
    public stepFormGroup: FormGroup;
    public isEditable = true;
    public types = ['Efectivo', 'Tarjeta'];
    public maxAmount?: number;

    constructor() {
        let email = localStorage.getItem('email') ?? '';

        this.stepFormGroup = this.formBuilder.group({
            amount: [1000, [Validators.required, Validators.min(1000)]],
        });

        this.userService.findByEmail(email).subscribe({
            next: response => {
                let currentUser: User = response;
                this.maxAmount = currentUser.saldo;

                this.stepFormGroup = this.formBuilder.group({
                    amount: [1000, [Validators.required, Validators.min(1000), Validators.max(this.maxAmount)]],
                });
            },
            error: error => {
                console.log(error);
            }
        });
    }

    openDialog() {
        let amount: number = this.stepFormGroup.get('amount')?.value as number;
        let email: string = localStorage.getItem('email') ?? '';
        this.dialog.open(DashboardDialogWithdraw, {
            data: {
                email: email,
                amount: amount
            }
        });
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
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);
    public code1: string;
    public code2: string;
    public isWithdrawn: boolean = false;
    public email: string = '';
    public amount: number = 0.00;
    public hasError: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string, amount: number }) {
        this.code1 = this.generateRandomCode();
        this.code2 = this.generateRandomCode();
        this.email = data.email;
        this.amount = data.amount;
    }

    ngOnInit(): void {
        this.userService.withdraw(this.email, this.amount).subscribe({
            next: response => {
                setTimeout(() => {
                    this.isWithdrawn = true;
                    this.router.navigate(['dashboard']);
                }, 5_000);
            },
            error: error => {
                this.hasError = true;
                this.isWithdrawn = true;
                this.router.navigate(['dashboard']);
                console.log(error);
            }
        });
    }

    generateRandomCode(): string {
        const min = 10_000;
        const max = 99_999;
        return Math.floor(min + Math.random() * (max - min + 1)).toString();
    }
}