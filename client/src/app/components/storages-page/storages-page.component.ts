import { Component } from '@angular/core';
import { IStorageItem } from '../../models/storage-item.interface';
import { StorageItemComponent } from "../storage-item/storage-item.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-storages-page',
    standalone: true,
    templateUrl: './storages-page.component.html',
    styleUrl: './storages-page.component.scss',
    imports: [StorageItemComponent, CommonModule]
})
export class StoragesPageComponent {
  storageItems: IStorageItem[] = [
    { name: 'Storage 1', picture: '' },
    { name: 'Storage 2', picture: '' },
    { name: 'Storage 3', picture: '' }
  ];

  tile: boolean = false;

  changeView():void{
    this.tile = !this.tile
  }
}
