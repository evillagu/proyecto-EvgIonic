import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Places } from 'src/app/models-interfaces/supermarkets';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-modal-sitios',
  templateUrl: './modal-sitios.component.html',
  styleUrls: ['./modal-sitios.component.scss'],
})
export class ModalSitiosComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  @Input() createSitiosActive: boolean;
  @Input() sitiosActive: boolean;
  
  createSitioForm: FormGroup;
  newItemProduc: Places = {
    id: this.dtaBaseFire.getId(),
    nombre: '',
    ubicacion: ''

  }
  sitiosModal: Places[] = [];
  private pathSitios = "sitios/";
  constructor( public formBuilder: FormBuilder, public modalController: ModalController,public dtaBaseFire: FirestoreService ) { }
  
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.createSitioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      ubicacion: ['', [ Validators.minLength(2), Validators.maxLength(20)]]
    })
  }

  get errorControl() {
    return this.createSitioForm.controls;
  }
 closeModal(){
  this.modalController.dismiss();
  }
  btnCreateSitio() {
    
    if (!this.createSitioForm.valid) {
      
      return false;
    } else {
      let entry = this.createSitioForm.value;
      this.newItemProduc={
        nombre: entry.nombre,
        ubicacion: entry.ubicacion,
        id: this.dtaBaseFire.getId()
      }
     this.dtaBaseFire.createDoc(this.newItemProduc, this.pathSitios, this.newItemProduc.id);
      this.modalController.dismiss();
    }
  }
  redirectBtn(event){
    let dta = event.detail.value;
  }


}
