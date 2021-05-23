import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



import { FormProductoComponent } from './forms/form-producto/form-producto.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { AcorrdionComponent } from './acorrdion/acorrdion.component';
import { PipeFilterModule } from '../pipes/pipes.module';





@NgModule({
  declarations: [
    HeaderComponent,
    FormProductoComponent,
    ModalComponent,
    AcorrdionComponent
  ],
  exports :[
    HeaderComponent,
    FormProductoComponent,
    ModalComponent,
    AcorrdionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipeFilterModule
    
  ]
})
export class ComponentsModule { }
