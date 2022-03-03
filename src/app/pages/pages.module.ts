import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { MatCardModule } from '@angular/material/card';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListasComponent } from './listas/listas.component';
import { ConsultarComponent } from './consultar/consultar.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { MovilidadAsocComponent } from './movilidad-asoc/movilidad-asoc.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';

import { EmptyImgPipe } from '../pipes/empty-img.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PrincipalComponent,
    AboutComponent,
    EstadisticasComponent,
    InscribirComponent,
    ListasComponent,
    ConsultarComponent,
    AsociacionComponent,
    MovilidadAsocComponent,
    HabilitarComponent,
    ProfileComponent,
    EmptyImgPipe
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    AsociacionComponent,
    MovilidadAsocComponent,
    HabilitarComponent,
    ProfileComponent,
    EmptyImgPipe
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    NgxQRCodeModule, 
    MatCardModule
  ]
})
export class PagesModule { }
