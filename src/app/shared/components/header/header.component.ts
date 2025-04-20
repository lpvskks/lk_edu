import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  imports: [LanguageSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() mobileSidebarToggle = new EventEmitter<void>();

  onToggleClick() {
    this.mobileSidebarToggle.emit();
  }
}
