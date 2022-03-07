import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private headers:HttpHeaders
    ) { 

  }

  registerUser(user:any){
    let url = ``;
    return this.http.post(url, user);
  }

  login(user:any){
    let url = `http://localhost:3000/api/Users/login?include=user`;
    return this.http.post(url, user)
    .pipe(map(data=>data));
  }

  setUser(user){
    let user_string = JSON.stringify(user);
    localStorage.setItem('current_user', user_string);  
  }

  setToken(token:any){
    //let token_string = JSON.stringify(token)
    localStorage.setItem('accessToken', token);
  }

  getToken(){
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(){
    let a = localStorage.getItem('currentUser');
    if(a){
      return a;
    }
    else{
      return null;
    }
  }

  logout(){
    let token = this.getToken()
    let url = `http://localhost:3000/api/Users/logout?access_token=${token}`;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    return this.http.post(url, {headers:this.headers});
  }
}
