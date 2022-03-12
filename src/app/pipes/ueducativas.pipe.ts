import { Pipe, PipeTransform } from '@angular/core';
import { ListsService } from '../services/lists.service';

@Pipe({
  name: 'ueducativas'
})
export class UeducativasPipe implements PipeTransform {
  ueducativas:any[];

  constructor(private _lists:ListsService){
    this.ueducativas = this._lists.ueducativas;
  }

  transform(idue:number): string {
    let uedu='';
    for(let edu of this.ueducativas){
      if(edu.value == idue){
        uedu=edu.name;
      }
    }
    return uedu;
  }

}
