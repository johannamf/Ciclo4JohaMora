import { Component, OnInit } from '@angular/core';
import { SeguridadService} from '../../servicios/seguridad.service';
import { Router} from '@angular/router';
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private miServicioSeguridad: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // let sesion_existe = this.miServicioSeguridad.sesionExiste();
    
    // if (sesion_existe ==false){
    //   console.log('Sesion existe ' +  sesion_existe);
    //   this.router.navigate(['pages/seguridad/login']);
    // }
  }

}
