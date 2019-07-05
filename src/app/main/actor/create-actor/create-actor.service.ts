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
  roleDataArr:FuseNavigation[]=[
    {
        id       : 'project',
        title    : 'PROJECT',
        // translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'dashboard',
                title    : 'DashBoard',
                // translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'assessment',
                url      : '/dashboard',
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id:'doctor',
                title:'Doctor',
                type:'collapsable',
                icon: '',
                children:[
                    {
                        id:'add',
                        title:'Add New',
                        type:'item',
                        url:'/actor/add/doctor'
                    },
                    {
                        id:'view',
                        title:'View Existing',
                        type:'item',
                        url:'/actor/view/doctor'
                    },
                ]
            }
        ]
    }
];
  dupCheck={};
  constructor(
    private fuseNavServ:FuseNavigationService,
    private router: Router
  ) { 
    
  }

  get myRole(){
    return this.getRole=this.roleSubject.asObservable()
  }

  createNewActor(role){
    const myrole=role.toLowerCase();
    this.dupCheck=navigation[0].children.find(el=>{
      console.log(el.id);
     return el.id == myrole;
    });
    console.log(this.dupCheck)
    if(this.dupCheck==null){
      this.roleData= {
        id:myrole,
        title:role,
        type:'collapsable',
        icon: '',
        children:[
            {
                id:'add',
                title:'Add New ' + role,
                type:'item',
                url:'/actor/add/'+myrole
            },
            {
                id:'view',
                title:'View Existing '+role+"s",
                type:'item',
                url:'/actor/view/'+myrole
            },
        ]
    }
    console.log(navigation);
    this.fuseNavServ.updateNavigationItem('project',navigation[0].children.push(this.roleData));
    this.dupCheck={};
    }
    else{
      alert(role+' Already Exists');
      this.router.navigateByUrl('/dashboard')
    }
   
}

  
}
