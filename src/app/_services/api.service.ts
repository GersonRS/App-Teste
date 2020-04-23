import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, take, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T>{

  protected parameters = "";

  constructor(protected http: HttpClient, protected API_URL: string) { }

  setParameters(parameters: string) {
    this.parameters = "/" + parameters;
    return this;
  }

  protected resetParameters() {
    this.parameters = ""
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  listWithPagination(page: number): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}/paginate${this.parameters}?page=${page}`)
      .pipe(
        tap(_ => this.resetParameters()),
        map((response: any) => response.data),
        take(1),
        catchError(this.handleError(`Error get list with pagination in ${this.API_URL}`, []))
      );
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL + this.parameters)
      .pipe(
        map((response: any) => response.data),
        tap(_ => this.resetParameters()),
        take(1),
        catchError(this.handleError(`Error get list in ${this.API_URL}`, []))
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}${this.parameters}`)
      .pipe(
        take(1),
        tap(_ => this.resetParameters()),
        catchError(this.handleError<T>(`Error get in ${this.API_URL} with id=${id}`))
      );
  }

  add(record: T): Observable<T> {
    return this.http.post<T>(this.API_URL, record)
      .pipe(
        take(1),
        catchError(this.handleError<T>(`Error add in ${this.API_URL}`))
        );
  }

  update(id: number, record: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, record)
      .pipe(
        take(1),
        catchError(this.handleError<any>(`Error update in ${this.API_URL} with id=${id}`))
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1),
        catchError(this.handleError<T>(`Error delete in ${this.API_URL} with id=${id}`))
      );
  }
}
