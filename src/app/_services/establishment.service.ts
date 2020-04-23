import { Establishment } from './../_models/establishment';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService extends ApiService<Establishment> {

  constructor(protected http: HttpClient) {
    super(http, environment.URL_API + 'establishments');
  }

}
