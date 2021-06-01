import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemProducts } from 'src/app/models-interfaces/itemProduct';
import { Products } from 'src/app/models-interfaces/producs';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { DataService } from 'src/app/services/data.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GeneralService } from 'src/app/services/general.service';
@Component({
  selector: 'app-list-produc-nues',
  templateUrl: './list-produc-nues.page.html',
  styleUrls: ['./list-produc-nues.page.scss'],
})
export class ListProducNuesPage implements OnInit {

  productos: Products[] = [];
  itemProduts: ItemProducts[] = [];
  sitiosPage: Places[] = [];
  newSitiosPage={};
  private pathProducts = "productos/"
  private pathItemProduc = "item-productos/";
  private pathSitios = "sitios/";
  constructor(public dtaBaseFire: FirestoreService, private router: Router,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.resServiceSitos();
  }
  resServiceSitos() {
    this.dtaBaseFire.getCollection<Places>(this.pathSitios).subscribe(
      res => { this.sitiosPage = res });
  }
 
  redirectBtn(dta:any) {
   
    this.newSitiosPage = {
      nombre: dta
    }
    this.getItemProducts(dta);
    this.getProduc(dta);
    this.goReceiver();
  
  }
  goReceiver() {
    this.generalService.sendListSource(this.productos);
    this.generalService.sendListSource1(this.itemProduts);
    this.generalService.sendObjectSource(this.newSitiosPage);
    this.router.navigate(['/list-produc-espe']);
  }
  getProduc(dta1: string) {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts)
      .pipe(map(res => res.filter(dta => dta.sitio === dta1)))
      .subscribe(
        res => { this.productos = res });
  }
  getProducFilterList(dtaEntry: string) {
    this.productos = this.productos.filter(dta2 => dta2.nombre === dtaEntry);
  }
  getItemProducts(dta1: string) {
    this.dtaBaseFire.getCollection<ItemProducts>(this.pathItemProduc)
      .pipe(map(res => res.filter(dta => dta.sitio === dta1)))
      .subscribe(
        res => { this.itemProduts = res });
  }

}
