import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListasComprasPageRoutingModule } from './listas-compras-routing.module';

import { ListasComprasPage } from './listas-compras.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasComprasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListasComprasPage]
})
export class ListasComprasPageModule {}
