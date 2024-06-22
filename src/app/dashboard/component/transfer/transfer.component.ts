import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../../service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../domain/user';

@Component({
    selector: 'app-transfer',
    standalone: true,
    templateUrl: './transfer.component.html',
    styleUrl: './transfer.component.scss',
    imports: [
        FooterComponent,
        RouterLink,
        MatButtonModule,
        NavbarDashboardActionComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        CommonModule,
        MatSelectModule,
        RouterModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose
    ]
})
export class TransferComponent {
    private userService: UserService = inject(UserService);
    private formBuilder: FormBuilder = inject(FormBuilder);
    public dialog: MatDialog = inject(MatDialog);
    public firstStepFormGroup: FormGroup;
    public secondStepFormGroup: FormGroup;
    public isEditable = true;
    public types = ['Efectivo', 'Tarjeta'];
    public maxAmount?: number;

    constructor() {
        this.firstStepFormGroup = this.formBuilder.group({
            receptor: ['', Validators.required],
        });
        this.secondStepFormGroup = this.formBuilder.group({
            amount: [1000, [Validators.required, Validators.min(1000)]],
        });

        let email: string = localStorage.getItem('email') || '';

        this.userService.findByEmail(email).subscribe({
            next: response => {
                let currentUser: User = response;
                this.maxAmount = currentUser.saldo;

                this.secondStepFormGroup = this.formBuilder.group({
                    amount: [1000, [Validators.required, Validators.min(1000), Validators.max(this.maxAmount)]],
                });
            },
            error: error => {
                console.log(error);
            }
        });
    }

    openDialog() {
        let receptor: string = this.firstStepFormGroup.get('receptor')?.value as string;
        let amount: number = this.secondStepFormGroup.get('amount')?.value as number;
        let emisor: string = localStorage.getItem('email') || '';

        this.dialog.open(DashboardDialogTransfer, {
            data: {
                emisor: emisor,
                receptor: receptor,
                monto: amount
            }
        });
    }
}

@Component({
    selector: 'dashboard-dialog-transfer',
    templateUrl: './dashboard-dialog-transfer.component.html',
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
        MatChipsModule,
        MatProgressBarModule
    ]
})
export class DashboardDialogTransfer implements OnInit {
    private userService: UserService = inject(UserService);
    private router: Router = inject(Router);
    public isTransfered: boolean = false;
    public emisor: string = '';
    public receptor: string = '';
    public monto: number = 0.00;
    public hasError: boolean = false;
    public messageError: string = '';

    constructor(@Inject(MAT_DIALOG_DATA) public data: { emisor: string, receptor: string, monto: number }) {
        this.emisor = data.emisor;
        this.receptor = data.receptor;
        this.monto = data.monto;
    }

    ngOnInit(): void {
        this.userService.findByEmail(this.receptor).subscribe({
            next: response => {
                if (response) {
                    this.userService.transfer(this.emisor, this.receptor, this.monto).subscribe({
                        next: response => {
                            setTimeout(() => {
                                this.isTransfered = true;
                                this.router.navigate(['dashboard']);
                            }, 5_000);
                        },
                        error: error => {
                            this.messageError = 'Ocurrió un error, vuelva a intentarlo más tarde';
                            this.hasError = true;
                            this.isTransfered = true;
                            console.log(error);
                            this.router.navigate(['dashboard']);
                        }
                    });
                } else {
                    this.messageError = `No existe usuario con el email/alias/CVU: ${this.receptor}`;
                    this.hasError = true;
                    this.isTransfered = true;
                    this.router.navigate(['dashboard']);
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }
}