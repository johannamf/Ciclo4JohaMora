import { Component, OnInit } from '@angular/core';
import { SeguridadService} from '../../servicios/seguridad.service';
import { Router} from '@angular/router';
@Component({
  selector: 'ngx-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {
  
  sesion_existe : any;

  constructor(
    private miServicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Validar sesion
    // let sesion_existe = this.miServicioSeguridad.sesionExiste();
    // if (!sesion_existe){
    //   console.log('Sesion existe ' +  sesion_existe);
    //   this.router.navigate(['pages/seguridad/login']);
    // }
  }

}
