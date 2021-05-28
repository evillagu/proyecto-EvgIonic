import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @Input() modalcreateItemProduc: boolean;
  @Input() modalEditItemProduc: boolean;
  @ViewChild('activeInput', { static: false }) divActive: ElementRef;

  evalueSelectGenero: any;

  productos: Products[] = [];
  itemProducts: ItemProducts[] = [];
  newProduc: ItemProducts = {
    nombre: '',
    genero:'',
    precio: null,
    marca: '',
    descripcion: '',
    id: this.dtaBaseFire.getId()
  }
  private pathItem = "item-products/";
  private pathProducts = "productos/"
  constructor(
    public modalController: ModalController, 
    public dtaBaseFire: FirestoreService,
    private renderer:Renderer2) { }

  ngOnInit() {
    this.guardarItemProduc();
  }
  closeModal() {
    this.modalController.dismiss();
    if (this.modalcreateItemProduc) {
      // aqui vendria la funcion que haria para llevar datos al rest
      this.modalcreateItemProduc = false;
    }
    if (this.modalEditItemProduc) {

      this.modalEditItemProduc = false;
    }

  }
  // trae toda la coleccion
  getItemProduc() {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts).subscribe(
      res => { this.productos = res });
  }
  // guarda un elemnto
  guardarItemProduc() {
    this.dtaBaseFire.createDoc(this.newProduc, this.pathItem, this.newProduc.id);
  }

  //delete
  deleteFunction(produc: ItemProducts) {
    this.dtaBaseFire.deleteDoc(this.pathItem, produc.id);
  }
  resectSelect() {
    
    setTimeout(()=>{                           
      this.noActive();
    }, 100);
  }
  noActive() {
    this.renderer.setStyle(this.divActive.nativeElement, 'display', 'none');
  }
  active() {
    this.renderer.setStyle(this.divActive.nativeElement, 'display', 'block');
  }
  checkValue(event) {
      this.evalueSelectGenero = event.detail.value;
      
  }

}
