import { Component, OnInit, Input, Output } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {

  @Input() game: Game;

  @Output() onBuy = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {}

  getBuyButtonText(): string {
    if (!this.game) {
      return '';
    }
    return this.game.price > 0 ? `Buy for ${this.game.price}$` : `Free to play`;
  }

  onBuyButtonClick(): void {
    this.onBuy.emit(this.game.id);
  }
}
