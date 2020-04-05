import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/stores/games.service';
import { Game } from 'src/app/api-contracts/games';
import { skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  storeGames: Game[] = [];

  constructor(
    private gamesService: GamesService,
  ) { }

  ngOnInit() {
    this.gamesService.retrieveStoreGames();
    this.gamesService.games.pipe(
      skipWhile(games => !games)
    ).subscribe(games => {
      this.storeGames = games;
    });
  }

  ngOnDestroy() {
  }

 }
