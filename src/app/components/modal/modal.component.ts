import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() nombre: string;
  @Input() pais: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}
  closeModal(){
      this.modalController.dismiss();
  }

}
function Imput() {
  throw new Error('Function not implemented.');
}

