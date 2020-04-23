import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    private router: Router,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required, Validators.minLength(6)
      ])]
    });
  }

  async signUp() {
    const loading = await this.loadingCtrl.create({
      message: "Cadastrando..."
    });

    await loading.present();
    this.authService.register(this.onRegisterForm.value)
      .subscribe(
        _ => {
        this.router.navigateByUrl('login');
        loading.dismiss();
      },
        async error => {
          console.log(error);
          const alert = await this.alertCtrl.create({
            header: 'Falha no Cadastro!',
            message: 'Erro ao tentar se cadastrar. Tente novamente mais tarde.\n' + error.statusText,
            buttons: ['OK']
          });
          await alert.present();
        });
    // loader.onWillDismiss().then(() => {
    //   this.router.navigateByUrl('home');
    // });
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
}