import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(private http:HttpClient) {
 
  }

  saveAsoc(asociacion:any){
    let url = `${base_url}/asociaciones`;
    return this.http.post(url, asociacion);
  }

  getAsociaciones(){
    let url=`${base_url}/asociaciones`;
    return this.http.get(url);
  }

  // getAsociacionesYCantidad(){
  //   let url = `${base_url}/`;
  //   return this.http.get(url);
  // }

  updateImage(id:any, file:any){
    let url = `${base_url}/asociaciones/${id}`;
    return this.http.patch(url, file);
  }
}
