import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { dashboardGuard } from './guard/dashboard.guard';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then(
                (m) => m.LoginComponent
            ),
        canActivate: [loginGuard],
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./register/register.component').then(
                (m) => m.RegisterComponent
            ),
        canActivate: [loginGuard],
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
        canActivate: [dashboardGuard],
    },
    { path: '**', redirectTo: '' }
];
