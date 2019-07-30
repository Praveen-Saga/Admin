import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActorService } from '../actor.service';
import { Users } from '../actor.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'position','username','phone','email'];//,'status','day','time'
  dataSource;
  isLoading:boolean=false;
  constructor(
    private actorServ:ActorService
  ) { }

  ngOnInit() {
    this.getAllUsers();
    this.actorServ.getSubscribeSuccess().subscribe(res=>{
      if(res){
        this.getAllUsers();
      }
      this.isLoading=false;
    })
  }

  getAllUsers(){
    this.isLoading=true;
    this.actorServ.getAllUsers().subscribe(res=>{
      console.log(res);
      this.isLoading=false;
      this.dataSource = new MatTableDataSource<Users>(res);
    },
    err=>{
      this.isLoading=false;
      this.actorServ.errHandler(err);
    })
  }
}
