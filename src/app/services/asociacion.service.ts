import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  constructor(private http:HttpClient) {
 
  }

  saveAsoc(asociacion:any){
    let url = 'http://localhost:3000/api/asociaciones';
    return this.http.post(url, asociacion);
  }

  getAsociaciones(){
    let url='http://localhost:3000/api/asociaciones';
    return this.http.get(url);
  }

  updateImage(id:any, file:any){
    let url = `http://localhost:3000/api/asociaciones/${id}`;
    return this.http.patch(url, file);
  }
}
