import {
    Component,
    OnInit
  } from '@angular/core';
  import {
    ActivatedRoute,
    Router
  } from '@angular/router';
  import Swal from 'sweetalert2';
  import {
    Mesa
  } from '../../../modelos/mesa.model';
  import {
    MesasService
  } from '../../../servicios/mesas.service';
  
  @Component({
    selector: 'ngx-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.scss']
  })
  export class CrearComponent implements OnInit {
    modoCreacion: boolean = true;
    id_mesa: string = "";
    intentoEnvio: boolean = false;
    elMesas: Mesa = {
        cantidad_inscritos: "",
        total_votos: "",
        cant_votos_ganador: "",
        id_candidato_ganador: "",
        id_partido_ganador: "",
        numero: ""
        
    }
    constructor(private miServicioMesas: MesasService,
        private rutaActiva: ActivatedRoute,
        private router: Router) {}
  
    ngOnInit(): void {
        if (this.rutaActiva.snapshot.params.id_mesa) {
            this.modoCreacion = false;
            this.id_mesa = this.rutaActiva.snapshot.params.id_mesa;
            console.log(this.id_mesa);
            this.getMesas(this.id_mesa)
        } else {
            this.modoCreacion = true;
        }
    }
    getMesas(id: string) {
        this.miServicioMesas.getMesa(id).
        subscribe(data => {
            this.elMesas = data;
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
            this.miServicioMesas.editar(this.elMesas._id,
                this.elMesas).
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
  }