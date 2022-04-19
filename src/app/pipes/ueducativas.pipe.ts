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
    //this.ueducativas = this._lists.ueducativas;
    this._ueducativa.getUEducativas().subscribe((res:any)=>{
      this.ueducativas = res;
      console.log(this.ueducativas);
    })
  }

  transform(idue:number): string {
    let uedu='';
    for(let edu of this.ueducativas){
      if(edu.id == idue){
        uedu=edu.nombre;
      }
    }
    return uedu;
  }
}
