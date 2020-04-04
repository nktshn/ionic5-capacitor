import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageService,
  ) { }

  async doesAuthDataExist(): Promise<boolean> {
    const authData = await this.storage.getAuthData();
    return !!authData;
  }
}
