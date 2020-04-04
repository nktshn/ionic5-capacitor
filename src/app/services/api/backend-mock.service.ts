import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { Observable } from 'rxjs';
import { GamesResponse } from 'src/app/api-contracts/game';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService implements IBackendService {

  constructor() { }

  async getGames() {
    return new Observable<GamesResponse>(obs => {
      const response: GamesResponse = {};
      obs.next(response);
      obs.complete();
    })
  }
}
