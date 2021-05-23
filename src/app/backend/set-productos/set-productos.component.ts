import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {}
  guardarProduc(){
    const data= {
      genero: "prueba_tipo",
      icon: "prueba"
    }
    const path = 'tipo/';
    const id= "001";
    this.firestoreService.createDoc(data, path, id );
  }
}
