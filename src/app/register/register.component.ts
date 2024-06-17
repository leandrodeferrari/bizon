import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../domain/user';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../service/snack-bar.service';
import { CreateUser } from '../domain/create-user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private snackBarService: SnackBarService = inject(SnackBarService);
  public registerForm: FormGroup;
  public hide: boolean = true;

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastNames: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cuil: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }

  changeVisibilityPassword(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    } else if (control?.hasError('maxlength')) {
      return `El máximo de longitud es de ${control.errors?.['maxlength'].requiredLength} caracteres`;
    } else if (control?.hasError('email')) {
      return 'Email no válido';
    } else if (control?.hasError('pattern')) {
      if (field === 'dni') {
        return 'El DNI debería de tener exactamente 8 caracteres y contener sólo números';
      } else if (field === 'cuil') {
        return 'El CUIL debería de tener exactamente 11 dígitos y contener sólo números';
      }
    } else if (control?.hasError('minlength')) {
      return `La contraseña debería de tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }

    return '';
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.registerForm.valid) {
      let name: string = this.registerForm.value.name as string;
      let lastNames: string = this.registerForm.value.lastNames as string;
      let dni: string = this.registerForm.value.dni as string;
      let cuil: string = this.registerForm.value.cuil as string;
      let email: string = this.registerForm.value.email as string;
      let password: string = this.registerForm.value.password as string;

      let createUser: CreateUser = {
        name: name,
        lastNames: lastNames,
        dni: dni,
        cuil: cuil,
        email: email,
        password: password
      }

      this.authService.register(createUser).then(success => {
        if (success) {
          this.userService.save(createUser).subscribe({
            next: data => {
              let user: User = data;
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('cvu', user.cvu);
              localStorage.setItem('alias', user.alias);
              localStorage.setItem('name', user.nombre);
              localStorage.setItem('amount', JSON.stringify(user.saldo));

              this.snackBarService.openTop('Registro exitoso. ¡Revise su correo!', { duration: 7000, panelClass: ['snack-bar-success'] }, 'Cerrar');
              this.router.navigate(['login']);
            },
            error: error => {
              this.snackBarService.openTop('Hubo un problema interno, vuelva más tarde por favor.', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
              console.error(error);
            }
          });
        } else {
          this.snackBarService.openTop('Hubo un problema al registrarse', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
        }
      }).catch(error => {
        this.snackBarService.openTop('Error interno. Por favor, intentelo más tarde', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
        console.error(error);
      });
    } else {
      this.snackBarService.openTop('Registro fallido. Por favor revise los mensajes de error del formulario.', { duration: 7000, panelClass: ['snack-bar-error'] }, 'Cerrar');
    }
  }
}
