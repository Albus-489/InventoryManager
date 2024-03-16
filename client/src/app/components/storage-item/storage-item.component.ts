import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-storage-item',
  standalone: true,
  imports: [],
  templateUrl: './storage-item.component.html',
  styleUrl: './storage-item.component.scss'
})
export class StorageItemComponent {
  @Input() storageName: string = ''
  @Input() storagePicture: string = ''
}
