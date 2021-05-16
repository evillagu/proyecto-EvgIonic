import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  dtaServicePlace : Observable<Places[]>;
  menuLevel1 = null;
  menuLevel2 = null;
  selectMenu = true;

  constructor(
    public modalController: ModalController,
    private dataService: DataService) { }

  ngOnInit() {
    this.resService();
  }
  closeModal(){
      this.modalController.dismiss();
  }
  resService(){
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
      // this.dtaServicePlace.subscribe(console.log)
  }
  eventActionSheet(){
    this.selectMenu = false;
    
  }
  levelNav1(navX: string) {
    if (this.isNav1Displayed(navX)) {
      if(this.selectMenu){
        this.menuLevel1 = null;
      }
    } else {
      this.menuLevel1 = navX;
    }
    this.selectMenu = true;
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

}


