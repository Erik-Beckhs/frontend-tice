import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { UeducativaService } from '../../services/ueducativa.service';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ueducativa',
  templateUrl: './ueducativa.component.html',
  styleUrls: ['./ueducativa.component.css']
})
export class UeducativaComponent implements OnInit {
  ueducativa:any={
    nombre:'',
    direccion:'',
    ciudad:''
  };

  ciudades:string[]=[];

  constructor(
    private _list:ListsService,
    private _ueducativa:UeducativaService,
    private router:Router
    ) {
    this.ciudades=this._list.ciudades;
   }

  ngOnInit(): void {
  }

  registrar(ueducativa:any){
    if(this.ueducativa.id){
      //actualizar
      this._ueducativa.updateUEducativa(ueducativa, this.ueducativa.id).subscribe(()=>{
        swal('Dirección Nacional de Transito', 'La unidad educativa se actualizo con exito', 'success').then(()=>{
          this.router.navigate(['dashboard/ueducativas']);
        });
      })
    }
    else{
      //registrar nuevo
      this._ueducativa.saveUEducativa(ueducativa).subscribe(()=>{
        swal('Dirección Nacional de Transito', 'La unidad educativa se registró con exito', 'success').then(()=>{
            this.router.navigate(['dashboard/ueducativas']);
        });
      })
    }
  }

}
