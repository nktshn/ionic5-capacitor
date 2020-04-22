import { Injectable } from '@angular/core';
import { SideMenuItem } from './side-menu-item.interface';
import { RoutingPaths } from 'src/app/routing-paths';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  
  readonly menuItems: SideMenuItem[] = [
    {
      title: 'Profile',
      ionIconName: 'person-circle-outline',
      link: `${RoutingPaths.profile}`
    },
    {
      title: 'Game store',
      ionIconName: 'game-controller-outline',
      link: `${RoutingPaths.main}`
    },
    {
      title: 'Library',
      ionIconName: 'library-outline',
      link: `${RoutingPaths.library}`
    },
  ];

  constructor(
    private menuCtrl: MenuController,
  ) { }

  close(menuId: string): Promise<boolean> {
    return this.menuCtrl.close(menuId);
  }
}
