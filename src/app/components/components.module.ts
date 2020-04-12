import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameRatingComponent } from './game-rating/game-rating.component';
import { FullscreenLoaderComponent } from './fullscreen-loader/fullscreen-loader.component';
import { GameBuyingModalComponent } from './game-buying-modal/game-buying-modal.component';

const declarationsAndExports = [
  SideMenuComponent,
  GameCardComponent,
  GameRatingComponent,
  FullscreenLoaderComponent,
  GameBuyingModalComponent,
]

@NgModule({
  declarations: [
    ...declarationsAndExports
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  entryComponents: [
    GameBuyingModalComponent  
  ],
  exports: [
    ...declarationsAndExports
  ]
})
export class ComponentsModule { }
