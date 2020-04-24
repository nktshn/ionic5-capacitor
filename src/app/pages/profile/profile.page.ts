import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/stores/profile.service';
import { Profile } from 'src/app/api-contracts/profile';
import { skipWhile, take } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { BackendService } from 'src/app/services/api/backend.service';
import { ToastService } from 'src/app/services/toasts/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: Profile;
  private changedProfile: Partial<Profile> = {};

  constructor(
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private backend: BackendService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  isProfileChanged(): boolean {
    return Object.keys(this.changedProfile).some(changedProfileField => {
      return this.changedProfile[changedProfileField] !== this.profile[changedProfileField]; // TO DO add deep checking if value is object
    });
  }

  profileChanged(event: CustomEvent, profileField: string): void {
    this.changedProfile[profileField] = `${event.detail.value}`.trim();
  }

  onSave(): void {
    this.updateProfile()
  }

  private loadProfile(): void {
    this.loaderService.showFullscreenLoader();
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
    ).subscribe(profile => {
      this.profile = profile;
      this.loaderService.hideFullscreenLoader();
    })
  }

  private async updateProfile() {
    this.loaderService.showFullscreenLoader();
    const sub = await this.backend.updateProfile(this.changedProfile);
    sub.subscribe(profile => {
      this.profileService.setProfileData(profile);
      this.loaderService.hideFullscreenLoader();
      this.changedProfile = {};
      this.toastService.showMessage('Profile successfully updated')
    });
  }

}
