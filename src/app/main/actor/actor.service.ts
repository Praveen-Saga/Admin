import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigation } from '../../navigation/navigation'
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.hmr';
import {  HealthProvider } from './actor.model';


@Injectable({
  providedIn: 'root'
})
export class ActorService {
  // getRole:Observable<FuseNavigation[]>;
  // private roleSubject =new Subject<FuseNavigation[]>();
  roleData:FuseNavigation;
  rolesArr:string[]=['doctor','nurse','medical-store','transport'];
  dupCheck={};
  constructor(
    private fuseNavServ:FuseNavigationService,
    private http: HttpClient,
    private router: Router
  ) { 
    
  }

  // get myRole(){
  //   return this.getRole=this.roleSubject.asObservable()
  // }
  getAllProviders(){
   return  this.http.get<HealthProvider[]>(environment.url+'getProviders')
      
  }
  createNewActor(role:string){
    const myrole=role.toLowerCase();
   
    this.dupCheck=navigation[1].children.find(el=>{
      console.log(el.id);
     return el.id == myrole;
    });
    console.log(this.dupCheck)
    if(this.dupCheck==null){
    this.http.post<HealthProvider>(environment.url+'providers',{providerName: myrole}).subscribe((res)=>{
      console.log(res);
      let myTitle=res.providerName.toLowerCase().replace("-"," ")
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ');
              this.fuseNavServ.updateNavigationItem('health-providers',
              navigation[1].children.push({
                id:res.providerName,
                title:myTitle,
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New '+myTitle,
                        type:'item',
                        url:'/actor/add/'+res.providerName
                    },
                    {
                        id:'view',
                        title:'View Registered '+myTitle,
                        type:'item',
                        url:'/actor/view/'+res.providerName
                    },
                ]
            },
            ));
    this.dupCheck={};
    this.router.navigateByUrl('/actor/add/'+res.providerName)
    })
 }
    else{
      alert(role+' Already Exists');
      this.router.navigateByUrl('/actor/add/'+role)
    }
   
}

  
}
