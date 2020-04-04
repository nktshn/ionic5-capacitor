import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SideMenuComponent } from './side-menu/side-menu.component';

const declarationsAndExports = [
  SideMenuComponent
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
