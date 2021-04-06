import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProducNuesPageRoutingModule } from './list-produc-nues-routing.module';

import { ListProducNuesPage } from './list-produc-nues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProducNuesPageRoutingModule
  ],
  declarations: [ListProducNuesPage]
})
export class ListProducNuesPageModule {}
