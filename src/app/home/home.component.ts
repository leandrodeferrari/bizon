import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        RouterModule,
        MatButtonModule,
        NavbarComponent,
        FooterComponent
    ]
})
export class HomeComponent {

}
