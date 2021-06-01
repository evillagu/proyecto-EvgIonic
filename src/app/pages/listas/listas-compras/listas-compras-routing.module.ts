import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasComprasPage } from './listas-compras.page';

const routes: Routes = [
  {
    path: '',
    component: ListasComprasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasComprasPageRoutingModule {}
