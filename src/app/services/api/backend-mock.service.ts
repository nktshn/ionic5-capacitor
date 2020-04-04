import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { Observable } from 'rxjs';
import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService implements IBackendService {

  constructor() { }

  async getGames(params: GamesRequestParams) {
    const games: Game[] = [];
    
    return new Observable<GamesResponse>(obs => {
      const response: GamesResponse = {
        games,
        amount: games.length
      };
      obs.next(response);
      obs.complete();
    })
  }
}
