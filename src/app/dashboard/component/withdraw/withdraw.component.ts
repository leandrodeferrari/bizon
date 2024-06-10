import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

interface Food {
    value: string;
    viewValue: string;
}

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
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    isEditable = true;
    types = ['Efectivo', 'Tarjeta'];
    
    constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) { }

    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    openDialog() {
        this.dialog.open(withdrawDialog);
      }
}

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: './withdraw-dialog.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  })
  export class withdrawDialog {}
