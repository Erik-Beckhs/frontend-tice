import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  data:any[]=[];
  year:any=new Date().getFullYear();
  meses:any[]=[];

  constructor(private _tarjeta:TarjetaService) { }

  ngOnInit(): void {
    this.loadDataAndMonth()
  }

  loadDataAndMonth(){
    this._tarjeta.getCardsByMonth().subscribe((data:any)=>{
      //console.log(data);
      data.forEach(element => {
        this.meses.push(element.mes);
        this.data.push(element.cantidad);
      });
    })
  }

  public labels1: string[] = ['1ero de Mayo', 'Eduardo Avaroa', '24 de Septiembre', 'El Camba Tours', 'German Busch', 'Jaguares'];
  public data1 = [
    [10, 15, 40, 52, 22, 16],
  ];

}
