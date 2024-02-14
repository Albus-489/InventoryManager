import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";

@Component({
    selector: 'app-sidemenu',
    standalone: true,
    templateUrl: './sidemenu.component.html',
    styleUrl: './sidemenu.component.scss',
    imports: [LogoComponent]
})
export class SidemenuComponent {

}
