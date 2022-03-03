import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
import * as moment from 'moment';


@Component({
  selector: 'app-inscribir',
  templateUrl: './inscribir.component.html',
  styleUrls: ['./inscribir.component.css']
})
export class InscribirComponent implements OnInit {

  title = 'app';
  elementType = 'url';
  value:any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  imageLoadUser:boolean=true;
  imageTempUser:any;
  imageLoadVehicle:boolean=true;
  imageTempVehicle:any;
  fileUser:any;
  fileVehicle:any;

  finscripcion:any = new Date();

  //listas
  expediciones:any;
  ueducativas:any;
  sindicatos:any;
  tservicios:any;
  tiposangre:any;

  conductor:ConductorInterface = {
    nombre:'Juan Carlos',
    apellidos:'Ortuño Maldonado',
    ci : 3875620,
    lugar:'SC',
    numreg:'COND-001',
    tsangre:'a+',
    licencia:'3875620',
    ueducativa:1,
  };

  vehiculo:any = {
    codigo:'DDTTSV-001',
    placa:'123ABC',
    procedencia:'China',
    marca:'Nissan',
    modelo:'2000',
    chasis:'1HGBH41JXMN109186',
    color:'Negro',
    cilindrada:'2500',
    poliza:'10102555555',
    img:'',
    tservicio:1
  };

  card:boolean = false;

  hoy = Date.now(); 
  today:any = '';


  constructor(
    private _formBuilder: FormBuilder,
    public _list:ListsService
    ) {
      this.expediciones=this._list.expediciones;
      this.ueducativas=this._list.ueducativas;
      this.sindicatos=this._list.sindicatos;
      this.tservicios=this._list.tservicios;
      this.tiposangre = this._list.tsangre;
           
      this.today = moment(this.hoy).format("DD/MM/YYYY hh:mm A");

    }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });  

    setTimeout(()=>{
      this.tamQR()
    }, 1000);
  }

  /*ngAfterViewInit(): void {
    this.tamQR()
  }*/

  updateImage(){

  }

  onFileChangeUser(event:any) {
    this.fileUser=event.target.files[0];
    if(!event){
      this.fileUser = null
      return ;
    }

    if(this.fileUser.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      alert("Solo puede elegir archivos de tipo imagen");
      this.fileUser=null;
      return ;
    }

    this.imageLoadUser=this.fileUser;

    let reader = new FileReader();
    let urlImagenTempUser = reader.readAsDataURL(this.fileUser);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTempUser = reader.result;
    }
  }

  onFileChangeVehicle(event:any) {
    this.fileVehicle=event.target.files[0];
    if(!event){
      this.fileVehicle = null
      return ;
    }

    if(this.fileVehicle.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      alert("Solo puede elegir archivos de tipo imagen");
      this.fileVehicle=null;
      return ;
    }

    this.imageLoadVehicle=this.fileVehicle;

    let reader = new FileReader();
    let urlImagenTempVehicle = reader.readAsDataURL(this.fileVehicle);
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTempVehicle = reader.result;
    }
  }

  tamQR(){
    const a = document.querySelector('.aclass');
    a.children[0].classList.add('w-150');
  }

  genera(){
    this.card = true;
    //alert("la pareja del año");
    this.value = `
        DIRECCION DE TRANSITO SANTA CRUZ
        Nombre: ${this.conductor.nombre} ${this.conductor.apellidos} 
        Tipo de Sangre: ${this.conductor.tsangre}
        Licencia: ${this.conductor.licencia}
        Categoria: ${this.conductor.categoria}
    `
  ;
  //this.tamQR();
  }
}

export class ConductorInterface {
  ci?:number;
  lugar?:string;
  nombre?:string;
  apellidos?:string;
  fnac?:any;
  tsangre?:string;
  nacionalidad?:string;
  direccion?:string;
  img?:string;
  numreg?:string;
  sindicato?:number;
  ueducativa?:number;
  licencia?:string;
  categoria?:string;
}