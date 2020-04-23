import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { skipWhile, take } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';
import { Router } from '@angular/router';
import { RoutingPaths } from 'src/app/routing-paths';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  games: Game[];
  
  constructor(
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.loadProfile();
  }

  goToGamePage(gameId: number) {
    this.router.navigateByUrl(`${RoutingPaths.game}/${gameId}`);
  }

  goToGameStore() {
    this.navCtrl.navigateRoot(RoutingPaths.main);
  }

  private loadProfile(): void {
    this.loaderService.showFullscreenLoader();
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
      take(1)
    ).subscribe(profile => {
      this.games = profile.games;
      this.loaderService.hideFullscreenLoader();
    });
  }

}
