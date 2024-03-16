import { Component } from '@angular/core';
import { IAbout } from '../../models/about.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  contacts: IAbout[] = [
    { contact: 'Email', value: 'bavrzar@gmail.com' },
    { contact: 'Telegram', value: '@praise_the_sunnn' },
  ];

  copyToClipboard(value: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
