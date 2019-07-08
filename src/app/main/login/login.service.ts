import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {

    constructor(
        private http:HttpClient,
    ){}
    
    login(post){
        this.http.post(environment.url+'adminlogin',post).subscribe(res=>{
            console.log(res);
        },
        err=>{
            console.log(err);
        })
    }
    
  }