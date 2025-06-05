import { Component, inject } from '@angular/core';
import {
  FileDto,
  ProfileService,
} from '../../core/services/profile/profile.service';
import { Profile } from '../../shared/types/profile/profile';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { SafeUrl } from '@angular/platform-browser';
import { finalize, map, Observable, shareReplay, switchMap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ExperienceEntry,
  ExperienceType,
  WorkRecord,
} from '../../shared/types/profile/work-info';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, TranslateModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private layout = inject(LayoutComponent);
  private profileService = inject(ProfileService);
  private translate = inject(TranslateService);

  selectedSection: 'edu' | 'work' = 'edu';

  selectSection(section: 'edu' | 'work'): void {
    this.selectedSection = section;
  }

  readonly educationRecord$ = this.profileService.getUserEducation();
  readonly workRecord$ = this.profileService.getUserWork();

  readonly profile$: Observable<Profile> = this.profileService.getProfile();

  previewUrl: SafeUrl | null = null;
  readonly avatarUrl$: Observable<SafeUrl> = this.profileService.avatarUrl$;

  readonly phones$: Observable<string[]> = this.profile$.pipe(
    map((p) =>
      p.contacts.filter((c) => c.type === 'Phone').map((c) => c.value)
    ),
    shareReplay(1)
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

  getExperience(
    entry: WorkRecord,
    type: ExperienceType
  ): ExperienceEntry | undefined {
    return entry.experience.find((e) => e.type === type);
  }
  isUploading = false;
  onClickPhotoInput(inputElem: HTMLInputElement): void {
    inputElem.click();
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.isUploading = true;
    this.profileService
      .uploadFile(file)
      .pipe(
        switchMap((dto: FileDto) => this.profileService.updateAvatar(dto.id)),
        finalize(() => {
          this.isUploading = false;
          this.previewUrl = null;
        })
      )
      .subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('Ошибка при загрузке/обновлении аватара:', err);
        },
      });
  }

  constructor() {
    this.layout.setPageTitle('PAGE_TITLES.PROFILE');
  }
}
