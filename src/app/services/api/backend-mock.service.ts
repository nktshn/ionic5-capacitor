import { Injectable } from '@angular/core';
import { IBackendService } from './backend.interface';
import { Observable } from 'rxjs';
import { GamesResponse, GamesRequestParams, Game } from 'src/app/api-contracts/games';
import * as gamesMockResponse from './../../backend-mock-responses/games.json';
import { StorageService } from '../storage/storage.service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendMockService implements IBackendService {

  readonly mockedApiDelay =  500; // ms
  constructor(
    private storage:  StorageService,
  ) { }

  async getGames(params?: GamesRequestParams) {
    const mockedResponse = (gamesMockResponse as any).default;
    let response = await this.storage.getStoreGames();
    return new Observable<GamesResponse>(obs => {
      if (!response) {
        // obs.error('no games record in storage');
        this.storage.setStoreGames(mockedResponse);
        console.log(mockedResponse);
        
        response = mockedResponse;
      }
      obs.next(response);
      obs.complete();
    }).pipe(
      delay(this.mockedApiDelay)
    )
  }
}
