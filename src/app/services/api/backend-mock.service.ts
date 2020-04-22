import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { Observable } from 'rxjs';
import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';
import * as gamesMockResponse from './../../backend-mock-responses/games.json';
import * as profileMockResponse from './../../backend-mock-responses/profile.json';
import { StorageService } from '../storage/storage.service';
import { delay, tap } from 'rxjs/operators';
import { CreateProfileRequest, ProfileResponse } from 'src/app/api-contracts/profile';
import { AuthData } from 'src/app/api-contracts/auth-data';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService implements IBackendService {

  readonly mockedApiDelay = 1000; // ms
  constructor(
    private storage: StorageService,
  ) { }

  async getGames(params?: GamesRequestParams) {
    
    let gamesResponse = await this.storage.getStoreGames();
    return new Observable<GamesResponse>(obs => {
      if (!gamesResponse) {
        const mockedGamesResponse: GamesResponse = (gamesMockResponse as any).default;
        this.storage.setStoreGames(mockedGamesResponse);
        gamesResponse = mockedGamesResponse;
      }
      obs.next(gamesResponse);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay),
    )
  }

  async signup(profile: CreateProfileRequest) {
    return new Observable<AuthData>(obs => {
      const profileResponse: ProfileResponse = (profileMockResponse as any).default;
      profileResponse.username = profile.username;
      this.storage.setProfile(profileResponse);
      const authData: AuthData = {
        token: 'randomtoken'
      }
      obs.next(authData);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay)
    )
  }

  async getProfile() {
    const profileResponse: ProfileResponse = await this.storage.getProfile();
    return new Observable<ProfileResponse>(obs => {
      obs.next(profileResponse);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay)
    )
  }

  async buyGame(game: Game) {
    const profileResponse: ProfileResponse = await this.storage.getProfile();
    profileResponse.balance -= game.price;
    profileResponse.games.push(game)
    this.storage.setProfile(profileResponse);
    return new Observable<ProfileResponse>(obs => {
      obs.next(profileResponse);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay)
    )
  }

  async getGameById(id: number) {    
    const gamesResponse = await this.storage.getStoreGames(); 
    return new Observable<Game>(obs => {
      const targetGame = gamesResponse.games.find(game => game.id === id);
      if (!targetGame) {
        obs.error(`no game found by id ${id}`)
      }
      obs.next(targetGame);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay)
    )
  }
}
