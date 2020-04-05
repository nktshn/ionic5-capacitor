import { Injectable } from '@angular/core';
import { BackendService } from '../services/api/backend.service';
import { Game } from '../api-contracts/games';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games = new BehaviorSubject<Game[]>([]);
  
  constructor(
    private backend: BackendService,
  ) { }

  async retrieveStoreGames() {
    const sub = await this.backend.getGames();
    sub.subscribe(gamesRes => {
      this.games.next(gamesRes.games);
    });
  }
}