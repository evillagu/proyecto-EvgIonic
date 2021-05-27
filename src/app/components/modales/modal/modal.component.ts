import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Icons } from '../../../models-interfaces/supermarkets';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Products } from 'src/app/models-interfaces/producs';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() modalGenero: boolean;
  @Input() modalLists: boolean;
  @Input() modalEditGenero: boolean;
  @ViewChild('boxActive', { static: false }) divActive: ElementRef;

  evalueSelectGenero: any;
  evalueIcon: any;

  tipoGenero: any;
  iconGenero: any;

  responseData: any;
  selectedValue: any;

  textFilter = '';
  textSelect: any;
  iconSelect: any;
  textSelectSitio: any;

  productos: Products[] = [];
  private pathProducts = "productos/"

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
    private renderer:Renderer2
  ) {
    this.tipoGenero = "Escriba Tipo....";
    this.iconGenero = "../../../../assets/img/icon-product/blanco.jpg";
    this.textSelect = "cambiar nombre",
    this.textSelectSitio = "cambiar el lugar donde esta"
    
  }

  ngOnInit() {
    this.resService();
    this.noActive();
  }

  closeModal() {
    this.modalController.dismiss();
    if (this.modalEditGenero) {
      // aqui vendria la funcion que haria para llevar datos al rest
      this.modalEditGenero = false;
    }
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
    this.iconGenero = this.evalueSelectGenero.icon;
    this.textSelectSitio = this.evalueSelectGenero.sitio;
    this.active();


  };
  resectSelect() {
    
    this.evalueSelectGenero = null;
    this.evalueIcon = null;
    this.iconGenero = "../../../../assets/img/icon-product/blanco.jpg";
    this.textSelect = "cambiar nombre";
    this.textSelectSitio = "cambiar el lugar donde esta";
    this.noActive();
  }
  valueIcon(event) {

    this.evalueIcon = event.detail.value;
    console.log(this.evalueIcon)
    this.iconGenero = this.evalueIcon.icon;
  }
  filterTipo(event) {
    const filterText = event.target.value;
    this.textFilter = filterText;
  }
  noActive() {
    this.renderer.setStyle(this.divActive.nativeElement, 'display', 'none');
  }
  active() {
    this.renderer.setStyle(this.divActive.nativeElement, 'display', 'block');
  }

}


