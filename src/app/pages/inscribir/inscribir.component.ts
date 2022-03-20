import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
//import * as moment from 'moment';

import * as printJS from 'print-js';

import { MatStepper } from '@angular/material/stepper';

//declare var swal:any

import swal from 'sweetalert';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { UeducativaService } from '../../services/ueducativa.service';

@Component({
  selector: 'app-inscribir',
  templateUrl: './inscribir.component.html',
  styleUrls: ['./inscribir.component.css']
})
export class InscribirComponent implements OnInit {
  //isCompleted:boolean=false;

  completeConductor:boolean=false;
  completeVehiculo:boolean=false;
  
  title = 'app';
  elementType = 'url';
  value:any;

  driver:any;
  vehicle:any;

  idConductor:any;
  idVehiculo:any;

  registrado:boolean=false;

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  imageLoadUser:boolean=true;
  imageTempUser:any;
  imageLoadVehicle:boolean=true;
  imageTempVehicle:any;
  fileUser:any;
  fileVehicle:any;

  finscripcion:any = new Date();

  today:any = new Date();
  hoy:any;
  fini:any;
  ffin:any;

  //listas
  expediciones:any;
  ueducativas:any;
  sindicatos:any;
  tservicios:any;
  tiposangre:any;
  categorias:string[];
  colores:string[]=[];
  pais:string[]=[];

  // conductor:ConductorInterface = {
  //   nombre:'Juan Carlos',
  //   apellidos:'Ortuño Maldonado',
  //   ci : 3875620,
  //   lugar:'SC',
  //   numreg:'COND-001',
  //   tsangre:'a+',
  //   licencia:'3875620',
  //   ueducativa:1,
  //   fnac:'27/05/1991'
  // };
  conductor:any = {
      nombre:'',
      apellidos:'',
      direccion:'',
      ci : 0,
      lugar:'',
      numreg:'',
      tsangre:'',
      licencia:'',
      ueducativa:0,
      fnac:''
    };

  vehiculo:any = {
    codigo:'',
    placa:'',
    procedencia:'',
    marca:'',
    modelo:'',
    chasis:'',
    color:'',
    cilindrada:'',
    poliza:'',
    img:'',
    tservicio:0
  };

  card:boolean = false;

  //hoy = Date.now(); 
  //today:any = '';

