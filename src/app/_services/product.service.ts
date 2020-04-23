import { Observable } from 'rxjs';
import { Product } from './../_models/product';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService  extends ApiService<Product> {

  constructor(protected http: HttpClient) {
    super(http, environment.URL_API + 'products');
  }

  get(id: number = null): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.URL_API}promotions`)
      .pipe(
        take(1),
        tap(_ => this.resetParameters()),
        catchError(this.handleError<Product[]>(`get products in promotion from ${this.API_URL}`))
      );
  }

}
