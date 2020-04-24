import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AuthData } from 'src/app/api-contracts/auth-data';
import { BackendService } from '../api/backend.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { RoutingPaths } from 'src/app/routing-paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageService,
    private backend: BackendService,
    private navCtrl: NavController,
  ) { }

  async doesAuthDataExist(): Promise<boolean> {
    const authData = await this.getAuthData();
    return !!authData;
  }

  async getAuthData(): Promise<AuthData> {
    return await this.storage.getAuthData();
  }

  async logout() {
    this.backend.logout();
    this.navCtrl.navigateRoot(RoutingPaths.welcome)
  }
}
