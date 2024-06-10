import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { SnackBarService } from '../../../service/snack-bar.service';

@Component({
  selector: 'app-navbar-dashboard-action',
  standalone: true,
  imports: [
    RouterLink, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule
  ],
  templateUrl: './navbar-dashboard-action.component.html',
  styleUrl: './navbar-dashboard-action.component.scss'
})
export class NavbarDashboardActionComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private snackBarService: SnackBarService = inject(SnackBarService);

  logout(): void {
    this.authService.logout();
    this.snackBarService.openTop('¡Hasta luego!', { duration: 7000, panelClass: ['snack-bar-accent'] }, 'Cerrar');
    this.router.navigate(['home']);
  }
}
