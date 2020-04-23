import { User } from './../../../_models/user';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user$: Observable<User> = null;

  constructor(private auth: AuthenticationService, public loadingCtrl: LoadingController) {}
 
  ionViewWillEnter() {
    this.user$ = this.auth.getUser();
  }
 
  async logout() {
    const loading = await this.loadingCtrl.create({
      message: "Deslogando..."
    });
    await loading.present();
    this.auth.logout()
    .subscribe(_ => loading.dismiss());
  }

}
