import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { LoginResponse, AuthDetails } from '../actor/actor.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActorService } from '../actor/actor.service';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService implements OnInit{
    private _user= new BehaviorSubject<AuthDetails>({
      resEmail:'',
    })
    private isAuth:boolean=false;
    private isLoading= new Subject<boolean>()

    constructor(
        private http:HttpClient,
        private router: Router,
        private actorServ: ActorService
    ){
    }
    
    ngOnInit(){
      this.isLoading.next(false);
    }

    getIsLoading(){
      return this.isLoading.asObservable();
    }
    getUser(){
      return this._user.asObservable();
    }

    getIsAuth(){
      return this.isAuth;
    }

    
    login(post){
      this.isLoading.next(true);
        this.http.post<LoginResponse>(environment.url+'adminlogin',post).subscribe(res=>{
            // console.log(res);
            this.isLoading.next(false);
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
          this.isLoading.next(false);
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