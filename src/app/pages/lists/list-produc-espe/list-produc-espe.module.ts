import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProducEspePageRoutingModule } from './list-produc-espe-routing.module';

import { ListProducEspePage } from './list-produc-espe.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProducEspePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListProducEspePage]
})
export class ListProducEspePageModule {}
