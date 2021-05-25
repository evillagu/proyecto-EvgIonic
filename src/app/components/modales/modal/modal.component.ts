import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { DataService } from 'src/app/services/data.service';
import { map, filter } from 'rxjs/operators';
import { IonSelect } from '@ionic/angular';
import { Icons } from '../../../models-interfaces/supermarkets';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() modalGenero: boolean;
  @Input() modalLists: boolean;
  @Input() modalEditGenero: boolean;

  dtaServicePlace : Observable<Places[]>;
  dtaIcons = new Array<Icons[]>();
  evalueSelectGenero: any;
  evalueIcon: any;

  tipoGenero: any;
  iconGenero: any;
  
  responseData : any; 
  selectedValue: any;

  textFilter= '';
  textSelect: any;
  iconSelect:any;

  constructor(public navCtrl: NavController,
    public modalController: ModalController,
    private dataService: DataService
    
    ) { 
      this.tipoGenero = "Escriba Tipo....";
      this.iconGenero = "../../../../assets/img/icon-product/blanco.jpg";
      this.textSelect = "cambiar nombre"
    }

  ngOnInit() {
    this.resService();
    this.resIcon();
    console.log(this.resIcon());
  }
  
  closeModal(){
      this.modalController.dismiss();
      if(this.modalEditGenero){
        // aqui vendria la funcion que haria para llevar datos al rest
        this.modalEditGenero = false;
      }
  }
  resService(){
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
      // this.dtaServicePlace.subscribe(console.log)
  }
  resIcon(){

   this.dataService.getDtaIcon().subscribe((data: any[])=>{
    this.dtaIcons = data;
    } );
  }
  
  checkValue(event){ 

    this.evalueSelectGenero = event.detail.value;
    this.textSelect = this.evalueSelectGenero.genero;
    this.iconGenero = this.evalueSelectGenero.icon;
  
    
  };
  resectSelect(){
    this.evalueSelectGenero = null;
    this.evalueIcon = null;
    this.iconGenero = "../../../../assets/img/icon-product/blanco.jpg";
    this.textSelect = "cambiar nombre"
  }
  valueIcon(event){
    
    this.evalueIcon = event.detail.value;
    console.log(this.evalueIcon)
    this.iconGenero = this.evalueIcon.icon;
  }
  filterTipo(event){
    const filterText = event.target.value;
    this.textFilter = filterText;
      
  }

  
}


