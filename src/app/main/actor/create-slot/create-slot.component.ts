import { Component, OnInit } from '@angular/core';
import { totalmem } from 'os';
import { ActorService } from '../actor.service';
import { Slots } from '../actor.model';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss']
})
export class CreateSlotComponent implements OnInit {
  fromTime:string;
  toTime:string;
  // i:number=0;
  slots:Slots[]=[];
  displayedColumns: string[] = [ 'position','fromSlot','toSlot','status','edit'];
  dataSource;
  constructor(
    private actorServ:ActorService,
  ) { }

  ngOnInit() {

    this.actorServ.getSlots().subscribe(res=>{
      console.log(res);
      this.dataSource = new MatTableDataSource<Slots>(res);
      // res.forEach(()=>{
      //   this.i++;
      // })
      // this.slots=res;
      // res.forEach(el=>{
      //   let slot:Slots={
      //     fromtime:el.fromtime,
      //     totime:el.totime,
      //     slotValue:el.fromtime+" to "+el.totime
      //   }
      //   this.slots.push(slot);
      // })
    },
    err=>{
      this.actorServ.errHandler(err);
    })
  }
  toTimeCal(){
    console.log(this.fromTime);
    for(let i=0;i<this.fromTime.length;i++){
      console.log(this.fromTime[i],this.fromTime.indexOf(this.fromTime[i]));
    }
    if(this.fromTime && this.fromTime!==null){
      let fromadd=+(this.fromTime[0]+this.fromTime[1])+1
      let balanceTime=this.fromTime.slice(2);
      let fromAddStr
      if(fromadd==12){
        if(balanceTime[4]=='a'){
          balanceTime=balanceTime.replace('a','p');
        }else{
          balanceTime=balanceTime.replace('p','a');
        }
      }
      if(fromadd.toString().length<2){
        fromAddStr="0"+fromadd.toString()
      }else{
        fromAddStr=fromadd.toString();
      }

      this.toTime=fromAddStr.concat(balanceTime);
      console.log(this.fromTime,this.toTime);
    }
  }

  edit(ele){

  }
  change(ele){

  }
  submit(form:NgForm){
    const slot:Slots={fromtime:this.fromTime,totime:this.toTime}
    console.log(slot);
    this.actorServ.addSlots(slot);
    form.resetForm();
  }
}
