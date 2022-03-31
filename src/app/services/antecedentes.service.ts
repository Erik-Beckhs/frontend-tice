import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {
  headers:HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json'
  })

  constructor(private http:HttpClient) { }

  deleteByIdDriver(idConductor:any){
    
    //alert('desde service:'+idConductor)
    //return;
    let objeto = {
      idConductor
    }
    // console.log(idConductor);
    // return;
    let url = `${base_url}/antecedentess/antecedenteConductor`;
    return this.http.post(url, objeto, { headers:this.headers});
  }
}
