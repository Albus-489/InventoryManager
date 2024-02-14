import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MenuItemComponent } from "../menu-item/menu-item.component";

@Component({
    selector: 'app-sidemenu',
    standalone: true,
    templateUrl: './sidemenu.component.html',
    styleUrl: './sidemenu.component.scss',
    imports: [LogoComponent, MenuItemComponent]
})
export class SidemenuComponent {

}
