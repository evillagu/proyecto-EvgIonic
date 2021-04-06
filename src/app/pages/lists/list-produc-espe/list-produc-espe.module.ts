import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProducEspePageRoutingModule } from './list-produc-espe-routing.module';

import { ListProducEspePage } from './list-produc-espe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProducEspePageRoutingModule
  ],
  declarations: [ListProducEspePage]
})
export class ListProducEspePageModule {}
