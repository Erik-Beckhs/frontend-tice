import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AsociacionService } from '../../services/asociacion.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-sindicatos-list',
  templateUrl: './sindicatos-list.component.html',
  styleUrls: ['./sindicatos-list.component.css']
})
export class SindicatosListComponent implements AfterViewInit {
  displayedColumns: string[] = ['#', 'nombre', 'representante', 'direccion', 'ciudad', 'fcreacion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sindicatos:any;

  constructor(
    private _asociaciones:AsociacionService
    ) { 
    this.loadAsociaciones();
  }

    // Assign the data to the data source for the table to render
    

  ngAfterViewInit(): void {
    
  }

  loadAsociaciones(){
    this._asociaciones.getAsociaciones().subscribe((res)=>{
      this.sindicatos = res;
      this.dataSource = new MatTableDataSource(this.sindicatos);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
  });//devolver sindicatos
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(element:any){
    //console.log(element);
    swal({
      title: "Dirección Nacional de Transito",
      text:"Atencion!! Se eliminará el sindicato y los conductores registrados en la asociación. ¿Desea eliminarlo de todas formas?",
      icon: "warning",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        //TODO eliminar lista de antecedentes dado el id de conductor
        this._asociaciones.deleteAsociacion(element.id).subscribe((data:any)=>{
          if(data.count){
            this.loadAsociaciones();
            swal('Dirección Nacional de Transito', `Se eliminó la asociacion ${element.nombre} de manera exitosa`, 'success');
            return;
          }
          else{
            swal('Dirección Nacional de Tránsito', 'Ocurrió un error al eliminar', 'error');
          }
        })
        //this.eliminarAntecedentesDeConductor(idCond);
      }
      //console.log('no eliminar solo cerrar modal');
    })
  }

  modificar(element:any){

  }

}
