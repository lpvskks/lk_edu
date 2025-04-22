import { Component, inject } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Profile } from '../../shared/types/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private profileService = inject(ProfileService);
  profile?: Profile;

  constructor() {
    this.profileService.getProfile().subscribe(val => {
      this.profile = val;
    });
  }
}
