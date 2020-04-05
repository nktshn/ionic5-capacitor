import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameRatingComponent } from './game-rating/game-rating.component';

const declarationsAndExports = [
  SideMenuComponent,
  GameCardComponent,
  GameRatingComponent,
]

@NgModule({
  declarations: [
    ...declarationsAndExports
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ...declarationsAndExports
  ]
})
export class ComponentsModule { }
