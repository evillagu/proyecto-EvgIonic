import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { ModalProductComponent } from 'src/app/components/modales/modal-product/modal-product.component';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';
import { ModalSitiosComponent } from '../../components/modales/modal-sitios/modal-sitios.component';


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
  createSitio(){
    this.createModalSitio();
  }
  onBlurFab(event){
    
    console.log(event.target)
 
  }
  async createModalSitio() {
    const modal = await this.modalController.create({
      component: ModalSitiosComponent,
      componentProps:{
       titulo: 'Sitio - Lugar',
       descricion: 'Es donde puede encontrar los productos de tus listas'
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
  async createModalGenero() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
       modalCreateGenero: true,
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
       paginaActual:'',
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
        modalcreateItemProduc: true,
        titulo: 'Crea un producto Nuevo',
        descricion: 'El producto es la clase de género (arroz largo, pasta macarrones.....)'   
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
