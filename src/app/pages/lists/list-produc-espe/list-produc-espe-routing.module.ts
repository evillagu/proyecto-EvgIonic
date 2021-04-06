import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProducEspePage } from './list-produc-espe.page';

const routes: Routes = [
  {
    path: '',
    component: ListProducEspePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProducEspePageRoutingModule {}
