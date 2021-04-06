import { Component, OnInit } from '@angular/core';
import { DataFromProduc } from '../../../models-interfaces/fromProduc';
import { FromProducService } from '../../../services/from-produc.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.scss'],
})
export class FormProductoComponent implements OnInit {

  form = {
    name: "",
    description: ""
  };
  listData: DataFromProduc[];
  constructor(public fromProducService: FromProducService) {
    this.form;
  }

  ngOnInit() {
    this.listData = this.fromProducService.getDtaFrom();
  }
  save(formulario: NgForm) {
    let value = formulario.value;
    this.fromProducService.addDtaFrom({
      name: value.name,
      description: value.description
    });
    console.log(value.name + "descripcion   " + value.description);
  }
}