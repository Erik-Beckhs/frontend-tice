import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { PersonaComponent } from './persona/persona.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { PropietarioComponent } from './propietario/propietario.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent,
    PersonaComponent,
    VehiculoComponent,
    PropietarioComponent
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    PersonaComponent,
    VehiculoComponent,
    PropietarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class ComponentsModule { }
