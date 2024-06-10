import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-deposit',
  standalone: true,
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  imports: [
    FooterComponent,
    MatIconModule,
    NavbarDashboardActionComponent,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DepositComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
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

  // falta dialog
}
