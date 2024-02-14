import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { MainPageComponent } from "./components/main-page/main-page.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, SidemenuComponent, MainPageComponent]
})
export class AppComponent {
}
