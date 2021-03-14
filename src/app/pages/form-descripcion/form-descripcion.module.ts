import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDescripcionPageRoutingModule } from './form-descripcion-routing.module';

import { FormDescripcionPage } from './form-descripcion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDescripcionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FormDescripcionPage]
})
export class FormDescripcionPageModule {}
