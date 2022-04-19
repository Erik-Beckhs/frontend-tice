import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http:HttpClient) { 

  }

  registraConductor(conductor:any){
    let regConductor = {
      "codigo": conductor.codigo,
      "ci": conductor.ci,
      "nombres": conductor.nombres,
      "apellidos": conductor.apellidos,
      "cat_licencia": conductor.categoria,
      "fecha_nac": conductor.fnac,
      "tipo_sangre": conductor.tsangre,
      "id_asociacion": conductor.sindicato,
      "id_ueducativa": conductor.ueducativa,
      "fotografia":conductor.img,
      "expedicion":conductor.expedicion
    }

    let url = `${base_url}/conductores`;
    return this.http.post(url, regConductor);
  }

  modificaConductor(conductor:any, idConductor:string){
    let url = `${base_url}/api/conductores/${idConductor}`;
    return this.http.patch(url, conductor);
  }

  getConductores(){
      let url = `${base_url}/conductores`;
      return this.http.get(url);
  }

  getConductoresInfoGral(){
    let url = `${base_url}/conductores/ListadoDeConductores`;
    return this.http.get(url);
  }

  deleteConductor(id:any){
    let url = `${base_url}/conductores/${id}`;
    return this.http.delete(url);
  }

  getConductorById(id:any){
    let url = `${base_url}/conductores/${id}`;
    return this.http.get(url);
  }
  
  lastID(){
    let url = `${base_url}/conductores/ultimoID`;
    return this.http.get(url)
    .pipe(map(
      data=>data[0]
    ))
  }
}
