import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';



import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone,
                //private headers:HttpHeaders
                ) {
  }

  logout() {
    // localStorage.removeItem('token');

    // this.auth2.signOut().then(() => {

    //   this.ngZone.run(() => {
    //     this.router.navigateByUrl('/');
    //   })
    // });
    //let token = localStorage.getItem('token');
    //let url = `${base_url}/Users/logout?access_token=${token}`;
    //localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    //return this.http.post(url, {headers:this.headers});
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }


  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )

  }

  login( formData: LoginForm ) {
    
    return this.http.post(`${ base_url }/Users/login?include=user`, formData )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.id )
                  })
                );

  }

  loginGoogle( token ) {
    
    return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token )
                  })
                );

  }

  

}
