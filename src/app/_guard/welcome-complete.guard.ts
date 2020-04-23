import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeCompleteGuard implements CanActivate {
  
  constructor(public route: Router, public storage: Storage) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return from(this.storage.get(environment.TUTORIAL_KEY))
      .pipe(
        map(tutorial => {
          if(tutorial){
            this.route.navigateByUrl('login');
            return false
          }
          return true;
        })
      );

  }
  
}
