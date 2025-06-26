import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent implements OnDestroy, OnChanges {
  @Input() dynamicLabel?: string;

  crumbs: { label: string; url: string }[] = [];
  private sub: Subscription;

  private labelMap: Record<string,string> = {
    '': 'Главная',
    'events': 'Мероприятия',
    'profile': 'Профиль',
    'usefulservices': 'Полезные сервисы',
    'certificates': 'Справки',
    'admin': 'Администрирование',
    'users': 'Пользователи'
  };

  constructor(private router: Router) {
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.buildCrumbs(e.urlAfterRedirects);
      });
    this.buildCrumbs(this.router.url);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dynamicLabel']) {
      this.buildCrumbs(this.router.url);
    }
  }

  private buildCrumbs(url: string) {
    const segments = url.split('?')[0].split('/').filter(s => s !== '');
    const crumbs: typeof this.crumbs = [{ label: this.labelMap[''], url: '/' }];
    let pathSoFar = '';

    segments.forEach((seg, idx) => {
      pathSoFar += `/${seg}`;
      let label = this.labelMap[seg] ?? seg;
      if (this.dynamicLabel && idx === segments.length - 1) {
        label = this.dynamicLabel;
      }
      crumbs.push({ label, url: pathSoFar });
    });

    this.crumbs = crumbs;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}