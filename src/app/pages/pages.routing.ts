import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListasComponent } from './listas/listas.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { MovilidadAsocComponent } from './movilidad-asoc/movilidad-asoc.component';
import { HabilitarComponent } from './habilitar/habilitar.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        //canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Mi Perfil' }},
            { path: 'inscribir', component: InscribirComponent, data: { titulo: 'Registro de Conductores' }},
            { path: 'consultar', component: ConsultarComponent, data: { titulo: 'Consultar' }},
            { path: 'about', component: AboutComponent, data: { titulo: 'Acerca de' }},
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' }},
            { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' }},
            { path: 'asociacion', component: AsociacionComponent, data: { titulo: 'Asociacion' }},
            { path: 'movilidad-asoc', component: MovilidadAsocComponent, data: { titulo: 'Asociaciones y Movilidades' }},
            { path: 'habilitar', component: HabilitarComponent, data: { titulo: 'Habilitar / Deshabilitar Usuarios' }},
            //{ path: 'grafica', component: Grafica1Component, data: { titulo: 'Habilitar / Deshabilitar Usuarios' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


