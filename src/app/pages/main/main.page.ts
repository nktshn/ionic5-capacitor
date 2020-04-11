import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/stores/games.service';
import { Game } from 'src/app/api-contracts/games';
import { skipWhile, take } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private loaderService:  LoaderService,
  ) { }

  ngOnInit() {
    this.loadGames();
    this.loadProfile();
  }

  ngOnDestroy() {
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

 }
