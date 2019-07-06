import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigation } from '../../../navigation/navigation'
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CreateActorService {
  getRole:Observable<FuseNavigation[]>;
  private roleSubject =new Subject<FuseNavigation[]>();
  roleData:FuseNavigation;
  rolesArr:string[]=['doctor','nurse','medical-store','transport'];
  dupCheck={};
  constructor(
    private fuseNavServ:FuseNavigationService,
    private router: Router
  ) { 
    
  }

  get myRole(){
    return this.getRole=this.roleSubject.asObservable()
  }

  createNewActor(role:string){
    const myrole=role.toLowerCase();
    const myTitle=role[0].toUpperCase()+role.slice(1).toLowerCase();
    this.dupCheck=navigation[1].children.find(el=>{
      console.log(el.id);
     return el.id == myrole;
    });
    console.log(this.dupCheck)
    if(this.dupCheck==null){
      this.roleData= {
        id:myrole,
        title:myTitle,
        type:'collapsable',
        icon: '',
        children:[
            {
                id:'add',
                title:'Add New ' + myTitle,
                type:'item',
                url:'/actor/add/'+myrole
            },
            {
                id:'view',
                title:'View Existing '+myTitle+"s",
                type:'item',
                url:'/actor/view/'+myrole
            },
        ]
    }
    console.log(navigation);
    this.fuseNavServ.updateNavigationItem('project',navigation[1].children.push(this.roleData));
    this.dupCheck={};
    this.router.navigateByUrl('/actor/add/'+myrole)
    }
    else{
      alert(role+' Already Exists');
      this.router.navigateByUrl('/dashboard')
    }
   
}

  
}
