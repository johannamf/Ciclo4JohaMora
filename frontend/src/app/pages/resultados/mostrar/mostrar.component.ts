import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Mesa} from '../../../modelos/mesa.model';
import { MesasService } from '../../../servicios/mesas.service';
import { Candidato} from '../../../modelos/candidato.model';
import { CandidatosService } from '../../../servicios/candidato.service';

@Component({
  selector: 'ngx-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {

  mesas: Mesa[];
  candidato: Candidato[];
  cantidad_mesas: any;
  total_votantes_inscritos: any;
  total_votos: any;
  cant_votos_ganador: any;
  conteo_votos: number;
  id_candidato_ganador: any;
  nombresColumnas: string[] = ['Numero', 'Inscritos', 'Total Votos','Ganador','Partido', 'Opciones'];
  constructor(private miServicioMesas: MesasService,
        private router: Router) { }

  ngOnInit(): void {
      this.listar();
  }
  listar(): void {
      this.miServicioMesas.listar().
      subscribe(data => {
          this.mesas = data;
          this.contar(data);
      });
  }
  contar(mesas) {
    let contador = 0;
    let total_votantes_inscritos = 0 ;
    let total_votos = 0 ;
    let cant_votos_ganador = 0;
    let conteo_votos = [];
    console.log(mesas);
    for (let i = 0; i < mesas.length; i++){
      contador = contador + 1;
      let ganador_mesa_id = mesas[i]["id_candidato_ganador"]["_id"];
      total_votantes_inscritos += Number(mesas[i]["cantidad_inscritos"]);
      total_votos += Number(mesas[i]["total_votos"]);
      cant_votos_ganador += Number (mesas[i]["cant_votos_ganador"]);
      if (typeof conteo_votos[ganador_mesa_id] !== 'undefined') {
        conteo_votos[ganador_mesa_id] = conteo_votos[ganador_mesa_id] + 1;
      } else {
        conteo_votos[ganador_mesa_id] = 1;
      }
      
    }
    // let maxX = Math.max(conteo_votos);
    // let index = conteo_votos.indexOf(maxX);
    console.log('Array votos es: ' );
    console.log(conteo_votos);
    this.cantidad_mesas = contador;
    this.total_votantes_inscritos = total_votantes_inscritos;
    this.total_votos = total_votos;
    this.cant_votos_ganador = cant_votos_ganador;
    //this.conteo_votos = index;
  }

  agregar(): void {
      console.log("agregando nuevo");
      this.router.navigate(["pages/mesas/crear"]);
  }
  editar(id: string): void {
      console.log("editando a " + id);
      this.router.navigate(["pages/mesas/actualizar/"+id]);
  }
  eliminar(id: string): void {
      Swal.fire({
          title: 'Eliminar Mesa',
          text: "Está seguro que quiere eliminar el mesa?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
      }).then((result) => {
          if (result.isConfirmed) {
              this.miServicioMesas.eliminar(id).
              subscribe(data => {
                  Swal.fire(
                      'Eliminado!',
                      'La mesa ha sido eliminada correctamente',
                      'success'
                  )
                  this.ngOnInit();
              });
          }
      })
  }

}
