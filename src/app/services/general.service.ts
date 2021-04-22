import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Navigation} from '../models-interfaces/navegacion';
import { DataFromProduc } from '../models-interfaces/fromProduc';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  dataFrom!: DataFromProduc[];
  constructor(private http: HttpClient) { 
    this.dataFrom=[
    ]
  }

  getRedirecTo(){
    return this.http.get<Navigation[]>('/assets/data/redirects-routing.json');

  }
  
  getDtaFrom(){
    return this.dataFrom;
  }
  addDtaFrom(data: DataFromProduc ){
    this.dataFrom.push(data);
  }
  
}