import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { Appointment } from '../actor.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = [ 'position','provider','user','date','status','day','time'];
  dataSource;
  isLoading:boolean=false;
  constructor(
    private actorServ:ActorService
  ) { }

  ngOnInit() {
    this.getAllAppointments();
    this.actorServ.getSubscribeSuccess().subscribe(res=>{
      if(res){
        this.getAllAppointments();
      }
      this.isLoading=false;
    })
  }

  getAllAppointments(){
    this.isLoading=true;
    this.actorServ.getAllAppointments().subscribe(res=>{
      console.log(res);
      this.isLoading=false;
      this.dataSource = new MatTableDataSource<Appointment>(res);
    },
    err=>{
      this.isLoading=false;
      this.actorServ.errHandler(err);
    })
  }

}
