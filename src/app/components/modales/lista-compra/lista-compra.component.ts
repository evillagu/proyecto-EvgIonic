import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.scss'],
})
export class ListaCompraComponent implements OnInit {

  @Input() id: string;
  @Input() nombre: string;
  @Input() sitio: boolean;
  @Input() precio: boolean;
  constructor() { }

  ngOnInit() {}

}
