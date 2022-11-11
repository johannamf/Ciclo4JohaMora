import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  Mesa
} from '../../../modelos/mesa.model';
import {
  MesasService
} from '../../../servicios/mesas.service';
@Component({
  selector: 'ngx-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  mesas: Mesa[];
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
      });
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
