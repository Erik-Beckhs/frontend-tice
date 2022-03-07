import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
import * as moment from 'moment';
import { MatStepper } from '@angular/material/stepper';

//declare var swal:any

import swal from 'sweetalert';
import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

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

  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

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
  categorias:string[];

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

  hoy = Date.now(); 
  today:any = '';

  @ViewChild('stepper') stepper: MatStepper;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _list:ListsService,
    private _sindicato:AsociacionService,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService
    ) {
      this.expediciones=this._list.expediciones;
      this.ueducativas=this._list.ueducativas;
      this.tservicios=this._list.tservicios;
      this.tiposangre = this._list.tsangre;
      this.categorias = this._list.categorias;
      this.today = moment(this.hoy).format("DD/MM/YYYY hh:mm A");
      this.generaCodigoConductor();
      //this.sindicatos = this._sindicato.getAsociaciones();
      this.loadSindicatos();
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

  /*ngAfterViewInit(): void {
    this.tamQR()
  }*/

  updateImage(){

  }

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
    let driver = datosConductor.value;
    driver.img = this.imageTempUser;

    let vehicle = datosVehiculo.value;
    vehicle.img = this.imageTempVehicle;

    this._conductor.registraConductor(driver).subscribe((data:any)=>
      {
        console.log('Se registró al conductor');

        vehicle.id_conductor = data.id;

        this._vehiculo.guardarVehiculo(vehicle).subscribe(dataV=>{
          console.log('Se registró el vehiculo');
           swal("Dirección Nacional de Tránsito", "Se registró su información", "success").then(()=>{
              this.mostrarTarjeta();
           })
        })
        
      })

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
                  Nombre: ${this.conductor.nombre} ${this.conductor.apellidos} 
                  Tipo de Sangre: ${this.conductor.tsangre}
                  Licencia: ${this.conductor.licencia}
                  Categoria: ${this.conductor.categoria}
              `
            ;
  }

  // registraConductor(conductor:any){
    
  // }

  goVehiculo(){
    //this.completeConductor=true;
    if(this.conductor.ci !== null || this.conductor.ci > 0){
      //this.completeConductor=true;
      this.stepper.next();
    }
    else{
      swal('Direccion Nal. de Transito', 'Llene los campos obligatorios', 'warning');
    }
    
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