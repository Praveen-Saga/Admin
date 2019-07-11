import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {

    constructor(
        private http:HttpClient,
        private router: Router,
    ){}
    
    login(post){
        this.http.post(environment.url+'adminlogin',post).subscribe(res=>{
            console.log(res);
            this.router.navigateByUrl('/dashboard')
        },
        err=>{
            console.log(err);
            alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
          })
    }
    
  }