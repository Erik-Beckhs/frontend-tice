import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UeducativaService } from '../../services/ueducativa.service';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ueducativas',
  templateUrl: './ueducativas.component.html',
  styleUrls: ['./ueducativas.component.css']
})
export class UeducativasComponent implements OnInit {
  
  displayedColumns: string[] = ['#', 'nombre', 'ciudad', 'direccion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ueducativas:any;

  constructor(
    private _ueducativa:UeducativaService,
    private router:Router
    ) {
    this.loadUEducativa();
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


  loadUEducativa(){
    this._ueducativa.getUEducativas().subscribe((res)=>{
      this.ueducativas = res;
      this.dataSource = new MatTableDataSource(this.ueducativas);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
  });
  }
  eliminar(element:any){
    
    swal({
      title: "Dirección Nacional de Transito",
      text:`Atencion!! Se eliminará la Unidad Educativa ${element.nombre} y todos los conductores asociados a la Unidad Educativa. ¿Desea eliminarlo de todas formas?`,
      icon: "warning",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        this._ueducativa.deleteUEducativa(element.id).subscribe((data:any)=>{
          if(data.count){
            this.loadUEducativa();
            swal('Dirección Nacional de Transito', `Se eliminó la unidad educativa ${element.nombre} de manera exitosa`, 'success');
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
      this.router.navigate(['dashboard/ueducativa', element]);
  }
}
