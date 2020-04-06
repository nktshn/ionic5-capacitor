import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { AuthData } from 'src/app/api-contracts/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageService,
  ) { }

  async doesAuthDataExist(): Promise<boolean> {
    const authData = await this.getAuthData();
    return !!authData;
  }

  async getAuthData(): Promise<AuthData> {
    return await this.storage.getAuthData();
  }
}
