import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from '../../../services/firestore.service';
import { ItemProducts } from '../../../models-interfaces/itemProduct';
import { Products } from '../../../models-interfaces/producs';
import { Places } from 'src/app/models-interfaces/supermarkets';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


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
  @ViewChild('boxFormActive', { static: false }) formActiveInput: ElementRef;
 
  evalueSelectGenero: any;
  evalueSelecsitio: any;
  isEnabled: boolean = true;
  isSubmitted: boolean = false;

  createItemForm: FormGroup;
  productos: Products[] = [];
  itemProducts: ItemProducts[] = [];
  sitios: Places[] = [];
  newItemProduc: ItemProducts = {
    nombre: '',
    genero: '',
    precio: null,
    marca: '',
    descripcion: '',
    sitio: '',
    id: this.dtaBaseFire.getId()
  }
  newItemProducForm: FormGroup;
  private pathItem = "item-productos/";
  private pathProducts = "productos/";
  private pathSitios = "sitios/";
  constructor(
    public modalController: ModalController,
    public dtaBaseFire: FirestoreService,
    public formBuilder: FormBuilder,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.getItemProduc();
    this.resServiceSitos();
    this.initForm();
    setTimeout(() => {
      this.initForm();
      this.noActive(this.formActiveInput);
    }, 500);
  }
  initForm() {
    this.createItemForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      marca: ['', [ Validators.minLength(2), Validators.maxLength(20)]],
      descripcion: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      precio: ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(4)]]
    })
  }
  get errorControl() {
    return this.createItemForm.controls;
  }
  closeModal() {
    this.modalController.dismiss();
  }
  // trae toda la coleccion
  getItemProduc() {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts).subscribe(
      res => { this.productos = res });
  }
  resServiceSitos() {
    this.dtaBaseFire.getCollection<Places>(this.pathSitios).subscribe(
      res => { this.sitios = res });
  }

  //delete
  deleteFunction(produc: ItemProducts) {
    this.dtaBaseFire.deleteDoc(this.pathItem, produc.id);
  }
  resectSelectActive() {
  }

  checkValueSitio(event) {
    this.evalueSelecsitio = event.detail.value;
    this.isEnabled = false;
  }
  checkValueTipo(event) {
    this.evalueSelectGenero = event.detail.value;
    this.active(this.formActiveInput);
  }
  noActive(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'none');
  }
  active(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'block');
  }
  btnCreateItem() {
    this.isSubmitted = true;
    if (!this.createItemForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let entry = this.createItemForm.value;
      this.newItemProduc={
        nombre: entry.nombre,
        genero: this.evalueSelectGenero.nombre,
        precio: entry.precio,
        marca: entry.marca,
        descripcion: entry.descripcion,
        sitio: this.evalueSelecsitio.nombre,
        id: this.dtaBaseFire.getId()
      }
      console.log(this.newItemProduc, this.pathItem, this.newItemProduc.id)
      this.dtaBaseFire.createDoc(this.newItemProduc, this.pathProducts, this.newItemProduc.id);
      setTimeout(() => {
      this.modalController.dismiss();
    }, 50);
    }
    
  }
}
