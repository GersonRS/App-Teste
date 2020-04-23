import { Establishment } from './../../../_models/establishment';
import { EstablishmentService } from './../../../_services/establishment.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from './../../../_models/user';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, IonInfiniteScroll, IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  @ViewChild('slide1', { static: false }) slides1: IonSlides;
  @ViewChild('slide2', { static: false }) slides2: IonSlides;

  public user$: Observable<User>;
  public establishments: Establishment[];

  sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      // when window width is >= 360px
      360: {
        slidesPerView: 1.6,
        spaceBetween: 10
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      // when window width is >= 1024px
      1027: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router, private navController: NavController,
    public loadingController: LoadingController,
    public establishmentService: EstablishmentService
  ) {}

  next() {
    this.slides1.slideNext();
    this.slides2.slideNext();
  }

  ngOnInit() {
    this.user$ = this.authService.currentUser;
    this.getEstablishments();
  }

  async getEstablishments() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    await this.establishmentService.list()
      .subscribe(response => {
        this.establishments = response;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  loadData() {
    setTimeout(() => {
      console.log('Done');
      this.infiniteScroll.complete();

    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    // this.navController.navigateForward('user/tab2');
  }

}
