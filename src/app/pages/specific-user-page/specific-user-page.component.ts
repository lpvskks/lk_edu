import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { ActivatedRoute } from '@angular/router';
import { UserListService } from '../../core/services/administration/user-list.service';
import { Profile } from '../../shared/types/profile/profile';
import { Observable, map, switchMap, shareReplay } from 'rxjs';
import { API_URL } from '../../core/constants/api-url';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specific-user-page',
  imports: [CommonModule],
  templateUrl: './specific-user-page.component.html',
  styleUrl: './specific-user-page.component.scss',
})
export class SpecificUserPageComponent {
  private layout = inject(LayoutComponent);
  private route = inject(ActivatedRoute);
  private service = inject(UserListService);

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.ADMINISTRATION');
  }

  profile$: Observable<Profile> = this.route.paramMap.pipe(
    map((params) => params.get('id')!),
    switchMap((id) => this.service.getUserProfile(id)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getPictureUrl(pictureId: string): string {
    return `${API_URL}/Files/${pictureId}`;
  }

  readonly phones$: Observable<string[]> = this.profile$.pipe(
    map((p) =>
      p.contacts.filter((c) => c.type === 'Phone').map((c) => c.value)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly primaryPhone$: Observable<string | undefined> = this.phones$.pipe(
    map((arr) => arr[0])
  );

  readonly secondaryPhone$: Observable<string | undefined> = this.phones$.pipe(
    map((arr) => arr[1])
  );

  readonly additionalEmail$: Observable<string | undefined> =
    this.profile$.pipe(
      map((p) => p.contacts.find((c) => c.type === 'Email')?.value)
    );
}
