import { User } from './../_models/user';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {

  constructor(protected http: HttpClient) {
    super(http, environment.URL_API + 'users');
  }

  get(id: number = null): Observable<User> {
    return this.http.get<User>(`${environment.URL_API}user/current${this.parameters}`)
      .pipe(
        take(1),
        tap(_ => this.resetParameters()),
        catchError(this.handleError<User>(`get user from ${this.API_URL}`))
      );
  }
}
