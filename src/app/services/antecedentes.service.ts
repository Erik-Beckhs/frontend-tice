import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  constructor(private http:HttpClient) { }

  deleteByIdDriver(idConductor:any){
    let url = `${base_url}/antecedentess/eliminaPorIdConductor`;
    return this.http.delete(url, idConductor);
  }
}
