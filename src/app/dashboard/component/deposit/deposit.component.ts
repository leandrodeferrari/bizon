import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
  imports: [
    CommonModule,
    FooterComponent,
    MatIconModule,
    NavbarDashboardActionComponent,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class DepositComponent {
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
      amount: [1000, [Validators.required, Validators.min(1000)]],
    });
  }

  openDialog() {
    let amount: number = this.secondStepFormGroup.get('amount')?.value as number;
    let email: string = localStorage.getItem('email') ?? '';

    this.dialog.open(DashboardDialogDeposit, {
      data: {
        email: email,
        amount: amount
      }
    });
  }
}

@Component({
  selector: 'dashboard-dialog-deposit',
  templateUrl: './dashboard-dialog-deposit.component.html',
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
export class DashboardDialogDeposit implements OnInit {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  public code1: string;
  public code2: string;
  public isDeposited: boolean = false;
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
    this.userService.deposit(this.email, this.amount).subscribe({
      next: response => {
        setTimeout(() => {
          this.isDeposited = true;
          this.router.navigate(['dashboard']);
        }, 5_000);
      },
      error: error => {
        this.hasError = true;
        this.isDeposited = true;
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
