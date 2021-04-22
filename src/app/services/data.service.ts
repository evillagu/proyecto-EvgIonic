import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models-interfaces/producs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) { }

  getData(){
    return this.http.get<Products[]>('/assets/data/mock-dta-produc.json');
  }
}
