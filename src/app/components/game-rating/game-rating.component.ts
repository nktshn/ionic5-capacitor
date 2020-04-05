import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-rating',
  templateUrl: './game-rating.component.html',
  styleUrls: ['./game-rating.component.scss'],
})
export class GameRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() width: number = 5;

  constructor() { }

  ngOnInit() { }

  getWrapNgStyle(): Partial<CSSStyleDeclaration> {
    return { 
      width: `${this.width}px`, 
      height: `${this.width}px`,
      borderColor: `var(--${this.getHexBorderColorByRank()})`
    }
  }

  private getHexBorderColorByRank(): string {
    if (this.rating < 4) { // 0-3
      return 'ion-color-danger';
    }
    if (this.rating >= 4 && this.rating < 7) { //4-6
      return 'ion-color-warning';
    }
    return 'ion-color-success' // 7-10
  }

}
