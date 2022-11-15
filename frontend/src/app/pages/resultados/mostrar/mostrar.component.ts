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
  conteo_votos;
  id_candidato_ganador: any;
  lista_candidatos: any;
  id_ganador;
  
  nombresColumnas: string[] = ['Numero', 'Inscritos', 'Total Votos','Ganador','Partido', 'Opciones'];
  constructor(private miServicioMesas: MesasService,
        private router: Router, private miServicioCandidatos: CandidatosService) { }

  ngOnInit(): void {
    this.listarMesas();
   
      
  }
  listarMesas(): void {
      this.miServicioMesas.listar().
      subscribe(data => {
          this.mesas = data;
  
          this.contar(data);
      });
  }
  listarCandidatos(conteo): void {
    this.miServicioCandidatos.listar().
    subscribe(data => {
        this.lista_candidatos = data;
        this.encontrarGanador(data,conteo)
    
    });
  }
  encontrarGanador(candidatos,conteo){
    let max = 0 ;
    let max_id = ""
    for (let i = 0; i < candidatos.length; i++){
      let id = candidatos[i]["_id"];
      let votos = conteo[id];
      if(votos > max ){
        max = votos;
        max_id = id;
      }

    }
    this.id_ganador = max_id;
    console.log(conteo);
    console.log ("El id del ganador es" + this.id_ganador);

  }
  contar(mesas) {
    let contador = 0;
    let total_votantes_inscritos = 0 ;
    let total_votos = 0 ;
    let cant_votos_ganador = 0;
    let conteo_votos = [];
    
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
    
    this.cantidad_mesas = contador;
    this.total_votantes_inscritos = total_votantes_inscritos;
    this.total_votos = total_votos;
    this.cant_votos_ganador = cant_votos_ganador;
    this.conteo_votos = conteo_votos;
    this.listarCandidatos(conteo_votos);
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
