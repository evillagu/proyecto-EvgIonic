import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { FormProductoComponent } from './forms/form-producto/form-producto.component';
import { HeaderComponent } from './header/header.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ItemsComponent } from './items/items.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FormProductoComponent,
    AccordionComponent,
    ItemsComponent
  ],
  exports :[
    HeaderComponent,
    FormProductoComponent,
    AccordionComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
