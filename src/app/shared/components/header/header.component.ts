import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    LanguageSwitcherComponent,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  @Output() mobileSidebarToggle = new EventEmitter<void>();

  onToggleClick() {
    this.mobileSidebarToggle.emit();
  }
}
