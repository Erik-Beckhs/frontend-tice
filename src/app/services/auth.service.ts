import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;

  constructor(
    private http:HttpClient
    ) { 
    
  }

  // registerUser(user:any){
  //   let url = ``;
  //   return this.http.post(url, user);
  // }

  login(user:any){
    let url = `${base_url}/Users/login?include=user`;
    return this.http.post(url, user)
    .pipe(map(data=>data));
  }

  setUser(user){
    let user_string = JSON.stringify(user);
    localStorage.setItem('current_user', user_string);  
  }

  setToken(token:any){
    //let token_string = JSON.stringify(token)
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getCurrentUser(){
    const a = localStorage.getItem('current_user');

    if(a !== null){
      //console.log(typeof a);
      this.user = JSON.parse(a);
    }
    return this.user;
  }

  logout(){
    //let token = this.getToken()
    //let url = `${base_url}/Users/logout?access_token=${token}`;
    //localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    //return this.http.post(url, {headers:this.headers});
  }
}
