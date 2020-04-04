import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { Observable } from 'rxjs';
import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';
import * as gamesMockResponse from './../../backend-mock-responses/games.json';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService implements IBackendService {

  constructor(
    private storage:  StorageService,
  ) { }

  async getGames(params: GamesRequestParams) {
    const response = await this.storage.getStoreGames();
    return new Observable<GamesResponse>(obs => {
      if (!response) {
        obs.error('no games record in storage');
      }
      obs.next(response);
      obs.complete();
    })
  }
}
