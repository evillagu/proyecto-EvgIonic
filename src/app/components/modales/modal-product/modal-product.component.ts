import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore.service';
import { ItemProducts } from '../../../models-interfaces/itemProduct';
import { Products } from '../../../models-interfaces/producs';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() modalProduc: boolean;

  products: ItemProducts[] = [];
  newProduc: ItemProducts = {
    nombre: '',
    genero:'',
    precio: null,
    marca: '',
    descripcion: '',
    id: this.dtaBaseFire.getId()
  }
  private path = "producto/";
  constructor(public modalController: ModalController, public dtaBaseFire: FirestoreService) { }

  ngOnInit() {
    this.guardarItemProduc();
  }
  closeModal() {
    this.modalController.dismiss();
    if (this.modalProduc) {
      // aqui vendria la funcion que haria para llevar datos al rest
      this.modalProduc = false;
    }
  }
  // trae toda la coleccion
  getItemProduc() {
    this.dtaBaseFire.getCollection<ItemProducts>(this.path).subscribe(
      res => { this.products = res });
  }
  // guarda un elemnto
  guardarItemProduc() {
    this.dtaBaseFire.createDoc(this.newProduc, this.path, this.newProduc.id);
  }

  //delete
  deleteFunction(produc: ItemProducts) {
    this.dtaBaseFire.deleteDoc(this.path, produc.id);
  }

}
