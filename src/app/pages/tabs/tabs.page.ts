import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { ModalProductComponent } from 'src/app/components/modales/modal-product/modal-product.component';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  createGenero(){ 
    this.createModalGenero();
  }
  editGenero(){
  this.EditModalGenero();
  }
  createproducto(){
    this.createModalProducto()
  }
  
  async createModalGenero() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
       modalGenero: true,
       titulo: 'Tipo de Producto',
       descricion: 'El tipo es el genero de alimentos como arroz, pasta, legumbres.......  '
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async EditModalGenero() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      mode:"md",
      componentProps:{
       modalEditGenero: true,
       titulo: 'Tipo de Producto',
       descricion: 'El tipo es el genero de alimentos (arroz, pasta, legumbres.......)  '
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async createModalProducto() {
    const modal = await this.modalController.create({
      component: ModalProductComponent,
      mode:"md",
      componentProps:{
        modalProduc: true,
        titulo: 'Crea un producto Nuevo',
        descricion: 'El producto es la clase de género (arroz largo, pasta macarrones.....)'   
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
