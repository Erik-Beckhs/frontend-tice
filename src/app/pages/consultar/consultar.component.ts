import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConductorService } from '../../services/conductor.service';

import swal from 'sweetalert';
import { AntecedentesService } from '../../services/antecedentes.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  displayedColumns: string[] = ['#', 'nombre', 'ci', 'ueducativa', 'sindicato', 'placa', 'tipo', 'fecharegistro', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  conductores:any;

  constructor(
    public _conductor:ConductorService,
    private _antecedentes:AntecedentesService
    ) { 
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.conductores);

    this._conductor.getConductoresInfoGral().subscribe((res)=>{
      this.conductores = res;
      //console.log(this.conductores);
      this.dataSource = new MatTableDataSource(this.conductores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(idCond){
    //alert("eliminar"+value);
    swal({
      title: "Dirección Nacional de Transito",
      text:"¿Esta seguro que desea eliminar el registro? Se eliminará el conductor, el vehiculo y los antecedentes",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        //TODO eliminar lista de antecedentes dado el id de conductor
        this.eliminarAntecedentesDeConductor(idCond);
        return;
      }
      console.log('no eliminar solo cerrar modal');
    })

  }

  eliminarConductor(idConductor:any){
    
  }

  eliminarVehiculoDeConductor(idConductor:any){
    
  }

  eliminarAntecedentesDeConductor(idConductor:any){
      this._antecedentes.deleteByIdDriver(idConductor).subscribe(()=>{
        //this.eliminarVehiculoDeConductor(idConductor);
        swal('antecedentes eliminados');
        //swal('Se eliminó sus antecedentes');
      })
  }

  modificar(value){
    alert("modificar"+value);
  }
}



/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
