import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, Pipe } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Icons, Places } from '../../../models-interfaces/supermarkets';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Products } from 'src/app/models-interfaces/producs';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from "@angular/forms";
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService } from 'src/app/services/general.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, filter } from 'rxjs/operators';

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
  evalueSelectFilterSitio: any;
  evalueSelectIcon: any;
  tipoGenero: any;
  srcIcon: any;
  textSelect: any;
  iconSelect: any;
  idSelect: any;
  textSelectSitio: any;
  nombreEdit: string;
  nombreCrear: string;
  isShowAll: boolean = false;
  isEnabled1: boolean = true;

  productos: Products[] = [];
  sitios: Places[] = [];
  icons: Icons[] = [];
  producFilter: Products[] = [];
  btActiveFiltre: boolean = true;
  clearInput:string;


  private pathProducts = "productos/"
  private pathSitios = "sitios/"
  private pathIconos = "iconos/"

  newProduc: Products = {
    id: this.dtaBaseFire.getId(),
    sitio: '',
    icon: '',
    nombre: '',
  };
  newProducForm: FormGroup;
  producFromSuscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    public dtaBaseFire: FirestoreService,
    private renderer: Renderer2,
    public formBuilder: FormBuilder,
    public serviceGeneral: GeneralService
  ) {
    this.tipoGenero = "Escriba Tipo....";
    this.textSelect = "cambiar nombre";
    this.textSelectSitio = "especifico";
    this.srcIcon = "../../../../assets/img/icon-product/blanco.jpg";
  }

  ngOnInit() {
    this.resServiceProduc();
    this.resServiceSitos();
    this.resServiceIcons();
    this.initForm();
    if (this.modalEditGenero) {
      setTimeout(() => {
        this.initForm();
        this.noActive(this.divActive);
      }, 500);
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
  resServiceProduc() {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts)
      .subscribe(
        res => { this.productos = res }
      );
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
    this.textSelect = "cambiar nombre";
    this.textSelectSitio = "especifico";

    setTimeout(() => {
      this.noActive(this.divActive);
    }, 90);
  }

  btnAceptarEdit() {

    this.newProduc = {
      id: this.idSelect,
      sitio: this.textSelectSitio,
      icon: this.srcIcon,
      nombre: this.nombreEdit
      
    };
    this.dtaBaseFire.updateDoc(this.newProduc, this.pathProducts, this.newProduc.id);
    this.modalEditGenero = false;
    this.modalController.dismiss();
  }
  initForm(): void {
    this.newProducForm = this.formBuilder.group({
      nombre: [null, [
        Validators.required,
        Validators.maxLength(20)],
        [this.nameAsyncValidator.bind(this)]
      ]
    })
  }
  nameAsyncValidator(control: FormControl): Observable<ValidationErrors> {

    return this.serviceGeneral.validateName(control.value, this.productos);
  }
  getProduc(entry: string) {
    this.dtaBaseFire.getCollection<Products>(this.pathProducts)
      .pipe(map(res => res.filter(dta => dta.sitio === entry)))
      .subscribe(
       res => { this.producFilter = res });
  }
 
  getProducFilter(dtaEntry: any) {
    this.producFilter = this.productos.filter(dta2 => dta2.nombre === dtaEntry);
  }
  runTimeChange(event) {
    if (!this.textSelectSitio) {
      this.textSelectSitio = "especifico"
    }
    this.getProduc(this.textSelectSitio)
    this.getProducFilter(event.target.value);
    this.validatorProduct();
  }
  validatorProduct() {
    if (this.producFilter.length > 0) {
      this.textSelect = 'nombre ya utilizado, cambie de sitio(lugar)'
      this.btActiveFiltre = true;
      this.producFilter = [];
    } else {
      this.textSelect = 'cambiar nombre';
      this.btActiveFiltre = false;
      this.producFilter = [];
    }
   }
   checkValueSitioFilter(event){
      let dtaSelect = event.detail.value.nombre;
      this.getProduc(dtaSelect);
      this.isEnabled1 = false;
  
   }
  checkValueSitio(event) {
    this.evalueSelectsitio = event.detail.value;
    this.textSelectSitio = this.evalueSelectsitio.nombre;
    this.clearInput = '';
  
  }
  showAll(event, entrada: any) {
    this.isShowAll = !this.isShowAll;
    this.srcIcon = entrada;
  }

  btnAceptarCreate() {
    const controls = this.newProducForm.controls;
    let textValue = controls.nombre.value;
    if (!this.textSelectSitio) {
      this.textSelectSitio = "especifico"
    }
    if (!this.srcIcon) {
      this.srcIcon = "../../../../assets/img/icon-product/blanco.jpg"
    }
    Object.keys(controls).forEach(key => {
      controls[key].markAsTouched();
    });
    this.newProduc = {
      id: this.newProduc.id,
      sitio: this.textSelectSitio,
      icon: this.srcIcon,
      nombre: textValue.toLowerCase()
    }
    this.dtaBaseFire.createDoc(this.newProduc, this.pathProducts, this.newProduc.id);
    this.modalCreateGenero = false;
    this.modalController.dismiss();
  }

  checkValueIcon(event) {
    this.evalueSelectIcon = event.detail.value;
    this.srcIcon = this.evalueSelectIcon.icon;
  }

  showAll1() {
    this.isShowAll = !this.isShowAll; 
  }

  noActive(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'none');
  }
  active(id: any) {
    this.renderer.setStyle(id.nativeElement, 'display', 'block');
  }
}


