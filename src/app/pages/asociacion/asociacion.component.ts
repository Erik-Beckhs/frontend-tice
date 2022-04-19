import { Component, OnInit } from '@angular/core';
import { AsociacionService } from '../../services/asociacion.service';

import swal from 'sweetalert';
import { ListsService } from '../../services/lists.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.css']
})
export class AsociacionComponent implements OnInit {
  imageTemp:any;
  imageLoad:boolean=false;
  file:any;

  id:any;

  representante:string;
  asociacion:any = {
    nombre:'',
    representante:'',
    direccion:'',
    ciudad:'',
    fcreacion:new Date(),
    img:''
  }
  
  ciudades:string[]=[];

  constructor(
    private _asociacion:AsociacionService,
    private _list:ListsService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) { 
    this.ciudades = this._list.ciudades; 
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadAsociacion();
  }

  ngOnInit(): void {
    
  }

  loadAsociacion(){
    if(this.id !== 0){
      this._asociacion.getAsociacionById(this.id).subscribe((res)=>{
        this.asociacion = res;

        // let fechanaci = new Date(this.asociacion.fcreacion);
        // this.cliente.fecha_nac = this.fechanaci;

        this.asociacion.fcreacion = new Date(this.asociacion.fcreacion);

        if(this.asociacion.img){
          this.imageTemp = this.asociacion.img;
        }
        
      })
    }
  }

  onFileChange(event:any) {
    this.file=event.target.files[0]
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      swal("Direccion Nacional de Transito", "Sólo puede elegir archivos de tipo imagen", "error")
      this.file=null
      return ;
    }

    this.imageLoad=this.file

    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL(this.file)
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result
    }
  }
  
  //llama al servicio de modificacion de imagen y lo modifica
  updateImage(){
    //set global max_allowed_packet=104857600 en mysql para permitir archivos grandes aparte de configurar el tamaño en lb
    if(!this.asociacion.id){
      swal("Direcciòn Nacional de Trànsito","Debe registrar la información del sindicato","error");
      return;
    }

    let archivo:any={
      img:this.imageTemp
    }

    //let idSupplier:any = this.supplier.id;
    this._asociacion.updateImage(this.asociacion.id, archivo)
    .subscribe(()=>{
      //setear localstorage
      swal("Dirección Nacional de Tránsito", "Se subió su imagen de manera correcta", "success").then(()=>{
          this.router.navigate(['/dashboard/sindicatos'])
      });
    })
  }

  limpiar(){
    this.asociacion = {
      nombre:'',
      representante:'',
      direccion:'',
      ciudad:'',
      fcreacion:'',
      img:''
    }
  }

  registrarAsociacion(asociacion:any){
    if(this.imageTemp){
      asociacion.img = this.imageTemp;
    }

    if(this.id !== 0){
      //editar
      this._asociacion.updateAsociacion(this.id, asociacion).subscribe((res)=>{
        swal('Dirección Nacional de Tránsito', `Se modificó de manera exitosa el registro ${asociacion.nombre}`, 'success').then(()=>{
          this.router.navigate(['dashboard/sindicatos']);
        })
      })
    }  
    else{
      //nuevo
      this._asociacion.saveAsoc(asociacion).subscribe((res:any)=>{
        this.asociacion.id = res.id;
        swal("Direccion Nacional de Transito", "Se registró su asociacion de manera correcta", "success").then(()=>{
          this.router.navigate(['dashboard', 'sindicatos'])
        })
      }) 
    }
  }

}
