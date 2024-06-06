import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { dashboardGuard } from './guard/dashboard.guard';
import { loginGuard } from './guard/login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'transfer',
        loadComponent: () =>
            import('./dashboard/component/transfer/transfer.component').then(
                (m) => m.TransferComponent
            ),
        canActivate: [dashboardGuard],
    },
    {
        path: 'withdraw',
        loadComponent: () =>
            import('./dashboard/component/withdraw/withdraw.component').then(
                (m) => m.WithdrawComponent
            ),
        canActivate: [dashboardGuard],
    },
    {
        path: 'deposit',
        loadComponent: () =>
            import('./dashboard/component/deposit/deposit.component').then(
                (m) => m.DepositComponent
            ),
        canActivate: [dashboardGuard],
    },
    {
        path: 'transactions',
        loadComponent: () =>
            import('./dashboard/component/transactions/transactions.component').then(
                (m) => m.TransactionsComponent
            ),
        canActivate: [dashboardGuard],
    },
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
