import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario} from '../../../modelos/usuario.model';
import { SeguridadService} from '../../../servicios/seguridad.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  correo: string = "";
  contrasena: string = "";
  constructor(
    private miServicioSeguridad: SeguridadService,
    private router: Router
  ) {}
  /**
   * Método que se ejecuta una vez se carga la página
   */
  ngOnInit(): void {
    let sesion_existe = this.miServicioSeguridad.sesionExiste();
    console.log('login sesion ' + sesion_existe);
    if(sesion_existe == false){
      this.router.navigate(['/pages/seguridad/login']);
    } else {
      this.router.navigate(['/pages/']);
      Swal.fire({
        title: 'Sesion Existe',
        text: "Ud ya se encuentra logeado en el sistema.",
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * Este método permite llevar a cabo el proceso de login,
   * llamando al método correspondiente de los servicios
   * para solicitar la validación al backend
   */
  login(): void {
    console.log("aqui" + this.correo + " contraseña " + this.contrasena)
    let elUsuario: Usuario = {
        correo: this.correo,
        contrasena: this.contrasena,
    }
    this.miServicioSeguridad.login(elUsuario).subscribe(
        data => {
            this.miServicioSeguridad.guardarDatosSesion(data);
            Swal.fire({
              title: 'Exito',
              text: "Usuario logeado con exito",
              icon: 'success',
              timer: 5000
          }).then((result) =>{ window.location.href  = '/pages';} );
     
            
        },
        error => {
            Swal.fire({
                title: 'Error Login',
                text: error["error"]["message"],
                icon: 'error',
                timer: 5000
            });
        }
    );
  }
}