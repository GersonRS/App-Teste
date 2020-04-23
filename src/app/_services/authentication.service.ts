import { UserService } from './user.service';
import { User } from './../_models/user';
import { Router } from '@angular/router';
import { Authentication } from './../_models/authentication';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, switchMap, take, tap, first } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private authenticationStateSubject = new BehaviorSubject<User>(null);

  private body = {
    grant_type: environment.GRANT_TYPE,
    client_id: environment.CLIENT_ID,
    client_secret: environment.CLIENT_SECRET,
    username: '',
    password: '',
    scope: ''
  }

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router,
    private userService: UserService) {
    this.loadStoredToken();
  }

  async loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.currentUser = platformObs
      .pipe(
        switchMap(_ => from(this.storage.get(environment.USER_KEY))),
        map(user => {
          if (user) {
            this.authenticationStateSubject.next(user);
            return user;
          } else {
            return null;
          }
        })
      );
  }

  login(login: { username: string, password: string }) {
    this.body.username = login.username;
    this.body.password = login.password;
    return this.http.post<Authentication>(environment.URL_AUTENTICATION, this.body)
      .pipe(
        take(1),
        first(),
        map(authentication => {
          return authentication.access_token;
        }),
        switchMap(token => from(this.storage.set(environment.TOKEN_KEY, token))),
        switchMap(_ => this.userService.setParameters('roles-address').get()),
        map((response: any) => response.data),
        switchMap(user => from(this.storage.set(environment.USER_KEY, user))),
        tap(user => this.authenticationStateSubject.next(user))
      );
  }

  register(login: { name: string, email: string, password: string }) {
    return this.http.post<User>(environment.URL_REGISTER, login)
      .pipe(
        take(1),
        first(),
        map((response: any) => response.data)
      );
  }

  public get authenticationStateSubjectValue(): User {
    return this.authenticationStateSubject.value;
}

  getUser() {
    return this.authenticationStateSubject.asObservable();
  }

  logout() {
    let storageObs = from(this.storage.remove(environment.TOKEN_KEY));
    return storageObs
    .pipe(
      switchMap(_ => from(this.storage.remove(environment.USER_KEY))),
      tap(_ => {
        this.router.navigateByUrl('/');
        this.authenticationStateSubject.next(null);
      })
    );
  }
}
