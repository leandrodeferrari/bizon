import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'; 
import {MatMenuModule} from '@angular/material/menu'; 
import { AuthService } from '../../../service/auth.service';
import { SnackBarService } from '../../../service/snack-bar.service';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.scss'
})
export class NavbarDashboardComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private snackBarService: SnackBarService = inject(SnackBarService);

  logout(): void {
    this.authService.logout();
    this.snackBarService.openTop('¡Hasta luego!', {duration: 7000, panelClass: ['snack-bar-accent']}, 'Cerrar');
    this.router.navigate(['home']);
  }
}
