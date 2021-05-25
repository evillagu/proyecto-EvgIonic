import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable} from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ActionSheetController, AlertController, IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
import { Products } from 'src/app/models-interfaces/producs';
import { DataService } from 'src/app/services/data.service';
import { DataFromExample } from '../../../../../../aplication-front/src/app/models/fromExample';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ItemProducts } from 'src/app/models-interfaces/itemProduct';

@Component({
  selector: 'app-list-produc-genere',
  templateUrl: './list-produc-genere.page.html',
  styleUrls: ['./list-produc-genere.page.scss'],
})
export class ListProducGenerePage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;
  @ViewChild(IonList) ionlist: IonList;

  dtaServiceProduc : Observable<Products[]>;
  dtaServicePlace : Observable<Places[]>;
  imgAvatar : string;
  menuLevel1 = null;
  menuLevel2 = null;
  selectMenu = true;

  super : Places[] = [];
  newProduc: ItemProducts = {
    nombre: '',
    precio: null,
    marca: '',
    descripcion: '',
    id: this.dtaBaseFire.getId()
  }
 
  private pathSuper= "super/";
  private pathItemProduc= "itemProduct/"
  constructor( 
    private dataService: DataService,
    private actionSheetCtr :ActionSheetController, 
    private alertController: AlertController, 
    public modalController: ModalController,
    public dtaBaseFire : FirestoreService
  ) { }

  ngOnInit() {
    
    this.dtaServicePlace = this.dataService.getData().pipe(map((response) => {
      response = response.filter((data) => data.sitio.toLowerCase() === "general");
      return response;
      }));
      this.getItemProduc();
    // this.dtaServicePlace.subscribe(console.log)
  }
  loadData( event){
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;
    
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

  clearAccordionNav() {
    this.menuLevel1 = null;
    this.menuLevel2 = null;
  }
  optionDelete(produc: ItemProducts, dtaServ: any){
    this.ionlist.closeSlidingItems();
    this.deleteActionSheet(produc);
   
  }
  optionEdit(produc: ItemProducts, dtaServ: any){
    this.ionlist.closeSlidingItems();
    this.editAlertPrompt(produc);
    
  }
  optionList(dta: any, dtaServ: any){
    this.ionlist.closeSlidingItems();
    this.listasModal();
    
  }
  getItemProduc() {
    this.dtaBaseFire.getCollection<Places>(this.pathSuper).subscribe(
      res => { this.super = res });
  }
 
  async deleteActionSheet(produc: ItemProducts) {
    const actionSheet = await this.actionSheetCtr.create({
      header: 'Realmente desea eliminar',
      cssClass: 'product-actionSheet',
      mode: "ios",
      backdropDismiss: false,
      buttons: [{
        text: 'Eliminar',
        role: 'delete',
        icon: 'trash-outline',
        cssClass:'btn-delete-sheet',
        handler: () => {
          this.dtaBaseFire.deleteDoc(this.pathItemProduc,produc.id);
        }
      },{
        text: 'Cancel',
        icon: 'close',
        cssClass: '',
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

  async editAlertPrompt(produc: ItemProducts) {
    const alert = await this.alertController.create({
      cssClass: 'alert-form',
      backdropDismiss: false,
      header: 'Editar Producto',
      mode: "md",
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: produc.nombre,
          placeholder: 'Nombre producto'
        },
        {
          name: 'precio',
          type: 'text',
          id: 'prduct2',
          value: produc.precio, 
          placeholder: 'Precio'
        },
        {
          name: 'marca',
          type: 'text',
          value: produc.marca, 
          placeholder: 'Marca'
        },
        {
          name: 'descripcion',
          type: 'text',
          id: 'name2-id',
          value: produc.descripcion,
          placeholder: 'Descripcion'
        }],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'btn-red',
            handler: (data) => {
             
              console.log("cancelar edit");
            }
          }, {
            text: 'Ok',
            cssClass:'btn-affirmation',
            handler: (data) => {
              JSON.stringify(data);
              this.newProduc.nombre = data.nombre;
              this.newProduc.precio = data.precio;
              this.newProduc.marca = data.marca;
              this.newProduc.descripcion = data.descripcion
              this.dtaBaseFire.updateDoc( this.newProduc, this.pathItemProduc, produc.id);
              
              console.log('Confirm Ok');
            }
          }
        ]
      });
  
      await alert.present();
  }
  async listasModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
        nombre: 'pepiro',
        pais : 'prueba'
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
