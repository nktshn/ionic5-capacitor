import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { ApiService } from './api.service';
import { Endpoints } from './endpoints';
import { GamesResponse } from 'src/app/api-contracts/game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService implements IBackendService {

  constructor(
    private api: ApiService,
  ) { }

  async getGames() {
    return (await this.api.get<GamesResponse>(Endpoints.games())).pipe(
      map(httpResponse => httpResponse.body)
    )
  }
}
