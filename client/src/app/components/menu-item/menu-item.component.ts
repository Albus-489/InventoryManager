import { Component, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [AppComponent, RouterModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  @Input() text: string = 'Text';
  @Input() image_path: string = 'assets/menu-items/default.png';
  @Input() link: string = 'assets/menu-items/default.png'

}
