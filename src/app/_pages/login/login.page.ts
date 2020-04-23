import { User } from './../../_models/user';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public onLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      username: ['user@user.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: "Entrando..."
    });

    await loading.present();
    this.authService.login(this.onLoginForm.value)
      .subscribe((user: User) => {
        let roles = (user.roles.filter(role => (role.name == "Admin")));
        if (roles.length == 0 || roles == null) {
          this.router.navigateByUrl('user');
        } else {
          this.router.navigateByUrl('admin');
        }
        loading.dismiss();
      },
        async error => {
          loading.dismiss();
          const alert = await this.alertCtrl.create({
            header: 'Login Failed',
            message: 'Wrong credentials.\n' + error.statusText,
            buttons: ['OK']
          });
          await alert.present();
        });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000,
              message: 'Enviando...'
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                translucent: true,
                message: 'O email foi enviado com sucesso.',
                duration: 3000,
                position: 'bottom',
                // buttons: [
                //   {
                //     text: 'Done',
                //     role: 'cancel',
                //     handler: () => {
                //       console.log('Cancel clicked');
                //     }
                //   }
                // ]
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }


}
