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

  updateUEducativa(idueducativa:any, ueducativa:any){
    let url = `${base_url}/unidades/${idueducativa}`;
    return this.http.patch(url, ueducativa);
  }

  deleteUEducativa(idUE:any){
    let url = `${base_url}/unidades/${idUE}`;
    return this.http.delete(url)
  }

  getCountDriversByUE(){
    let url = `${base_url}/unidades/countDriversByUE`;
    return this.http.get(url);
  }

  getUEducativaById(id:any){
    let url= `${base_url}/unidades/${id}`;
    return this.http.get(url);
  }
}
