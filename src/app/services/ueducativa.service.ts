import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UeducativaService {

  constructor(private http:HttpClient) { }

  getUEducativas(){
    let url = `${base_url}/unidades`;
    return this.http.get(url);
  }

  saveUEducativa(ueducativa:any){
    let url = `${base_url}/unidades`;
    return this.http.post(url, ueducativa);
  }

  updateUEducativa(ueducativa:any, idueducativa:any){
    let url = `${base_url}/unidades/${idueducativa}`;
    return this.http.patch(url, ueducativa);
  }
}
