import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { listCompra } from 'src/app/models-interfaces/listChange';
import { map } from 'rxjs/operators'
import { FirestoreService } from 'src/app/services/firestore.service';
import { ItemProducts } from 'src/app/models-interfaces/itemProduct';
import { listCompraItem } from 'src/app/models-interfaces/itemChangeList';


@Component({
  selector: 'app-listas-compras',
  templateUrl: './listas-compras.page.html',
  styleUrls: ['./listas-compras.page.scss'],
})
export class ListasComprasPage implements OnInit {

  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;
  selectMenu = true;
  menuLevel1 = null;
  menuLevel2 = null;
  private pathItemProduc = "item-productos/";
  private pathlistas = "listas/";
  newListaCompra: listCompra[] = [];
  newItemProduct1: listCompraItem[]= [];
  itemProAccordeon1: listCompraItem[] = [];
  constructor(public dtaBaseFire: FirestoreService,) { }

  ngOnInit() {
  }

  loadData(event) {
    this.inifiteScroll.complete();
    // this.inifiteScroll.disabled = true;

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
  
  getProduc() {
    this.dtaBaseFire.getCollection<listCompra>(this. pathlistas)
      .subscribe(
        res => { this.newListaCompra = res });
  }
  getProducFilterList(dtaEntry: string) {
    this.newListaCompra = this.newListaCompra.filter(dta2 => dta2.nombre === dtaEntry);
  }
  getItemProducts() {
    this.dtaBaseFire.getCollection<listCompraItem>(this.pathItemProduc)
      .subscribe(
        res => { this.newItemProduct1 = res });

  }
  getItemAccordeon(dtaIdItem: string) {
    this.itemProAccordeon1 = this.newItemProduct1.filter(dta => dta.nLista === dtaIdItem);
  }
  optionDelete(produc: listCompra) {
    // this.ionlist.closeSlidingItems();
    // this.deleteActionSheet(produc);

  }
  optionEdit(produc: listCompra) {
    // this.ionlist.closeSlidingItems();
    // this.editAlertPrompt(produc);

  }
  optionList(dta: any) {
    // this.ionlist.closeSlidingItems();
    // this.listasModal();
  }
  // async deleteActionSheet(produc: ItemProducts) {
  //   const actionSheet = await this.actionSheetCtr.create({
  //     header: 'Realmente desea eliminar',
  //     cssClass: 'product-actionSheet',
  //     mode: "ios",
  //     backdropDismiss: false,
  //     buttons: [{
  //       text: 'Eliminar',
  //       role: 'delete',
  //       icon: 'trash-outline',
  //       cssClass: 'btn-delete-sheet',
  //       handler: () => {

  //         this.dtaBaseFire.deleteDoc(this.pathItemProduc, produc.id);
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       cssClass: '',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();

  //   const { role } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  // async editAlertPrompt(produc: ItemProducts) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'alert-form',
  //     backdropDismiss: false,
  //     header: 'Editar Producto',
  //     mode: "md",
  //     inputs: [
  //       {
  //         name: 'nombre',
  //         type: 'text',
  //         value: produc.nombre,
  //         placeholder: 'Nombre producto'
  //       },
  //       {
  //         name: 'precio',
  //         type: 'text',
  //         id: 'prduct2',
  //         value: produc.precio,
  //         placeholder: 'Precio'
  //       },
  //       {
  //         name: 'marca',
  //         type: 'text',
  //         value: produc.marca,
  //         placeholder: 'Marca'
  //       },
  //       {
  //         name: 'descripcion',
  //         type: 'text',
  //         id: 'name2-id',
  //         value: produc.descripcion,
  //         placeholder: 'Descripcion'
  //       }],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'btn-red',
  //         handler: (data) => {

  //           console.log("cancelar edit");
  //         }
  //       }, {
  //         text: 'Ok',
  //         cssClass: 'btn-affirmation',
  //         handler: (data) => {
  //           JSON.stringify(data);
  //           this.newProduc.nombre = data.nombre;
  //           this.newProduc.precio = data.precio;
  //           this.newProduc.marca = data.marca;
  //           this.newProduc.descripcion = data.descripcion;
  //           this.dtaBaseFire.updateDoc(this.newProduc, this.pathItemProduc, produc.id).catch(error => console.log(error));

  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
  // async listasModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalComponent,
  //     componentProps: {
  //       nombre: 'pepiro',
  //       pais: 'prueba'
  //     },
  //     cssClass: 'my-custom-class'
  //   });
  //   return await modal.present();
  // }

}
