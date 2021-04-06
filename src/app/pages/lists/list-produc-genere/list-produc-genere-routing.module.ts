import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProducGenerePage } from './list-produc-genere.page';

const routes: Routes = [
  {
    path: '',
    component: ListProducGenerePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProducGenerePageRoutingModule {}
