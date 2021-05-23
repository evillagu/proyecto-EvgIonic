import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SetProductosComponent } from './set-productos/set-productos.component';

@NgModule({
    declarations: [SetProductosComponent],
    exports :[SetProductosComponent],
    imports:[
      CommonModule,
      IonicModule,
      FormsModule,
    ]
  })
  export class BackendModule { }