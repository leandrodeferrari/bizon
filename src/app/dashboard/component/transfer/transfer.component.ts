import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarDashboardActionComponent } from "../navbar-dashboard-action/navbar-dashboard-action.component";
import { FooterComponent } from '../../../shared/footer/footer.component';

@Component({
    selector: 'app-transfer',
    standalone: true,
    templateUrl: './transfer.component.html',
    styleUrl: './transfer.component.scss',
    imports: [
        FooterComponent, 
        MatIconModule, 
        RouterLink, 
        MatButtonModule, 
        NavbarDashboardActionComponent
    ]
})
export class TransferComponent {

}