import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/stores/profile.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';
import { skipWhile, take } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: ProfileResponse;

  constructor(
    private profileService: ProfileService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.loaderService.showFullscreenLoader();
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
      take(1),
    ).subscribe(profile => {
      this.profile = profile;
      this.loaderService.hideFullscreenLoader();
    })
  }

}
