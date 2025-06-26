import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { canActivateAuth } from './core/guards/access.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { UsefulServicesPageComponent } from './pages/useful-services-page/useful-services-page.component';
import { CertificatesPageComponent } from './pages/certificates-page/certificates-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventDetailComponent } from './pages/events-page/components/event-detail/event-detail.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { SpecificUserPageComponent } from './pages/specific-user-page/specific-user-page.component';

export const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
     { path: '', component: EventsPageComponent, pathMatch: 'full' },
      { path: 'events/:id',  component: EventDetailComponent },
    {path: 'profile', component: ProfilePageComponent},
    {path: 'usefulservices', component: UsefulServicesPageComponent},
    {path: 'certificates', component: CertificatesPageComponent},
    {path: 'admin', component: AdminPageComponent},
    {path: 'admin/users', component: AdminUsersPageComponent},
    {path: 'admin/users/:id', component: SpecificUserPageComponent},
  ]},
  {path: 'login', component: LoginPageComponent},
 // {path: '',  canActivate: [canActivateAuth]}
];
