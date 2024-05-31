import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private snackBarService: SnackBarService = inject(SnackBarService);
  private router: Router = inject(Router);
  public loginForm: FormGroup;
  public hide = true;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
   }

  changeVisibilityPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  getErrorMessage(field: string): string {
    if (this.loginForm.get(field)?.hasError('required')) {
      return 'Este campo es requerido';
    } else if (this.loginForm.get(field)?.hasError('email')) {
      return 'Email no válido';
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }

    return '';
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      let email = this.loginForm.value.email as string;
      let password = this.loginForm.value.password as string;

      let credential = {
        email: email,
        password: password
      }

      this.authService.login(credential).then(success => {
        if (success) {
          this.snackBarService.openTop('¡Bienvenido!', {duration: 7000, panelClass: ['snack-bar-accent']}, 'Cerrar');
          this.router.navigate(['dashboard']);
        } else {
          this.snackBarService.openTop('Inicio de sesión fallida', {duration: 7000, panelClass: ['snack-bar-error']}, 'Cerrar');
        }
      });
    }
  }
}
