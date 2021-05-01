import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';


import { IonInfiniteScroll } from '@ionic/angular';
import { Products } from 'src/app/models-interfaces/producs';
import { DataService } from 'src/app/services/data.service';
import { DataFromExample } from '../../../../../../aplication-front/src/app/models/fromExample';
import { GeneralService } from 'src/app/services/general.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-list-produc-genere',
  templateUrl: './list-produc-genere.page.html',
  styleUrls: ['./list-produc-genere.page.scss'],
})
export class ListProducGenerePage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;

  DtaServiceProduc : Observable<Products[]>
  constructor( private dataService: DataService, private generalService: GeneralService) {
  
  
   }

  ngOnInit() {
    this.DtaServiceProduc = this.dataService.getData();
    this.dataService.getData().subscribe(console.log);
  }
  loadData( event){
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;
  }
  

}


