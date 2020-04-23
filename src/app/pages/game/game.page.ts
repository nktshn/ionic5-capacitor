import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, flatMap, skipWhile, take } from 'rxjs/operators';
import { BackendService } from 'src/app/services/api/backend.service';
import { GamesService } from 'src/app/stores/games.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';
import { ProfileService } from 'src/app/stores/profile.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  game: Game;
  profile: ProfileResponse;

  constructor(
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private backend: BackendService,
    private gamesService: GamesService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.loadGame();
    this.loadProfile();
  }

  onBuyGame(gameId: number): void {

  }

  hasThisGame(): boolean {
    if (!this.profile || !this.game) {
      return false;
    }
    return !!this.profile.games.find(game => game.id === this.game.id);
  }

  private loadProfile(): void {
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
      take(1)
    ).subscribe(profile => {
      this.profile = profile;
    });
  }

  private async loadGame() {
    this.loaderService.showFullscreenLoader()
    const gameId = await this.getGameIdFromUrl();
    if (gameId === null || gameId === undefined) {
      throw new Error('no game id found')
    }
    const preloadedGame = await this.getPreloadedGameFromStore(gameId);
    if (preloadedGame) {
      this.game = preloadedGame;
      this.loaderService.hideFullscreenLoader();
    }
    (await this.backend.getGameById(gameId)).subscribe(game => {
      this.game = game;
      this.loaderService.hideFullscreenLoader();
    })
  }

  private getGameIdFromUrl(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(async params => {
        const gameId = parseInt(params['id']);
        resolve(gameId);
      })
    })
  }

  private getPreloadedGameFromStore(gameId: number): Promise<Game> {
    return new Promise((resolve, reject) => {
      this.gamesService.games.pipe(
        take(1)
      ).subscribe(preloadedGames => {
        if (preloadedGames) {
          const game = preloadedGames.find(game => game.id === gameId);
          resolve(game);
        }
        resolve(null)
      })
    })
  }


}
