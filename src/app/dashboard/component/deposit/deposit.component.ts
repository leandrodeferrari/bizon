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

@Component({
    selector: 'app-deposit',
    standalone: true,
    templateUrl: './deposit.component.html',
    styleUrl: './deposit.component.scss',
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
        MatInputModule
    ]
})
export class DepositComponent {
    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
      });
      secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
      });
      isEditable = true;
    
      constructor(private _formBuilder: FormBuilder) {}
}
