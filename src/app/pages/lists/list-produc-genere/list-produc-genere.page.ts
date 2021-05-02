import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';


import { IonInfiniteScroll } from '@ionic/angular';
import { Products } from 'src/app/models-interfaces/producs';
import { DataService } from 'src/app/services/data.service';
import { DataFromExample } from '../../../../../../aplication-front/src/app/models/fromExample';
import { Places } from 'src/app/models-interfaces/supermercados';

@Component({
  selector: 'app-list-produc-genere',
  templateUrl: './list-produc-genere.page.html',
  styleUrls: ['./list-produc-genere.page.scss'],
})
export class ListProducGenerePage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;

  dtaServiceProduc : Observable<Products[]>;
  dtaServicePlace : Observable<Places[]>;
  imgAvatar : string;
  menuLevel1 = null;
  menuLevel2 = null;
  constructor( private dataService: DataService) { }

  ngOnInit() {
    // this.dtaServicePlace = this.dataService.getData();
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
    // this.dataService.getData().subscribe(console.log);
    this.dtaServicePlace.subscribe(console.log)
  }
  loadData( event){
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;
    
  }
  levelNav1(navX: string) {
    if (this.isNav1Displayed(navX)) {
      this.menuLevel1 = null;
    } else {
      this.menuLevel1 = navX;
    }
  }

  isNav1Displayed(navX: string) {
    return this.menuLevel1 === navX;
  }

  levelNav2(navX: string) {
    if (this.isNav2Displayed(navX)) {
      this.menuLevel2 = null;
    } else {
      this.menuLevel1 = navX;
      this.menuLevel2 = navX;
    }
  }

  isNav2Displayed(navX: string) {
    return this.menuLevel2 === navX;
  }

  clearAccordionNav() {
    this.menuLevel1 = null;
    this.menuLevel2 = null;
  }

}
