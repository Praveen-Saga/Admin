import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad{
  Status:boolean;
  constructor(
    private loginServ:LoginService,
    private router: Router,
    ){

  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
    return true;
    // let isAuth= this.loginServ.getIsAuth();
    // if(!isAuth){
    //   this.router.navigateByUrl('/login');
    // }
    // return isAuth;
}
}
