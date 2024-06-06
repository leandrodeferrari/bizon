import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
    selector: 'app-withdraw',
    standalone: true,
    templateUrl: './withdraw.component.html',
    styleUrl: './withdraw.component.scss',
    imports: [FooterComponent, MatIconModule, RouterModule, MatButtonModule, NavbarDashboardActionComponent]
})
export class WithdrawComponent {

}
