import { Injectable } from '@angular/core';
import { DataFromProduc } from '../models/fromProduc';

@Injectable({
  providedIn: 'root'
})
export class FromProducService {
  dataFrom!: DataFromProduc[];

  constructor() { 
    this.dataFrom=[
      // {
      //   name: "prueba1",
      //   description: "esta prueba es la 1"
      // }
    ]
  }
  getDtaFrom(){
    return this.dataFrom;
  }
  addDtaFrom(data: DataFromProduc ){
    this.dataFrom.push(data);
  }
}
