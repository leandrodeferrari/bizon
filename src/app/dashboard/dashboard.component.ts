import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../home/component/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { AuthService } from '../service/auth.service';
import { NavbarDashboardComponent } from "./component/navbar-dashboard/navbar-dashboard.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent,
        NavbarDashboardComponent
    ]
})
export class DashboardComponent {
    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['home']);
    }

    isAuthenticated(): boolean{
        return this.authService.isAuthenticated();
    }
}
