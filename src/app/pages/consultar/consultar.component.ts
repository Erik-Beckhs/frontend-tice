import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConductorService } from '../../services/conductor.service';

//reportes
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

    this.loadConductores();
  }

  ngOnInit(): void {
    
  }

  loadConductores(){
    this._conductor.getConductoresInfoGral().subscribe((res)=>{
      this.conductores = res;
      //console.log(this.conductores);
      this.dataSource = new MatTableDataSource(this.conductores);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(idCond:any){
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
        this._conductor.deleteConductor(idCond).subscribe(()=>{
          swal('Dirección Nacional de Tránsito', 'Se eliminó al conductor de manera correcta', 'success').then(()=>{
            this.loadConductores();
          })
        })
      }
      //console.log('no eliminar solo cerrar modal');
    })

  }

  modificar(value){
    alert("modificar"+value);
  }

  downloadPDF(){
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`conductores.pdf`);
    });
  }
}

