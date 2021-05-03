import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';


import { ActionSheetController, IonInfiniteScroll } from '@ionic/angular';
import { Products } from 'src/app/models-interfaces/producs';
import { DataService } from 'src/app/services/data.service';
import { DataFromExample } from '../../../../../../aplication-front/src/app/models/fromExample';
import { Places } from 'src/app/models-interfaces/supermercados';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

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
  selectMenu = true;
  constructor( private dataService: DataService,private actionSheetCtr :ActionSheetController) { }

  ngOnInit() {
    
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
    // this.dtaServicePlace.subscribe(console.log)
  }
  loadData( event){
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;
    
  }
  eventActionSheet(){
    this.selectMenu = false;
    this.presentActionSheet();
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

  clearAccordionNav() {
    this.menuLevel1 = null;
    this.menuLevel2 = null;
  }
  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtr.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
