import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
    selector: 'app-withdraw',
    standalone: true,
    templateUrl: './withdraw.component.html',
    styleUrl: './withdraw.component.scss',
    imports: [
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
    public firstStepFormGroup: FormGroup;
    public secondStepFormGroup: FormGroup;
    public isEditable = true;
    public types = ['Efectivo', 'Tarjeta'];

    constructor() {
        this.firstStepFormGroup = this.formBuilder.group({
            type: ['', Validators.required],
        });
        this.secondStepFormGroup = this.formBuilder.group({
            amount: [0, Validators.required],
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
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DashboardDialogWithdraw { }