  @ViewChild('stepper') stepper: MatStepper;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _list:ListsService,
    private _sindicato:AsociacionService,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    private _ueducativa:UeducativaService
    ) {
      this.expediciones=this._list.expediciones;
      
      this.ueducativas=this._list.ueducativas;

      this.tservicios=this._list.tservicios;
      this.tiposangre = this._list.tsangre;
      this.categorias = this._list.categorias;
      this.colores = this._list.colores;
      this.pais = this._list.pais.sort();

      this.fechaActual();

      //this.today = moment(this.hoy).format("DD/MM/YYYY hh:mm A");
      this.generaCodigoConductor();
      //this.sindicatos = this._sindicato.getAsociaciones();
      this.loadSindicatos();
      this.loadUEducativas();
    //this.today2 = new Date();
    //console.log(this.today2);
    }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });  

    setTimeout(()=>{
      this.tamQR()
    }, 1000);
  }

  loadUEducativas(){
    this._ueducativa.getUEducativas().subscribe(data=>{
      this.ueducativas = data;
    })
  }

  /*ngAfterViewInit(): void {
    this.tamQR()
  }*/

  updateImage(){

  }

  fechaActual(){
    this.hoy = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear()}`;
    this.fini = this.hoy;
    this.ffin = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear() + 1}`;
    //this.fin = 
  }

  // fechaProximoAnio(){
    //let nextYear
    // let aux = this.today.setFullYear(this.today.getFullYear + 1);
    // let fproximo = new Date(aux);
    // this.ffin = `${fproximo.getDate()}/${fproximo.getMonth()+1}/${fproximo.getFullYear()}`;
  // }

  loadSindicatos(){
    this._sindicato.getAsociaciones().subscribe((res:any)=>{
      this.sindicatos = res;
    })
  }

  onFileChangeUser(event:any) {
    this.fileUser=event.target.files[0];
    if(!event){
      this.fileUser = null
      return ;
    }

    if(this.fileUser.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      swal("Dirección Nacional de Transito","Solo puede elegir archivos de tipo imagen", "warning");
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

  imprimir(){
    printJS('formulario', 'html');
  }

  onFileChangeVehicle(event:any) {
    this.fileVehicle=event.target.files[0];
    if(!event){
      this.fileVehicle = null
      return ;
    }

    if(this.fileVehicle.type.indexOf('image')<0){
      //swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error");
      swal("Dirección Nacional de Transito","Solo puede elegir archivos de tipo imagen", "warning");
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

  genera(datosConductor:any, datosVehiculo:any){
    //console.log('conductor');
    this.driver = datosConductor.value;
    this.driver.img = this.imageTempUser;

    this.vehicle = datosVehiculo.value;
    this.vehicle.img = this.imageTempVehicle;

    this.mostrarTarjeta();
    //this.fechaProximoAnio();

    //this.registraConductor(driver);
    //console.log(driver);
    //TODO guardar conductor


    // console.log('vehiculo');
    // console.log(datosVehiculo.value);


  //this.tamQR();
  }

  mostrarTarjeta(){

    this.card = true;
              this.value = `
                  DIRECCION DE TRANSITO SANTA CRUZ
                  Nombre: ${this.driver.nombre} ${this.driver.apellidos} 
                  Tipo de Sangre: ${this.driver.tsangre}
                  Licencia: ${this.driver.licencia}
                  Categoria: ${this.driver.categoria}
                  placa: ${this.vehicle.placa}
                  VALIDO DEL ${this.fini} AL ${this.ffin} 
              `
            ;
  }

  registrar(){
    //activar boton imprimir
    if(this.idConductor){
      //TODO
      //actualizar
      this._conductor.modificaConductor(this.driver, this.idConductor).subscribe(()=>{
        this._vehiculo.modificaVehiculo(this.vehicle, this.idVehiculo).subscribe(()=>{
          swal('Direccion Nacional de Tránsito', 'Se modificó su información de manera correcta', 'success');
          this.registrado = true;
        });
      });
      
    }
    else{
      
      this._conductor.registraConductor(this.driver).subscribe((data:any)=>
      {
        console.log('Se registró al conductor');
  
        this.vehicle.id_conductor = data.id;
  
        this._vehiculo.guardarVehiculo(this.vehicle).subscribe((dataV:any)=>{
          console.log('Se registró el vehiculo');
           swal("Dirección Nacional de Tránsito", "Se registró su información", "success").then(()=>{
             this.registrado = true;
             this.idConductor = data.id;
             this.idVehiculo = dataV.id;
             //console.log(data);
           })
        })
        
      })
      }
  }

anteriorTice(){
  this.card = false;
  this.registrado = false;
  this.stepper.previous();
}

  // registraConductor(conductor:any){
    
  // }

  next1(){
    //this.completeConductor=true;
    if(this.imageTempUser){
      //this.completeConductor=true;
      this.stepper.next();
    }
    else{
      swal('Direccion Nal. de Transito', 'Debe subir la imagen del conductor', 'warning');
    }
    
  }

  next2(valor:any){
    //TODO: verificar si existe el codigo, placa y chasis
    //let verifica = this.verificarVehicle(vehiculo);

    switch(valor){
      case 1:
        if(this.imageTempVehicle){
          this.stepper.next();
        }
        else{
          swal('Direccion Nal. de Transito', 'Debe subir la imagen del vehículo', 'warning');
        }
      break;
      case 2:
        swal('Dirección Nacional de Tránsito', 'El número de placa ya existe', 'error');
      break;
      case 3:
        swal('Dirección Nacional de Tránsito', 'El número de chasís ya existe', 'error');
      break;
    }
  }

  verificarVehiculo(vehiculo:any){
    let a = 1;
    this._vehiculo.countPlaca(vehiculo.placa).subscribe((data:any)=>{
      if(data.count > 0){
        a = 2;
      }
      this._vehiculo.countChasis(vehiculo.chasis).subscribe((data1:any)=>{
        if(data1.count > 0){
          a = 3;
        }
        this.next2(a);
      })
      //return a;
    })
    //return a;
  }

  generaCodigoConductor(){
    this._conductor.lastID().subscribe((data:any)=>{
      let val = parseInt(data.id) + 1;
      let codigo = ('00' + val).slice(-3);
      console.log('codigo obtenido')
      this.conductor.numreg =  `COND-${codigo}`;
    })
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