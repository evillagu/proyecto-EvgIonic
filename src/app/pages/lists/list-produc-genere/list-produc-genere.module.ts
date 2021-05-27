import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProducGenerePageRoutingModule } from './list-produc-genere-routing.module';

import { ListProducGenerePage } from './list-produc-genere.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProducGenerePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListProducGenerePage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ListProducGenerePageModule {}
