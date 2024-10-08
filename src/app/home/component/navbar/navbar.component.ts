import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { SnackBarService } from '../../../service/snack-bar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private snackBarService: SnackBarService = inject(SnackBarService);

  isAuthenticated(): boolean {
    let token = this.authService.getToken();
    return token != '';
  }

  logout(): void {
    this.authService.logout();
    this.snackBarService.openTop('¡Hasta luego!', { duration: 7000, panelClass: ['snack-bar-accent'] }, 'Cerrar');
    this.router.navigate(['home']);
  }
}
