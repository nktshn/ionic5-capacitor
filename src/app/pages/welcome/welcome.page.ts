import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as ValidationPatterns from 'src/app/utils/validation-patterns';
import { BackendService } from 'src/app/services/api/backend.service';
import { CreateProfileRequest } from 'src/app/api-contracts/profile';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/routing-paths';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  disabled = false;
  usernameForm: FormGroup;

  constructor(
    private backend: BackendService,
    private storage: StorageService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.initUsernameorm();
  }

  async onUsernameFormSubmit() {
    if (this.usernameForm.invalid) {
      return;
    }
    this.disabled = true;
    const profile: CreateProfileRequest = {
      username: this.usernameForm.get('username').value,
    };
    const signupSub = (await this.backend.signup(profile));
    signupSub.subscribe(authData => {
      this.storage.setAuthData(authData);
      this.navCtrl.navigateRoot(RoutingPaths.main)
    })
  }

  private initUsernameorm(): void {
    this.usernameForm = new FormBuilder().group({
      username: ['', Validators.compose(
        [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern(ValidationPatterns.USERNAME)])],
    })
  }

}
