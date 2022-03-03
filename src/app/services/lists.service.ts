import { Injectable } from '@angular/core';

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

  sindicatos:any[]=[
    {value:1, name:'Taxis Montero'},
    {value:2, name:'24 de Septiembre'},
    {value:3, name:'Estrella del norte'},
    {value:4, name:'Radiotaxis Cruz del Sur'}
  ];

  tservicios: any[] = [
    {value:1, name:'Bus Escolar'},
    {value:2, name:'Taxi'}
  ];
  
  tsangre:any[] = [
    {value:'a+', name:'A+'},
    {value:'o+', name:'O+'},
    {value:'b+', name:'B+'},
    {value:'ab+', name:'AB+'},
    {value:'a-', name:'A-'},
    {value:'o-', name:'O-'},
    {value:'b-', name:'B-'},
    {value:'ab-', name:'AB-'},
  ];

  constructor() { }


}
