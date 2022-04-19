import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Empadronamiento',
      icono: 'mdi mdi-gauge',
      submenu: [
        //{ titulo: 'Principal', url: '/' },
        { titulo: 'Conductor', url: '/dashboard/inscribir' },
        { titulo: 'Sindicato', url: '/dashboard/asociacion/0' },
        { titulo: 'Unidad Educativa', url: '/dashboard/ueducativa/0' },
        //{ titulo: 'Acerca de', url: '/dashboard/about' },
        { titulo: 'Estadisticas', url: '/dashboard/estadisticas' }
        // { titulo: 'Principal', url: '/' },
        // { titulo: 'Gráficas', url: 'grafica1' },
        // { titulo: 'rxjs', url: 'rxjs' },
        // { titulo: 'Promesas', url: 'promesas' },
        // { titulo: 'ProgressBar', url: 'progress' }
      ]
    },
    {
      titulo: 'Listas',
      icono: 'mdi mdi-format-list-bulleted-type',
      submenu: [
        { titulo: 'Conductores', url: '/dashboard/consultar' },
        { titulo: 'Sindicatos', url: '/dashboard/sindicatos' },
        { titulo: 'Unidades Educativas', url: '/dashboard/ueducativas' },
        //{ titulo: 'Movilidad / asociacion', url: '/dashboard/movilidad-asoc' },
        { titulo: 'Habilitar / Deshabilitar', url: '/dashboard/habilitar' },
        { titulo: 'Salir', url: '/login'}
        // { titulo: 'Principal', url: '/' },
        // { titulo: 'Gráficas', url: 'grafica1' },
        // { titulo: 'rxjs', url: 'rxjs' },
        // { titulo: 'Promesas', url: 'promesas' },
        // { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
  ];

  constructor() { }
}
