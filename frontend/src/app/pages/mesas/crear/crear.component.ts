import {
    Component,
    OnInit
  } from '@angular/core';
  import {
    ActivatedRoute,
    Router
  } from '@angular/router';
  import Swal from 'sweetalert2';
  import { Mesa } from '../../../modelos/mesa.model';
  import { MesasService } from '../../../servicios/mesas.service';
  import { Candidato } from '../../../modelos/candidato.model';
  import { CandidatosService } from '../../../servicios/candidato.service';
  
  @Component({
    selector: 'ngx-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.scss']
  })
  export class CrearComponent implements OnInit {
    modoCreacion: boolean = true;
    id_mesa: string = "";
    intentoEnvio: boolean = false;
    id_candidato;
    candidatos: Candidato[];
    elMesas: Mesa = {
        cantidad_inscritos: "",
        total_votos: "",
        cant_votos_ganador: "",
        id_candidato_ganador: "",
        id_partido_ganador: "1",
        numero: ""
        
    }
    constructor(
        private miServicioMesas: MesasService,
        private miServicioCandidatos: CandidatosService,
        private rutaActiva: ActivatedRoute,
        private router: Router) {}
  
    ngOnInit(): void {
        if (this.rutaActiva.snapshot.params.id_mesa) {
            this.modoCreacion = false;
            this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
            // console.log(this.id_mesa);
            this.getMesa(this.id_mesa)
        } else {
            this.modoCreacion = true;
        }
        this.listarCandidatos();
    }
    getMesa(id: string) {
        this.miServicioMesas.getMesa(id).
        subscribe(data => {
            this.elMesas = data;
            let id_ganador = data.id_candidato_ganador['_id'];
            this.seleccionarCandidatoActual(id_ganador);
        });
    }
    agregar(): void {
        if (this.validarDatosCompletos()) {
            this.intentoEnvio = true;
            this.miServicioMesas.crear(this.elMesas).
            subscribe(data => {
                Swal.fire(
                    'Creado',
                    'La mesaa ha sido creado correctamente.',
                    'success'
                )
                this.router.navigate(["pages/mesas/listar"]);
            });
        }
    }
    editar(): void {
        if (this.validarDatosCompletos()) {
            let candidato_id = document.getElementById('select-candidato') as HTMLInputElement;
            this.id_candidato = candidato_id.value;
            this.elMesas["id_candidato_ganador"] = this.id_candidato;
        
            this.miServicioMesas.editar(
                this.elMesas._id,
                this.elMesas
            ).
            subscribe(data => {
                Swal.fire(
                    'Actualizado',
                    'La mesa ha sido actualizada correctamente.',
                    'success'
                )
                this.router.navigate(["pages/mesas/listar"]);
            });
        }
    }
    listarCandidatos(): void {
        this.miServicioCandidatos.listar().
        subscribe(data => {
            this.candidatos = data;
        });
    }
    validarDatosCompletos(): boolean {
        this.intentoEnvio = true;
        if (this.elMesas.numero == "" ||
            this.elMesas.cantidad_inscritos == "" ||
            this.elMesas.id_partido_ganador == "") {
            return false;
        } else {
            return true;
        }
    }
    seleccionarCandidatoActual(id_candidato){
    
        const selectField = document.getElementById("select-candidato") as HTMLInputElement;
        console.log(selectField);
        console.log(id_candidato);
        setTimeout(()=>{selectField.value = id_candidato} ,1000);
      }
  }