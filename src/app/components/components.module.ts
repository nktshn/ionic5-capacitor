import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GameCardComponent } from './game-card/game-card.component';

const declarationsAndExports = [
  SideMenuComponent,
  GameCardComponent,
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
