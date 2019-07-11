import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigation } from '../../navigation/navigation'
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.hmr';
import {  HealthProvider, AddProvider } from './actor.model';


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

  addProvider(post){
    this.http.post<AddProvider>(environment.url+'addactor',post).subscribe(res=>{
      console.log(res);
    },  
    err=>{
      console.log(err);
      alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
    })
  }
  getProviderList(id){
    return this.http.get<AddProvider[]>(environment.url+'getActor/'+id)
  }
  deleteProvider(id){
    return this.http.delete(environment.url+'deleteActor/'+id)
  }

  imageUpload(title:string, file: File){
    let imageData=new FormData();
    imageData.append("file",file,title);
    console.log(imageData);
    return this.http.post(environment.url+'upload',imageData);
  }
  getImage(title){
    return this.http.get(environment.url+"download/"+title)
  }
  updateProvider(id,post){
    return this.http.put(environment.url+'updateactor/'+id,post)
  }

  searchAmongProviders(post){
    return this.http.post<AddProvider[]>(environment.url+'adminSearch',post)
  }

  providerWiseCount(id){
    return this.http.get<number>(environment.url+'actorCount/'+id);
  }


  createNewActor(role:string){
    if(role && role!==""){
    const myrole=role.toLowerCase().replace(' ','-');
   
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
    },
    err=>{
      console.log(err);
      alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
    })
 }
    else{
      alert(role+' Already Exists');
      this.router.navigateByUrl('/actor/add/'+role)
    }
  }
}

  
}
