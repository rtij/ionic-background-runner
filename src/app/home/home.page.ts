import { Component } from '@angular/core';
import { BackgroundRunner } from '@capacitor/background-runner';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any = null;

  constructor(public foregroundService: ForegroundService) {
    this.init();
    this.startService();
  }

  // 

  startService() {
    // Notification importance is optional, the default is 1 - Low (no sound or vibration)
    this.foregroundService.start('GPS Running', 'Background Service', 'drawable/fsicon');
   }

  // Request permissions for background tasks
  async init() {
    try {
      const permissions = await BackgroundRunner.requestPermissions({
        apis: ['notifications', 'geolocation'],
      });
      console.log('permissions', permissions);
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  // Test the background fetch
  async performBackgroundFetch() {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'com.capacitor.background.check',
      event: 'fetchTest',
      details: {},
    });
    this.user = result;
  }

  // Schedule a notification from background
  async scheduleNotification() {
    await BackgroundRunner.dispatchEvent({
      label: 'com.capacitor.background.check',
      event: 'notificationTest',
      details: {},
    });
  }

  // Test the KV Store
  async testSave() {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'com.capacitor.background.check',
      event: 'testSave',
      details: {},
    });
    console.log('save result', result);
  }

  async testLoad() {
    const result = await BackgroundRunner.dispatchEvent({
      label: 'com.capacitor.background.check',
      event: 'testLoad',
      details: {},
    });
    console.log('load result', result);
  }
}
