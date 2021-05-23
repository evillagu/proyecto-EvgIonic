import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Icons, Places } from '../models-interfaces/supermarkets';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rutaServicio: string = '/assets/data/mock-dta-produc.json';
  private rutaIcon: string = '/assets/data/mock-dta-iconos.json';
  constructor( private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getData(){
    return this.http.get<Places[]>(`${this.rutaServicio}`).pipe(retry(3), catchError(this.handleError));
  }
  deleteData(){
    
  }
  editData(){
    
  }
  getDtaIcon(){
    return this.http.get<Icons[]>(`${this.rutaIcon}`).pipe(retry(3), catchError(this.handleError));
  }
}
