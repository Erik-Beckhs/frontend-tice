import { Component, OnInit } from '@angular/core';
import { AsociacionService } from '../../services/asociacion.service';

import swal from 'sweetalert';
@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.css']
})
export class AsociacionComponent implements OnInit {
  imageTemp:any;
  imageLoad:boolean=false;
  file:any;

  representante:string;
  asociacion:any = {
    nombre:'',
    representante:'',
    direccion:'',
    ciudad:'',
    fcreacion:'',
    img:''
  }

  constructor(private _asociacion:AsociacionService) { }

  ngOnInit(): void {
    
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

    console.log(archivo.img);
    debugger;

    //let idSupplier:any = this.supplier.id;
    this._asociacion.updateImage(this.asociacion.id, archivo)
    .subscribe(()=>{
      //setear localstorage
      swal("Dirección Nacional de Tránsito", "Se subiò su imagen de manera correcta", "success");
    })
  }

  registrarAsociacion(asociacion:any){
    if(asociacion.nombre.length===0){
      swal("Dirección Nacional de Tránsito", "El nombre de asociacion es obligatorio", "error");
      return ;
    }
    this._asociacion.saveAsoc(asociacion).subscribe((res:any)=>{
      this.asociacion.id = res.id;
      swal("Direccion Nacional de Transito", "Se registrò su asociacion de manera correcta", "success");
    })
    
    //TODO: verificar si ya existe el nombre de proveedor
    // supplier.id=this._generateID.generateID();
    // supplier.idContact=this.contact.id;
    // //console.log(supplier)
    // this._supplier.registerSupplier(supplier).subscribe();
  }

}
