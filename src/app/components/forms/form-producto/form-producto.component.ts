import { Component, OnInit } from '@angular/core';
import { DataFromProduc } from '../../../models-interfaces/fromProduc';
import { NgForm } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';

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
  constructor(public generalService: GeneralService) {
    this.form;
  }

  ngOnInit() {
    this.listData = this.generalService.getDtaFrom();
  }
  save(formulario: NgForm) {
    let value = formulario.value;
    this.generalService.addDtaFrom({
      name: value.name,
      description: value.description
    });
    console.log(value.name + "descripcion   " + value.description);
  }
}