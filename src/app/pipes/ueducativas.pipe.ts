import { Pipe, PipeTransform } from '@angular/core';
import { ListsService } from '../services/lists.service';
import { UeducativaService } from '../services/ueducativa.service';

@Pipe({
  name: 'ueducativas'
})
export class UeducativasPipe implements PipeTransform {
  ueducativas:any[]=[];

  constructor(
    private _ueducativa:UeducativaService
    ){
      this._ueducativa.getUEducativas().subscribe((res:any)=>{
        this.ueducativas = res;
      });
  }

  transform(value:any): string {
    var val:number = +value;

    //let uedu='';
    // this.ueducativas.find(ueducativa=>{
    //   if(ueducativa.id == val){
    //     uedu = ueducativa.nombre;
    //   }
    // });
    const uedu = this.ueducativas.find(element=>{
      element.id == val; 
    });
    console.log(this.ueducativas);
    console.log(uedu);
    return uedu.nombre;    
  }

}
