import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonList, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';
import { ItemProducts } from 'src/app/models-interfaces/itemProduct';
import { Products } from 'src/app/models-interfaces/producs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-list-produc-espe',
  templateUrl: './list-produc-espe.page.html',
  styleUrls: ['./list-produc-espe.page.scss'],
})
export class ListProducEspePage implements OnInit {

  @ViewChild(IonList) ionlist1: IonList;
  
  private pathItemProduc = "item-productos/";
  productos1: Products[] = [];
  itemProduts1: ItemProducts[] = [];
  newProduc1: ItemProducts = {
    nombre: '',
    genero: '',
    precio: null,
    marca: '',
    descripcion: '',
    sitio: '',
    id: this.dtaBaseFire.getId()
  }

  sitio1: any;
  titulo: any;

  menuLevel1 = null;
  menuLevel2 = null;
  selectMenu = true;
  
  constructor(private generalService: GeneralService,  
    private actionSheetCtr: ActionSheetController,
    private alertController: AlertController,
    public modalController: ModalController,
    public dtaBaseFire: FirestoreService,) { }

  ngOnInit() {
    this.generalService.$getListSource.subscribe(res => this.productos1 = res  );
    this.generalService.$getListSource.subscribe(res => this.itemProduts1 = res  );
    this.generalService.$getObjectSource.subscribe(data => {this.sitio1 = data});
    this.titulo = this.sitio1.nombre;
  }
  eventActionSheet() {
    this.selectMenu = false;
  }
  levelNav1(navX: string, dtaIdItem: string) {
    if (this.isNav1Displayed(navX)) {
      if (this.selectMenu) {
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
  getItemAccordeon(dtaIdItem: string) {
    this.itemProduts1 = this.itemProduts1.filter(dta => dta.genero === dtaIdItem);
  }
  optionDelete(produc: ItemProducts) {
    this.ionlist1.closeSlidingItems();
    this.deleteActionSheet(produc);

  }
  optionEdit(produc: ItemProducts) {
    this.ionlist1.closeSlidingItems();
    this.editAlertPrompt(produc);

  }
  optionList(dta: any) {
    this.ionlist1.closeSlidingItems();
    this.listasModal();
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
        cssClass: 'btn-delete-sheet',
        handler: () => {
          this.dtaBaseFire.deleteDoc(this.pathItemProduc, produc.id);
        }
      }, {
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
          cssClass: 'btn-affirmation',
          handler: (data) => {
            JSON.stringify(data);
            this.newProduc1.nombre = data.nombre;
            this.newProduc1.precio = data.precio;
            this.newProduc1.marca = data.marca;
            this.newProduc1.descripcion = data.descripcion;
            this.dtaBaseFire.updateDoc(this.newProduc1, this.pathItemProduc, produc.id).catch(error => console.log(error));
          }
        }
      ]
    });

    await alert.present();
  }
  async listasModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        nombre: 'pepiro',
        pais: 'prueba'
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
