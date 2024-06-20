import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../service/snack-bar.service';
import { UserService } from '../service/user.service';
import { User } from '../domain/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
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
  private formBuilder: FormBuilder = inject(FormBuilder);
  private snackBarService: SnackBarService = inject(SnackBarService);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  public loginForm: FormGroup;
  public hide: boolean = true;

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
      let email: string = this.loginForm.value.email as string;
      let password: string = this.loginForm.value.password as string;

      let credential = {
        email: email,
        password: password
      }

      this.authService.login(credential).then(success => {
        if (success) {
          this.userService.login(credential.email, credential.password).subscribe({
            next: data => {
              let user: User = data;
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('cvu', user.cvu);
              localStorage.setItem('alias', user.alias);
              localStorage.setItem('name', user.nombre);
              localStorage.setItem('amount', JSON.stringify(user.saldo));

              this.snackBarService.openTop('¡Bienvenido!', { duration: 7000, panelClass: ['snack-bar-accent'] }, 'Cerrar');
              this.router.navigate(['dashboard']);
            },
            error: error => {
              this.snackBarService.openTop('Hubo un problema interno, vuelva más tarde por favor.', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
              console.error(error);
            }
          });
        } else {
          this.snackBarService.openTop('Inicio de sesión fallida', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
        }
      });
    }
  }
}
