import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FromProducService } from '../../services/from-produc.service';
import { DataFromProduc } from '../../models/fromProduc';

@Component({
  selector: 'app-form-descripcion',
  templateUrl: './form-descripcion.page.html',
  styleUrls: ['./form-descripcion.page.scss'],
})
export class FormDescripcionPage implements OnInit {

  form = {
    name: "",
    description : ""
  };
  listData : DataFromProduc[];
  constructor(public fromProducService: FromProducService) { 
    this.form;
  }
 
  ngOnInit() {
    this.listData = this.fromProducService.getDtaFrom();
  }
  save( formulario : NgForm) {
    let value = formulario.value;
      this.fromProducService.addDtaFrom({
        name: value.name,
        description: value.description
      });
      console.log(value.name + "descripcion   "+ value.description);
    }
}


