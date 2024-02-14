import { Routes } from '@angular/router';
import { StoragesPageComponent } from './components/storages-page/storages-page.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: 'storages_page', component: StoragesPageComponent },
  { path: 'about', component: AboutComponent },
];
