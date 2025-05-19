import { Component, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../shared/types/profile';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { SafeUrl } from '@angular/platform-browser';
import { map, Observable, shareReplay } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private layout = inject(LayoutComponent); 
  private profileService = inject(ProfileService);
    private translate = inject(TranslateService);

   readonly profile$: Observable<Profile> = this.profileService.getProfile();

  readonly avatarUrl$: Observable<SafeUrl> = this.profileService.avatarUrl$;

    readonly phones$: Observable<string[]> = this.profile$.pipe(
    map(p => p.contacts.filter(c => c.type === 'Phone').map(c => c.value)),
    shareReplay(1)
  );

  readonly primaryPhone$: Observable<string | undefined> =
    this.phones$.pipe(map(arr => arr[0]));
    
  readonly secondaryPhone$: Observable<string | undefined> =
    this.phones$.pipe(map(arr => arr[1]));

  readonly additionalEmail$: Observable<string | undefined> =
    this.profile$.pipe(
      map(p => p.contacts.find(c => c.type === 'Email')?.value)
    );

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.PROFILE');
  }
}
