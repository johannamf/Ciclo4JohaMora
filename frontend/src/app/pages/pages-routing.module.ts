import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('./home/home.module')
      .then(m => m.HomeModule),
    },
    {
      path: 'seguridad',
      loadChildren: () => import('./seguridad/seguridad.module')
      .then(m => m.SeguridadModule),
    },
    {
      path: 'resultados',
      loadChildren: () => import('./resultados/resultados.module')
      .then(m => m.ResultadosModule),
    },
    {
      path: 'candidatos',
      loadChildren: () => import('./candidatos/candidatos.module')
      .then(m => m.CandidatosModule),
    },
    {
      path: 'mesas',
      loadChildren: () => import('./mesas/mesas.module')
      .then(m => m.MesasModule),
    },
    {
      path: 'nosotros',
      component : NosotrosComponent,
    },
    {
      path: 'partidos',
      loadChildren: () => import('./partidos/partidos.module')
      .then(m => m.PartidosModule),
    },

  
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
