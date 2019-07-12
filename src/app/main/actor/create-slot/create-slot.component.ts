import { Component, OnInit } from '@angular/core';
import { totalmem } from 'os';
import { ActorService } from '../actor.service';
import { Slots } from '../actor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-slot',
  templateUrl: './create-slot.component.html',
  styleUrls: ['./create-slot.component.scss']
})
export class CreateSlotComponent implements OnInit {
  fromTime:string;
  toTime:string;
  constructor(
    private actorServ:ActorService,
  ) { }

  ngOnInit() {
  }
  toTimeCal(){
    console.log(this.fromTime);
    if(this.fromTime && this.fromTime!==null){
      let fromadd=+(this.fromTime[0]+this.fromTime[1])+1
      let balanceTime=this.fromTime.slice(2);
      let fromAddStr
      if(fromadd.toString().length<2){
        fromAddStr="0"+fromadd.toString()
      }else{
        fromAddStr=fromadd.toString();
      }

      this.toTime=fromAddStr.concat(balanceTime);
      console.log(this.fromTime,this.toTime);
    }
  }
  submit(form:NgForm){
    const slot:Slots={fromtime:this.fromTime,totime:this.toTime}
    console.log(slot);
    this.actorServ.addSlots(slot);
    form.resetForm();
  }
}
