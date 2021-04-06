import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



import { FormProductoComponent } from './forms/form-producto/form-producto.component';
import { HeaderComponent } from './header/header.component';





@NgModule({
  declarations: [
    HeaderComponent,
    FormProductoComponent
  ],
  exports :[
    HeaderComponent,
    FormProductoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
