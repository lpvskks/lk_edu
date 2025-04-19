import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule, 
    RouterModule, 
    TranslateModule  
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private translate = inject(TranslateService);
  isCollapsed = signal(false);

  sidebarItems = [
    {
      icon: '/icons/menu/User.svg',
      alt: 'user',
      label: 'SIDEBAR.PROFILE',
      route: '/profile'
    },
    {
      icon: '/icons/menu/Administrator.svg',
      alt: 'admin',
      label: 'SIDEBAR.ADMINISTRATION',
    },
    {
      icon: '/icons/menu/Reference.svg',
      alt: 'reference',
      label: 'SIDEBAR.REFERENCES',
    },
    {
      icon: '/icons/menu/Link.svg',
      alt: 'links',
      label: 'SIDEBAR.USEFUL_SERVICES',
    },
    {
      icon: '/icons/menu/Map.svg',
      alt: 'events',
      label: 'SIDEBAR.EVENTS',
    },
  ];

  @Output() sidebarToggle = new EventEmitter<boolean>();
  toggleSidebar() {
    const next = !this.isCollapsed();
    this.isCollapsed.set(next);
    this.sidebarToggle.emit(next);
  }
}
