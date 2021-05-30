import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-sitios',
  templateUrl: './modal-sitios.component.html',
  styleUrls: ['./modal-sitios.component.scss'],
})
export class ModalSitiosComponent implements OnInit {

  @Input() titulo: string;
  @Input() descricion: string;
  constructor( public modalController: ModalController ) { }

  ngOnInit() {}

 closeModal(){
  this.modalController.dismiss();
  }

}
