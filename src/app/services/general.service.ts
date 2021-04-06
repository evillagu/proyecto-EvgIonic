import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Navigation} from '../models-interfaces/navegacion';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  
  constructor(private http: HttpClient) { }

  getRedirecTo(){
    return this.http.get<Navigation[]>('/assets/data/redirects-routing.json');

  }
  
  
}