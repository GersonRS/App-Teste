import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (user == null) {
          this.alertCtrl.create({
            header: 'Não autorizado',
            message: 'Você não tem permissão para acessar o app.',
            buttons: ['OK']
          }).then(alert => alert.present());
          console.log("teste");
          
          this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          return false;
        } else {
          return true;
        }
      })
    );
  }

}
