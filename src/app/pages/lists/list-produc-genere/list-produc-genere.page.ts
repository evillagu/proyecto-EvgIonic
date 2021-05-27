import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActionSheetController, AlertController, IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ItemProducts } from 'src/app/models-interfaces/itemProduct';
import { Products } from 'src/app/models-interfaces/producs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-list-produc-genere',
  templateUrl: './list-produc-genere.page.html',
  styleUrls: ['./list-produc-genere.page.scss'],
})
export class ListProducGenerePage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;
  @ViewChild(IonList) ionlist: IonList;

  imgAvatar : string;
  menuLevel1 = null;
  menuLevel2 = null;
  selectMenu = true;

  productos: Products[] = [];
  itemProduts: ItemProducts[]= [];
  itemProAccordeon: ItemProducts[]= [];
  newProduc: ItemProducts = {
    nombre: '',
    genero:'',
    precio: null,
    marca: '',
    descripcion: '',
    id: this.dtaBaseFire.getId()
  }
 
  private pathItemProduc= "item-products/";
  private pathProducts = "productos/"
  constructor( 
    private actionSheetCtr :ActionSheetController, 
    private alertController: AlertController, 
    public modalController: ModalController,
    public dtaBaseFire : FirestoreService
  ) { }

  ngOnInit() {
      this.getProduc();
      this.getItemProducts();
  }
  loadData( event){
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;
    
  }
  eventActionSheet(){
    this.selectMenu = false;
    
  }
  levelNav1(navX: string, dtaIdItem : string) {
    if (this.isNav1Displayed(navX)) {
      if(this.selectMenu){
        this.menuLevel1 = null;
      }
    } else {
      this.menuLevel1 = navX;
    }
    this.selectMenu = true;
    this.getItemAccordeon(dtaIdItem);
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
  optionDelete(produc: ItemProducts){
    this.ionlist.closeSlidingItems();
    this.deleteActionSheet(produc);
   
  }
  optionEdit(produc: ItemProducts){
    this.ionlist.closeSlidingItems();
    this.editAlertPrompt(produc);
    
  }
  optionList(dta: any){
    this.ionlist.closeSlidingItems();
    this.listasModal();
    
  }
  getProduc() {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts).subscribe(
      res => { this.productos = res });
  }
  getItemProducts(){
    this.dtaBaseFire.getCollection<ItemProducts>(this.pathItemProduc).subscribe(
      res => { this.itemProduts = res });
  }
  getItemAccordeon(dtaIdItem: string){
    this.itemProAccordeon = this.itemProduts.filter( dta => dta.genero === dtaIdItem);
    
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
