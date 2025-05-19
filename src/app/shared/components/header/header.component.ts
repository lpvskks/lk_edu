import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    LanguageSwitcherComponent,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() mobileSidebarToggle = new EventEmitter<void>();
  @Input() currentPageTitle: string = '';
  @Input() isMobile: boolean = false;

  private router = inject(Router);
  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  onToggleClick() {
    this.mobileSidebarToggle.emit();
  }
}
