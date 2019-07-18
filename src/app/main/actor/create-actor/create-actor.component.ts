import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActorService } from '../actor.service';
import { MatTable, MatTableDataSource } from '@angular/material';
import { HealthProvider } from '../actor.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit,OnDestroy {
  Master:string;
  id:string;
  isLoading:boolean=false;
  masterArr:HealthProvider[]=[];
  SuccessSub:Subscription;
  displayedColumns: string[] = [ 'position','name','status','edit'];
  dataSource;
  constructor(private actorServ:ActorService) { }

  ngOnInit() {
   this.getProvidersToTable();
   this.SuccessSub=this.actorServ.getSubscribeSuccess().subscribe(res=>{
    if(res){
      this.getProvidersToTable();

    }
    this.isLoading=false;

   })
  }

  getProvidersToTable(){
    this.isLoading=true;
    this.actorServ.getProvidersList().subscribe(res=>{
      this.isLoading=false;
      this.dataSource=new MatTableDataSource<HealthProvider>(res);
      this.masterArr=[...res];
    })
  }

  edit(ele){
    console.log(ele);
    this.id=ele._id;
    this.Master=ele.providerName
  }

  changeStatus(element){
    if(element.status=='active'){
      element.status='inactive';
    }else{
      element.status='active'
    }
    this.actorServ.updateProviderMaster(element._id,element);
}


  submit(form: NgForm){
  
    if(this.Master){
      let dupCheck={}
      console.log(this.masterArr)
      dupCheck= this.masterArr.find(el=>{
        console.log(el.providerName,this.Master)
         return el.providerName==this.Master.replace(/\s+/g, " ");
       })
       console.log(dupCheck)
       if(!dupCheck || dupCheck=={}){
        this.isLoading=true;
        console.log(this.id,this.Master);
          let newRole=this.Master.replace(/\s+/g, " ");
          console.log(newRole);
  
        if(this.id && this.id!==null){
  
          this.actorServ.updateProviderMaster(this.id,{providerName:newRole});
          this.id=null;
        }
        else{
          this.actorServ.createNewActor(newRole);
        }
  
       }else{
         alert('Master Already Exists...')
       }
       form.resetForm();

    }
  }

  ngOnDestroy(){
    this.SuccessSub.unsubscribe();
  }
}
