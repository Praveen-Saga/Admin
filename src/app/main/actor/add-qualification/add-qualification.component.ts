import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { HealthProvider, Qualification } from '../actor.model';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {
  providers:HealthProvider[]=[];
  updateQualification:string;
  addQualification:Qualification={
    providerId:'',
    qualification:'',
  }
  isLoading:boolean=false;
  displayedColumns: string[] = [ 'position','provider','name','status','edit'];
  dataSource;
  qualificationArr:Qualification[]=[];
  constructor(
    private actorServ:ActorService
  ) { }

  ngOnInit() {
   
    this.getProvidersToTable();
    this.getQualificationsToTable();
    this.actorServ.getSubscribeSuccess().subscribe(res=>{
      if(res){
        this.getQualificationsToTable();
        this.getProvidersToTable();
      }
      this.isLoading=false;
    })
    
  }

  getProvidersToTable(){
    this.isLoading=true;
    this.actorServ.getAllProviders().subscribe(res=>{
      this.isLoading=false;
      console.log(res);
      res.forEach(el=>{
        let myValue=el._id;
        let myTitle=el.providerName.toLowerCase().replace("-"," ")
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        this.providers.push({
          _id:myValue,
          providerName:myTitle
        })
      })
      console.log(this.providers)

    },err=>{
      this.isLoading=false;

      // console.log(err);
      // alert('An Error Has Occured..! \n'+ JSON.stringify(err.statusText))
      this.actorServ.errHandler(err);
    })
  }


  getQualificationsToTable(){
    this.actorServ.getAllQualifications().subscribe(res=>{
      console.log(res);
        this.qualificationArr=[...res];
      res.forEach(el=>{
        console.log(el)
       let findProvider= this.providers.find(provider=>{
         console.log(provider)
          return provider._id==el.providerId;
        })
        if(findProvider){
          console.log(findProvider)
          el.providerName=findProvider.providerName;
        }
        
      })
      console.log(res);
      // this.qualificationArr=[...res];
      this.dataSource=new MatTableDataSource<Qualification>(res);
    },
    err=>{
      this.actorServ.errHandler(err);
    })

    
  }

  
  changeStatus(element){
    if(element.status=='active'){
      element.status='inactive';
    }else{
      element.status='active'
    }
    this.actorServ.updateProviderQualification(element._id,element);
}

  edit(ele){
    console.log(ele);
    this.addQualification._id=ele._id
    this.addQualification.providerId=ele.providerId;
    this.addQualification.qualification=ele.qualification;
    // this.addQualification.qualification=ele.qualification;
    // console.log(this.addQualification);
    // this.updateQualification=this.addQualification.qualification;
    // console.log(this.updateQualification)
    // this.submit()
  }

  submit(form?: NgForm){
    this.addQualification.qualification=this.addQualification.qualification.replace(/\s+/g, " ");
    console.log(this.addQualification);

    let dupCheck={};
    console.log(this.qualificationArr)
    dupCheck=this.qualificationArr.find(el=>{
      // if(this.updateQualification && this.updateQualification!==''){
      //   return el.providerId==this.addQualification.providerId && el.qualification.replace(/\s+/g, " ").toLowerCase()==this.updateQualification.replace(/\s+/g, " ").toLowerCase();
      // }else{
        console.log(el.providerId,this.addQualification.providerId,el.qualification,this.addQualification.qualification)
        return el.providerId==this.addQualification.providerId && el.qualification.replace(/\s+/g, " ").toLowerCase()==this.addQualification.qualification.replace(/\s+/g, " ").toLowerCase();
      // }
    })
    console.log(dupCheck)
    if(!dupCheck || dupCheck=={}){
      this.isLoading=true;
      if(this.addQualification._id){
        console.log('Update',this.addQualification);
        this.actorServ.updateProviderQualification(this.addQualification._id,this.addQualification);
      }
      else{
        console.log('Add');
        this.actorServ.addQualification(this.addQualification);
      }  

      this.addQualification._id=null;
      this.addQualification.providerId=null;
      this.addQualification.qualification=null;
      // console.log(this.addQualification)
  
      
      if(form){
        form.resetForm(); 
      }
    }else{
      alert('Qualification '+this.addQualification.qualification+' for this provider is already added..')
    }
    

   
  }
}
