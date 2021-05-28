import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Icons, Places } from '../../../models-interfaces/supermarkets';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Products } from 'src/app/models-interfaces/producs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() modalCreateGenero: boolean;
  @Input() modalEditGenero: boolean;
  @ViewChild('boxActive', { static: false }) divActive: ElementRef;
  

  evalueSelectGenero: any;
  evalueSelectsitio: any;
  evalueSelectIcon: any;
  tipoGenero: any;
  srcIcon: any;
  iconGenero: string;
  textSelect: any;
  iconSelect: any;
  idSelect: any;
  textSelectSitio: any;
  nombreEdit: string;
  nombreCrear: string;
  

  productos: Products[] = [];
  sitios: Places[] = [];
  icons: Icons[]= [];
  private pathProducts = "productos/"
  private pathSitios = "sitios/"
  private pathIconos = "iconos/"

  newProduc: Products = {
    id: this.dtaBaseFire.getId(),
    sitio: '',
    icon: '',
    nombre: '',
  }

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    public dtaBaseFire: FirestoreService,
    private renderer: Renderer2,
    public formBuilder: FormBuilder
  ) {
    this.tipoGenero = "Escriba Tipo....";
    this.iconGenero = "../../../../"
    this.textSelect = "cambiar nombre";
    this.textSelectSitio = "especifico";

  }

  ngOnInit() {
    this.resService();
    this.resServiceSitos();
    this.resServiceIcons();
    if (this.modalEditGenero) {
    setTimeout(() => {
      this.noActive(this.divActive);
      // this.noActive(this.cardActive);
    }, 100);
  }
    
  }
 
  closeModal() {

    if (this.modalEditGenero) {
      this.modalEditGenero = false;
    }
    if (this.modalCreateGenero) {
      this.modalCreateGenero = false;
    }
    this.modalController.dismiss();
  }
  resServiceSitos() {
    this.dtaBaseFire.getCollection<Places>(this.pathSitios).subscribe(
      res => { this.sitios = res });
  }
  resServiceIcons() {
    this.dtaBaseFire.getCollection<Icons>(this.pathIconos).subscribe(
      res => { this.icons = res });
  }

  resService() {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts).subscribe(
      res => { this.productos = res });
  }
  resIcon() {
    // aqui el servicio para recuperar los iconos
  }

  checkValue(event) {

    this.evalueSelectGenero = event.detail.value;
    this.textSelect = this.evalueSelectGenero.nombre;
    this.srcIcon = this.evalueSelectGenero.icon;
    this.textSelectSitio = this.evalueSelectGenero.sitio;
    this.idSelect = this.evalueSelectGenero.id;
    this.nombreEdit = this.textSelect;
    this.active(this.divActive);
  };
  resectSelect() {

    this.evalueSelectGenero = null;
    this.evalueSelectIcon = null;
    this.iconGenero = "../../../../assets/img/icon-product/blanco.jpg";
    this.textSelect = "cambiar nombre";
    this.textSelectSitio = "especifico";
    setTimeout(() => {
      this.noActive(this.divActive);
    }, 100);
  }
 
  btnAceptarModal() {
    if (this.modalEditGenero) {
      this.newProduc = {
        id: this.idSelect,
        sitio: this.textSelectSitio,
        icon: this.srcIcon,
        nombre: this.nombreEdit,
      }

      this.dtaBaseFire.updateDoc(this.newProduc, this.pathProducts, this.newProduc.id);
      this.modalEditGenero = false;

    }
    if (this.modalCreateGenero) {
      this.newProduc = {
        id: this.idSelect,
        sitio: this.textSelectSitio,
        icon: this.srcIcon,
        nombre: this.nombreCrear,
      }
      this.dtaBaseFire.createDoc(this.newProduc, this.pathProducts, this.newProduc.id);
      this.modalCreateGenero = false;
    }
    this.modalController.dismiss();
  }

  checkValueIcon(event){
    this.evalueSelectIcon = event.detail.value;
    this.srcIcon = this.evalueSelectIcon.icon;
  }
  checkValueSitio(event) {
    this.evalueSelectsitio = event.detail.value;
    this.textSelectSitio = this.evalueSelectsitio.nombre;

  }

  noActive(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'none');
  }
  active(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'block');
  }

}


