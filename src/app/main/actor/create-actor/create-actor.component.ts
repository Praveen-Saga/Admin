import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { MatTable, MatTableDataSource } from '@angular/material';
import { HealthProvider } from '../actor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  Master:string;
  displayedColumns: string[] = [ 'position','name','status','edit'];
  dataSource;
  constructor(private actorServ:ActorService) { }

  ngOnInit() {
   this.getProvidersToTable();
   this.actorServ.getSubscribeSuccess().subscribe(res=>{
    if(res){
      this.getProvidersToTable();
    }
   })
  }

  getProvidersToTable(){
    this.actorServ.getAllProviders().subscribe(res=>{
      this.dataSource=new MatTableDataSource<HealthProvider>(res);
    })
  }

  submit(form: NgForm){
    if(this.Master){
    console.log(this.Master);
    let newRole=this.Master.replace(/\s+/g, " ");
    console.log(newRole);
    this.actorServ.createNewActor(newRole);
    this.getProvidersToTable();
    form.resetForm();
    }
  }
}
