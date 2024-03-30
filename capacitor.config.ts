import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capacitor.background',
  appName: 'app-sqlite',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BackgroundRunner: {
      label: 'com.capacitor.background.check',
      src: 'runners/runner.js',
      event: 'notificationTest',
      repeat: true,
      interval: 10,
      autoStart: true,
    },
  },
};

export default config;
