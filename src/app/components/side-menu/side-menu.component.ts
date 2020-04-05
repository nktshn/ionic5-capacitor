import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuService } from './side-menu.service';
import { ProfileResponse } from 'src/app/api-contracts/profile';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  readonly menuId = 'main';
  
  @Input() profile: ProfileResponse;

  get menuItems() {
    return this.sideMenuService.menuItems;
  }

  constructor(
    private router: Router,
    private sideMenuService: SideMenuService,
  ) { }

  ngOnInit() {

  }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
    this.sideMenuService.close(this.menuId);
  }

}
