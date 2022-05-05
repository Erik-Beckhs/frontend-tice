import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,  NgForm} from '@angular/forms';
import { ListsService } from 'src/app/services/lists.service';
import { MatStepper } from '@angular/material/stepper';

import { AsociacionService } from 'src/app/services/asociacion.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { UeducativaService } from '../../services/ueducativa.service';
import { TarjetaService } from '../../services/tarjeta.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImprimirTICEComponent } from '../imprimir-tice/imprimir-tice.component';
//import * as moment from 'moment';

import * as printJS from 'print-js';
import swal from 'sweetalert';


const img = 'https://www.bellavista.cl/static/assets/images/without_image.jpg';

//declare var swal:any


//import { ConductorInterface } from './inscribir.component';

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

  value2:any;

  driver:any;
  vehicle:any;

  conductores:any[]=[];
  vehiculos:any[]=[];

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

  //finscripcion:any = new Date();

  today:any = new Date();
  dateNextYear = new Date().setFullYear(this.today.getFullYear()+1);
  hoy:any;
  //fini:any;
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

  ci_aux:any;
  placa_aux:any;
  chasis_aux:any;

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
    tipo_sangre:'',
    id_ueducativa:'',
    id_asociacion:'',
    cat_licencia:'',
    expedicion:'', 
    fotografia:img
  }

  vehiculo:any = {
    procedencia:'',
    color:'',
    tipo:'',
    img:img
  };

  card:boolean = false;

  idDriver:any;

  //hoy = Date.now(); 
  //today:any = '';

  @ViewChild('stepper') stepper: MatStepper;
  
  constructor(
    private _formBuilder: FormBuilder,
    private _list:ListsService,
    private _sindicato:AsociacionService,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    private _ueducativa:UeducativaService,
    private _tarjeta:TarjetaService,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog,
    //public dialogRef: MatDialogRef<any>
    ) {
      this.expediciones=this._list.expediciones;
      
      //this.ueducativas=this._list.ueducativas;

      this.tservicios=this._list.tservicios;
      this.tiposangre = this._list.tsangre;
      this.categorias = this._list.categorias;
      this.colores = this._list.colores;
      this.pais = this._list.pais.sort();

      this.fechaActual();

      //this.today = moment(this.hoy).format("DD/MM/YYYY hh:mm A");
      

      //this.sindicatos = this._sindicato.getAsociaciones();
      this.loadSindicatos();
      this.loadUEducativas();

      this.idDriver = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.loadConductor();
      //this.loadVehicu
      this.loadConductores();
      this.loadVehiculos();

      if(this.idDriver === 0){
        this.generaCodigoConductor();
        this.generaCodigoVehiculo();
      }
      else{
        this.idConductor = this.idDriver;
      }

    //this.today2 = new Date();
    //console.log(this.today2);

    // this.value2 = `
    // DIVISIÓN  DE SERVICIOS PÚBLICOS DEPENDIENTES DE LA DIRECCIÓN DEPARTAMENTAL DE TRÁNSITO, TRANSPORTE Y SEGURIDAD VIAL SANTA CRUZ
    // PROYECTO TICE 2022
    // DERECHOS RESERVADOS
    // `
    //         ;
    }

  ngOnInit(): void {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required],
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });  

  }

  loadConductor(){
    if(this.idDriver !== 0){
      this.getConductorById();
      this.getVehiculoByIdConductor();
      
    }
  }

  loadConductores(){
    this._conductor.getConductores().subscribe((res:any)=>{
      this.conductores = res;
    })
  }

  loadVehiculos(){
    this._vehiculo.getVehiculos().subscribe((res:any)=>{
      this.vehiculos = res;
      //console.log(this.vehiculos);
    });
  }

  loadUEducativas(){
    this._ueducativa.getUEducativas().subscribe(data=>{
      this.ueducativas = data;
      //console.log(this.ueducativas);
    })
  }

  getConductorById(){
    this._conductor.getConductorById(this.idDriver).subscribe((res)=>{
      this.conductor = res;
      this.conductor.fecha_nac = new Date(this.conductor.fecha_nac);

      this.ci_aux = this.conductor.ci;
      //console.log(this.conductor.fotografia);
      //this.imageTempUser = this.conductor.fotografia;
      //console.log(this.conductor);
    });
  }

  getVehiculoByIdConductor(){
    this._vehiculo.getVehiculoByIdConductor(this.idDriver).subscribe((res)=>{
      this.vehiculo = res;
      if(this.vehiculo.img == null){
        this.vehiculo.img = img;
      }
      this.placa_aux = this.vehiculo.placa;
      this.chasis_aux = this.vehiculo.chasis;
      this.idVehiculo = this.vehiculo.id;
    })
  }

  /*ngAfterViewInit(): void {
    this.tamQR()
  }*/

  updateImage(){

  }

  fechaActual(){
    //this.hoy = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear()}`;
    this.hoy = this.today.toLocaleDateString();
    //this.fini = this.today.toLocaleDateString();
    //this.ffin = `${this.today.getDate()}/${this.today.getMonth() + 1}/${this.today.getFullYear() + 1}`;
    //let timeNextYear = this.today.setFullYear(this.today.getFullYear()+1);
    let ffinDate = new Date(this.dateNextYear);
    this.ffin = ffinDate.toLocaleDateString();
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

    if(this.fileUser.type.indexOf('image') < 0){
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
    
      // console.log(typeof this.imageTempUser);
      // console.log(this.imageTempUser);

      this.conductor.fotografia = this.imageTempUser;
      //console.log(typeof this.imageTempUser);
      //console.log(this.imageTempUser);
    }
  }

  imprimir(){
    //printJS('formulario', 'html');
    this.dialog.open(ImprimirTICEComponent, {
      width: '800px',
      data: {
        conductor:this.driver,
        vehiculo:this.vehicle
      }
    });
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
      this.vehiculo.img = this.imageTempVehicle;
    }
  }

  tamQR(){
    const a = document.querySelector('.aclass');
    a.children[0].classList.add('w-150');
  }

  genera(datosConductor:NgForm, datosVehiculo:NgForm){
    //console.log('conductor');

    this.driver = datosConductor.value;
    this.vehicle = datosVehiculo.value;
    //this.driver.img = this.imageTempUser;
    this.driver.fotografia = this.conductor.fotografia;

    //preguntar si tiene imagen de vehiculo

    // this.vehicle = datosVehiculo.value;
    // this.vehicle.img = this.imageTempVehicle;
    this.vehicle.img = this.vehiculo.img;

    console.log(this.driver);
    console.log(this.vehicle);

    this.mostrarTarjeta();

  //this.tamQR();
  }

  mostrarTarjeta(){

    this.card = true;
              this.value = `
                  DIRECCION DE TRANSITO SANTA CRUZ
                  Nombre: ${this.driver.nombres} ${this.driver.apellidos} 
                  Tipo de Sangre: ${this.driver.tipo_sangre}
                  Licencia: ${this.driver.licencia}
                  Categoria: ${this.driver.cat_licencia}
                  placa: ${this.vehicle.placa}
                  VALIDO DEL ${this.hoy} AL ${this.ffin} 
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
          swal('Dirección Departamental de Tránsito', 'Se modificó su información de manera correcta', 'success');
          this.registrado = true;

          this.guardaTarjeta(this.idConductor);
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
           swal("Dirección Departamental de Tránsito", "Se registró su información", "success").then(()=>{
             this.registrado = true;
             this.idConductor = data.id;
             this.idVehiculo = dataV.id;

             this.guardaTarjeta(this.idConductor);
             //console.log(data);
           })
        })
        
      })
    }
  }

  guardaTarjeta(idConductor:any){
    let tice = {
      id_conductor:idConductor,
      fecha_inicio:this.today,
      fecha_fin:this.dateNextYear
    }
    this._tarjeta.saveCard(tice).subscribe(()=>console.log('Se registró la tarjeta'));
    //llamada a servicio
  }

anteriorTice(){
  this.card = false;
  this.registrado = false;
  this.stepper.previous();
}

  // registraConductor(conductor:any){
    
  // }

  next1(driver:NgForm){
    //validar que el carnet no se repita
    //obtener listado de conductores sin el q tenemos ahora
    //verificar si existe el q vamos a introducir
    //const [ci] = this.conductores;

    if(this.idConductor){
      //editar
      //verificar si es la misma del comienzo, si no es verificar q no exista
      if(driver.value.ci !== this.ci_aux){
        const aux = this.conductores.find(conductor => conductor.ci === driver.value.ci);
        if(aux){
          swal('Dirección Departamental de Transporte Santa Cruz', `La cedula ${driver.value.ci} ya existe`, 'warning');
          return;
        }
      }
    }
    else{
      //nuevo
        const aux = this.conductores.find(conductor => conductor.ci === driver.value.ci);
        if(aux){
          swal('Dirección Departamental de Transporte Santa Cruz', `La cedula ${driver.value.ci} ya existe`, 'warning');
          return;
        }
    }
    // const conductoresx = this.conductores.filter(conductor=>{
    //   const {ci} = conductor;
    //     if(driver.value.ci !== ci){
    //       return conductor;
    //     }
    // });
    
    // console.log(conductoresx);

    // const aux = conductoresx.find(cx => cx.ci === driver.value.ci);
    // console.log(aux);

    // if(aux){
    //   swal('Dirección Departamental de Transporte Santa Cruz', `La cedula ${driver.value.ci} ya existe`, 'warning');
    //   return;
    // }

    if(this.conductor.fotografia.indexOf('https') == 0)
    {
      swal('Direccion Departamental de Tránsito', 'Debe subir la imagen del conductor', 'warning');
      return ;
    }
    else{
      this.stepper.next();
    }
    //return;
    // if(this.imageTempUser){
    //   //this.completeConductor=true;
    //   this.stepper.next();
    // }
    // else{
    //   swal('Direccion Nal. de Transito', 'Debe subir la imagen del conductor', 'warning');
    // }
  }

  next2(vehiculo:NgForm){
    //verificar si se esta cargando imagen

    if(this.vehiculo.img.indexOf('https', 0)){
      vehiculo.value.img = this.vehiculo.img;
    }
    //verificar placa y chasis

    //const {placa, chasis} = this.vehiculos;

    if(this.idConductor){
      //editar
      if(this.placa_aux !== vehiculo.value.placa){
        const aux = this.vehiculos.find(vehicle=>vehicle.placa === vehiculo.value.placa);
        if(aux){
          //existe la placa
          swal('Dirección Departamental de Santa Cruz', `La placa ${vehiculo.value.placa} ya existe`, 'warning');
          return;
        }
      }
      if(this.chasis_aux !== vehiculo.value.chasis){
        const aux = this.vehiculos.find(vehicle=>vehicle.chasis === vehiculo.value.chasis);
        if(aux){
          //existe el chasis
          swal('Dirección Departamental de Santa Cruz', `Ya existe un vehículo con el chasis ${vehiculo.value.chasis}`, 'warning');
          return;
        }
      }
    }
    else{
      //nuevo
      const aux = this.vehiculos.find(vehicle=>vehicle.placa === vehiculo.value.placa);
      if(aux){
        swal('Dirección Departamental de Santa Cruz', `La placa ${vehiculo.value.placa} ya existe`, 'warning');
        return;
      }
      const aux2 = this.vehiculos.find(vehicle=>vehicle.chasis === vehiculo.value.chasis);
      if(aux2){
        swal('Dirección Departamental de Santa Cruz', `Ya existe un vehículo con el chasis ${vehiculo.value.chasis}`, 'warning');
        return;
      }
    }
    this.stepper.next();
    //TODO: verificar si existe el codigo, placa y chasis
    //let verifica = this.verificarVehicle(vehiculo);

    // switch(valor){
    //   case 1:
    //     if(this.vehiculo.img){
    //       this.stepper.next();
    //     }
    //     else{
    //       swal('Dirección Departamental de Tránsito Santa Cruz', 'Debe subir la imagen del vehículo', 'warning');
    //     }
    //   break;
    //   case 2:
    //     swal('Dirección Departamental de Tránsito Santa Cruz', 'El número de placa ya existe', 'error');
    //   break;
    //   case 3:
    //     swal('Dirección Departamental de Tránsito Santa Cruz', 'El número de chasís ya existe', 'error');
    //   break;
    // }
    
  }

  // verificarVehiculo(vehiculo:any){
  //   let a = 1;
  //   this._vehiculo.countPlaca(vehiculo.placa).subscribe((data:any)=>{
  //     if(data.count > 0){
  //       a = 2;
  //     }
  //     this._vehiculo.countChasis(vehiculo.chasis).subscribe((data1:any)=>{
  //       if(data1.count > 0){
  //         a = 3;
  //       }
  //       this.next2(a);
  //     })
  //     //return a;
  //   })
  //   //return a;
  // }

  generaCodigoConductor(){
    this._conductor.lastID().subscribe((data:any)=>{
      let val = parseInt(data.id) + 1;
      let codigo = ('00' + val).slice(-3);
      console.log('codigo generado')
      this.conductor.codigo =  `COND-${codigo}`;
    })
  }

  generaCodigoVehiculo(){
    this._vehiculo.lastID().subscribe((data:any)=>{
      let val = parseInt(data.id) + 1;
      let codigo = ('0000' + val).slice(-5);
      //console.log('codigo obtenido'+codigo);
      this.vehiculo.codigo =  `V-${codigo}`;
    })
  }
}

export class Conductor{
  ci?:number;
  expedicion?:string;
  nombre?:string;
  apellidos?:string;
  fecha_nac?:object;
  tsangre?:string;
  nacionalidad?:string;
  direccion?:string;
  img?:string;
  codigo?:string;
  sindicato?:number;
  ueducativa?:number;
  licencia?:string;
  categoria?:string;
}