import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models-interfaces/producs';
import { Places } from '../models-interfaces/supermarkets';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API;
  constructor( private http: HttpClient) { }

  getData(){
    return this.http.get<Places[]>('/assets/data/mock-dta-produc.json');
  }
  deleteData(){
    
  }
}
