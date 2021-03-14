import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDescripcionPage } from './form-descripcion.page';

const routes: Routes = [
  {
    path: '',
    component: FormDescripcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDescripcionPageRoutingModule {}
