import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    '[class.collapsed]': 'isSidebarCollapsed()' 
  }
})
export class LayoutComponent {
  isSidebarCollapsed = signal(false);

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed.set(collapsed);
  }
}
