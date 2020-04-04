import { Injectable } from '@angular/core';
import { StorageApiService } from './storage-api.service';
import { GamesResponse } from 'src/app/api-contracts/games';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storageApi: StorageApiService,
  ) { }

  async setStoreGames(gamesResponse:  GamesResponse): Promise<void> {
    return await this.storageApi.set(STORAGE_KEYS.STORE_GAMES, gamesResponse);
  }

  async getStoreGames(): Promise<GamesResponse> {
    return await this.storageApi.get<GamesResponse>(STORAGE_KEYS.STORE_GAMES);
  }

}

const STORAGE_KEYS = {
  STORE_GAMES: "store-games",
}