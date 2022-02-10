import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Grafica1Component } from './grafica1/grafica1.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
import { PrincipalComponent } from './principal/principal.component';
import { AboutComponent } from './about/about.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InscribirComponent } from './inscribir/inscribir.component';
import { ListasComponent } from './listas/listas.component';
import { ConsultarComponent } from './consultar/consultar.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        //canActivate: [ AuthGuard ],
        children: [
            { path: '', component: PrincipalComponent, data: { titulo: 'Principal' } },
            { path: 'inscribir', component: InscribirComponent, data: { titulo: 'Inscribir' }},
            { path: 'consultar', component: ConsultarComponent, data: { titulo: 'Consultar' }},
            { path: 'about', component: AboutComponent, data: { titulo: 'Acerca de' }},
            { path: 'listas', component: ListasComponent, data: { titulo: 'Listas' }},
            { path: 'estadisticas', component: EstadisticasComponent, data: { titulo: 'Estadisticas' }},
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


