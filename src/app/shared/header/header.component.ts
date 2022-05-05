import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import swal from 'sweetalert';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user:any;

  constructor( 
    private usuarioService: UsuarioService,
    private auth:AuthService
     ) {
    // this.user = this.auth.getCurrentUser();
    this.user = this.auth.getCurrentUser();
    //console.log(this.user);
   }

  logout() {
    // swal('SAlirrr');
    // return;
    this.usuarioService.logout();
  }
}
