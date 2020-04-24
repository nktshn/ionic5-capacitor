import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { BackendService } from 'src/app/services/api/backend.service';
import { GamesService } from 'src/app/stores/games.service';
import { Profile } from 'src/app/api-contracts/profile';
import { ProfileService } from 'src/app/stores/profile.service';
import { IonModalService } from 'src/app/services/ion-modals/ion-modal.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  game: Game;
  profile: Profile;

  constructor(
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private backend: BackendService,
    private gamesService: GamesService,
    private profileService: ProfileService,
    private ionModalService: IonModalService,
  ) { }

  ngOnInit() {
    this.loadGame();
    this.loadProfile();
  }

  onBuyGame(): void {
    this.ionModalService.showBuyGameModal(this.profile, this.game);
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
