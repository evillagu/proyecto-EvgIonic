import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'alert',
    loadChildren: () => import('./pages/alert/alert.module').then( m => m.AlertPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'list-produc-genere',
    loadChildren: () => import('./pages/lists/list-produc-genere/list-produc-genere.module').then( m => m.ListProducGenerePageModule)
  },
  {
    path: 'list-produc-nues',
    loadChildren: () => import('./pages/lists/list-produc-nues/list-produc-nues.module').then( m => m.ListProducNuesPageModule)
  },
  {
    path: 'list-produc-espe',
    loadChildren: () => import('./pages/lists/list-produc-espe/list-produc-espe.module').then( m => m.ListProducEspePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
