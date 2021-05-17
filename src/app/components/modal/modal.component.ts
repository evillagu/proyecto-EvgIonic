import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { DataService } from 'src/app/services/data.service';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() modalProduc: boolean;
  @Input() modalGenero: boolean;
  @Input() modalLists: boolean;
  @Input() modalEditGenero: boolean;

  dtaServicePlace : Observable<Places[]>;
  
  responseData : any; 
  selectedValue: any;
  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    private dataService: DataService
    ) { }

  ngOnInit() {
    this.resService();
  }
  closeModal(){
      this.modalController.dismiss();
      console.log(this.modalEditGenero);
      if(this.modalEditGenero){
        // aqui vendria la funcion que haria para llevar datos al rest
        this.modalEditGenero = false
      }
  }
  resService(){
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
      // this.dtaServicePlace.subscribe(console.log)
  }
 
  checkValue(event){ 
    console.log(event.detail.value)
  };
}


