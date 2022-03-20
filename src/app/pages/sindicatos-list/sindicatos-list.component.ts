import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AsociacionService } from '../../services/asociacion.service';

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
    this._asociaciones.getAsociaciones().subscribe((res)=>{
        this.sindicatos = res;
        this.dataSource = new MatTableDataSource(this.sindicatos);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
    });//devolver sindicatos

    // Assign the data to the data source for the table to render
    
  }

  ngAfterViewInit(): void {
    
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(element:any){
    
  }

  modificar(element:any){

  }

}
