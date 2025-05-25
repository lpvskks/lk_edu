import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileService } from '../../../core/services/profile/profile.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private profileService = inject(ProfileService);
  readonly avatarUrl$ = this.profileService.avatarUrl$;
  isCollapsed = signal(true);

  sidebarItems = [
    {
      icon: '/icons/menu/User.svg',
      alt: 'user',
      label: 'SIDEBAR.PROFILE',
      route: '/profile',
    },
    {
      icon: '/icons/menu/Administrator.svg',
      alt: 'admin',
      label: 'SIDEBAR.ADMINISTRATION',
    },
    {
      icon: '/icons/menu/Reference.svg',
      alt: 'reference',
      label: 'SIDEBAR.CERTIFICATES',
      route: '/certificates'
    },
    {
      icon: '/icons/menu/Link.svg',
      alt: 'links',
      label: 'SIDEBAR.USEFUL_SERVICES',
      route: '/usefulservices'
    },
    {
      icon: '/icons/menu/Map.svg',
      alt: 'events',
      label: 'SIDEBAR.EVENTS',
    },
  ];

  @Output() sidebarToggle = new EventEmitter<boolean>();
  @Input() isMobile = false;
  @Input() mobileVisible = false;
  @Output() mobileSidebarClose = new EventEmitter<void>();

  get isFullyCollapsed(): boolean {
    return !this.mobileVisible && this.isCollapsed();
  }
  toggleSidebar() {
    if (this.isMobile) {
      this.mobileSidebarClose.emit();
    } else {
      const next = !this.isCollapsed();
      this.isCollapsed.set(next);
      this.sidebarToggle.emit(next);
    }
  }
}
