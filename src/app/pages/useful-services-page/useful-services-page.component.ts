import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { UsefulServicesService } from '../../core/services/useful-services/useful-services.service';
import { ProfileService } from '../../core/services/profile/profile.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, shareReplay } from 'rxjs/operators';
import { UserType } from '../../shared/types/profile/profile';
import { PagedResourcesResponse } from '../../shared/types/useful-services.ts/useful-services';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { UsefulServicesCardComponent } from './components/useful-services-card/useful-services-card.component';

@Component({
  selector: 'app-useful-services-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PaginationComponent,
    UsefulServicesCardComponent
  ],
  templateUrl: './useful-services-page.component.html',
  styleUrls: ['./useful-services-page.component.scss']
})
export class UsefulServicesPageComponent {
  private layout = inject(LayoutComponent);
  private profileService = inject(ProfileService);
  private usefulServices = inject(UsefulServicesService);

  private page$ = new BehaviorSubject<number>(1);
  pageSize = 3;

  services$: Observable<PagedResourcesResponse> = this.page$.pipe(
    switchMap(page =>
      this.profileService.getProfile().pipe(
        switchMap(profile =>
          this.usefulServices.getUsefulServicesByUserTypes(
            profile.userTypes as UserType[],
            page,
            this.pageSize
          )
        )
      )
    ),
    tap(res => this.currentPage = res.metaData.pageNumber),
    tap(res => this.totalPages  = res.metaData.pageCount),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  currentPage = 1;
  totalPages  = 1;

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.USEFUL_SERVICES');
  }

  onPageChange(page: number) {
    this.page$.next(page);
  }
}
