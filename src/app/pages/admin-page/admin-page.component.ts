import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [
    RouterModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  private layout = inject(LayoutComponent);

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.ADMINISTRATION');
  }
}
