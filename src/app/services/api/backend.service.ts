import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { ApiService } from './api.service';
import { Endpoints } from './endpoints';
import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';
import { map } from 'rxjs/operators';
import { CreateProfileRequest, Profile } from 'src/app/api-contracts/profile';
import { AuthData } from 'src/app/api-contracts/auth-data';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements IBackendService {

  constructor(
    private api: ApiService,
  ) { }

  async getGames(params?: GamesRequestParams) {
    return (await this.api.get<GamesRequestParams, GamesResponse>(Endpoints.games(), params)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async signup(profile: CreateProfileRequest) {
    return (await this.api.post<CreateProfileRequest, AuthData>(Endpoints.signup(), profile)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async getProfile() {
    return (await this.api.get<null, Profile>(Endpoints.profile())).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async buyGame(game: Game) {
    return (await this.api.post<null, Profile>(Endpoints.buyGame(game.id), null)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async getGameById(id: number) {
    return (await this.api.get<null, Game>(Endpoints.buyGame(id), null)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async updateProfile(profile: Partial<Profile>) {
    return (await this.api.patch<Partial<Profile>, Profile>(Endpoints.profile(), profile)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }

  async logout() {
    return (await this.api.head<null>(Endpoints.logout())).pipe(
      map(httpResponse => httpResponse.status)
    )
  }
}
