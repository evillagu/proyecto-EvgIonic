import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { FormProductoComponent } from './forms/form-producto/form-producto.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from 'src/app/components/modales/modal/modal.component';
import { AcorrdionComponent } from './acorrdion/acorrdion.component';
import { PipeFilterModule } from '../pipes/pipes.module';
import { ModalProductComponent } from './modales/modal-product/modal-product.component';





@NgModule({
  declarations: [
    HeaderComponent,
    FormProductoComponent,
    ModalComponent,
    AcorrdionComponent,
    ModalProductComponent
  ],
  exports :[
    HeaderComponent,
    FormProductoComponent,
    ModalComponent,
    AcorrdionComponent,
    ModalProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipeFilterModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class ComponentsModule { }
