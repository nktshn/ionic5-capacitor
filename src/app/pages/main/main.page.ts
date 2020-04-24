import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/stores/games.service';
import { Game } from 'src/app/api-contracts/games';
import { skipWhile } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';
import { Profile } from 'src/app/api-contracts/profile';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/routing-paths';
import { IonModalService } from 'src/app/services/ion-modals/ion-modal.service';
import { IonRefresher } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device/device.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  storeGames: Game[] = [];
  profile: Profile;
  
  constructor(
    private gamesService: GamesService,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private router: Router,
    private ionModalService: IonModalService,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.loadGames();
    this.loadProfile();
  }

  ngOnDestroy() {
  }

  ionViewDidEnter() {
    this.deviceService.registerBackButtonForAppExit();
  }

  ionViewDidLeave() {
    this.deviceService.unregisterBackButtonForAppExit();
  }
  
  onBuyGame(gameId: number): void {
    const targetGame = this.storeGames.find(game => game.id === gameId);
    if (!targetGame) {
      throw new Error('onBuyGame -> no game found')
    }
    this.deviceService.unregisterBackButtonForAppExit();
    this.ionModalService.showBuyGameModal(this.profile, targetGame)
      .then(modal => modal.onDidDismiss())
      .then(_ => this.deviceService.registerBackButtonForAppExit());
  }

  goToGamePage(gameId: number) {
    this.router.navigateByUrl(`${RoutingPaths.game}/${gameId}`);
  }

  onPageRefresh(event: IonRefresher) {
    this.gamesService.retrieveStoreGames().then(_ => {
      event.complete();
    })
  }

  private loadGames(): void {
    this.gamesService.retrieveStoreGames();
    this.loaderService.showFullscreenLoader();
    this.gamesService.games.pipe(
      skipWhile(games => !games),
    ).subscribe(games => {
      this.storeGames = games;
      this.loaderService.hideFullscreenLoader();
    });
  }

  private loadProfile(): void {
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
    ).subscribe(profile => {
      this.profile = profile;
    });
  }

}
