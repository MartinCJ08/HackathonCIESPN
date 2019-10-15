import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'History',
      url: '/home',
      icon: 'albums'
    },
    {
      title: 'My visits',
      url: '/list',
      icon: 'md-people'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'construct'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'ios-help-circle-outline'
    },
    {
      title: 'Add Event',
      url: '/event',
      icon: 'list'
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications-outline'
    },
    {
      title: 'Sign out',
      url: '/',
      icon: 'return-left'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
