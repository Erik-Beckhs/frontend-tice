import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { UeducativaService } from '../../services/ueducativa.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  data:any[]=[];
  year:any=new Date().getFullYear();
  meses:any[]=[];

  labels1: string[] = ['1ero de Mayo', 'Eduardo Avaroa', '24 de Septiembre', 'El Camba Tours', 'German Busch', 'Jaguares'];
  data1:any = [
    [10, 15, 40, 52, 22, 16],
  ];

  labels2: string[] = ['Bus Escolar', 'Minibus', 'Taxi', 'Otros'];
  data2:any = [
    [40, 30, 12, 10],
  ];

  //cantidad de conductores por ue
  data3:any[]=[];
  labels3:any[]=[];


  constructor(
    private _tarjeta:TarjetaService,
    private _ueducativa:UeducativaService
    ) { }

  ngOnInit(): void {
    this.loadDataAndMonth();
    this.loadCountDrivers();
  }

  loadDataAndMonth(){
    this._tarjeta.getCardsByMonth().subscribe((data:any)=>{
      //console.log(data);
      data.forEach(element => {
        this.meses.push(element.mes);
        this.data.push(element.cantidad);
      });
      //console.log(this.meses);
      //console.log(this.data);
    })
  }

  loadCountDrivers(){
    this._ueducativa.getCountDriversByUE().subscribe((data:any)=>{
      data.forEach(element => {
        this.data3.push(element.cantidad);
        this.labels3.push(element.nombre);
      });
      console.log(this.data3);
    })
  }



}
