import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { canActivateAuth } from './core/guards/access.guard';

export const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
 // {path: '',  canActivate: [canActivateAuth]}
];
