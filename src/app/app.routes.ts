import { Routes } from '@angular/router';
import { MainPage } from './ui/main-page/main-page';
import { ConfigPage } from './ui/config-page/config-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: 'configuration', component: ConfigPage }
];
