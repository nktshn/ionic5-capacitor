import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/stores/games.service';
import { Game } from 'src/app/api-contracts/games';
import { skipWhile, take } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ModalController, ToastController } from '@ionic/angular';
import { GameBuyingModalComponent } from 'src/app/components/game-buying-modal/game-buying-modal.component';
import { BackendService } from 'src/app/services/api/backend.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/routing-paths';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  storeGames: Game[] = [];
  profile: ProfileResponse;

  constructor(
    private gamesService: GamesService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private modalCtrl: ModalController,
    private backend: BackendService,
    private toastCtrl: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadGames();
    this.loadProfile();
  }

  ngOnDestroy() {
  }

  onBuyGame(gameId: number): void {
    const targetGame = this.storeGames.find(game => game.id === gameId);
    if (!targetGame) {
      throw new Error('onBuyGame -> no game found')
    }
    this.buyGame(targetGame);
  }

  goToGamePage(gameId: number) {
    this.router.navigateByUrl(`${RoutingPaths.game}/${gameId}`);
  }

  private loadGames(): void {
    this.gamesService.retrieveStoreGames();
    this.loaderService.showFullscreenLoader();
    this.gamesService.games.pipe(
      skipWhile(games => !games),
      take(1)
    ).subscribe(games => {
      this.storeGames = games;
      this.loaderService.hideFullscreenLoader();
    });
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

  private async buyGame(targetGame: Game) {
    // that ionic's modal api is awful...
    const modal = await this.modalCtrl.create({
      component: GameBuyingModalComponent,
      componentProps: {
        itemsToBuy: [targetGame],
        profile:  this.profile,
      }
    });
    modal.present();
    const modalData = await modal.onWillDismiss();
    const isPurchaseConfirmed = modalData.data as boolean;
    if (!isPurchaseConfirmed) {
      return;
    }
    this.loaderService.showFullscreenLoader();
    const sub = await (this.backend.buyGame(targetGame));
    const toast = await this.toastCtrl.create({
      message: `"${targetGame.title}" added to your Library`,
      duration: 3000
    })
    sub.subscribe(profileResponse => {
      this.profile = profileResponse;
      this.profileService.setProfileData(profileResponse);
      toast.present();
      this.loaderService.hideFullscreenLoader();
    })
  }

}
