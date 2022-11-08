import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatosRoutingModule } from './candidatos-routing.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    NbCardModule
  ]
})
export class CandidatosModule { }
