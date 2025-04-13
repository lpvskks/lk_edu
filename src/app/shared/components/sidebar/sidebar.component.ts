import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isCollapsed = signal(false);

  sidebarItems = [
    {
      icon: '/icons/menu/User.svg',
      alt: 'user',
      label: 'Профиль',
      route: '/profile'
    },
    {
      icon: '/icons/menu/Administrator.svg',
      alt: 'admin',
      label: 'Администрирование',
    },
    {
      icon: '/icons/menu/Reference.svg',
      alt: 'reference',
      label: 'Справки',
    },
    {
      icon: '/icons/menu/Link.svg',
      alt: 'links',
      label: 'Полезные сервисы',
    },
    {
      icon: '/icons/menu/Map.svg',
      alt: 'events',
      label: 'Мероприятия',
    },
  ];

  @Output() sidebarToggle = new EventEmitter<boolean>();
  toggleSidebar() {
    const next = !this.isCollapsed();
    this.isCollapsed.set(next);
    this.sidebarToggle.emit(next);
  }
}
