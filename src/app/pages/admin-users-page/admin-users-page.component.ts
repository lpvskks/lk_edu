import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';

@Component({
  selector: 'app-admin-users-page',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, AlphabetComponent],
  templateUrl: './admin-users-page.component.html',
  styleUrl: './admin-users-page.component.scss'
})
export class AdminUsersPageComponent {
   private layout = inject(LayoutComponent);

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.ADMINISTRATION');
  }
}
