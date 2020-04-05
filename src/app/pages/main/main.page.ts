import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/stores/games.service';
import { Game } from 'src/app/api-contracts/games';
import { skipWhile, take } from 'rxjs/operators';
import { ProfileService } from 'src/app/stores/profile.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';

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
  ) { }

  ngOnInit() {
    this.loadGames();
    this.loadProfile();
  }

  ngOnDestroy() {
  }

  private loadGames(): void {
    this.gamesService.retrieveStoreGames();
    this.gamesService.games.pipe(
      skipWhile(games => !games),
      take(1)
    ).subscribe(games => {
      this.storeGames = games;
    });
  }
    
  private loadProfile(): void {
    this.profileService.retrieveProfile();
    this.profileService.profile.pipe(
      skipWhile(profile => !profile),
      take(1)
    ).subscribe(profile => {
      console.log(profile);
      
      this.profile = profile;
    });
  }

 }
