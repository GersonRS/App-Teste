import { async } from '@angular/core/testing';
import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // const loading = await this.loadingController.create({
    //   message: 'Carregando...'
    // });
    // await loading.present();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.authService.currentUser
      //   .subscribe(
      //     user => {
      //       if (user.roles.filter(role => (role.name == 'Admin'))) {
      //         this.router.navigateByUrl('admin');
      //       } else {
      //         this.router.navigateByUrl('user');
      //       }
      //       loading.dismiss();
      //     },
      //     error => {
      //       this.router.navigateByUrl('login')
      //       loading.dismiss();
      //     });
    });
  }
}
