import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/tabs/producgenere',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'producgenere',
        loadChildren: () => import('../lists/list-produc-genere/list-produc-genere.module').then( m => m.ListProducGenerePageModule)

      },
      {
        path: 'producnues',
        loadChildren: () => import('../lists/list-produc-nues/list-produc-nues.module').then( m => m.ListProducNuesPageModule)

      },
      {
        path: 'producespe',
        loadChildren: () => import('../lists/list-produc-espe/list-produc-espe.module').then( m => m.ListProducEspePageModule)

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
