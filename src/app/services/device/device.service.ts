import { Injectable } from '@angular/core';
import { Plugins, DeviceInfo } from '@capacitor/core';

const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  async getAppInfo(): Promise<DeviceInfo> {
    const info = await Device.getInfo();
    return info;
  }
}
