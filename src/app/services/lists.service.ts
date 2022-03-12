import { Injectable } from '@angular/core';
import { AsociacionService } from './asociacion.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  expediciones:any = [
    { valor:'LP' },
    { valor:'CB' },
    { valor:'SC' },
    { valor:'OR' },
    { valor:'PT' },
    { valor:'PD' },
    { valor:'BN' },
    { valor:'TJ' }
  ];

  ueducativas:any[] = [
    {value:1, name:'German Busch'},
    {value:2, name:'Gabriel Rene Moreno'},
    {value:3, name:'Juana Azurduy de Padilla'},
    {value:4, name:'Mariscal Santa Cruz'}
  ];

  // sindicatos:any[]=[
  //   {value:1, name:'Taxis Montero'},
  //   {value:2, name:'24 de Septiembre'},
  //   {value:3, name:'Estrella del norte'},
  //   {value:4, name:'Radiotaxis Cruz del Sur'}
  // ];

  tservicios: any[] = [
    {value:1, name:'Bus Escolar'},
    {value:2, name:'Taxi'}
  ];
  
  tsangre:any[] = [
    {value:'A+', name:'A+'},
    {value:'O+', name:'O+'},
    {value:'B+', name:'B+'},
    {value:'AB+', name:'AB+'},
    {value:'A-', name:'A-'},
    {value:'O-', name:'O-'},
    {value:'B-', name:'B-'},
    {value:'AB-', name:'AB-'},
  ];

  categorias:string[] = [
    'A',
    'B',
    'C',
    'M',
    'P',
    'T'
  ]

  constructor() { 

  }



}
