import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { MostrarComponent } from './mostrar/mostrar.component';


@NgModule({
  declarations: [
    MostrarComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule
  ]
})
export class ResultadosModule { }
