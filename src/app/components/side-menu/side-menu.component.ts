import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuService } from './side-menu.service';
import { Profile } from 'src/app/api-contracts/profile';
import { DeviceService } from 'src/app/services/device/device.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  readonly menuId = 'main';
  appVersion: string;
  
  @Input() profile: Profile;

  get menuItems() {
    return this.sideMenuService.menuItems;
  }

  constructor(
    private router: Router,
    private sideMenuService: SideMenuService,
    private deviceService:  DeviceService,
  ) { }

  ngOnInit() {
    this.getAppVersion();
  }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
    this.sideMenuService.close(this.menuId);
  }

  async getAppVersion(): Promise<void> {
    const deviceInfo = await this.deviceService.getAppInfo();
    const isWeb = deviceInfo.platform === 'web';
    if (isWeb) {
      this.appVersion = `Web version`;
      return;
    }
    this.appVersion = `Version ${deviceInfo.appVersion} build ${deviceInfo.appBuild}`
  }

}
