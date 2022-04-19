import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { UeducativaService } from '../../services/ueducativa.service';

import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';

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

  id:any;

  ciudades:string[]=[];

  constructor(
    private _list:ListsService,
    private _ueducativa:UeducativaService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.ciudades=this._list.ciudades;
    this.loadUEducativa();

   }

  ngOnInit(): void {

  }

  loadUEducativa(){
    //verificamos el id y guardamos en ueducativa
    if(this.id  !==  0){
      this._ueducativa.getUEducativaById(this.id).subscribe((res:any)=>{
        this.ueducativa = res;
        console.log(res);
      })
    }
  }

  registrar(ueducativa:any){
    if(this.id !== 0){
      //actualizar
      this._ueducativa.updateUEducativa(this.id, ueducativa).subscribe(()=>{
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
