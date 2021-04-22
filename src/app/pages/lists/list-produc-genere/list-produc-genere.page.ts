import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { DataService } from '../../../services/data.service';
import { Products } from '../../../models-interfaces/producs';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list-produc-genere',
  templateUrl: './list-produc-genere.page.html',
  styleUrls: ['./list-produc-genere.page.scss'],
})
export class ListProducGenerePage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;

  DtaServiceProduc : Observable<Products[]>;
  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.DtaServiceProduc = this.dataService.getData();
    this.dataService.getData().subscribe(console.log);
  }
  loadData( event){
    this.inifiteScroll.complete();
    this.inifiteScroll.disabled = true;
    
  }

}
