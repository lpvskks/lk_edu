import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { canActivateAuth } from './core/guards/access.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UsefulServicesPageComponent } from './pages/useful-services-page/useful-services-page.component';
import { CertificatesPageComponent } from './pages/certificates-page/certificates-page.component';

export const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: 'profile', component: ProfilePageComponent},
    {path: 'usefulservices', component: UsefulServicesPageComponent},
    {path: 'certificates', component: CertificatesPageComponent},
  ]},
  {path: 'login', component: LoginPageComponent},
 // {path: '',  canActivate: [canActivateAuth]}
];
