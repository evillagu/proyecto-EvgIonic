import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/components/modal/modal.component';


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
  createproducto(){
    
    this.createModalProducto()

  }
  async createModalGenero() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
       modalGenero: true,
       titulo: 'Tipo de Producto',
       descricion: 'El tipo, es el genero de alimentos como arroz, pasta, legumbres.......  '
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async createModalProducto() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps:{
        modalProduc: true,
        titulo: 'Crea un producto Nuevo',
        descricion: 'El producto, es aquel como arroz largo, pasta macarrones'   
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
