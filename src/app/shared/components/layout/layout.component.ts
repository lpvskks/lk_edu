import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { NgClass } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProfilePageComponent } from '../../../pages/profile-page/profile-page.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    NgClass,
    TranslateModule
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  host: {
    '[class.collapsed]': 'isSidebarCollapsed()'
  }
})
export class LayoutComponent {
  isSidebarCollapsed = signal(true);
  isMobileSidebarVisible = signal(false);
  isMobileView = signal(false)
  currentPageTitle = signal<string>('');

  constructor(private breakpointObserver: BreakpointObserver) {
    this.observeBreakpoints();
  }

  observeBreakpoints() {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .subscribe(result => {
        this.isMobileView.set(result.matches);
      });
  }
  setPageTitle(title: string) {
    this.currentPageTitle.set(title);
  }
  get pageTitle(): string {
    return this.currentPageTitle();
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed.set(collapsed);
  }
  get mobileSidebarVisible(): boolean {
    return this.isMobileSidebarVisible(); 
  }
  onMobileSidebarClose() {
    this.isMobileSidebarVisible.set(false);
  }
  onMobileSidebarToggle() {
    this.isMobileSidebarVisible.update(v => !v);
  }
  get isMobile(): boolean {
    return this.isMobileView();
  }
}
