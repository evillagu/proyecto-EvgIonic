import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



import { FormProductoComponent } from './forms/form-producto/form-producto.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';





@NgModule({
  declarations: [
    HeaderComponent,
    FormProductoComponent,
     ModalComponent
  ],
  exports :[
    HeaderComponent,
    FormProductoComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
