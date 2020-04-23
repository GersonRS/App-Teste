import { Storage } from '@ionic/storage';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit{

  constructor(private storage: Storage, private route: Router) { }

  ngOnInit(): void {
    this.storage.get(environment.TUTORIAL_KEY)
    .then(data => {
      if(data){
        this.route.navigateByUrl('home');
      }
    });
  }

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;

  slideOpts = {
    
  }

  next() {
    this.slides.slideNext();
  }

  async goToLogin() {
    await this.storage.set(environment.TUTORIAL_KEY, true);
    this.route.navigateByUrl('login');
  }

  async goToRegister() {
    await this.storage.set(environment.TUTORIAL_KEY, true);
    this.route.navigateByUrl('register');
  }

}
