import { Component, OnInit } from '@angular/core';
import { RoutingPaths } from 'src/app/routing-paths';
import { SideMenuItem } from './menu.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  menuItems: SideMenuItem[] = [
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
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
  }

}
