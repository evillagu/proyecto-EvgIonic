import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProducNuesPage } from './list-produc-nues.page';

const routes: Routes = [
  {
    path: '',
    component: ListProducNuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProducNuesPageRoutingModule {}
