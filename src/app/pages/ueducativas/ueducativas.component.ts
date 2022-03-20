import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UeducativaService } from '../../services/ueducativa.service';

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

  constructor(private _ueducativa:UeducativaService) {
    this._ueducativa.getUEducativas().subscribe((res)=>{
      this.ueducativas = res;
      this.dataSource = new MatTableDataSource(this.ueducativas);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
  });
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

  eliminar(element:any){
    
  }

  modificar(element:any){

  }


}
