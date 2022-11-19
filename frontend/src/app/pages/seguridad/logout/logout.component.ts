import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  private router: Router;
  constructor() { }

  ngOnInit(): void {
    let sesion = window.localStorage.getItem('sesion');
    
    if(typeof sesion != undefined && sesion != null){
      window.localStorage.removeItem('sesion');
      Swal.fire({
        title: 'Deslogeado',
        text: "Usuario ha sido deslogeado.",
        icon: 'warning',
        timer: 5000
      }).then((result) =>{ window.location.href  = '/pages';} );
      sesion = null;
      
    } else {
      this.router.navigateByUrl('/pages/seguridad/login');
    }
    
    
  }

}
