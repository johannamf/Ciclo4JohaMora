import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  Partido
} from '../../../modelos/partido.model';
import {
  PartidosService
} from '../../../servicios/partido.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  partidos: Partido[];
  nombresColumnas: string[] = ['Cedula', 'Nombre', 'Apellido', 'Opciones'];
  constructor(private miServicioPartidos: PartidosService,
        private router: Router) { }

  ngOnInit(): void {
      this.listar();
  }
  listar(): void {
      this.miServicioPartidos.listar().
      subscribe(data => {
          this.partidos = data;
      });
  }
  agregar(): void {
      console.log("agregando nuevo");
      this.router.navigate(["pages/partidos/crear"]);
  }
  editar(id: string): void {
      console.log("editando a " + id);
      this.router.navigate(["pages/partidos/actualizar/"+id]);
  }
  eliminar(id: string): void {
      Swal.fire({
          title: 'Eliminar Partido',
          text: "Está seguro que quiere eliminar el partido?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
      }).then((result) => {
          if (result.isConfirmed) {
              this.miServicioPartidos.eliminar(id).
              subscribe(data => {
                  Swal.fire(
                      'Eliminado!',
                      'El partido ha sido eliminada correctamente',
                      'success'
                  )
                  this.ngOnInit();
              });
          }
      })
  }
}
