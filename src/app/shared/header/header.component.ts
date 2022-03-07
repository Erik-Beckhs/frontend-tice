import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor( private usuarioService: UsuarioService ) { }

  logout() {
    // swal('SAlirrr');
    // return;
    this.usuarioService.logout();
  }
}
