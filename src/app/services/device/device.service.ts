import { Injectable } from '@angular/core';
import { Plugins, DeviceInfo, AppState, PluginListenerHandle } from '@capacitor/core';
import { ToastService } from '../toasts/toast.service';

const { App } = Plugins;
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private backButtonListener: PluginListenerHandle;

  constructor(
    private toastService: ToastService,
  ) { }

  async getAppInfo(): Promise<DeviceInfo> {
    const info = await Device.getInfo();
    return info;
  }

  registerBackButtonForAppExit() {

    if (this.backButtonListener) {
      this.backButtonListener.remove();
      this.backButtonListener = null;
    }
    const handler = this.createBackButtonHandlerForExit();
    this.backButtonListener = App.addListener('backButton', _ => {
      handler();
    })
  }

  unregisterBackButtonForAppExit() {
    this.backButtonListener && this.backButtonListener.remove();
  }

  createBackButtonHandlerForExit() {
    const buttonClickThreshold = 3000; // ms
    let didFirstClick = false;
    return () => {
      if (didFirstClick) {
        App.exitApp();
        return;
      }
      this.toastService.showMessage('Press again to exit', buttonClickThreshold)
      didFirstClick = true;
      setTimeout(_ => {
        didFirstClick = false;
      }, buttonClickThreshold)
    }
  }
}
