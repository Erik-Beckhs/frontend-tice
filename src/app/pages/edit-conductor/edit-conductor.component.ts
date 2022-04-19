import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConductorService } from '../../services/conductor.service';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-conductor',
  templateUrl: './edit-conductor.component.html',
  styleUrls: ['./edit-conductor.component.css']
})
export class EditConductorComponent implements OnInit {
  conductor:any = {
    fotografia:''
  };

  vehiculo:any = {
    img:''
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _conductor:ConductorService,
    private _vehiculo:VehiculoService,
    private router:Router,
    public dialogRef: MatDialogRef<any>
    ) { 
    //this.loadConductor();
    
  }

  ngOnInit(): void {
    this.loadConductor();
    this.loadVehiculo();
  }

  loadConductor(){
    this._conductor.getConductorById(this.data).subscribe((res:any)=>{
      this.conductor = res;
      this.conductor.fecha_nac = new Date(this.conductor.fecha_nac).toDateString();
      //console.log(this.conductor.fotografia);
      //console.log(this.)
    })
  }

  loadVehiculo(){
    this._vehiculo.getVehiculoByIdConductor(this.data).subscribe((res)=>{
      this.vehiculo = res;
      console.log(this.vehiculo);
    })
  }

  editarRenovar(){
    this.dialogRef.close();
    this.router.navigate(['/dashboard/inscribir', this.data]);
  }

}
