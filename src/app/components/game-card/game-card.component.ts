import { Component, OnInit, Input, Output } from '@angular/core';
import { Game } from 'src/app/api-contracts/games';
import { EventEmitter } from '@angular/core'
import { ProfileResponse } from 'src/app/api-contracts/profile';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {

  isGameInLibrary: boolean = false;

  @Input() game: Game;
  @Input() profile: ProfileResponse;

  @Output() onBuy = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.setIsGameInLibrary();
  }

  getBuyButtonText(): string {
    if (!this.game) {
      return '';
    }
    return this.game.price > 0 ? `Buy for $${this.game.price}` : `Free to play`;
  }

  onBuyButtonClick(): void {
    this.onBuy.emit(this.game.id);
  }

  private setIsGameInLibrary(): void {
    if (!this.profile) {
      return
    }
    this.isGameInLibrary = !!this.profile.games.find(boughtGame => boughtGame.id === this.game.id)
  }
}
