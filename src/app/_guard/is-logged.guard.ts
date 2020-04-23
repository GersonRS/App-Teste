import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthenticationService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (user == null) {
          return true;
        } else {
          let roles = (user.roles.filter(role => (role.name == "Admin")));
          if (roles.length == 0 || roles == null) {
            this.router.navigateByUrl('user');
          } else {
            this.router.navigateByUrl('admin');
          }
          return false;
        }
      })
    );
  }

}
