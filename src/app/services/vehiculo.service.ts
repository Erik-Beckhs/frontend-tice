import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http:HttpClient) { 

  }

  guardarVehiculo(vehiculo:any){
    let url = `${base_url}/vehiculos`;
    return this.http.post(url, vehiculo);
  }

  modificaVehiculo(vehiculo:any, idVehiculo){
    let url = `${base_url}/api/vehiculos/${idVehiculo}`;
    return this.http.patch(url, vehiculo);
  }

  countPlaca(placa:string){
    let url = `${base_url}/vehiculos/count?where={"placa":"${placa}"}`;
    return this.http.get(url);
  }

  countChasis(chasis:string){
    let url = `${base_url}/vehiculos/count?where={"chasis":"${chasis}"}`;
    return this.http.get(url);
  }
}
