import { Component, OnInit, inject } from '@angular/core';
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
    private formBuilder: FormBuilder = inject(FormBuilder);
    public dialog: MatDialog = inject(MatDialog);
    public firstStepFormGroup: FormGroup;
    public secondStepFormGroup: FormGroup;
    public isEditable = true;
    public types = ['Efectivo', 'Tarjeta'];

    constructor() {
        this.firstStepFormGroup = this.formBuilder.group({
            receptor: ['', Validators.required],
        });
        this.secondStepFormGroup = this.formBuilder.group({
            amount: [1000, [Validators.required, Validators.min(1000)]],
        });
    }

    openDialog() {
        this.dialog.open(DashboardDialogTransfer);
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
    private router: Router = inject(Router);
    public isTransfered: boolean = false;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.isTransfered = true;
            // TODO: API REST
            this.router.navigate(['dashboard']);
        }, 10_000);
    }
}