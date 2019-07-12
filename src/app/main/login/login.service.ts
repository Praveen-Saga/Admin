import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { LoginResponse, AuthDetails } from '../actor/actor.model';
import { BehaviorSubject } from 'rxjs';
import { ActorService } from '../actor/actor.service';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    private _user= new BehaviorSubject<AuthDetails>({
      resEmail:'',
    })
    private isAuth:boolean=false;

    constructor(
        private http:HttpClient,
        private router: Router,
        private actorServ: ActorService
    ){}
    
    getUser(){
      return this._user.asObservable();
    }

    getIsAuth(){
      return this.isAuth;
    }

    
    login(post){
        this.http.post<LoginResponse>(environment.url+'adminlogin',post).subscribe(res=>{
            console.log(res);
            if(res.email){
              this._user.next({
                resEmail:res.email,
              });
              this.isAuth=true;
              this.router.navigateByUrl('/dashboard')
            }else{
              alert('Invalid Email or Password')
            }
   
        },
        err=>{
          this.actorServ.errHandler(err);
            // console.log(err);
            // if(err.error && err.error.message){
            //   alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText)+'\n'+(err.error.message))
            // }
            // else{
            //   alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
            // }
          })
    }

    logout(){
      this._user.next({
        resEmail:"",
      })
      this.isAuth=false;
      this.router.navigateByUrl('/login')
    }
    
  }