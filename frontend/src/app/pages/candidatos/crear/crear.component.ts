import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import Swal from 'sweetalert2';
import { Candidato } from '../../../modelos/candidato.model';
import { CandidatosService } from '../../../servicios/candidato.service';
import { Partido } from '../../../modelos/partido.model';
import { PartidosService } from '../../../servicios/partido.service';

@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true;
  id_candidato: string = "";
  intentoEnvio: boolean = false;
  partidos: Partido[];
  elCandidato: Candidato = {
      cedula: "",
      nombre: "",
      apellido: "",
      numero_resolucion: "",
      id_partido: ""
  }
  constructor(private miServicioCandidatos: CandidatosService,
      private rutaActiva: ActivatedRoute,
      private miServicioPartidos: PartidosService,
      
      private router: Router) {}

  ngOnInit(): void {
      if (this.rutaActiva.snapshot.params.id_candidato) {
          this.modoCreacion = false;
          this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
          console.log(this.id_candidato);
          this.getCandidato(this.id_candidato);
          
      } else {
          this.modoCreacion = true;
      }
      console.log(this.partidos);
      this.listarPartidos();
  }
  getCandidato(id: string) {
      this.miServicioCandidatos.getCandidato(id).
      subscribe(data => {
          this.elCandidato = data;
      });
  }
  agregar(): void {
      if (this.validarDatosCompletos()) {
          this.intentoEnvio = true;
          this.miServicioCandidatos.crear(this.elCandidato).
          subscribe(data => {
              Swal.fire(
                  'Creado',
                  'El candidato ha sido creado correctamente',
                  'success'
              )
              this.router.navigate(["pages/candidatos/listar"]);
          });
      }
  }
  editar(): void {
      if (this.validarDatosCompletos()) {
          this.miServicioCandidatos.editar(this.elCandidato._id,
              this.elCandidato).
          subscribe(data => {
              Swal.fire(
                  'Actualizado',
                  'El candidato ha sido actualizado correctamente',
                  'success'
              )
              this.router.navigate(["pages/candidatos/listar"]);
          });
      }
  }
  listarPartidos() {
    return this.miServicioPartidos.listar()
    .subscribe(data => {
          this.partidos = data;
      });
  }

  validarDatosCompletos(): boolean {
      this.intentoEnvio = true;
      if (this.elCandidato.cedula == "" ||
          this.elCandidato.nombre == "" ||
          this.elCandidato.apellido == "") {
          return false;
      } else {
          return true;
      }
  }
}