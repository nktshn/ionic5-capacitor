import { Injectable } from '@angular/core';
import { StorageApiService } from './storage-api.service';
import { GamesResponse } from 'src/app/api-contracts/games';
import { AuthData } from 'src/app/api-contracts/auth-data';
import { Profile } from 'src/app/api-contracts/profile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storageApi: StorageApiService,
  ) { }
  
  async getStoreGames(): Promise<GamesResponse> {
    return await this.storageApi.get<GamesResponse>(STORAGE_KEYS.STORE_GAMES);
  }

  async setStoreGames(gamesResponse:  GamesResponse): Promise<void> {
    return await this.storageApi.set(STORAGE_KEYS.STORE_GAMES, gamesResponse);
  }

  async getAuthData(): Promise<AuthData> {
    return await this.storageApi.get<AuthData>(STORAGE_KEYS.AUTH_DATA);
  }

  async setAuthData(data: AuthData): Promise<void> {
    return await this.storageApi.set(STORAGE_KEYS.AUTH_DATA, data);
  }

  async removeAuthData(): Promise<void> {
    return await this.storageApi.remove(STORAGE_KEYS.AUTH_DATA);
  }
  
  async setProfile(profile: Profile): Promise<void> {
    return await this.storageApi.set(STORAGE_KEYS.PROFILE, profile);
  }

  async getProfile(): Promise<Profile> {
    return await this.storageApi.get<Profile>(STORAGE_KEYS.PROFILE);
  }

  async removeProfile(): Promise<void> {
    return await this.storageApi.remove(STORAGE_KEYS.PROFILE);
  }

}

const STORAGE_KEYS = {
  STORE_GAMES: "store-games",
  AUTH_DATA: "auth-data",
  PROFILE: "profile",
}