import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;

  constructor() { }

  ngOnInit() {}

  getBuyButtonText(): string {
    if (!this.game) {
      return '';
    }
    return this.game.price > 0 ? `Buy / ${this.game.price}$` : `Free to play`;
  }
}
