import { Injectable } from '@angular/core';
import { BackendService } from '../services/api/backend.service';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../api-contracts/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly profile = new BehaviorSubject<Profile>(null);
  
  constructor(
    private backend: BackendService,
  ) { }

  async retrieveProfile() {
    const sub = await this.backend.getProfile();
    sub.subscribe(profileRes => {
      this.profile.next(profileRes);
    });
  }

  setProfileData(profile: Profile) {
    this.profile.next(profile);
  }
}
