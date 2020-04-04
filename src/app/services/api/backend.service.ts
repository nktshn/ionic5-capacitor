import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { ApiService } from './api.service';
import { Endpoints } from './endpoints';
import { GamesResponse, GamesRequestParams } from 'src/app/api-contracts/games';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements IBackendService {

  constructor(
    private api: ApiService,
  ) { }

  async getGames(params: GamesRequestParams) {
    return (await this.api.get<GamesRequestParams, GamesResponse>(Endpoints.games(), params)).pipe(
      map(httpResponse => httpResponse.body)
    )
  }
}
