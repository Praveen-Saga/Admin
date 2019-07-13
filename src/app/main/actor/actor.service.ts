import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FuseNavigation } from '@fuse/types';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { navigation } from '../../navigation/navigation'
import {  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {  HealthProvider, AddProvider, Qualification, Slots } from './actor.model';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  roleData:FuseNavigation;
  rolesArr:string[]=['doctor','nurse','medical-store','transport'];
  dupCheck={};
  constructor(
    private fuseNavServ:FuseNavigationService,
    private http: HttpClient,
    private router: Router
  ) { 
    
  }

  // Providers 
  // Getting All Providers
  getAllProviders(){
   return  this.http.get<HealthProvider[]>(environment.url+'getProviders').pipe(retry(5));   
  }
  // Getting All Providers
  // Adding Provider Master 
  addProvider(post){
    this.http.post<AddProvider>(environment.url+'addactor',post).subscribe(res=>{
      console.log(res);
    },  
    err=>{
      this.errHandler(err)

    })
  }
  // Adding Provider Master 
 
  // Getting Providers List (List of Doctors,Nurses etc list in view page)
  getProviderList(id){
    return this.http.get<AddProvider[]>(environment.url+'getActor/'+id)
  }
  // Getting Providers List

  // Provider Wise Count for Dashboard
  providerWiseCount(id){
    return this.http.get<number>(environment.url+'actorCount/'+id);
  }
  // Provider Wise Count for Dashboard
  // Providers


  // Adding and Getting Qualifications
  // Adding Qualifications Master
  addQualification(post){
    this.http.post<Qualification>(environment.url+'addqualification/',post).subscribe(res=>{
      console.log(res);
    },
    err=>{
     this.errHandler(err);
     })
  }
  // Adding Qualifications Master
  // Getting Qualifications 
  getQualifications(id){
  return  this.http.get<Qualification[]>(environment.url+'getQualification/'+id);
  }
  // Getting Qualifications 
  // Adding  and Getting Qualifications
  
  

  // adding and getting slots


  addSlots(post){
    return this.http.post<Slots>(environment.url+'slotmaster',post).subscribe(res=>{
      console.log(res);
      alert('Success '+ res.fromtime +" to "+res.totime+" Slot Added");
    },
    err=>{
      this.errHandler(err)
      // console.log(err);
      // if(err.error && err.error.message){
      // alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText)+'\n'+JSON.stringify(err.error.message))
      // }else{
      //   alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
      // }
    })
  }
  getSlots(){
    return this.http.get<Slots[]>(environment.url+'getSlotmaster');
  }

  // adding and getting slots 

  // adding and getting Images

  imageUpload(title:string, file: File){
    let imageData=new FormData();
    imageData.append("file",file,title);
    console.log(imageData);
    return this.http.post(environment.url+'upload',imageData);
  }
  getImage(title){
    return this.http.get(environment.url+"download/"+title)
  }
  // adding and getting images

  
  // Deleting Provider
  deleteProvider(id){
    return this.http.delete(environment.url+'deleteActor/'+id)
  }
  // Deleting Provider

  // Updating Provider
  updateProvider(id,post){
    return this.http.put<AddProvider>(environment.url+'updateactor/'+id,post)
  }
  // Updating Provider

  // Search in Providers
  searchAmongProviders(post){
    return this.http.post<AddProvider[]>(environment.url+'adminSearch',post)
  }
  // Search in Providers




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
     this.errHandler(err);
    })
 }
    else{
      alert(role+' Already Exists');
      this.router.navigateByUrl('/actor/add/'+role)
    }
  }
}


errHandler(err){
  console.log(err);
      if(err.error && err.error.message){
        alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText)+'\n'+JSON.stringify(err.error.message))
        }
        else if(err.message)
        {
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText)+'\n'+JSON.stringify(err.message))

        }
        else{
          alert('An Error Has Occured...! \n'+JSON.stringify(err.statusText))
        }
}
  
}
