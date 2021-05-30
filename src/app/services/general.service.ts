import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navigation } from '../models-interfaces/navegacion';
import { DataFromProduc } from '../models-interfaces/fromProduc';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/internal/operators';
import { ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { Products } from '../models-interfaces/producs';
import { ItemProducts } from '../models-interfaces/itemProduct';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  dataFrom!: DataFromProduc[];
  private filteredProduc$: Observable<Products[]>;
  private pathProducts = "productos/"
  private pathItemProduc = "item-products/";
  productos: Products[] = [];
  itemProduts: ItemProducts[] = [];
  constructor(private http: HttpClient, public dtaBaseFire: FirestoreService) { }

  getRedirecTo() {
    return this.http.get<Navigation[]>('/assets/data/redirects-routing.json');
  }

  getDtaFrom() {
    return this.dataFrom;
  }
  addDtaFrom(data: DataFromProduc) {
    this.dataFrom.push(data);
  }

  validateName(dato: string, dta: any[]): Observable<ValidationErrors> {
    return new Observable<ValidationErrors>(observer => {
      const entry = dta.find(name => name === dato);
      if (entry) {
        observer.next({
          nameError: 'Ya existe un usuario con el mismo nombre'
        });
        observer.complete();
      }

      observer.next(null);
      observer.complete();

    }).pipe(delay(1000));
  }
  getProductFilter(dta1: Observable<Products[]>, dtaString: string) {

    this.filteredProduc$ = combineLatest([dta1]).pipe(
      map(([dat1]) =>
        dat1.filter(dta => dta.sitio.toLowerCase() === dtaString)
      )
    );
    return this.filteredProduc$;
  }


}